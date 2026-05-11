# 📊 AttendInsights

AttendInsights is a comprehensive, AI-powered student attendance tracking, analytics, and automated communication platform. Designed for academic institutions and mentors, it brings modern web technologies and advanced Generative AI together to seamlessly monitor student attendance, detect irregular patterns, provide personalized insights, and automate email communications.

## 🌟 Key Features

### 🖥️ Modern React Dashboard (Frontend)
- **Role-Based Access**: Dedicated portals for both **Students** and **Admins**.
- **Student Portal**: Shows daily attendance, performance metrics, and missing sessions.
- **Admin Portal**: Allows admins to search individual student records, view low attendance lists, and monitor overall batch statistics.
- **AI Attendance Assistant**: A built-in chat interface where students and admins can ask questions like *"What is my current attendance percentage?"* or *"Which students need intervention?"*
- **Data Visualization**: Rich Monthly and Weekly trend charts built using `react-chartjs-2`.
- **Premium UI**: Designed with glassmorphism, tailored HSL color palettes, and fluid animations for an exceptional user experience.

### ⚙️ Node.js Express API (Backend)
- A robust REST API (`server.js`) handling user authentication via JWT.
- Serves endpoints for fetching dashboard data, charts, holiday statistics, and powering the AI Assistant responses.
- Manages cross-origin resource sharing (CORS) and seamless connection to the React frontend.

### 🤖 AI-Powered Email Automation (`Backend.py`)
- Integrated with **Power Automate** and **Groq (Llama-3.3-70b-versatile)** to automatically generate and send hyper-personalized daily emails.
- **Flows Executed Daily**:
  - **Flow 2 (Daily Email)**: Sends personalized *Warning*, *Reminder*, or *Appreciation* emails to students based on their attendance percentage.
  - **Flow 3 (Streak Alert)**: Detects consecutive absences (e.g., exactly 3 or 5 days) and immediately alerts parents/mentors.
  - **Flow 4 (Pattern Detection)**: Analyzes the last 4 weeks to see if a student consistently misses a specific weekday (e.g., absent on 3 consecutive Mondays) and advises the mentor.
  - **Flow 5 (Daily Mentor Summary)**: Compiles a brief daily report of all absent and at-risk students, sending it directly to the mentor.

---

## 🏗️ System Architecture

The project is divided into three main decoupled modules:

1. **Frontend**: React application built with Vite. Communicates exclusively with the Node.js API.
2. **Dashboard API Backend**: A Node.js + Express server (`server.js`) that processes frontend requests, handles login sessions, and serves JSON data.
3. **Automated AI Email Engine**: A Python + Flask application (`Backend.py`) that reads raw Excel data (`attendance.xlsx`, `students.xlsx`), uses the Groq API to generate contextual email content, and sends them out via SMTP. It runs on a scheduled background thread.

---

## 🚀 Step-by-Step Setup Guide

### Prerequisites
- **Node.js** (v16+ recommended)
- **Python** (3.8+)
- **Git**
- A **Groq API Key** for AI generation.
- An **App Password** for your Gmail account to send automated emails.

### 1. Clone the Repository
```bash
git clone https://github.com/SriLakshmiSoujanya/AttendInsights.git
cd AttendInsights
```

### 2. Setup the Automated Email Engine (Python)
The `Backend.py` file manages all scheduled AI communications.

1. Install required Python packages:
   ```bash
   pip install flask pandas smtplib schedule python-dotenv groq openpyxl
   ```
2. Create a `.env` file in the root directory and add your credentials:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   FROM_EMAIL=your_email@gmail.com
   APP_PASSWORD=your_gmail_app_password
   ```
3. Ensure your data files (`attendance.xlsx` and `students.xlsx`) are placed in the root directory.
4. Run the Python background worker:
   ```bash
   python Backend.py
   ```

### 3. Setup the Dashboard API Backend (Node.js)
The `server.js` file handles the UI logic.

1. Install Node dependencies:
   ```bash
   npm install express cors jsonwebtoken axios dotenv
   ```
2. Start the Express server:
   ```bash
   node server.js
   ```
*(The API will be available on `http://localhost:5000`)*

### 4. Setup the React Frontend
The React application is located in the `frontend/` folder.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173/` or `5174`).

### 5. Accessing the Application
Use the following demo credentials to log in:
- **Admin**: `admin@institution.edu` / `admin123`
- **Student**: Any valid student email from the dataset / `student123`

---

## 📅 Scheduled Tasks Integration
The Python AI engine runs an internal scheduler (`schedule.every().day.at("09:00").do(daily_job)`). 
Additionally, this system is designed to be triggered externally by **Power Automate**. By hitting the `/run-now` endpoint exposed by `Backend.py` (e.g., via an ngrok URL), Power Automate can synchronize daily data extraction from Teams or SharePoint and immediately trigger the AI email evaluation workflows.

---

## 🛠️ Technologies Used
- **Frontend**: React 19, Vite, Chart.js, React-Router, Lucide-React, CSS Glassmorphism
- **Backend API**: Node.js, Express, Axios
- **AI Email Engine**: Python, Flask, Pandas, Schedule, Smtplib
- **LLM Provider**: Groq API (Running `llama-3.3-70b-versatile`)
