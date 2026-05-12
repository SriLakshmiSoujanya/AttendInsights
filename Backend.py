from dotenv import load_dotenv
import os

load_dotenv()
from flask import Flask, jsonify
import pandas as pd
import smtplib
import schedule
import time
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from groq import Groq
from collections import Counter
from datetime import datetime, date
import logging
import traceback

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

# ── CONFIG ─────────────────────────────────────────────────
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL")
APP_PASSWORD = os.getenv("APP_PASSWORD")

if not all([GROQ_API_KEY, FROM_EMAIL, APP_PASSWORD]):
    raise EnvironmentError("Missing required environment variables!")
MENTOR_EMAIL  = "23p31a4241@acet.ac.in"

# Time to send emails daily (24hr format)
DAILY_RUN_TIME = "09:00"

client   = Groq(api_key=GROQ_API_KEY)
ATT_FILE = "attendance.xlsx"
STU_FILE = "students.xlsx"

# ── LOAD DATA ──────────────────────────────────────────────
def load_data():
    att = pd.read_excel(ATT_FILE)
    stu = pd.read_excel(STU_FILE)

    att.columns = att.columns.str.strip()
    stu.columns = stu.columns.str.strip().str.replace('\n', ' ')

    att["roll_no"] = att["roll_no"].astype(str).str.strip().str.upper()
    stu["ROLL NO"] = stu["ROLL NO"].astype(str).str.strip().str.upper()
    stu = stu.rename(columns={"ROLL NO": "roll_no"})

    merged = pd.merge(att, stu, on="roll_no", how="inner")
    print(f"  Loaded: {len(att)} attendance | {len(merged)} matched students")
    return att, merged

# ── GET TODAY'S DATE COLUMNS ───────────────────────────────
def get_date_cols(att_df):
    all_date_cols = [
        c for c in att_df.columns
        if "_lightmode" in c or "_darkmode" in c
    ]
    return all_date_cols

def get_todays_col(all_date_cols):
    today_str = datetime.now().strftime("%d-%m-%Y")
    for col in all_date_cols:
        if col.startswith(today_str):
            return col
    return None

# ── CHECK IF TODAY IS SESSION DAY ─────────────────────────
def is_session_today(att_df):
    date_cols   = get_date_cols(att_df)
    todays_col  = get_todays_col(date_cols)

    if todays_col:
        print(f"  Session found today: {todays_col}")
        return True, todays_col
    else:
        print(f"  No session today ({datetime.now().strftime('%d-%m-%Y')})")
        return False, None

# ── SEND EMAIL ─────────────────────────────────────────────
def send_email(to_email, subject, body):
    try:
        msg = MIMEMultipart()
        msg["From"]    = FROM_EMAIL
        msg["To"]      = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as s:
            s.login(FROM_EMAIL, APP_PASSWORD)
            s.send_message(msg)
        print(f"  Email sent → {to_email}")
        return True
    except smtplib.SMTPException as e:
        logger.error(f"  SMTP Error → {to_email} | {e}")
        return False
    except Exception as e:
        logger.error(f"  Email failed → {to_email} | {e}")
        return False

# ── AI EMAIL GENERATOR ─────────────────────────────────────
def generate_email(prompt):
    res = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return res.choices[0].message.content

# ══════════════════════════════════════════════════════════
# FLOW 2 — EMAIL BY TODAY'S ATTENDANCE %
# Runs only on session days
# ══════════════════════════════════════════════════════════
def flow2_daily_email(row, todays_col):
    try:
        pct        = float(row["percentage"])
        name       = str(row["TRAINEE NAME"])
        email      = str(row["STUDENT MAIL ID"])
        roll       = str(row["roll_no"])
        today_att  = str(row[todays_col]).lower().strip()

        # Only email if student was absent today
        # OR if attendance is critically low
        if today_att != "absent" and pct >= 75:
            return None

        if pct < 75:
            etype   = "WARNING"
            subject = f"Attendance Warning — {name}"
        elif pct <= 90:
            etype   = "REMINDER"
            subject = f"Attendance Reminder — {name}"
        else:
            etype   = "APPRECIATION"
            subject = f"Attendance Appreciation — {name}"

        prompt = f"""
Write a professional {etype} attendance email.
Student: {name} ({roll})
Today ({datetime.now().strftime('%d %B %Y')}): {today_att}
Overall attendance: {pct:.2f}%
Sessions: {row['attended']} attended out of {row['sessions']}
Sign off as: T-Hub Academic Office
Maximum 80 words.
"""
        body   = generate_email(prompt)
        result = send_email(email, subject, body)
        print(f"  Flow2: {name} | {pct:.1f}% | {etype} | sent={result}")
        return {"name": name, "type": etype, "sent": result}

    except (ValueError, KeyError) as e:
        logger.error(f"  Flow2 data error: {e}")
        return None
    except Exception as e:
        logger.error(f"  Flow2 general error: {e}", exc_info=True)
        return None

