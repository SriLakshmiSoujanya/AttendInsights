const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, '.')));

// Load data
let attendanceData = JSON.parse(fs.readFileSync(path.join(__dirname, 'attendance_data.json'), 'utf8'));
let usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users_data.json'), 'utf8'));

// Seed default passwords with bcrypt
const seedPasswords = async () => {
  for (let user of usersData) {
    if (!user.password.startsWith('$2')) {
      if (user.role === 'admin') {
        user.password = await bcryptjs.hash('admin123', 10);
      } else {
        user.password = await bcryptjs.hash('student123', 10);
      }
    }
  }
};

seedPasswords();

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key_change_in_production';

// ==================== HELPER FUNCTIONS ====================

function generateAIInsights(student) {
  const insights = [];
  const attendance = student.attendancePercentage;

  // Analyze attendance trends
  if (attendance < 75) {
    insights.push({
      type: 'critical',
      title: 'Low Attendance Alert',
      message: `Your current attendance is ${attendance}%. You need to attend more classes to maintain minimum 75% attendance.`,
      recommendation: 'Try to attend at least 5 sessions per week'
    });
  } else if (attendance < 85) {
    insights.push({
      type: 'warning',
      title: 'Attendance Below Target',
      message: `Your attendance is ${attendance}%. Aim for higher attendance to build good academic record.`,
      recommendation: 'Attend all upcoming classes for the next 2 weeks'
    });
  } else if (attendance >= 90) {
    insights.push({
      type: 'success',
      title: 'Excellent Attendance',
      message: `Your attendance is ${attendance}%. Great job maintaining consistent presence!`,
      recommendation: 'Keep up the good work!'
    });
  }

  // Analyze daily patterns
  const dailyAttendance = student.dailyAttendance;
  const recentDays = Object.entries(dailyAttendance).slice(-14);
  const recentAbsences = recentDays.filter(([date, status]) => status === 'absent').length;

  if (recentAbsences > 3) {
    insights.push({
      type: 'warning',
      title: 'Recent Absences Detected',
      message: `You have been absent ${recentAbsences} times in the last 2 weeks.`,
      recommendation: 'Make sure to attend all upcoming classes'
    });
  }

  // Check for weekend/holiday patterns
  insights.push({
    type: 'info',
    title: 'Attendance Pattern Analysis',
    message: `Your attendance pattern shows ${attendance >= 85 ? 'consistent' : 'irregular'} presence.`,
    recommendation: 'Email notifications will be sent to admin for intervention if needed'
  });

  return insights;
}

// ==================== AI CHAT RESPONSE ====================

