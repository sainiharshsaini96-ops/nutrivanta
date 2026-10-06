import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || '/api';
const AUTH_TOKEN_KEY = 'electromart_auth_token';
const AUTH_USER_KEY = 'electromart_auth_user';

export const AuthProvider = ({ children }) => {
  // NEVER pre-populate user from localStorage — always verify with server first
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // isVerifying: true while we check the stored token with the server on mount
  // During this time, show a loading screen — not the auth modal, not the app
  const [isVerifying, setIsVerifying] = useState(true);

  // Persist auth to localStorage and state
  const persistAuth = (userData, authToken) => {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
    setUser(userData);
    setToken(authToken);
  };

  const clearAuth = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
    setToken(null);
  };

  // On mount: check if there's a stored token and verify it with the server
  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!storedToken) {
      // No token at all — show sign-in screen
      setIsVerifying(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            // Token is valid — restore session
            setUser(data.user);
            setToken(storedToken);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
          } else {
            // Server rejected — clear stale data
            clearAuth();
          }
        } else {
          // 401 or other error — token invalid/expired
          clearAuth();
        }
      } catch {
        // Server is unreachable — trust locally stored data for continuity
        // but only if we have both a token AND a user
        const storedUser = localStorage.getItem(AUTH_USER_KEY);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
          } catch {
            clearAuth();
          }
        } else {
          clearAuth();
        }
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (data.success) {
        persistAuth(data.user, data.token);
        return { success: true, message: data.message };
      } else {
        setAuthError(data.message || 'Registration failed.');
        return { success: false, message: data.message };
      }
    } catch {
      const msg = 'Cannot connect to server. Please make sure the server is running.';
      setAuthError(msg);
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        persistAuth(data.user, data.token);
        return { success: true, message: data.message };
      } else {
        setAuthError(data.message || 'Login failed. Please check your credentials.');
        return { success: false, message: data.message };
      }
    } catch {
      const msg = 'Cannot connect to server. Please make sure the server is running.';
      setAuthError(msg);
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setAuthMode('signin');
    setAuthError(null);
  }, []);

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      authError,
      isAuthenticated: !!user,
      isVerifying,
      authMode,
      register,
      login,
      logout,
      switchAuthMode,
      setAuthError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
