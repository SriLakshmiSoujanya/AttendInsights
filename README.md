# AttendInsights

## Description
AttendInsights is an intelligent student attendance monitoring and notification platform designed to help educational institutions proactively track attendance, automate communication, and deliver AI-powered insights to students, mentors, and administrators. The system combines modern web development using React and Node.js for the frontend and API, Python for data processing, Power Automate for workflow orchestration, and Groq API with the LLaMA model for contextual AI-generated insights and automated email communication.

## GitHub Link
[https://github.com/SriLakshmiSoujanya/AttendInsights](https://github.com/SriLakshmiSoujanya/AttendInsights)

## Functional Requirements

**Data Management:**
• Centralized attendance data storage using Microsoft Excel datasets and JSON storage.
• Student records include roll number, attendance sessions, attended sessions, percentage, and role-based access.

**Frontend Interface:**
• Web-based frontend built using React (Vite), CSS Glassmorphism, and Chart.js.
• Dedicated Student Dashboard for personalized attendance insights and visual charts.
• Dedicated Admin Dashboard for institution-wide monitoring and tracking at-risk students.
• Dynamic login module with Student/Admin role selection via JWT authentication.

**Attendance Monitoring & AI Insights:**
• Automated attendance tracking and pattern detection using Python and Pandas.
• AI-powered insights and email drafting using Groq API + LLaMA model.
• Student dashboard displays personalized AI-generated attendance insights.
• Admin dashboard displays aggregate institutional insights, low attendance alerts, and interactive AI chat for analysis.

**Automated Communication:**
• Warning emails for students falling below the 75% attendance threshold.
• Appreciation emails for high-performing students.
• Daily mentor summaries and urgent streak alerts for at-risk students.
• Context-aware AI-generated messaging sent via SMTP (Gmail).

## Non-Functional Requirements
• Microsoft Power Automate access for external workflow triggering.
• Groq API Key.
• LLaMA model integration.
• SMTP email services (Gmail configured).
• Node.js and Python deployment environments.
• Excel for raw data source.
• Internet connectivity for cloud automation.

## Problem Statement
Traditional attendance systems rely heavily on manual reporting, delayed intervention, and static dashboards. Institutions often lack personalized student insights, proactive mentor communication, and scalable AI-assisted intervention. This creates delayed academic support and limited visibility into attendance trends.

## Proposed Solution
AttendInsights delivers a web-based AI-powered attendance intelligence platform that integrates React dashboards, Node.js API services, Python-based automation, and large language model insights. Students receive personalized attendance analysis, admins monitor institutional health, and mentors receive automated AI-driven intervention alerts.

## Technologies Used
React 19, Vite, Node.js, Express, Python, Flask, Pandas, Schedule, Smtplib, Power Automate, Groq API, LLaMA Model, Microsoft Excel

## System Architecture

**Layer 1 — Frontend:**
• Login Page
• Student Module (Charts, Stats, AI Chat)
• Admin Module (Student Search, Low Attendance, AI Chat)

**Layer 2 — Backend API:**
• Node.js + Express Server processing API requests and JWT authentication.

**Layer 3 — Data Layer:**
• Excel Datasets and JSON storage processed by Pandas and Express.

**Layer 4 — Automation & AI:**
• Python background engine executing daily logic, communicating with Groq API + LLaMA for insight generation and smart email drafting. Power Automate triggers workflows via the `/run-now` endpoint.

**Layer 5 — Communication:**
• Python SMTP system dispatching automated emails to students and mentors.

## In Scope
• Student/Admin role-based login via JWT.
• Attendance analytics dashboards with Chart.js.
• AI-generated attendance insights and chat interface.
• Automated student + mentor email workflows.
• Multi-flow threshold and streak alerts.
• Web deployment.

## Out of Scope
• Biometric attendance capture.
• RFID hardware.
• Parent mobile application.
• WhatsApp/SMS integration.
• Full ERP integration (current phase).

## Future Enhancements
• Live API integration.
• Predictive AI attendance forecasting.
• Parent dashboard.
• ERP/LMS integration.
• Mobile app deployment.
• Multi-language AI communication.

## Conclusion
AttendInsights establishes a scalable, AI-enhanced academic intelligence system by combining modern web development, workflow automation, and generative AI. Through React dashboards, Node.js APIs, Power Automate orchestration, and Groq + LLaMA intelligence, the platform modernizes attendance management into a proactive, personalized, and institution-ready solution.

## Project Type
Education SaaS | Web Application | AI + Automation Platform
