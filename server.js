const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = 'your_jwt_secret_key'; // In production, use process.env.JWT_SECRET
const USERS_FILE = './users_data.json';

const getUsers = () => {
    if (fs.existsSync(USERS_FILE)) {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    }
    return [];
};

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ rollNo: user.rollNo, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('jwt', token, { 
        httpOnly: true, 
        secure: false, // Use true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ success: true, user: { ...user, password: '' } });
});

app.post('/api/auth/register', async (req, res) => {
    const { email, password, studentName } = req.body;
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Auto-generate a dummy roll number for new registrations
    const newRollNo = 'NEW' + Math.floor(Math.random() * 10000);
    
    const newUser = {
        rollNo: newRollNo,
        email,
        password: hashedPassword,
        role: 'student',
        studentName
    };

    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ success: true, message: 'Registration successful' });
});

// Middleware for authentication
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Forbidden' });
        req.user = user;
        next();
    });
};

// Admin endpoints (dummy data to unblock frontend)
app.get('/api/admin/dashboard', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    res.json({ success: true, data: { totalStudents: 120, avgAttendance: 85, lowAttendanceCount: 15 } });
});

app.get('/api/admin/low-attendance', authenticateToken, (req, res) => {
    res.json({ success: true, data: [{ name: 'John Doe', rollNo: '123', percentage: 65 }] });
});

app.get('/api/admin/student/chart/:rollNo', authenticateToken, (req, res) => {
    res.json({ success: true, data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], data: [1, 1, 0, 1, 1] } });
});

app.get('/api/admin/branch-analytics', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' });
    
    // Group users by branch (assuming branch code is the 6th and 7th character in RollNo, e.g. 23A91A0509 -> 05)
    // A simplified branch extraction logic
    const users = getUsers();
    const branchStats = {};
    
    users.forEach(u => {
        if (u.role !== 'student') return;
        const branchCode = u.rollNo.length >= 8 ? u.rollNo.substring(6, 8) : 'Other';
        let branchName = 'Other';
        if (branchCode === '05') branchName = 'CSE';
        else if (branchCode === '04') branchName = 'ECE';
        else if (branchCode === '12') branchName = 'IT';
        else if (branchCode === '42') branchName = 'CSM';
        else if (branchCode === '44') branchName = 'CSD';
        else if (branchCode === '61') branchName = 'AIML';
        else branchName = `Branch-${branchCode}`;
        
        if (!branchStats[branchName]) {
            branchStats[branchName] = { total: 0, lowAttendance: 0, avgAttendanceSum: 0 };
        }
        
        branchStats[branchName].total += 1;
        // Mock attendance between 60% and 100%
        const mockAtt = 60 + Math.random() * 40; 
        if (mockAtt < 75) branchStats[branchName].lowAttendance += 1;
        branchStats[branchName].avgAttendanceSum += mockAtt;
    });
    
    const formattedData = Object.keys(branchStats).map(branch => ({
        branch,
        totalStudents: branchStats[branch].total,
        lowAttendanceStudents: branchStats[branch].lowAttendance,
        averageAttendance: (branchStats[branch].avgAttendanceSum / branchStats[branch].total).toFixed(1)
    }));
    
    res.json({ success: true, data: formattedData });
});

app.post('/api/admin/ai/chat', authenticateToken, (req, res) => {
    res.json({ success: true, reply: "AI Response to admin: " + req.body.question });
});

// Student endpoints (dummy data to unblock frontend)
app.get('/api/student/dashboard', authenticateToken, (req, res) => {
    res.json({ success: true, data: { attendancePercentage: 88, sessionsAttended: 44, totalSessions: 50 } });
});

app.get('/api/student/chart', authenticateToken, (req, res) => {
    res.json({ success: true, data: { labels: ['Week 1', 'Week 2'], data: [90, 85] } });
});

app.get('/api/student/holidays', authenticateToken, (req, res) => {
    res.json({ success: true, data: [{ date: '2023-12-25', name: 'Christmas' }] });
});

app.get('/api/ai/insights', authenticateToken, (req, res) => {
    res.json({ success: true, data: { insights: "You're doing great! Keep it up." } });
});

app.post('/api/ai/chat', authenticateToken, (req, res) => {
    res.json({ success: true, reply: "AI Response to student: " + req.body.question });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Node.js API Server running on port ${PORT}`);
});
