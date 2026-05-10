# AttendInsights

> **Automated Student Attendance Monitoring & Notification System**
> Built on Microsoft Power Platform + Flask + Groq AI

---

## Overview

**AttendInsights** is a full-stack attendance management system for educational institutions. It combines:

- **Microsoft Power Apps** — Student & Admin dashboards (frontend)
- **Microsoft Power Automate** — Rule-based email workflow automation
- **Flask + Python backend** — Advanced AI-powered analysis engine
- **Groq API (LLaMA 3.3)** — AI-generated personalized email content
- **Excel / SharePoint** — Centralized attendance data layer

The system tracks every student's attendance day-by-day, detects risky patterns, sends intelligent alerts, and gives both students and administrators a live analytics dashboard.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                              │
│   attendance.xlsx  ←→  students.xlsx  (Excel / SharePoint)  │
└─────────────────────────────┬───────────────────────────────┘
                              │
          ┌───────────────────┼──────────────────┐
          │                   │                  │
┌─────────▼──────┐   ┌────────▼───────┐  ┌──────▼──────────┐
│  Power Apps    │   │ Power Automate │  │  Flask Backend  │
│  (Frontend)    │   │ (Basic Email   │  │  (AI Engine)    │
│                │   │  Workflows)    │  │                 │
│ • Login Page   │   │ • Threshold    │  │ • Groq AI       │
│ • Student      │   │   Alerts       │  │ • Pattern       │
│   Dashboard    │   │ • Monthly      │  │   Detection     │
│ • Admin        │   │   Reports      │  │ • Streak Alerts │
│   Dashboard    │   │                │  │ • Daily Reports │
└────────────────┘   └────────────────┘  └──────┬──────────┘
                                                 │
                                    ┌────────────▼───────────┐
                                    │    Email Delivery      │
                                    │  (Gmail SMTP / Outlook) │
                                    │                        │
                                    │ → Students             │
                                    │ → Mentor / Admin       │
                                    └────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Microsoft Power Apps|
| Email Automation | Microsoft Power Automate |
| Backend API | Python 3.x + Flask |
| AI Engine | Groq API — LLaMA 3.3 70B Versatile |
| Data Storage | Microsoft Excel / SharePoint Online |
| Email Delivery | Gmail SMTP (Flask backend) / Outlook (Power Automate) |
| Scheduling | Python `schedule` library |
| Tunneling | ngrok (local development) |

---

## Features

### Student Dashboard (Power Apps)
- Personalized attendance overview with percentage, present days, absent days
- Monthly trend bar chart (May 2025 – March 2026)
- AI Insight Engine card with smart performance analysis
- Smart alerts panel — debarment warnings, quota alerts, streak detection
- Full attendance calendar heatmap (day-by-day view)
- AI Attendance Advisor chatbot — answers student questions about their own record

### Admin Dashboard (Power Apps)
- Class-wide overview with all student metrics
- At-risk student identification (below 75%)
- AI Assistant chatbot — query any student, date, or pattern
- Analytics tab with rankings and technology-wise breakdown

### Backend Automation (Flask + Groq)

| Flow | Trigger | Action |
|------|---------|--------|
| Flow 2 | Session day — student absent or below 75% | AI-generated personalized email to student |
| Flow 3 | Student has 3 or 5 consecutive absent days | Urgent parent/mentor notification |
| Flow 4 | Same weekday absent 3+ times in last 4 weeks | Pattern advisory to mentor |
| Flow 5 | Every session day | Daily summary report to mentor |

---

## Project Structure

```
AttendInsights/
│
├── backend/
│   ├── app.py                  # Main Flask application + all flows
│   ├── attendance.xlsx         # Attendance dataset (daily records)
│   ├── students.xlsx           # Student master data
│   └── requirements.txt        # Python dependencies
│
├── powerapps/
│   ├── StudentDashboard/
│   │   ├── manifest.xml        # PCF component manifest
│   │   └── index.ts            # Student dashboard TypeScript
│   └── AdminDashboard/
│       ├── manifest.xml        # PCF component manifest
│       └── index.ts            # Admin dashboard + AI chatbot TypeScript
│
├── web/
│   └── AttendInsights.html     # Standalone web version (all-in-one)
│
└── README.md
```

---

## Setup & Installation

### Prerequisites

