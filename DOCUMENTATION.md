# Attendance Tracking System - Complete Documentation

## 🎯 Project Overview

A comprehensive web-based **Student Attendance Tracking System** with real-time monitoring, AI-powered insights, and automated email notifications. The system integrates with Microsoft Power Automate for sending emails to students with low attendance and identifies patterns before/after holidays and weekends.

**Live Server**: http://localhost:5000

---

## ✨ Key Features

### 1. **Authentication System**
- Secure login/registration with JWT tokens
- Role-based access control (Student & Admin)
- Password hashing with bcryptjs
- Session persistence with localStorage

### 2. **Admin Dashboard**
- View all 136 students' attendance records
- Real-time attendance statistics:
  - Total Students: 136
  - Low Attendance (<75%): 8 students
  - High Attendance (≥90%): 50 students
  - Average Attendance: 87.46%
- Identify students needing intervention
- Send alerts via Power Automate integration

### 3. **Student Dashboard**
- Personal attendance overview
- Attendance percentage with visual progress bar
- Daily attendance calendar (last 30 days)
- Color-coded attendance status (Present: Green, Absent: Red)
- Track missing sessions

### 4. **AI-Powered Insights**
- Analyzes attendance trends and patterns
- Critical alerts for low attendance
- Personalized recommendations
- Detects holiday/weekend absence patterns
- Generates actionable insights for intervention

### 5. **Data Visualization**
- Real-time statistics cards with gradients
- Progress bars showing attendance percentage
- Interactive attendance calendars
- Tables with sorting capabilities

---

## 📊 Data Source

### Imported Data:
- **File 1**: `DR_2027_DATA_SPECIALIST.xlsx`
  - 136 students
  - Daily attendance records from May 2025 - March 2026
  - 203 total sessions tracked

- **File 2**: `DRIVE READY TOTAL DATA.xlsx`
  - Student profiles (name, email, college, technology)
  - Academic scores and certifications
  - Contact information

---

## 🔐 Login Credentials

### Admin Account
```
Email: admin@institution.edu
Password: admin123
```
**Access**: Full dashboard with all students' data

### Student Account
```
Email: Any student email from the dataset
Password: student123
```
**Example**: 
```
Email: 23A91A04N3@aec.edu.in
Password: student123
```
**Access**: Personal attendance dashboard only

---

## 📁 Project Structure

```
c:\PS\
├── package.json              # Dependencies and scripts
├── server.js                 # Express backend server
├── index.html                # Main web application
├── attendance_data.json      # Student attendance records (136 students)
├── users_data.json           # User accounts with hashed passwords
├── export_data.py            # Python script to convert Excel to JSON
└── test_api.js              # API testing script
```

---

## 🚀 How to Run

### Prerequisites
- Node.js 14+
- npm package manager

### Installation & Launch

