import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Loader from '../components/ui/Loader';
import { adminAPI } from '../api';
import { Users, TrendingUp, AlertTriangle, LogOut, CheckCircle, Search, MessageSquare } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [lowAttendanceStudents, setLowAttendanceStudents] = useState([]);
  
  // Student Analysis State
  const [searchRollNo, setSearchRollNo] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  // AI Chat State
  const [chatMessages, setChatMessages] = useState([{ text: "Hello! I'm your Admin AI Assistant. I can help you analyze any student's attendance. Ask me about specific students or general attendance trends!", sender: 'ai' }]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await adminAPI.getDashboard();
        if (res.data.success) {
          setStats(res.data.stats);
          setStudents(res.data.data);
        }
        
        const lowRes = await adminAPI.getLowAttendance();
        if (lowRes.data.success) {
          setLowAttendanceStudents(lowRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching admin data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
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

  const handleSearchStudent = async () => {
    if (!searchRollNo.trim()) return;
    setAnalysisError('');
    setAnalysisData(null);
    try {
      const res = await adminAPI.getStudentChart(searchRollNo.trim());
      if (res.data.success) {
        setAnalysisData({ ...res.data.data, rollNo: searchRollNo.trim() });
      } else {
        setAnalysisError('Student not found.');
      }
    } catch (e) {
      setAnalysisError('Error fetching student data.');
    }
  };

  const sendChatMessage = async (msg = chatInput) => {
    if (!msg.trim()) return;
    const newMsg = msg.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { text: newMsg, sender: 'user' }]);

    try {
      const res = await adminAPI.chat(newMsg, searchRollNo.trim());
      if (res.data.success) {
        setChatMessages(prev => [...prev, { text: res.data.data.answer, sender: 'ai' }]);
      } else {
        setChatMessages(prev => [...prev, { text: 'Sorry, I couldn\'t process that request.', sender: 'ai' }]);
      }
    } catch (e) {
      setChatMessages(prev => [...prev, { text: 'Connection error.', sender: 'ai' }]);
    }
  };

  if (loading) return <Loader text="Loading admin dashboard..." />;

  const getChartConfig = (type) => {
    if (!analysisData || !analysisData[type]) return null;
    const data = analysisData[type];
    return {
      labels: data.map(d => type === 'monthly' ? d.month : d.week),
      datasets: [{
        label: 'Attendance %',
        data: data.map(d => d.attendance),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    };
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
            📊 Admin Dashboard
          </h1>
        </div>
        <button onClick={handleLogout} style={{
          background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #fca5a5', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s'
        }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {['overview', 'analysis', 'ai-assistant', 'low-attendance', 'all-students'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            style={{ 
              padding: '10px 20px', 
              background: activeTab === tab ? '#6366f1' : 'white', 
              color: activeTab === tab ? 'white' : '#4b5563', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              fontWeight: 600, 
              cursor: 'pointer', 
              textTransform: 'capitalize',
              transition: 'all 0.2s'
            }}>
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
              <Users size={32} style={{ margin: '0 auto 10px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px' }}>Total Students</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats?.totalStudents || 0}</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
              <AlertTriangle size={32} style={{ margin: '0 auto 10px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px' }}>Low Attendance (&lt;75%)</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats?.lowAttendance || 0}</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
              <CheckCircle size={32} style={{ margin: '0 auto 10px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px' }}>High Attendance (≥90%)</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats?.highAttendance || 0}</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
              <TrendingUp size={32} style={{ margin: '0 auto 10px', opacity: 0.8 }} />
              <h3 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px' }}>Average Attendance</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats?.averageAttendance || 0}%</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="animate-fade-in">
          <Card style={{ marginBottom: '30px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '20px' }}>🔍 Student Analysis</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                value={searchRollNo}
                onChange={e => setSearchRollNo(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearchStudent()}
                placeholder="Enter Student Roll Number..." 
                style={{ flex: 1, padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} 
              />
              <button onClick={handleSearchStudent} style={{ background: '#6366f1', color: 'white', border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Search Student</button>
            </div>
            {analysisError && <p style={{ color: '#ef4444', marginTop: '10px', fontWeight: 500 }}>❌ {analysisError}</p>}
          </Card>

          {analysisData && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
              <Card style={{ padding: '24px', gridColumn: '1 / -1' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>Student Performance</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                  <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#6366f1', marginBottom: '5px' }}>{analysisData.overall.attendancePercentage.toFixed(1)}%</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Overall Attendance</div>
                  </div>
                  <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981', marginBottom: '5px' }}>{analysisData.overall.attendedSessions}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Sessions Attended</div>
                  </div>
                  <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ef4444', marginBottom: '5px' }}>{analysisData.overall.totalSessions - analysisData.overall.attendedSessions}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Sessions Missed</div>
                  </div>
                </div>
              </Card>

              <Card style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '15px' }}>📈 Monthly Trend</h3>
                <div style={{ height: '200px' }}>
                  <Line data={getChartConfig('monthly')} options={{ maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { display: false } } }} />
                </div>
              </Card>

              <Card style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '15px' }}>📅 Weekly Trend</h3>
                <div style={{ height: '200px' }}>
                  <Line data={getChartConfig('weekly')} options={{ maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { display: false } } }} />
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {activeTab === 'ai-assistant' && (
        <Card style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }} className="animate-fade-in">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              🤖 Admin AI Assistant
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
          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
              <button onClick={() => sendChatMessage("How many students have low attendance?")} style={{ background: 'white', border: '1px solid #e5e7eb', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', cursor: 'pointer', color: '#4b5563' }}>Low Attendance</button>
              <button onClick={() => sendChatMessage("What is the average attendance?")} style={{ background: 'white', border: '1px solid #e5e7eb', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', cursor: 'pointer', color: '#4b5563' }}>Average Attendance</button>
              <button onClick={() => sendChatMessage("Which students need intervention?")} style={{ background: 'white', border: '1px solid #e5e7eb', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', cursor: 'pointer', color: '#4b5563' }}>At-Risk Students</button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendChatMessage()}
                placeholder="Ask about a student or trends..." 
                style={{ flex: 1, padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '24px', fontSize: '0.9rem', outline: 'none' }} 
              />
              <button onClick={() => sendChatMessage()} style={{ background: '#6366f1', color: 'white', border: 'none', padding: '0 24px', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Send</button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'low-attendance' && (
        <Card className="animate-fade-in">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '20px' }}>⚠️ Students with Low Attendance</h2>
          <div className="table-container">
            <table className="premium-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '15px' }}>Roll No</th>
                  <th style={{ padding: '15px' }}>Name</th>
                  <th style={{ padding: '15px' }}>Attendance %</th>
                  <th style={{ padding: '15px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowAttendanceStudents.length > 0 ? lowAttendanceStudents.map(s => (
                  <tr key={s.rollNo} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 15px' }}>{s.rollNo}</td>
                    <td style={{ padding: '12px 15px' }}>{s.studentName}</td>
                    <td style={{ padding: '12px 15px', color: '#ef4444', fontWeight: 600 }}>{s.attendancePercentage.toFixed(1)}%</td>
                    <td style={{ padding: '12px 15px' }}>
                      <Badge status="critical">Critical</Badge>
                    </td>
                  </tr>
                )) : <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>No students with low attendance.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'all-students' && (
        <Card className="animate-fade-in">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '20px' }}>📋 All Students Attendance</h2>
          <div className="table-container">
            <table className="premium-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '15px' }}>Roll No</th>
                  <th style={{ padding: '15px' }}>Name</th>
                  <th style={{ padding: '15px' }}>Sessions</th>
                  <th style={{ padding: '15px' }}>Attended</th>
                  <th style={{ padding: '15px' }}>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.rollNo} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 15px' }}>{s.rollNo}</td>
                    <td style={{ padding: '12px 15px' }}>{s.studentName}</td>
                    <td style={{ padding: '12px 15px' }}>{s.totalSessions}</td>
                    <td style={{ padding: '12px 15px' }}>{s.attendedSessions}</td>
                    <td style={{ padding: '12px 15px' }}>
                      <Badge status={s.attendancePercentage >= 75 ? 'good' : s.attendancePercentage >= 60 ? 'warning' : 'critical'}>
                        {s.attendancePercentage.toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
