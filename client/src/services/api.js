import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rah-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only clear if on a protected route and not during initial page load
      const isAuthEndpoint = error.config?.url?.includes('/api/auth/me');
      if (isAuthEndpoint) {
        localStorage.removeItem('rah-token');
        localStorage.removeItem('rah-user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
