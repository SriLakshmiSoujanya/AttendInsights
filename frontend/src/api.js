import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Point to server.js running on port 5000
  withCredentials: true // Important for sending/receiving httpOnly cookies
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password, studentName) => api.post('/auth/register', { email, password, studentName }),
  me: () => {
    const user = localStorage.getItem('currentUser');
    return user ? Promise.resolve({ data: { success: true, user: JSON.parse(user) } }) : Promise.reject('No user');
  }
};

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getLowAttendance: () => api.get('/admin/low-attendance'),
  getStudentChart: (rollNo) => api.get(`/admin/student/chart/${rollNo}`),
  getBranchAnalytics: () => api.get('/admin/branch-analytics'),
  chat: (question, rollNo) => api.post('/admin/ai/chat', { question, rollNo })
};

export const studentAPI = {
  getDashboard: () => api.get('/student/dashboard'),
  getChart: () => api.get('/student/chart'),
  getHolidays: () => api.get('/student/holidays'),
  getInsights: () => api.get('/ai/insights'),
  chat: (question) => api.post('/ai/chat', { question })
};

export default api;
