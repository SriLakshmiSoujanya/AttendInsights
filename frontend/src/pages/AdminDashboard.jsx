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
import styles from './AdminDashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [lowAttendanceStudents, setLowAttendanceStudents] = useState([]);
  const [branchAnalytics, setBranchAnalytics] = useState([]);
  
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

        const branchRes = await adminAPI.getBranchAnalytics();
        if (branchRes.data.success) {
          setBranchAnalytics(branchRes.data.data);
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            📊 Admin Dashboard
          </h1>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className={styles.tabsContainer}>
        {['overview', 'analysis', 'ai-assistant', 'low-attendance', 'branch-analytics', 'all-students'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}>
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <div className={styles.statsGrid}>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <Users size={32} className={styles.statIcon} />
              <h3 className={styles.statLabel}>Total Students</h3>
              <div className={styles.statValue}>{stats?.totalStudents || 0}</div>
            </div>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <AlertTriangle size={32} className={styles.statIcon} />
              <h3 className={styles.statLabel}>Low Attendance (&lt;75%)</h3>
              <div className={styles.statValue}>{stats?.lowAttendance || 0}</div>
            </div>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <CheckCircle size={32} className={styles.statIcon} />
              <h3 className={styles.statLabel}>High Attendance (≥90%)</h3>
              <div className={styles.statValue}>{stats?.highAttendance || 0}</div>
            </div>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
              <TrendingUp size={32} className={styles.statIcon} />
              <h3 className={styles.statLabel}>Average Attendance</h3>
              <div className={styles.statValue}>{stats?.averageAttendance || 0}%</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="animate-fade-in">
          <Card className={styles.searchCard}>
            <h2 className={styles.sectionTitle}>🔍 Student Analysis</h2>
            <div className={styles.searchForm}>
              <input 
                value={searchRollNo}
                onChange={e => setSearchRollNo(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearchStudent()}
                placeholder="Enter Student Roll Number..." 
                className={styles.searchInput}
              />
              <button onClick={handleSearchStudent} className={styles.searchBtn}>Search Student</button>
            </div>
            {analysisError && <p className={styles.errorText}>❌ {analysisError}</p>}
          </Card>

          {analysisData && (
            <div className={styles.analysisGrid}>
              <Card className={styles.perfCard}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>Student Performance</h3>
                <div className={styles.perfStatsGrid}>
                  <div className={styles.perfStatBox}>
                    <div className={styles.perfStatValue} style={{ color: '#6366f1' }}>{analysisData.overall.attendancePercentage.toFixed(1)}%</div>
                    <div className={styles.perfStatLabel}>Overall Attendance</div>
                  </div>
                  <div className={styles.perfStatBox}>
                    <div className={styles.perfStatValue} style={{ color: '#10b981' }}>{analysisData.overall.attendedSessions}</div>
                    <div className={styles.perfStatLabel}>Sessions Attended</div>
                  </div>
                  <div className={styles.perfStatBox}>
                    <div className={styles.perfStatValue} style={{ color: '#ef4444' }}>{analysisData.overall.totalSessions - analysisData.overall.attendedSessions}</div>
                    <div className={styles.perfStatLabel}>Sessions Missed</div>
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
        <Card className={`${styles.aiChatCard} animate-fade-in`}>
          <div className={styles.aiChatHeader}>
            <h2 className={styles.aiChatTitle}>
              🤖 Admin AI Assistant
            </h2>
          </div>
          <div className={styles.chatMessages}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={`${styles.chatMsgRow} ${msg.sender === 'user' ? styles.chatMsgRowUser : ''}`}>
                <div className={`${styles.chatAvatar} ${msg.sender === 'ai' ? styles.chatAvatarAi : styles.chatAvatarUser}`}>
                  {msg.sender === 'ai' ? '🤖' : '👤'}
                </div>
                <div className={`${styles.chatBubbleWrap} ${msg.sender === 'ai' ? styles.chatBubbleWrapAi : styles.chatBubbleWrapUser}`}>
                  <div className={`${styles.chatBubble} ${msg.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleAi}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className={styles.chatInputArea}>
            <div className={styles.chatPromptBtns}>
              <button onClick={() => sendChatMessage("How many students have low attendance?")} className={styles.chatPromptBtn}>Low Attendance</button>
              <button onClick={() => sendChatMessage("What is the average attendance?")} className={styles.chatPromptBtn}>Average Attendance</button>
              <button onClick={() => sendChatMessage("Which students need intervention?")} className={styles.chatPromptBtn}>At-Risk Students</button>
            </div>
            <div className={styles.chatInputForm}>
              <input 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendChatMessage()}
                placeholder="Ask about a student or trends..." 
                className={styles.chatInput}
              />
              <button onClick={() => sendChatMessage()} className={styles.chatSendBtn}>Send</button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'low-attendance' && (
        <Card className="animate-fade-in">
          <h2 className={styles.sectionTitle}>⚠️ Students with Low Attendance</h2>
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

      {activeTab === 'branch-analytics' && (
        <Card className="animate-fade-in">
          <h2 className={styles.sectionTitle}>🏢 Branch-Wise Analytics</h2>
          <div className="table-container">
            <table className="premium-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '15px' }}>Branch</th>
                  <th style={{ padding: '15px' }}>Total Students</th>
                  <th style={{ padding: '15px' }}>Average Attendance %</th>
                  <th style={{ padding: '15px' }}>Low Attendance (&lt;75%)</th>
                </tr>
              </thead>
              <tbody>
                {branchAnalytics.length > 0 ? branchAnalytics.map(b => (
                  <tr key={b.branch} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 15px', fontWeight: 600 }}>{b.branch}</td>
                    <td style={{ padding: '12px 15px' }}>{b.totalStudents}</td>
                    <td style={{ padding: '12px 15px' }}>
                      <Badge status={b.averageAttendance >= 75 ? 'good' : 'critical'}>
                        {b.averageAttendance}%
                      </Badge>
                    </td>
                    <td style={{ padding: '12px 15px', color: '#ef4444', fontWeight: 600 }}>{b.lowAttendanceStudents}</td>
                  </tr>
                )) : <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>No branch data available.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'all-students' && (
        <Card className="animate-fade-in">
          <h2 className={styles.sectionTitle}>📋 All Students Attendance</h2>
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