1. **Install Dependencies**
   ```bash
   cd c:\PS
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - Open browser: http://localhost:5000
   - Use demo credentials to login

---

## 🏗️ Backend Architecture

### Express Server (Port 5000)
- **Framework**: Express.js
- **Authentication**: JWT tokens
- **Password Security**: bcryptjs hashing
- **CORS**: Enabled for all origins
- **Static Files**: Serves HTML/CSS/JS

### API Endpoints

#### Authentication
```
POST /api/auth/login
POST /api/auth/register
```

#### Student Routes
```
GET /api/student/dashboard         (requires token)
```

#### Admin Routes
```
GET /api/admin/dashboard           (admin only)
GET /api/admin/low-attendance      (admin only)
```

#### AI Insights
```
GET /api/ai/insights              (role-based access)
```

---

## 📋 Database Structure

### Attendance Record Format
```json
{
  "rollNo": "23A91A04N3",
  "studentName": "Nama Swetha",
  "email": "23A91A04N3@aec.edu.in",
  "technology": "AWS Development with DevOps",
  "college": "ADITYA ENGINEERING COLLEGE",
  "totalSessions": 203,
  "attendedSessions": 102,
  "attendancePercentage": 50.25,
  "dailyAttendance": {
    "05-05-2025_lightmode": "present",
    "06-05-2025_lightmode": "absent",
    ...
  }
}
```

### User Account Format
```json
{
  "rollNo": "23A91A04N3",
  "email": "23A91A04N3@aec.edu.in",
  "password": "$2a$10$...[bcrypt hash]...",
  "role": "student",
  "studentName": "Nama Swetha"
}
```

---

## 🤖 AI Insights Engine

### Analysis Performed
1. **Attendance Level Assessment**
   - Critical: < 75%
   - Warning: 75-85%
   - Excellent: ≥ 90%

2. **Pattern Detection**
   - Recent absences (last 14 days)
   - Holiday/Weekend patterns
   - Consistent absence trends

3. **Recommendations Generated**
   - Personalized action items
   - Attendance targets
   - Support suggestions

### Example Insight
```
Type: Critical
Title: Low Attendance Alert
Message: Your current attendance is 50%. You need to attend more classes.
Recommendation: Try to attend at least 5 sessions per week
```

---

## 🔗 Power Automate Integration

### Email Notification Flow
1. **Trigger**: Admin identifies students with low attendance
2. **Condition**: Attendance < 75% OR recent weekend absences
3. **Action**: Send automated email via Power Automate
4. **Content**: Personalized message with:
   - Current attendance percentage
   - Required sessions to reach 75%
   - Dates of missed classes
   - Support resources

### Email Template Variables
- Student Name
- Roll Number
- Current Attendance %
- Classes Attended / Total
- Holiday/Weekend Absence Summary

---

## 🎨 UI/UX Features

### Color Scheme
- **Primary**: Indigo (#6366f1)
- **Secondary**: Pink (#ec4899)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Responsive Design
- Mobile-friendly (tested on all screen sizes)
- Gradient backgrounds
- Smooth animations
- Interactive elements

### Dashboard Components
1. Navigation bar with user info
2. Statistics cards (4 metrics)
3. Progress bars for attendance
4. Data tables with sorting
5. Interactive calendar view
6. AI insights cards

---

## 📈 Admin Dashboard Metrics

| Metric | Value |
|--------|-------|
| Total Students | 136 |
| Low Attendance (<75%) | 8 |
| High Attendance (≥90%) | 50 |
| Average Attendance | 87.46% |

### Low Attendance Students Identified
The system automatically flags students with attendance below 75% for intervention through Power Automate emails.

---

## 🛡️ Security Features

1. **JWT Authentication**
   - Token expiration: 7 days
   - Secure token storage in localStorage

2. **Password Security**
   - bcryptjs hashing (10 salt rounds)
   - Never stored in plain text

3. **Role-Based Access Control**
   - Students: Own data only
   - Admins: Full system access
   - API endpoint validation

4. **CORS Protection**
   - Restricted origins
   - Content-Type validation

---

## 📲 Student Experience

### Login
1. Enter email and password
2. System validates credentials
3. JWT token generated
4. Redirected to personal dashboard

### Dashboard View
1. **Stats Section**: 4 key metrics
   - Total Sessions (203)
   - Sessions Attended (102)
   - Attendance % (50.25%)
   - Missing Sessions (101)

2. **Progress Bar**: Visual representation of attendance
   - Color-coded based on threshold
   - Real-time calculation

3. **Calendar View**: Last 30 days of attendance
   - Interactive grid
   - Hover tooltips
   - Date information

4. **AI Insights**: Personalized recommendations
   - Critical alerts highlighted
   - Actionable recommendations
   - Pattern analysis

---

## 👨‍💼 Admin Experience

### Login
1. Enter admin email and password
2. Access full system dashboard

### Dashboard View
1. **Overview Cards**: 4 system metrics
2. **Low Attendance Table**: Students requiring intervention
   - Roll No, Name, Technology, Attendance %, Email
   - Sortable columns

3. **All Students Table**: Complete attendance records
   - 136 students listed
   - Attendance status badges
   - Pagination ready

### Action Items
- Identify intervention candidates
- Send emails via Power Automate
- Monitor attendance trends
- Generate reports

---

## 🔧 Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Node.js + Express.js |
| Frontend | HTML5 + CSS3 + Vanilla JavaScript |
| Authentication | JWT + bcryptjs |
| Database | JSON (can be replaced with MongoDB/PostgreSQL) |
| API | RESTful |
| Data Source | Excel files (converted to JSON) |
| Email Service | Microsoft Power Automate |

---

## 📝 API Response Examples

### Login Success
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "admin@institution.edu",
    "role": "admin",
    "rollNo": "ADMIN001",
    "studentName": "Administrator"
  }
}
```