function generateAIResponse(question, student) {
  const q = question.toLowerCase();
  const attendance = student.attendancePercentage;
  const totalSessions = student.totalSessions;
  const attendedSessions = student.attendedSessions;
  const missedSessions = totalSessions - attendedSessions;

  // Attendance percentage questions
  if (q.includes('percentage') || q.includes('percent') || q.includes('current') || q.includes('how much')) {
    return `📊 Your current attendance is **${attendance.toFixed(2)}%**. You've attended **${attendedSessions} out of ${totalSessions}** sessions total.`;
  }

  // Total sessions questions
  if (q.includes('total') && q.includes('session')) {
    return `📚 There have been **${totalSessions} total sessions** so far. You've attended **${attendedSessions} sessions** and missed **${missedSessions}** sessions.`;
  }

  // Missed/absent sessions questions
  if (q.includes('missed') || q.includes('absent') || q.includes('missing')) {
    return `❌ You've **missed ${missedSessions} sessions** out of ${totalSessions} total. That's **${missedSessions / totalSessions * 100}%** of all sessions. Your current attendance is ${attendance.toFixed(2)}%.`;
  }

  // Performance/status questions
  if (q.includes('performance') || q.includes('status') || q.includes('doing') || q.includes('how am i') || q.includes('performing')) {
    let status = 'Good';
    let emoji = '👍';
    if (attendance < 75) {
      status = 'Critical - Below minimum requirement';
      emoji = '🚨';
    } else if (attendance < 85) {
      status = 'Warning - Below target';
      emoji = '⚠️';
    } else if (attendance >= 90) {
      status = 'Excellent';
      emoji = '🌟';
    }
    return `${emoji} Your attendance status is: **${status}**. Current attendance: **${attendance.toFixed(2)}%** (${attendedSessions}/${totalSessions} sessions).`;
  }

  // Holiday/weekend questions
  if (q.includes('holiday') || q.includes('weekend') || q.includes('vacation') || q.includes('absent on')) {
    const holidayData = analyzeHolidayAttendance(student);
    return `🏖️ You've **missed ${holidayData.holidaysMissed} out of ${holidayData.totalHolidays}** holidays/weekends. That's a **${holidayData.holidayMissRate.toFixed(1)}% miss rate**. Recent 30 days: **${holidayData.recentHolidays.missed}/${holidayData.recentHolidays.holidays}** missed.`;
  }

  // Recent performance questions
  if (q.includes('recent') || q.includes('last') || q.includes('week') || q.includes('month') || q.includes('lately')) {
    const recentDays = Object.entries(student.dailyAttendance).slice(-30);
    const recentAttended = recentDays.filter(([date, status]) => status === 'present').length;
    const recentTotal = recentDays.length;
    const recentPercentage = recentTotal > 0 ? (recentAttended / recentTotal) * 100 : 0;

    return `📈 In the **last 30 days**, you've attended **${recentAttended} out of ${recentTotal}** sessions (**${recentPercentage.toFixed(1)}%**). ${recentPercentage >= 85 ? '✅ Great streak!' : '⚠️ Try to improve!'}`;
  }

  // Improvement suggestions
  if (q.includes('improve') || q.includes('better') || q.includes('suggestion') || q.includes('advice') || q.includes('tips') || q.includes('help')) {
    if (attendance < 75) {
      return `💡 **To improve your attendance:**\n1. ✅ Attend all remaining classes without fail\n2. 📋 Make up for missed sessions if possible\n3. ⏰ Set daily reminders for each class\n4. 🎯 Aim for 100% attendance in the next 2 weeks\n5. 📞 Contact your instructor about challenges\n\nYou need to attend ${Math.ceil((totalSessions * 0.75 - attendedSessions) / (totalSessions - attendedSessions) * 100)}% more sessions to reach 75%!`;
    } else if (attendance < 85) {
      return `💡 **To reach the 90% target:**\n1. ✅ Don't miss any more classes\n2. 📚 Attend all upcoming sessions\n3. 🏃 Maintain your current good streak\n4. 📝 Keep organized with a schedule\n5. 🎯 You're almost there! Just ${Math.ceil(90 - attendance)}% more to go!`;
    } else {
      return `🌟 **Excellent work!** Your attendance is outstanding!\n✅ Keep maintaining this excellent record\n🎯 Continue attending all classes\n📊 You're a model student for attendance\n💪 Great discipline and commitment!`;
    }
  }

  // Date-specific queries
  const dateMatch = q.match(/(\d{1,2}[-\/]\d{1,2}[-\/]\d{4}|january|february|march|april|may|june|july|august|september|october|november|december)/i);
  if (dateMatch) {
    const searchDate = dateMatch[0];
    const dailyAttendance = student.dailyAttendance;
    const foundEntry = Object.entries(dailyAttendance).find(([date, status]) => 
      date.includes(searchDate) || date.toLowerCase().includes(searchDate.toLowerCase())
    );
    
    if (foundEntry) {
      const [date, status] = foundEntry;
      return `📅 On **${date}**, you were **${status === 'present' ? '✅ PRESENT' : '❌ ABSENT'}**.`;
    }
  }

  // General greeting
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('what can')) {
    return `👋 **Hello!** I'm your AI Attendance Assistant. I can help you with:\n✅ Your attendance percentage\n📊 Sessions attended/missed\n🏖️ Holiday attendance\n📈 Recent performance trends\n💡 Improvement tips\n📅 Attendance on specific dates\n\nJust ask me any question about your attendance!`;
  }

  // Default response
  return `❓ I can help with your attendance data! Try asking about:\n• Your attendance percentage\n• Sessions missed\n• Recent performance\n• Holiday attendance\n• Improvement tips\n• Attendance on specific dates (e.g., "Was I present on 25-03-2026?")\n\nWhat would you like to know?`;
}

// ==================== ADMIN AI CHAT RESPONSE ====================

