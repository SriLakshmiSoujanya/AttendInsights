import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Loader from './components/ui/Loader';
import { authAPI } from './api';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authAPI.me();
        if (res.data && res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader text="Initializing Application..." />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/student'} />
            ) : (
              <LoginPage onLogin={setUser} />
            )
          } 
        />
        <Route 
          path="/admin" 
          element={
            user && user.role === 'admin' ? (
              <AdminDashboard user={user} onLogout={() => setUser(null)} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/student" 
          element={
            user && user.role === 'student' ? (
              <StudentDashboard user={user} onLogout={() => setUser(null)} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/" 
          element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/student'} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