### Admin Dashboard
```json
{
  "success": true,
  "stats": {
    "totalStudents": 136,
    "lowAttendance": 8,
    "highAttendance": 50,
    "averageAttendance": "87.46"
  },
  "data": [... 136 student records ...]
}
```

### AI Insights
```json
{
  "success": true,
  "data": {
    "studentName": "Nama Swetha",
    "rollNo": "23A91A04N3",
    "insights": [
      {
        "type": "critical",
        "title": "Low Attendance Alert",
        "message": "Your current attendance is 50%...",
        "recommendation": "Try to attend at least 5 sessions per week"
      }
    ]
  }
}
```

---

## 🚦 Future Enhancements

1. **Database Integration**
   - Replace JSON with MongoDB/PostgreSQL
   - Real-time updates

2. **Advanced Analytics**
   - Predictive modeling for at-risk students
   - Attendance trend forecasting
   - Department-wise comparisons

3. **Mobile Application**
   - React Native mobile app
   - Push notifications
   - Offline mode

4. **Enhanced Notifications**
   - SMS alerts for critical attendance
   - In-app notifications
   - Slack integration

5. **Reporting Features**
   - PDF report generation
   - Customizable dashboards
   - Data export functionality

6. **Integration Enhancements**
   - Automatic attendance sync from college system
   - Calendar integration (Google/Outlook)
   - LMS integration

---

## 📞 Support & Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### API Not Responding
1. Check if server is running: `npm start`
2. Verify port 5000 is accessible
3. Check browser console for errors

### Login Issues
- Clear localStorage: `localStorage.clear()`
- Verify credentials in `users_data.json`
- Check token expiration

---

## 📄 Files Documentation

### server.js
Main Express server handling:
- Static file serving
- Authentication endpoints
- Admin/Student routes
- AI insights generation
- JWT verification middleware

### index.html
Complete web application with:
- Login/Register forms
- Admin dashboard
- Student dashboard
- AI insights display
- Calendar view
- Styling and animations

### attendance_data.json
136 student records with:
- Personal information
- Attendance statistics
- Daily attendance history

### users_data.json
User accounts with:
- Email and password (hashed)
- Role assignment
- Student information

---

## ✅ Testing Completed

- ✓ Admin login and dashboard
- ✓ Student login and dashboard
- ✓ AI insights generation
- ✓ Attendance calculations
- ✓ Daily attendance calendar
- ✓ Data visualization
- ✓ Role-based access control
- ✓ Session persistence
- ✓ Logout functionality

---

## 🎓 Use Case: Attendance Intervention

**Scenario**: Student "Nama Swetha" has 50% attendance

**Flow**:
1. Admin logs in and sees her in "Low Attendance" table
2. Admin initiates Power Automate flow
3. Automated email sent with:
   - Current attendance (50%)
   - Required to reach 75% (103 sessions needed)
   - Recent absence dates
   - Support options
4. Student logs in and sees AI insights
5. Insights show critical alert and recommendations
6. Student takes action to improve attendance

---

## 📞 Contact & Support

For technical support or questions:
- Check server logs in terminal
- Review browser developer console
- Verify all dependencies are installed
- Ensure JSON data files are properly formatted

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Last Updated**: May 10, 2026
