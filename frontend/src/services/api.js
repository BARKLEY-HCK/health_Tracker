import axios from 'axios';

const API_URL ='https://health-tracker-5059.onrender.com/api';


// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
};

// Entries API
export const entriesAPI = {
  create: (entryData) => api.post('/entries', entryData),
  getAll: () => api.get('/entries'),
  getOne: (id) => api.get(`/entries/${id}`),
};

export default api;