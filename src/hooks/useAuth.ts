import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LoginFormData } from '../types/auth';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';

export const useAuth = () => {
  const navigate = useNavigate();
  const { 
    isAuthenticated,
    userRole,
    user,
    token,
    setAuth,
    clearAuth 
  } = useAuthStore();

  const login = useCallback(async (credentials: LoginFormData, role: 'student' | 'teacher') => {
    try {
      const response = await authService.login(role, credentials);
      
      // Store token in localStorage
      storage.setToken(response.token);
      
      setAuth({
        isAuthenticated: true,
        userRole: role,
        user: response.user,
        token: response.token
      });
      
      navigate(`/${role}/dashboard`);
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }, [navigate, setAuth]);

  const logout = useCallback(() => {
    storage.removeToken();
    clearAuth();
    navigate('/');
  }, [navigate, clearAuth]);

  const checkAuth = useCallback(async () => {
    const token = storage.getToken();
    
    if (!token) {
      clearAuth();
      return false;
    }

    try {
      // Verify token validity with backend
      await authService.verifyToken(token);
      return true;
    } catch (error) {
      storage.removeToken();
      clearAuth();
      return false;
    }
  }, [clearAuth]);

  return {
    isAuthenticated,
    userRole,
    user,
    token,
    login,
    logout,
    checkAuth
  };
};