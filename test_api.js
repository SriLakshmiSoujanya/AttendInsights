const fetch = require('node-fetch');

async function testAPI() {
  try {
    // Test login
    console.log('Testing login...');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@institution.edu', password: 'admin123' })
    });
    
    const loginData = await loginRes.json();
    console.log('Login response:', loginData);
    
    if (loginData.token) {
      // Test admin dashboard
      const dashRes = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${loginData.token}` }
      });
      
      const dashData = await dashRes.json();
      console.log('Dashboard response status:', dashRes.status);
      console.log('Dashboard data:', {
        success: dashData.success,
        stats: dashData.stats,
        dataCount: dashData.data ? dashData.data.length : 0
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
