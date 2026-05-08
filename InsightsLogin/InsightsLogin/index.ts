import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class StudentDashboard
    implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
    private container: HTMLDivElement;

    constructor() {}

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.container = container;
        this.renderDashboard(context);
    }

    private renderDashboard(context: ComponentFramework.Context<IInputs>): void {
        this.container.innerHTML = "";

        // ======================================================
        // FETCH DATA — mapped to your actual Excel columns
        // roll_no → RollNumber
        // sessions → Sessions
        // attended → Attended
        // percentage → Percentage
        // ======================================================
        const rollNumber  = context.parameters.RollNumber.raw  ?? "N/A";
        const studentName = context.parameters.StudentName.raw ?? rollNumber;
        const sessions    = Number(context.parameters.Sessions.raw)  || 0;
        const attended    = Number(context.parameters.Attended.raw)  || 0;
        const absentDays  = sessions - attended;

        // Safe percentage parsing
        const rawPct    = String(context.parameters.Percentage.raw ?? "0").replace("%", "");
        const percentage = isNaN(Number(rawPct)) ? 0 : Math.round(Number(rawPct) * 100) / 100;

        // ======================================================
        // AUTO-GENERATE ALERT from percentage
        // (since your Excel has no AlertMessage column)
        // ======================================================
        const externalAlert = context.parameters.AlertMessage.raw ?? "";

        let autoAlert = "";
        if (percentage < 75) {
            autoAlert = "⚠️ Critical: Attendance below 75%. You are at academic risk. Attend all upcoming sessions immediately.";
        } else if (percentage <= 85) {
            autoAlert = "🔔 Warning: Attendance below 85%. Consistency is key — avoid further absences.";
        } else if (percentage <= 95) {
            autoAlert = "✅ Reminder: Keep maintaining consistency. You're on a good track!";
        } else {
            autoAlert = "🌟 Excellent! Outstanding attendance. Keep up the great discipline!";
        }

        const alertToShow = externalAlert.trim().length > 0 ? externalAlert : autoAlert;

        // ======================================================
        // STATUS ENGINE
        // ======================================================
        let statusLabel   = "Excellent";
        let statusColor   = "#008F39";
        let pctColor      = "#008F39";
        let metricNote    = "Outstanding! Keep it up!";

        if (percentage < 75) {
            statusLabel = "Critical";
            statusColor = "#DC3545";
            pctColor    = "#DC3545";
            metricNote  = "Immediate improvement required!";
        } else if (percentage <= 80) {
            statusLabel = "Average";
            statusColor = "#F4A100";
            pctColor    = "#F4A100";
            metricNote  = "Needs improvement.";
        } else if (percentage <= 90) {
            statusLabel = "Good";
            statusColor = "#F4A100";
            pctColor    = "#008F39";
            metricNote  = "Keep it up!";
        } else if (percentage <= 95) {
            statusLabel = "Very Good";
            statusColor = "#008F39";
            pctColor    = "#008F39";
            metricNote  = "Keep it up!";
        }

        // ======================================================
        // PAGE ROOT
        // ======================================================
        const page = document.createElement("div");
        page.style.cssText = `
            display:flex; min-height:100vh;
            font-family:'Segoe UI',Poppins,sans-serif;
            background:#F5F7FA; margin:0; padding:0;
        `;

        // ======================================================
        // SIDEBAR
        // ======================================================
        const sidebar = document.createElement("div");
        sidebar.style.cssText = `
            width:220px; min-width:220px;
            background:#006B2B;
            display:flex; flex-direction:column;
        `;

        const sidebarLogo = document.createElement("div");
        sidebarLogo.style.cssText = `
            color:#FFFFFF; font-size:19px; font-weight:800;
            padding:28px 20px 32px 20px; letter-spacing:0.5px;
        `;
        sidebarLogo.innerText = "TECHNICAL HUB";

        const navItems = [
            { label: "Dashboard", active: true  },
            { label: "My Profile", active: false },
            { label: "Attendance", active: false },
            { label: "Subjects",   active: false },
            { label: "Messages",   active: false },
            { label: "Notices",    active: false },
            { label: "Settings",   active: false },
            { label: "Logout",     active: false },
        ];

        const navList = document.createElement("div");
        navList.style.cssText = `
            display:flex; flex-direction:column;
            gap:4px; padding:0 12px; flex:1;
        `;

        navItems.forEach(item => {
            const nav = document.createElement("div");
            nav.style.cssText = `
                padding:12px 16px; border-radius:8px;
                color:#FFFFFF; font-size:15px;
                font-weight:${item.active ? "600" : "400"};
                background:${item.active ? "#008F39" : "transparent"};
                cursor:pointer;
            `;
            nav.innerText = item.label;
            navList.appendChild(nav);
        });

        sidebar.appendChild(sidebarLogo);
        sidebar.appendChild(navList);

        // ======================================================
        // MAIN CONTENT
        // ======================================================
        const main = document.createElement("div");
        main.style.cssText = `
            flex:1; padding:36px; display:flex;
            flex-direction:column; gap:24px; overflow-y:auto;
        `;

        // ── TOP ROW: Welcome + Profile Card ──────────────────
        const topRow = document.createElement("div");
        topRow.style.cssText = `
            display:flex; justify-content:space-between;
            align-items:flex-start; gap:24px;
        `;

        const welcomeBlock = document.createElement("div");
        welcomeBlock.innerHTML = `
            <div style="font-size:17px;color:#333;font-weight:500;margin-bottom:6px;">
                Welcome back,
            </div>
            <div style="font-size:36px;font-weight:700;color:#006B2B;line-height:1.1;margin-bottom:10px;">
                ${studentName}
            </div>
            <div style="font-size:14px;color:#777;">
                Here's your attendance overview and insights.
            </div>
        `;

        // Profile card — only shows roll_no since dataset has no other identity fields
        const profileCard = document.createElement("div");
        profileCard.style.cssText = `
            background:#FFFFFF; border-radius:16px;
            padding:20px 26px; box-shadow:0 2px 12px rgba(0,0,0,0.07);
            min-width:220px; font-size:14px; line-height:2.2;
            flex-shrink:0;
        `;
        profileCard.innerHTML = `
            <p style="margin:0;"><strong>Roll Number:</strong> ${rollNumber}</p>
            <p style="margin:0;"><strong>Total Sessions:</strong> ${sessions}</p>
            <p style="margin:0;"><strong>Present:</strong> ${attended}</p>
            <p style="margin:0;"><strong>Absent:</strong> ${absentDays}</p>
        `;

        topRow.appendChild(welcomeBlock);
        topRow.appendChild(profileCard);

        // ── METRIC CARDS ─────────────────────────────────────
        const metricsRow = document.createElement("div");
        metricsRow.style.cssText = `
            display:grid; grid-template-columns:repeat(4,1fr); gap:20px;
        `;

        const mkCard = (title: string, value: string, color: string, note: string) => {
            const c = document.createElement("div");
            c.style.cssText = `
                background:#FFFFFF; border-radius:16px;
                padding:24px 20px; box-shadow:0 2px 12px rgba(0,0,0,0.07);
                text-align:center; display:flex; flex-direction:column;
                align-items:center; gap:8px;
            `;
            c.innerHTML = `
                <div style="font-size:15px;font-weight:600;color:#333;">${title}</div>
                <div style="font-size:36px;font-weight:700;color:${color};">${value}</div>
                <div style="font-size:12px;color:#999;">${note}</div>
            `;
            return c;
        };

        metricsRow.appendChild(mkCard(
            "Attendance %",
            percentage.toFixed(1) + "%",
            pctColor,
            metricNote
        ));
        metricsRow.appendChild(mkCard(
            "Present Days",
            attended.toString(),
            "#008F39",
            "Academic sessions attended"
        ));
        metricsRow.appendChild(mkCard(
            "Absent Days",
            absentDays.toString(),
            "#DC3545",
            "Missed sessions"
        ));
        metricsRow.appendChild(mkCard(
            "Attendance Status",
            statusLabel,
            statusColor,
            "Performance level"
        ));

        // ── BOTTOM ROW: Overview + Alerts ────────────────────
        const bottomRow = document.createElement("div");
        bottomRow.style.cssText = `
            display:grid; grid-template-columns:1fr 340px; gap:20px;
        `;

        // Attendance Overview placeholder
        const overviewCard = document.createElement("div");
        overviewCard.style.cssText = `
            background:#FFFFFF; border-radius:16px;
            padding:28px; box-shadow:0 2px 12px rgba(0,0,0,0.07);
            display:flex; flex-direction:column; min-height:200px;
        `;
        overviewCard.innerHTML = `
            <div style="font-size:17px;font-weight:700;color:#222;margin-bottom:16px;">
                Attendance Overview
            </div>
            <div style="flex:1;display:flex;align-items:center;justify-content:center;">
                <div style="text-align:center;color:#BBBBBB;font-size:14px;">
                    Graph / Power BI / Trend Analytics Integration
                </div>
            </div>
        `;

        // Alerts card
        const alertsCard = document.createElement("div");
        alertsCard.style.cssText = `
            background:#FFFFFF; border-radius:16px;
            padding:28px; box-shadow:0 2px 12px rgba(0,0,0,0.07);
            display:flex; flex-direction:column; gap:16px;
        `;

        // Support pipe-separated multiple alerts
        const alertLines = alertToShow
            .split("|")
            .map(m => m.trim())
            .filter(m => m.length > 0);

        const alertBorderColor = percentage < 75 ? "#DC3545" :
                                 percentage <= 85 ? "#F4A100" : "#008F39";
        const alertBgColor     = percentage < 75 ? "#FFF5F5" :
                                 percentage <= 85 ? "#FFFBF0" : "#F0FFF4";

        const alertsHTML = alertLines.map(msg => `
            <div style="
                background:${alertBgColor};
                border-left:4px solid ${alertBorderColor};
                padding:12px 14px; border-radius:6px;
                font-size:13px; color:#444; line-height:1.5;
            ">
                ${msg}
            </div>
        `).join("");

        alertsCard.innerHTML = `
            <div style="font-size:17px;font-weight:700;color:#222;">
                Alerts &amp; Messages
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;">
                ${alertsHTML}
            </div>
            <button style="
                background:#008F39; color:#FFFFFF; border:none;
                padding:14px; border-radius:10px; font-size:14px;
                font-weight:600; cursor:pointer; margin-top:auto; width:100%;
            ">
                View Full Attendance Details
            </button>
        `;

        bottomRow.appendChild(overviewCard);
        bottomRow.appendChild(alertsCard);

        // Footer
        const footer = document.createElement("div");
        footer.style.cssText = `
            text-align:center; font-size:12px;
            color:#AAAAAA; padding-top:8px;
        `;
        footer.innerText = "© 2026 Technical Hub. All rights reserved.";

        // ── ASSEMBLE ─────────────────────────────────────────
        main.appendChild(topRow);
        main.appendChild(metricsRow);
        main.appendChild(bottomRow);
        main.appendChild(footer);

        page.appendChild(sidebar);
        page.appendChild(main);
        this.container.appendChild(page);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.renderDashboard(context);
    }

    public getOutputs(): IOutputs { return {}; }
    public destroy(): void {}
}