# ══════════════════════════════════════════════════════════
# FLOW 3 — CORRECT STREAK LOGIC
# Counts only CURRENT ongoing streak
# Resets to 0 when student comes present
# Does NOT count entire dataset
# ══════════════════════════════════════════════════════════
def get_current_streak(att_row, date_cols):
    """
    Goes backwards from most recent date.
    Counts consecutive absences.
    STOPS counting as soon as student was present.
    Resets every week — new week starts fresh count.
    """
    streak         = 0
    last_week_num  = None

    for col in reversed(date_cols):
        val = str(att_row[col]).lower().strip()

        # Get week number of this date
        date_str = col.replace("_lightmode", "").replace("_darkmode", "")
        try:
            d         = pd.to_datetime(date_str, format="%d-%m-%Y")
            week_num  = d.isocalendar()[1]  # ISO week number
        except:
            continue

        # If we moved to a previous week and already have a streak
        # check if student was present at end of that week
        if last_week_num is not None and week_num != last_week_num:
            # Week changed — if streak already started this means
            # student was absent across weeks — continue counting
            # But if student was present in previous week — stop
            pass

        last_week_num = week_num

        if val == "absent":
            streak += 1
        elif val == "present":
            # Student was present — STOP counting streak here
            break
        # Skip unknown/empty values

    return streak

def flow3_streak_alert(row, att_df):
    try:
        date_cols = get_date_cols(att_df)
        att_row   = att_df[att_df["roll_no"] == row["roll_no"]].iloc[0]

        # Get CURRENT ongoing streak only
        streak = get_current_streak(att_row, date_cols)

        name  = str(row["TRAINEE NAME"])
        roll  = str(row["roll_no"])
        pct   = float(row["percentage"])
        mob   = str(row["TRAINEE MOBILE"])

        # Alert only at exactly 3 days to avoid repeat emails
        if streak == 3 or streak == 5:
            prompt = f"""
Write an urgent parent notification email.
Student: {name} ({roll})
Absent continuously for: {streak} days
Overall attendance: {pct:.2f}%
Please ask parents to contact T-Hub urgently.
Sign off as: T-Hub Academic Office
Maximum 80 words.
"""
            body    = generate_email(prompt)
            subject = f"Urgent: {name} absent {streak} days continuously"
            send_email(MENTOR_EMAIL, subject, body)
            print(f"  Flow3: {name} | streak={streak} days | alert sent")
            return {"name": name, "streak": streak}

        print(f"  Flow3: {name} | current streak={streak} days | no alert")
        return None

    except (KeyError, IndexError) as e:
        logger.error(f"  Flow3 data error: {e}")
        return None
    except Exception as e:
        logger.error(f"  Flow3 general error: {e}", exc_info=True)
        return None

# ══════════════════════════════════════════════════════════
# FLOW 4 — RECENT PATTERN DETECTION
# Only checks LAST 4 WEEKS not entire dataset
# Detects if student absent on same weekday 3+ times recently
# ══════════════════════════════════════════════════════════
def flow4_pattern(row, att_df):
    try:
        date_cols = get_date_cols(att_df)
        att_row   = att_df[att_df["roll_no"] == row["roll_no"]].iloc[0]

        name = str(row["TRAINEE NAME"])
        roll = str(row["roll_no"])
        pct  = float(row["percentage"])

        # Only look at last 4 weeks (28 days)
        cutoff_date = pd.Timestamp.now() - pd.Timedelta(days=28)

        recent_absent_days = []

        for col in date_cols:
            date_str = col.replace("_lightmode","").replace("_darkmode","")
            try:
                d = pd.to_datetime(date_str, format="%d-%m-%Y")
            except:
                continue

            # Only check recent dates
            if d < cutoff_date:
                continue

            val = str(att_row[col]).lower().strip()
            if val == "absent":
                recent_absent_days.append(d)

        if len(recent_absent_days) < 3:
            return None

        # Count which weekday they are absent most
        weekday_counts = Counter(
            [d.strftime("%A") for d in recent_absent_days]
        )
        top_day, top_count = weekday_counts.most_common(1)[0]

        # Only alert if same weekday missed 3+ times in last 4 weeks
        if top_count >= 3:
            prompt = f"""
Write a pattern advisory email to mentor.
Student: {name} ({roll})
In the last 4 weeks, absent {top_count} times on {top_day}s.
Recent absence breakdown: {dict(weekday_counts)}
Suggest mentor speak with student about this pattern.
Sign off as: T-Hub AI Monitor
Maximum 80 words.
"""
            body    = generate_email(prompt)
            subject = f"Pattern Alert: {name} absent on {top_day}s ({top_count} times)"
            send_email(MENTOR_EMAIL, subject, body)
            print(f"  Flow4: {name} | {top_day} x{top_count} in last 4 weeks | alert sent")
            return {"name": name, "day": top_day, "count": top_count}

        return None

    except (KeyError, IndexError, ValueError) as e:
        logger.error(f"  Flow4 data error: {e}")
        return None
    except Exception as e:
        logger.error(f"  Flow4 general error: {e}", exc_info=True)
        return None

