const fetch = require('node-fetch');

async function testStudentAPI() {
  try {
    // Test student login
    console.log('Testing student login...');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: '23A91A04N3@aec.edu.in', password: 'student123' })
    });
    
    const loginData = await loginRes.json();
    console.log('Login response:', loginData);
    
    if (loginData.token) {
      // Test student dashboard
      const dashRes = await fetch('http://localhost:5000/api/student/dashboard', {
        headers: { 'Authorization': `Bearer ${loginData.token}` }
      });
      
      const dashData = await dashRes.json();
      console.log('Dashboard response status:', dashRes.status);
      console.log('Dashboard response:');
      console.log('  Success:', dashData.success);
      console.log('  Student Name:', dashData.data ? dashData.data.studentName : 'N/A');
      console.log('  Roll No:', dashData.data ? dashData.data.rollNo : 'N/A');
      console.log('  Attendance %:', dashData.data ? dashData.data.attendancePercentage : 'N/A');
      console.log('  Total Sessions:', dashData.data ? dashData.data.totalSessions : 'N/A');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testStudentAPI();
