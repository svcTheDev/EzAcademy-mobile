import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { authService } from '../services/authService';
import {
  AuthContextValue,
  AuthStatus,
  AuthUser,
  LoginCredentials,
} from '../../../types/types';

interface AuthErrorResponse {
  message?: string;
  error?: string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setStatus('loading');
    setError(null);

    try {
      const response = await authService.login(credentials);
      setToken(response.token);
      setUser(response.user);
      setStatus('authenticated');
    } catch (requestError) {
      const message = axios.isAxiosError<AuthErrorResponse>(requestError)
        ? requestError.response?.data.message ??
          requestError.response?.data.error ??
          'No se pudo iniciar sesión'
        : 'No se pudo iniciar sesión';

      setToken(null);
      setUser(null);
      setError(message);
      setStatus('error');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, status, error, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
};
