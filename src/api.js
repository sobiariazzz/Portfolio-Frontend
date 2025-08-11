const API_BASE = process.env.REACT_APP_API_BASE || 'https://portfolio-backend-five-iota.vercel.app/api';

export const setAuthToken = (token) => {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
};

export const getAuthToken = () => localStorage.getItem('token');

export default API_BASE;
