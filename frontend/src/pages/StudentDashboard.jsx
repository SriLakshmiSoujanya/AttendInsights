import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatCard from '../components/ui/StatCard';
import Loader from '../components/ui/Loader';
import { studentAPI } from '../api';
import { LogOut, User, Calendar, CheckCircle, Percent, AlertCircle, TrendingUp, HelpCircle, MessageSquare } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const StudentDashboard = ({ user, onLogout }) => {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [holidayData, setHolidayData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [chartType, setChartType] = useState('monthly');
  const [chatMessages, setChatMessages] = useState([{ text: "Hello! I'm your AI Attendance Assistant. Ask me anything about your attendance data!", sender: 'ai' }]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [dashRes, chartRes, holidayRes, insightsRes] = await Promise.all([
          studentAPI.getDashboard(),
          studentAPI.getChart(),
          studentAPI.getHolidays(),
          studentAPI.getInsights()
        ]);
        
        if (dashRes.data.success) setData(dashRes.data.data);
        if (chartRes.data.success) setChartData(chartRes.data.data);
        if (holidayRes.data.success) setHolidayData(holidayRes.data.data);
        if (insightsRes.data.success) setInsights(insightsRes.data.data.insights);
      } catch (error) {
        console.error('Error fetching student data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/login');
  };

  const sendChatMessage = async (msg = chatInput) => {
    if (!msg.trim()) return;
    const newMsg = msg.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { text: newMsg, sender: 'user' }]);

    try {
      const res = await studentAPI.chat(newMsg);
      if (res.data.success) {
        setChatMessages(prev => [...prev, { text: res.data.data.answer, sender: 'ai' }]);
      } else {
        setChatMessages(prev => [...prev, { text: 'Sorry, I couldn\'t process that request.', sender: 'ai' }]);
      }
    } catch (e) {
      setChatMessages(prev => [...prev, { text: 'Connection error.', sender: 'ai' }]);
    }
  };

  if (loading) return <Loader text="Loading your dashboard..." />;

  if (!data) return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <h2>Error loading dashboard data.</h2>
        <Button onClick={handleLogout} className="mt-4">Back to Login</Button>
      </Card>
    </div>
  );

  const getChartConfig = () => {
    if (!chartData) return null;
    const currentData = chartData[chartType] || [];
    return {
      labels: currentData.map(d => chartType === 'monthly' ? d.month : d.week),
      datasets: [{
        label: 'Attendance %',
        data: currentData.map(d => d.attendance),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    };
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
            📊 Student Portal
          </h1>
        </div>
        <button onClick={handleLogout} style={{
          background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #fca5a5', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s'
        }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '25px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)' }}>
        <h2 style={{ margin: '0 0 15px 0', fontSize: '1.5rem' }}>{data.studentName}'s Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', fontSize: '0.95rem' }}>
          <div><strong>Roll Number:</strong> {data.rollNo}</div>
          <div><strong>Program:</strong> {data.technology || 'N/A'}</div>
          <div><strong>Email:</strong> {data.email}</div>
          <div><strong>College:</strong> {data.college || 'N/A'}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>Total Sessions</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{data.totalSessions}</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>Sessions Attended</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{data.attendedSessions}</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>Missing Sessions</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{data.totalSessions - data.attendedSessions}</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>Attendance %</h3>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{data.attendancePercentage.toFixed(1)}%</div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '15px' }}>📈 Attendance Progress</h2>
        <div style={{ background: '#f3f4f6', borderRadius: '12px', overflow: 'hidden', height: '30px', marginBottom: '8px' }}>
          <div style={{ 
            width: `${data.attendancePercentage}%`, 
            height: '100%', 
            background: data.attendancePercentage >= 90 ? 'linear-gradient(90deg, #10b981, #059669)' : data.attendancePercentage >= 75 ? 'linear-gradient(90deg, #6366f1, #ec4899)' : 'linear-gradient(90deg, #ef4444, #dc2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '0.85rem', transition: 'width 1s ease'
          }}>
            {data.attendancePercentage.toFixed(1)}%
          </div>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Minimum required: 75% | Target: 90%</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '30px' }}>
        <Card style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="#6366f1" /> Performance Chart
          </h2>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button onClick={() => setChartType('monthly')} style={{ padding: '6px 16px', background: chartType === 'monthly' ? '#6366f1' : '#f3f4f6', color: chartType === 'monthly' ? 'white' : '#4b5563', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s' }}>Monthly</button>
            <button onClick={() => setChartType('weekly')} style={{ padding: '6px 16px', background: chartType === 'weekly' ? '#6366f1' : '#f3f4f6', color: chartType === 'weekly' ? 'white' : '#4b5563', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s' }}>Weekly</button>
          </div>
          <div style={{ height: '250px' }}>
            {getChartConfig() ? (
              <Line data={getChartConfig()} options={{ maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { display: false } } }} />
            ) : <Loader />}
          </div>
        </Card>

        <Card style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏖️ Holiday & Weekend Stats
          </h2>
          {holidayData ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h4 style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '4px' }}>Total Holidays</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6366f1' }}>{holidayData.totalHolidays}</div>
              </div>
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h4 style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '4px' }}>Holidays Missed</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6366f1' }}>{holidayData.holidaysMissed}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{holidayData.holidayMissRate.toFixed(1)}% miss rate</div>
              </div>
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h4 style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '4px' }}>Recent (30 days)</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6366f1' }}>{holidayData.recentHolidays.missed}/{holidayData.recentHolidays.holidays}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{holidayData.recentHolidays.missRate.toFixed(1)}% miss rate</div>
              </div>
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h4 style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '4px' }}>Weekend Attendance</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6366f1' }}>{holidayData.weekendHolidays - holidayData.weekendHolidaysMissed}/{holidayData.weekendHolidays}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{(100 - holidayData.weekendMissRate).toFixed(1)}% attendance</div>
              </div>
            </div>
          ) : <Loader />}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '30px' }}>
        <Card style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '450px', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              🤖 AI Attendance Assistant
            </h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: 'white' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: msg.sender === 'ai' ? 'linear-gradient(135deg, #6366f1, #ec4899)' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
                  {msg.sender === 'ai' ? '🤖' : '👤'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{ background: msg.sender === 'user' ? '#6366f1' : '#f3f4f6', color: msg.sender === 'user' ? 'white' : '#1f2937', padding: '12px 16px', borderRadius: '18px', fontSize: '0.9rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', background: 'white', display: 'flex', gap: '10px' }}>
            <input 
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendChatMessage()}
              placeholder="Ask me about your attendance..." 
              style={{ flex: 1, padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '24px', fontSize: '0.9rem', outline: 'none' }} 
            />
            <button onClick={() => sendChatMessage()} style={{ background: '#6366f1', color: 'white', border: 'none', padding: '0 24px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>Send</button>
          </div>
        </Card>

        <Card style={{ padding: '24px', height: '450px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            💡 AI-Powered Insights
          </h2>
          {insights ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {insights.map((insight, i) => (
                <div key={i} style={{ 
                  background: insight.type === 'critical' ? '#fef2f2' : insight.type === 'warning' ? '#fffbeb' : insight.type === 'success' ? '#f0fdf4' : '#f0f9ff',
                  borderLeft: `4px solid ${insight.type === 'critical' ? '#ef4444' : insight.type === 'warning' ? '#f59e0b' : insight.type === 'success' ? '#10b981' : '#6366f1'}`,
                  padding: '20px', borderRadius: '8px'
                }}>
                  <div style={{ fontWeight: 700, color: '#1f2937', marginBottom: '8px', fontSize: '0.95rem' }}>{insight.title}</div>
                  <div style={{ color: '#4b5563', fontSize: '0.85rem', marginBottom: '10px', lineHeight: 1.5 }}>{insight.message}</div>
                  <div style={{ background: 'white', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', color: '#059669', fontWeight: 600, display: 'inline-block' }}>💡 {insight.recommendation}</div>
                </div>
              ))}
            </div>
          ) : <Loader />}
        </Card>
      </div>

    </div>
  );
};

export default StudentDashboard;