- Python 3.9+
- Microsoft 365 account (for Power Apps / Power Automate)
- Groq API key ([get one free at console.groq.com](https://console.groq.com))
- Gmail account with App Password enabled

### 1. Clone the Repository

```bash
git clone https://github.com/SriLakshmiSoujanya/AttendInsights.git
cd AttendInsights
```

### 2. Install Python Dependencies

```bash
pip install flask pandas openpyxl schedule groq
```

Or using requirements.txt:

```bash
pip install -r requirements.txt
```

### 3. Prepare Data Files

Place these two files in the same directory as `app.py`:

- `attendance.xlsx` — columns: `roll_no`, `sessions`, `attended`, `percentage`, then daily date columns (`DD-MM-YYYY_lightmode`)
- `students.xlsx` — columns: `ROLL NO`, `TRAINEE NAME`, `STUDENT MAIL ID`, `TRAINEE MOBILE`, and other student details

### 4. Configure Credentials

Open `app.py` and update the config section:

```python
GROQ_API_KEY  = "your_groq_api_key_here"
FROM_EMAIL    = "your_gmail@gmail.com"
APP_PASSWORD  = "your_gmail_app_password"
MENTOR_EMAIL  = "mentor@institution.ac.in"
DAILY_RUN_TIME = "09:00"   # 24hr format, when to send daily emails
```

### 5. Run the Backend

```bash
python app.py
```

The server starts on `http://0.0.0.0:5000`. To expose it publicly for testing, use ngrok:

```bash
ngrok http 5000
```

---

## Configuration

### Gmail App Password Setup

1. Go to your Google Account → Security → 2-Step Verification (enable it)
2. Go to Security → App Passwords
3. Select "Mail" and your device, generate password
4. Copy the 16-character password into `APP_PASSWORD` in `app.py`

### Attendance Excel Format

Your `attendance.xlsx` must follow this column structure:

| roll_no | sessions | attended | percentage | 05-05-2025_lightmode | 06-05-2025_lightmode | … |
|---------|----------|----------|------------|----------------------|----------------------|---|
| 23P31A0509 | 203 | 189 | 93.10 | present | present | … |

- Date columns must follow format: `DD-MM-YYYY_lightmode` or `DD-MM-YYYY_darkmode`
- Attendance values: `present` or `absent` (case-insensitive)

### Students Excel Format

| ROLL NO | TRAINEE NAME | STUDENT MAIL ID | TRAINEE MOBILE |
|---------|-------------|-----------------|----------------|
| 23P31A0509 | Student Name | student@email.com | 9876543210 |

---

## API Endpoints

Once the Flask server is running:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/status` | GET | Check server status, current time, next scheduled run |
| `/run-now` | GET/POST | Manually trigger all automation flows immediately |
| `/check-data` | GET | Verify data files, count matched students, check today's session |

### Example Responses

**GET /status**
```json
{
  "status": "running",
  "time": "09:00:00",
  "next_run": "09:00",
  "today": "10-05-2026"
}
```

**GET /check-data**
```json
{
  "matched_students": 6,
  "total_date_cols": 203,
  "session_today": true,
  "todays_col": "10-05-2026_lightmode"
}
```

---

## Automation Flows

### Flow 2 — Daily Attendance Email

Runs every session day. Sends AI-written emails to:
- Students who were **absent today**
- Students whose overall attendance is **below 75%**

Email types generated by Groq LLaMA:

| Condition | Email Type |
|-----------|-----------|
| percentage < 75% | ⚠️ WARNING — urgent debarment risk |
| 75% ≤ percentage ≤ 90% | 🔔 REMINDER — keep improving |
| percentage > 90% | 🎉 APPRECIATION — great work |

### Flow 3 — Consecutive Absence Streak Alert

Counts the **current ongoing** streak of absences (resets to 0 the moment student attends). Sends mentor alert at exactly **3 days** and **5 days** of continuous absence.

### Flow 4 — Weekly Pattern Detection

Looks at the **last 4 weeks only** (28 days). Detects if a student is absent on the **same weekday** 3 or more times — possible intentional bunking pattern. Sends advisory email to mentor.

### Flow 5 — Daily Mentor Summary

Sends a consolidated report to the mentor every session day listing:
- Who was absent today
- All students currently below 75%

---

## Power Apps Login

| Role | Username | Password |
|------|----------|----------|
| Student | Roll Number (e.g. `23P31A0509`) | Same as Roll Number |
| Admin | `admin` | `admin123` |

---
