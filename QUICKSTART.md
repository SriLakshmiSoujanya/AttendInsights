# Quick Start Guide - Attendance Tracker

## 🚀 Get Started in 3 Minutes

### Step 1: Start the Server
```bash
cd c:\PS
npm start
```

Expected output:
```
==================================================
✓ Attendance Tracker Server Running!
==================================================
📍 Open in browser: http://localhost:5000
📍 API ready at: http://localhost:5000/api
==================================================
```

### Step 2: Open in Browser
Navigate to: **http://localhost:5000**

### Step 3: Login with Demo Credentials

#### Option A: Admin Dashboard
```
Email: admin@institution.edu
Password: admin123
```

#### Option B: Student Dashboard
```
Email: 23A91A04N3@aec.edu.in  (Example student)
Password: student123
```

---

## 👨‍💼 Admin Dashboard Walkthrough

### View 1: Overview Statistics
- **Total Students**: 136
- **Low Attendance (<75%)**: 8 students
- **High Attendance (≥90%)**: 50 students
- **Average Attendance**: 87.46%

### View 2: Students Requiring Intervention
Table showing:
- Roll No
- Student Name
- Technology
- Attendance %
- Status (Critical)
- Email

*These students will receive automated emails from Power Automate*

### View 3: All Students Attendance
Complete list of all 136 students with:
- Attendance percentage
- Sessions attended/total
- Status badges

---

## 👨‍🎓 Student Dashboard Walkthrough

### View 1: Personal Statistics
Shows 4 key metrics:
- Total Sessions
- Sessions Attended
- Attendance Percentage
- Missing Sessions

### View 2: Attendance Progress Bar
- Visual representation of attendance %
- Color-coded (Red = Low, Yellow = Medium, Green = High)
- Target: 75% minimum, 90% ideal

### View 3: Last 30 Days Calendar
- Interactive calendar grid
- **Green boxes**: Present
- **Red boxes**: Absent
- Shows actual dates and day names
- Hover for more details

### View 4: AI-Powered Insights
Personalized analysis including:
- **Critical Alerts** (if attendance < 75%)
- **Pattern Analysis** (holiday/weekend patterns)
- **Personalized Recommendations** (action items)

Example:
```
🚨 Low Attendance Alert
Your current attendance is 50%. You need to attend 
more classes to maintain minimum 75% attendance.

💡 Recommendation: Try to attend at least 5 sessions per week
```

---

## 📧 Power Automate Integration

### How It Works:
1. Admin identifies low attendance students
2. Power Automate flow is triggered
3. Automated email sent to student with:
   - Current attendance percentage
   - Classes needed to reach 75%
   - Dates of recent absences
   - Support resources

### Email Recipients:
- Students with attendance < 75%
- Students with recent weekend absences
- Students absent before/after holidays

---

## 🔑 Feature Comparison

### Admin Can:
✓ View all students' attendance  
✓ Filter low attendance students  
✓ Access AI insights for any student  
✓ Initiate Power Automate emails  
✓ Monitor attendance trends  

### Student Can:
✓ View personal attendance details  
✓ See daily attendance history  
✓ Receive AI-powered insights  
✓ Track progress toward 75% target  
✓ Receive automated emails  

---

## 🎨 Visual Indicators

### Attendance Status Badges
- **Green "Good"**: ≥ 85% attendance
- **Yellow "Medium"**: 75-85% attendance
- **Red "Low"**: < 75% attendance (Needs intervention)

### Calendar Colors
- **Green cells**: Present in class
- **Red cells**: Absent from class

### Progress Bar Colors
- **Red gradient**: < 75% (Critical)
- **Yellow gradient**: 75-85% (Medium)
- **Green gradient**: ≥ 85% (Excellent)

---

## 📊 Data Visualization

### Statistics Cards
Beautiful gradient cards showing:
- Total Students (Purple)
- Low Attendance (Orange)
- High Attendance (Green)
- Average Attendance (Purple)

### Tables
- Sortable data
- Color-coded status badges
- Email links for quick communication
- Responsive design

### Calendar Grid
- Interactive 30-day calendar
- One cell per day
- Show date and day name
- Hover for tooltips

---

## 🔐 Security Features

1. **JWT Authentication**
   - Secure token-based login
   - 7-day token expiration
   - Automatic logout after expiration

2. **Password Protection**
   - Encrypted storage
   - Never displayed in plaintext
   - Bcrypt hashing with salt

3. **Role-Based Access**
   - Students only see their own data
   - Admins see all students
   - API validates permissions

---

## 🆘 Common Tasks

### Change Attendance Threshold
Edit in `server.js`, function `generateAIInsights()`:
```javascript
if (attendance < 75) { // Change 75 to your threshold
  // Critical alert
}
```

### Add More Students
1. Edit `attendance_data.json`
2. Add new student record
3. Restart server

### Reset User Data
Delete `users_data.json` and restart - it will be regenerated

### Change Admin Password
Edit `server.js` and rebuild with new bcrypt hash

---

## 📈 Key Metrics at a Glance

```
Total Students:              136
Average Attendance:         87.46%
Students Below 75%:            8
Students Above 90%:           50
Data Coverage:     May 2025 - March 2026
Total Sessions Tracked:      203
```

---

## 💡 Tips & Tricks

1. **Bookmark the login page** for quick access
2. **Share admin link** with institution staff
3. **Print student dashboard** for records
4. **Use Power Automate** to schedule automatic emails
5. **Check insights regularly** for new patterns

---

## ⚡ Performance Tips

- Dashboard loads in ~2 seconds
- AI insights generate instantly
- Support 136+ students smoothly
- Responsive on all devices
- Optimized JSON data loading

---

## 📱 Mobile Access

The website is fully responsive and works on:
- Desktop browsers
- Tablets
- Smartphones
- All modern browsers (Chrome, Firefox, Safari, Edge)

---

## 🔄 Process Flow

```
Student Attendance Data (Excel)
         ↓
    Python Export
         ↓
   JSON Format
         ↓
   Express Backend
         ↓
   Web Frontend
         ↓
   User Dashboard
         ↓
   Power Automate Email
```

---

## 🎯 Success Indicators

✓ Admin dashboard shows all 136 students  
✓ Low attendance students clearly marked  
✓ AI insights are personalized  
✓ Daily attendance calendar is interactive  
✓ Statistics update in real-time  
✓ Emails send via Power Automate  

---

## 📞 Troubleshooting

**Issue**: Can't access http://localhost:5000
- **Solution**: Ensure `npm start` is running in terminal

**Issue**: "Loading..." on dashboard
- **Solution**: Wait 2-3 seconds, refresh page

**Issue**: Wrong password message
- **Solution**: Check demo credentials at top of guide

**Issue**: Can't see student email
- **Solution**: Scroll right in table on mobile devices

---

## Next Steps

1. ✓ Server is running
2. ✓ Website is accessible
3. ✓ Login with demo credentials
4. ✓ Explore admin/student dashboards
5. ✓ Test Power Automate emails
6. ✓ Customize for your institution

---

**Ready to use?** → Open http://localhost:5000 now!