function generateAdminAIResponse(question, student) {
  const q = question.toLowerCase();
  const studentName = student.studentName;
  const rollNo = student.rollNo;
  const attendance = student.attendancePercentage;
  const totalSessions = student.totalSessions;
  const attendedSessions = student.attendedSessions;
  const missedSessions = totalSessions - attendedSessions;

  // Attendance overview
  if (q.includes('overview') || q.includes('summary') || q.includes('general') || q.includes('tell me about')) {
    return `📊 **${studentName} (${rollNo}) - Attendance Overview:**\n✅ Attendance: **${attendance.toFixed(2)}%**\n📚 Sessions: **${attendedSessions}/${totalSessions}** attended\n❌ Missed: **${missedSessions}** sessions\n🏆 Status: **${attendance >= 90 ? 'Excellent' : attendance >= 75 ? 'Good' : 'Low'}**\n${attendance < 75 ? '⚠️ **CRITICAL** - Below minimum 75% requirement' : ''}`;
  }

  // Attendance percentage
  if (q.includes('percentage') || q.includes('percent') || q.includes('how much') || q.includes('attendance')) {
    return `📊 **${studentName}** has an attendance of **${attendance.toFixed(2)}%** with **${attendedSessions}/${totalSessions}** sessions attended.`;
  }

  // Performance assessment
  if (q.includes('performance') || q.includes('how is') || q.includes('status') || q.includes('doing')) {
    let assessment = 'Good performance';
    let emoji = '👍';
    let recommendation = 'Continue monitoring';
    
    if (attendance < 75) {
      assessment = 'Critical - Immediate intervention needed';
      emoji = '🚨';
      recommendation = 'Schedule meeting with student';
    } else if (attendance < 85) {
      assessment = 'Below target - Needs improvement';
      emoji = '⚠️';
      recommendation = 'Send reminder to student';
    } else if (attendance >= 90) {
      assessment = 'Excellent - Outstanding attendance';
      emoji = '🌟';
      recommendation = 'Acknowledge good performance';
    }
    
    return `${emoji} **${studentName}**: ${assessment}\n📈 Current: ${attendance.toFixed(2)}%\n💡 Recommendation: ${recommendation}`;
  }

  // Date-specific attendance
  const dateMatch = q.match(/(\d{1,2}[-\/]\d{1,2}[-\/]\d{4})/);
  if (dateMatch || q.includes('present') || q.includes('absent') || q.includes('on')) {
    const dailyAttendance = student.dailyAttendance;
    let response = `📅 **${studentName}** attendance details:\n`;
    
    if (dateMatch) {
      const searchDate = dateMatch[0];
      const foundEntry = Object.entries(dailyAttendance).find(([date, status]) => 
        date.includes(searchDate.split('-').reverse().join('-'))
      );
      
      if (foundEntry) {
        const [date, status] = foundEntry;
        return `📅 On **${date}**, **${studentName}** was **${status === 'present' ? '✅ PRESENT' : '❌ ABSENT'}**.`;
      } else {
        return `❓ No attendance record found for **${studentName}** on **${searchDate}**.`;
      }
    }
    
    // Show recent attendance
    const recentDays = Object.entries(dailyAttendance).slice(-10);
    response += recentDays.map(([date, status]) => 
      `${status === 'present' ? '✅' : '❌'} ${date}: ${status.toUpperCase()}`
    ).join('\n');
    
    return response;
  }

  // Trend analysis
  if (q.includes('trend') || q.includes('pattern') || q.includes('improving') || q.includes('decline')) {
    const recentDays = Object.entries(student.dailyAttendance).slice(-30);
    const recent30Attended = recentDays.filter(([, status]) => status === 'present').length;
    const recent30Percentage = (recent30Attended / recentDays.length) * 100;
    
    const olderDays = Object.entries(student.dailyAttendance).slice(0, 30);
    const older30Attended = olderDays.filter(([, status]) => status === 'present').length;
    const older30Percentage = olderDays.length > 0 ? (older30Attended / olderDays.length) * 100 : 0;
    
    const trend = recent30Percentage > older30Percentage ? 'Improving 📈' : recent30Percentage < older30Percentage ? 'Declining 📉' : 'Stable ➡️';
    
    return `📊 **Attendance Trend Analysis for ${studentName}:**\n📈 Last 30 days: **${recent30Percentage.toFixed(1)}%** (${recent30Attended}/30)\n📊 Previous 30 days: **${older30Percentage.toFixed(1)}%** (${older30Attended}/30)\n🔄 Trend: **${trend}**`;
  }

  // Risk assessment
  if (q.includes('risk') || q.includes('concern') || q.includes('alert') || q.includes('issue')) {
    let riskLevel = 'Low';
    let color = '✅';
    let actions = [];
    
    if (attendance < 75) {
      riskLevel = 'Critical';
      color = '🚨';
      actions = ['Schedule immediate meeting', 'Monitor daily attendance', 'Send formal warning'];
    } else if (attendance < 80) {
      riskLevel = 'High';
      color = '⚠️';
      actions = ['Send warning letter', 'Weekly check-ins', 'Track daily sessions'];
    } else if (attendance < 85) {
      riskLevel = 'Medium';
      color = '⚡';
      actions = ['Send reminder', 'Monitor trends', 'Encourage consistency'];
    }
    
    let response = `${color} **Risk Level: ${riskLevel}** for ${studentName}\n`;
    response += `📊 Current Attendance: ${attendance.toFixed(2)}%\n`;
    if (actions.length > 0) {
      response += `**Recommended Actions:**\n`;
      actions.forEach(action => response += `• ${action}\n`);
    }
    return response;
  }

  // Comparison/ranking
  if (q.includes('compare') || q.includes('rank') || q.includes('better') || q.includes('worse')) {
    const allStudents = attendanceData;
    const totalStudents = allStudents.length;
    const betterStudents = allStudents.filter(s => s.attendancePercentage > attendance).length;
    const rank = betterStudents + 1;
    const percentile = ((totalStudents - betterStudents) / totalStudents * 100).toFixed(1);
    
    return `📊 **${studentName}** Ranking:\n🏆 Rank: **${rank} of ${totalStudents}** students\n📈 Percentile: **${percentile}%**\n${rank <= 20 ? '🌟 **Top Performer!**' : rank <= 50 ? '👍 **Above Average**' : rank <= 75 ? '📋 **Average**' : '⚠️ **Below Average**'}`;
  }

  // General help
  if (q.includes('hello') || q.includes('hi') || q.includes('help')) {
    return `👋 **Admin AI Assistant** - I can help you with:\n✅ Student attendance overview\n📊 Attendance percentage & sessions\n📈 Performance assessment\n📅 Attendance on specific dates\n🔍 Attendance trends\n⚠️ Risk assessment\n🏆 Student ranking\n\nJust ask about any student's attendance!`;
  }

  // Default
  return `❓ I can help analyze student attendance! Try asking:\n• "Tell me about ${rollNo}"\n• "Was ${rollNo} present on 25-03-2026?"\n• "What's the trend for ${rollNo}?"\n• "Is ${rollNo} at risk?"\n• "How does ${rollNo} rank?"\n\nWhat would you like to know?`;
}

