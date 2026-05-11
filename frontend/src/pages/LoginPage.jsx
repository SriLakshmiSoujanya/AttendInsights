import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { authAPI } from '../api';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await authAPI.login(email, password);
      } else {
        res = await authAPI.register(email, password, studentName);
      }

      if (res.data && res.data.success) {
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        onLogin(res.data.user);
        
        if (res.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/student');
        }
      } else {
        setError(res.data.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card className="animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '40px 32px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)' }}>
        <div className="text-center mb-6">
          <div style={{
            width: '64px',
            height: '64px',
            background: 'hsla(231, 65%, 58%, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: 'var(--primary-color)'
          }}>
            {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px', color: '#1f2937' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p style={{ color: '#6b7280' }}>
            {isLogin ? 'Sign in to attendance portal' : 'Student Registration'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div className="input-group" style={{ marginBottom: '4px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#1f2937', fontWeight: 500, fontSize: '14px' }} htmlFor="studentName">Full Name</label>
              <input 
                id="studentName"
                type="text" 
                style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                placeholder="Your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="input-group" style={{ marginBottom: '4px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#1f2937', fontWeight: 500, fontSize: '14px' }} htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group" style={{ marginBottom: '4px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#1f2937', fontWeight: 500, fontSize: '14px' }} htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading} style={{ 
            width: '100%', padding: '12px', background: '#6366f1', color: 'white', 
            border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, 
            cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '8px' 
          }}>
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
          {isLogin ? (
            <span>Don't have an account? <span style={{ color: '#6366f1', cursor: 'pointer', fontWeight: 600 }} onClick={() => setIsLogin(false)}>Create one</span></span>
          ) : (
            <span>Already have an account? <span style={{ color: '#6366f1', cursor: 'pointer', fontWeight: 600 }} onClick={() => setIsLogin(true)}>Login here</span></span>
          )}
        </div>
        
        {isLogin && (
          <div style={{ background: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '12px', marginTop: '20px', fontSize: '12px', color: '#1e40af' }}>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Demo Credentials:</strong>
            <div>Admin: admin@institution.edu / admin123</div>
            <div>Student: Any student email / student123</div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
