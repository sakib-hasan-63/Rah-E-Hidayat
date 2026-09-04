import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state directly from localStorage for instantaneous UI rendering
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('rah-user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        localStorage.removeItem('rah-user');
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  // Derive isAuthenticated from user — single source of truth
  const isAuthenticated = useMemo(() => Boolean(user), [user]);
  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  // Verify and sync with backend on mount
  useEffect(() => {
    const syncUser = async () => {
      const token = localStorage.getItem('rah-token');
      if (token) {
        try {
          const res = await api.get('/api/auth/me');
          if (res.data?.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('rah-user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          // If backend returns 401, clear everything
          if (err.response?.status === 401) {
            localStorage.removeItem('rah-token');
            localStorage.removeItem('rah-user');
            setUser(null);
          }
          // If backend connection fails, preserve local cached user
          console.warn('Notice: Backend verification sync offline or unauthenticated');
        }
      }
      setLoading(false);
    };

    syncUser();
  }, []);

  const login = useCallback(async (identifier, password) => {
    const res = await api.post('/api/auth/login', { email: identifier, password });
    const { token, user: userData } = res.data;

    if (token) {
      localStorage.setItem('rah-token', token);
    }
    if (userData) {
      localStorage.setItem('rah-user', JSON.stringify(userData));
      setUser(userData);
    }
    return userData;
  }, []);

  const register = useCallback(async (name, email, phone, password) => {
    const res = await api.post('/api/auth/register', { name, email, phone, password });
    const { token, user: userData } = res.data;

    if (token) {
      localStorage.setItem('rah-token', token);
    }
    if (userData) {
      localStorage.setItem('rah-user', JSON.stringify(userData));
      setUser(userData);
    }
    return userData;
  }, []);

  const logout = useCallback(() => {
    // 1. Clear all stored auth data
    localStorage.removeItem('rah-token');
    localStorage.removeItem('rah-user');

    // 2. Immediately set user to null — this triggers re-render in all consumers
    setUser(null);

    // 3. Attempt backend logout (fire-and-forget)
    try {
      api.post('/api/auth/logout').catch(() => {});
    } catch (e) {
      // Ignore — localStorage is already cleared
    }
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('rah-user', JSON.stringify(updatedUser));
  }, []);

  const contextValue = useMemo(() => ({
    user,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    updateUser,
  }), [user, loading, isAuthenticated, isAdmin, login, register, logout, updateUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