// ==================== CHART DATA GENERATION ====================

function generateChartData(student) {
  const dailyAttendance = student.dailyAttendance;
  const entries = Object.entries(dailyAttendance);

  // Group by month for chart
  const monthlyData = {};
  const weeklyData = {};

  entries.forEach(([dateKey, status]) => {
    // Parse date (format: DD-MM-YYYY_lightmode)
    const dateStr = dateKey.split('_')[0];
    const [day, month, year] = dateStr.split('-').map(Number);

    const date = new Date(year, month - 1, day);
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
    const weekKey = getWeekKey(date);

    // Monthly data
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { total: 0, present: 0 };
    }
    monthlyData[monthKey].total++;
    if (status === 'present') {
      monthlyData[monthKey].present++;
    }

    // Weekly data (last 12 weeks)
    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { total: 0, present: 0, weekStart: date };
    }
    weeklyData[weekKey].total++;
    if (status === 'present') {
      weeklyData[weekKey].present++;
    }
  });

  // Convert to chart format
  const monthlyChart = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6) // Last 6 months
    .map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      attendance: data.total > 0 ? (data.present / data.total) * 100 : 0,
      sessions: data.total,
      present: data.present
    }));

  const weeklyChart = Object.entries(weeklyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12) // Last 12 weeks
    .map(([week, data]) => ({
      week: `Week of ${data.weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      attendance: data.total > 0 ? (data.present / data.total) * 100 : 0,
      sessions: data.total,
      present: data.present
    }));

  return {
    monthly: monthlyChart,
    weekly: weeklyChart,
    overall: {
      totalSessions: student.totalSessions,
      attendedSessions: student.attendedSessions,
      attendancePercentage: student.attendancePercentage
    }
  };
}

function getWeekKey(date) {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  return startOfWeek.toISOString().split('T')[0];
}

// ==================== HOLIDAY ANALYSIS ====================

function analyzeHolidayAttendance(student) {
  const dailyAttendance = student.dailyAttendance;
  const entries = Object.entries(dailyAttendance);

  let totalHolidays = 0;
  let holidaysMissed = 0;
  let weekendHolidays = 0;
  let weekendHolidaysMissed = 0;

  entries.forEach(([dateKey, status]) => {
    const dateStr = dateKey.split('_')[0];
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    // Check if it's a weekend (Saturday = 6, Sunday = 0)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendHolidays++;
      if (status === 'absent') {
        weekendHolidaysMissed++;
      }
    }

    // For now, consider weekends as holidays
    // In a real system, you'd have a holiday calendar
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      totalHolidays++;
      if (status === 'absent') {
        holidaysMissed++;
      }
    }
  });

  const holidayMissRate = totalHolidays > 0 ? (holidaysMissed / totalHolidays) * 100 : 0;
  const weekendMissRate = weekendHolidays > 0 ? (weekendHolidaysMissed / weekendHolidays) * 100 : 0;

  return {
    totalHolidays,
    holidaysMissed,
    holidayMissRate,
    weekendHolidays,
    weekendHolidaysMissed,
    weekendMissRate,
    recentHolidays: getRecentHolidayAnalysis(student, 30) // Last 30 days
  };
}

function getRecentHolidayAnalysis(student, days) {
  const dailyAttendance = student.dailyAttendance;
  const entries = Object.entries(dailyAttendance).slice(-days);

  let recentHolidays = 0;
  let recentHolidaysMissed = 0;

  entries.forEach(([dateKey, status]) => {
    const dateStr = dateKey.split('_')[0];
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      recentHolidays++;
      if (status === 'absent') {
        recentHolidaysMissed++;
      }
    }
  });

  return {
    period: `${days} days`,
    holidays: recentHolidays,
    missed: recentHolidaysMissed,
    missRate: recentHolidays > 0 ? (recentHolidaysMissed / recentHolidays) * 100 : 0
  };
}

// ==================== AUTHENTICATION ====================

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = usersData.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role, rollNo: user.rollNo },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        studentName: user.studentName
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, rollNo, studentName } = req.body;

    if (usersData.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = {
      rollNo: rollNo || email.split('@')[0],
      email,
      password: hashedPassword,
      role: 'student',
      studentName
    };

    usersData.push(newUser);

    const token = jwt.sign(
      { email: newUser.email, role: newUser.role, rollNo: newUser.rollNo },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        email: newUser.email,
        role: newUser.role,
        rollNo: newUser.rollNo,
        studentName: newUser.studentName
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ==================== STUDENT ROUTES ====================

app.get('/api/student/dashboard', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const student = attendanceData.find(s => s.rollNo === req.user.rollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ADMIN ROUTES ====================

app.get('/api/admin/dashboard', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const stats = {
      totalStudents: attendanceData.length,
      lowAttendance: attendanceData.filter(s => s.attendancePercentage < 75).length,
      highAttendance: attendanceData.filter(s => s.attendancePercentage >= 90).length,
      averageAttendance: (attendanceData.reduce((sum, s) => sum + s.attendancePercentage, 0) / attendanceData.length).toFixed(2)
    };

    res.json({
      success: true,
      stats,
      data: attendanceData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/low-attendance', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const lowAttendanceStudents = attendanceData
      .filter(s => s.attendancePercentage < 75)
      .sort((a, b) => a.attendancePercentage - b.attendancePercentage);

    res.json({
      success: true,
      data: lowAttendanceStudents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== AI CHAT ====================

app.post('/api/ai/chat', verifyToken, (req, res) => {
  try {
    const { question, rollNo } = req.body;
    const studentRollNo = rollNo || req.user.rollNo;

    // Check authorization
    if (req.user.role === 'student' && studentRollNo !== req.user.rollNo) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const student = attendanceData.find(s => s.rollNo === studentRollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Generate AI response based on question
    const response = generateAIResponse(question, student);

    res.json({
      success: true,
      data: {
        question,
        answer: response,
        studentName: student.studentName,
        rollNo: student.rollNo
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STUDENT PERFORMANCE CHART ====================

app.get('/api/student/chart/:rollNo?', verifyToken, (req, res) => {
  try {
    const rollNo = req.params.rollNo || req.user.rollNo;

    // Check authorization
    if (req.user.role === 'student' && rollNo !== req.user.rollNo) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const student = attendanceData.find(s => s.rollNo === rollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Generate monthly attendance data for chart
    const chartData = generateChartData(student);

    res.json({
      success: true,
      data: chartData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== HOLIDAY TRACKING ====================

app.get('/api/student/holidays/:rollNo?', verifyToken, (req, res) => {
  try {
    const rollNo = req.params.rollNo || req.user.rollNo;

    // Check authorization
    if (req.user.role === 'student' && rollNo !== req.user.rollNo) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const student = attendanceData.find(s => s.rollNo === rollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Analyze holiday attendance
    const holidayData = analyzeHolidayAttendance(student);

    res.json({
      success: true,
      data: holidayData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== AI INSIGHTS ====================

app.get('/api/ai/insights', verifyToken, (req, res) => {
  try {
    const rollNo = req.query.rollNo || req.user.rollNo;

    // Check authorization
    if (req.user.role === 'student' && rollNo !== req.user.rollNo) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const student = attendanceData.find(s => s.rollNo === rollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Generate AI Insights
    const insights = generateAIInsights(student);

    res.json({
      success: true,
      data: {
        studentName: student.studentName,
        rollNo: student.rollNo,
        insights: insights
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ADMIN AI CHAT ====================

app.post('/api/admin/ai/chat', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can use this feature' });
    }

    const { question, rollNo } = req.body;

    // If rollNo is provided, get that specific student
    if (rollNo) {
      const student = attendanceData.find(s => s.rollNo === rollNo);
      if (!student) {
        return res.json({
          success: true,
          data: {
            question,
            answer: `❌ No student found with roll number: **${rollNo}**`,
            studentName: 'N/A',
            rollNo: rollNo
          }
        });
      }

      const response = generateAdminAIResponse(question, student);
      return res.json({
        success: true,
        data: {
          question,
          answer: response,
          studentName: student.studentName,
          rollNo: student.rollNo,
          attendance: student.attendancePercentage
        }
      });
    }

    // If no rollNo, provide general insights
    const lowAttendanceStudents = attendanceData.filter(s => s.attendancePercentage < 75);
    const response = `📊 **Attendance Summary:**\n✅ Total Students: **${attendanceData.length}**\n⚠️ Low Attendance (<75%): **${lowAttendanceStudents.length}** students\n📈 Average Attendance: **${(attendanceData.reduce((sum, s) => sum + s.attendancePercentage, 0) / attendanceData.length).toFixed(2)}%**\n\nTo check a specific student, please provide their roll number!`;

    res.json({
      success: true,
      data: {
        question,
        answer: response,
        studentName: 'All Students',
        rollNo: 'N/A'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ADMIN STUDENT CHART ====================

app.get('/api/admin/student/chart/:rollNo', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const rollNo = req.params.rollNo;
    const student = attendanceData.find(s => s.rollNo === rollNo);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const chartData = generateChartData(student);
    res.json({
      success: true,
      data: {
        ...chartData,
        studentName: student.studentName,
        rollNo: student.rollNo,
        email: student.email,
        technology: student.technology,
        college: student.college
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== SERVE HTML ====================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==================== SERVER START ====================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`✓ Attendance Tracker Server Running!`);
  console.log(`${'='.repeat(50)}`);
  console.log(`📍 Open in browser: http://localhost:${PORT}`);
  console.log(`📍 API ready at: http://localhost:${PORT}/api`);
  console.log(`${'='.repeat(50)}\n`);
  
  console.log(`Demo Credentials:`);
  console.log(`  Admin:   admin@institution.edu / admin123`);
  console.log(`  Student: Use any email from students / student123`);
  console.log(`\n${' '.repeat(50)}\n`);
});
