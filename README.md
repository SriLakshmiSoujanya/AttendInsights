# AttendInsights

**AttendInsights — AI-Powered Student Attendance Monitoring System**
**Project Overview**

AttendInsights is an intelligent attendance monitoring platform built using Power Apps, Power Automate, Excel/API Data Sources, and PCF (PowerApps Component Framework) to automate student attendance analysis, personalized dashboards, admin monitoring, and attendance-based alert systems.

**This project is designed to:**

Track student attendance dynamically
Provide personalized student dashboards
Enable admin-level attendance analytics
Automate alerts for low attendance
Integrate AI insights for attendance performance
Scale from Excel prototype to live API deployment

**Core Features**
Student Module
Login Authentication
Student login using Roll Number
Default password authentication (Thub@123)
Dynamic student validation using dataset lookup
Personalized dashboard access
Student Dashboard
Attendance Percentage
Present Days
Absent Days
Sessions Count
Attendance Status
AI-generated insights
Alerts & notifications
Admin Module
Admin Dashboard
Total Students
Average Attendance
At-Risk Students (<75%)
Excellent Students (≥90%)
Sessions Count
Alerts Sent
Full attendance overview
Search and filtering capabilities
Automation (Power Automate)
Attendance Alerts
Below 75% → Warning Alert
3 Continuous Absences → Parent Alert
5 Continuous Absences → Escalated Alert
Good Attendance → Appreciation Messages
Tech Stack
Frontend
Power Apps Canvas Apps
PCF Code Components (TypeScript)
HTML/CSS UI Design
Backend / Logic
Power Automate
Excel Table (AttendanceData)
Future API Integration
Development Tools
Visual Studio Code
Power Platform CLI (pac)
Node.js / npm
Dataset Structure
Current Excel Table Name:

AttendanceData

Required Columns:
roll_no
sessions
attended
percentage
Login Logic
Student:
Roll Number + Password
Admin:
Faculty ID + Password
Power Apps Variables
Key Variable:
LoggedInStudent

Stores currently authenticated student data dynamically.

**PCF Deployment Commands**

**Build:**
npm run build
Push to Power Apps:
pac pcf push --publisher-prefix th

**Future Enhancements**
Live API integration
Role-based authentication
AI chatbot for attendance prediction
Parent dashboard
Faculty attendance entry
Power BI advanced analytics
Mobile responsiveness
Multi-role enterprise integration


**Project Architecture**
**Phase 1:**

Excel + Power Apps Prototype

**Phase 2:**

Power Automate + Alerts

**Phase 3:**

API + Live Dashboard

**Phase 4:**

AI + Predictive Analytics

**Repository Structure**
AttendInsights/
│
├── AttendLogin/
│   ├── ControlManifest.Input.xml
│   └── index.ts
│
├── StudentDashboard/
│   ├── ControlManifest.Input.xml
│   └── index.ts
│
├── AdminDashboard/
│   ├── ControlManifest.Input.xml
│   └── index.ts
│
├── ExcelData/
│   └── AttendanceData.xlsx
│
└── README.md


**Key Objectives**
Improve attendance transparency
Reduce manual monitoring
Automate intervention
Deliver student-specific insights
Enable institution-wide analytics