# ══════════════════════════════════════════════════════════
# FLOW 5 — DAILY MENTOR SUMMARY
# ══════════════════════════════════════════════════════════
def flow5_daily_report(merged, todays_col):
    try:
        today_absent = []
        low_att      = []

        for _, row in merged.iterrows():
            if todays_col and str(row[todays_col]).lower().strip() == "absent":
                today_absent.append(
                    f"{row['TRAINEE NAME']} ({row['roll_no']})"
                )
            if float(row["percentage"]) < 75:
                low_att.append(
                    f"{row['TRAINEE NAME']}: {float(row['percentage']):.1f}%"
                )

        prompt = f"""
Write a daily attendance summary for T-Hub mentor.
Date: {datetime.now().strftime('%d %B %Y')}
Total students: {len(merged)}
Absent today: {len(today_absent)} students
Names: {', '.join(today_absent) if today_absent else 'None'}
Below 75% attendance: {len(low_att)} students
List: {', '.join(low_att) if low_att else 'None'}
Keep it brief and professional. Max 150 words.
Sign off as: T-Hub AI System
"""
        body    = generate_email(prompt)
        subject = f"Daily Attendance Report — {datetime.now().strftime('%d %B %Y')}"
        send_email(MENTOR_EMAIL, subject, body)
        print(f"  Flow5: Daily report sent | {len(today_absent)} absent today")

    except KeyError as e:
        logger.error(f"  Flow5 data error: {e}")
    except Exception as e:
        logger.error(f"  Flow5 general error: {e}", exc_info=True)

# ══════════════════════════════════════════════════════════
# MAIN DAILY JOB — runs automatically every session day
# ══════════════════════════════════════════════════════════
def daily_job():
    print("\n" + "="*60)
    print(f"AUTO RUN: {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}")
    print("="*60)

    try:
        att_df, merged_df = load_data()
        date_cols         = get_date_cols(att_df)

        # Check if today is a session day
        has_session, todays_col = is_session_today(att_df)

        if not has_session:
            print("  No session today — skipping all flows")
            print("="*60)
            return

        print(f"  Session day confirmed — running all flows")
        f2 = f3 = f4 = 0

        for _, row in merged_df.iterrows():
            name = row["TRAINEE NAME"]
            print(f"\n  Student: {name}")

            # Flow 2 — only emails if absent today or below 75%
            r2 = flow2_daily_email(row, todays_col)
            if r2:
                f2 += 1

            # Flow 3 — current streak only
            r3 = flow3_streak_alert(row, att_df)
            if r3:
                f3 += 1

            # Flow 4 — last 4 weeks pattern only
            r4 = flow4_pattern(row, att_df)
            if r4:
                f4 += 1

        # Flow 5 — daily mentor report
        flow5_daily_report(merged_df, todays_col)

        print("\n" + "="*60)
        print(f"DONE: emails={f2} streaks={f3} patterns={f4}")
        print("="*60)

    except Exception as e:
        logger.error(f"ERROR in daily job: {e}", exc_info=True)

# ── API ENDPOINTS ──────────────────────────────────────────
@app.route("/status", methods=["GET"])
def status():
    return jsonify({
        "status":     "running",
        "time":       datetime.now().strftime("%H:%M:%S"),
        "next_run":   DAILY_RUN_TIME,
        "today":      datetime.now().strftime("%d-%m-%Y")
    })

@app.route("/run-now", methods=["GET", "POST"])
def run_now():
    threading.Thread(target=daily_job).start()
    return jsonify({
        "status":  "started",
        "message": "Daily job triggered manually"
    })

@app.route("/check-data", methods=["GET"])
def check_data():
    try:
        att_df, merged_df = load_data()
        date_cols         = get_date_cols(att_df)
        has_session, col  = is_session_today(att_df)
        return jsonify({
            "matched_students": len(merged_df),
            "total_date_cols":  len(date_cols),
            "session_today":    has_session,
            "todays_col":       col
        })
    except Exception as e:
        logger.error(f"check_data error: {e}")
        return jsonify({"error": str(e)}), 500

# ── SCHEDULER ─────────────────────────────────────────────
def start_scheduler():
    schedule.every().day.at(DAILY_RUN_TIME).do(daily_job)
    print(f"Scheduler started — runs daily at {DAILY_RUN_TIME}")
    while True:
        schedule.run_pending()
        time.sleep(60)

# ── START ──────────────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "="*60)
    print("T-Hub Attendance AI — Starting")
    print(f"Daily auto-run at: {DAILY_RUN_TIME}")
    print(f"URL: https://celibacy-maggot-eaten.ngrok-free.dev")
    print("="*60)

    # Start scheduler in background thread
    t = threading.Thread(target=start_scheduler, daemon=True)
    t.start()

    # Start Flask
    app.run(host="0.0.0.0", port=5000, debug=False)
