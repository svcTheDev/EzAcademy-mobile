import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { authService } from '../services/authService';
import {
  AuthContextValue,
  AuthStatus,
  AuthUser,
  LoginCredentials,
} from '../../../types/types';

const TOKEN_KEY = 'ezacademy_jwt_token';
const USER_KEY = 'ezacademy_user_data';

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

  // 1. CICLO DE INICIO: Recuperar token guardado al abrir la app
  useEffect(() => {
    const bootstrapAsync = async () => {
      setStatus('loading');
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        const storedUser = await SecureStore.getItemAsync(USER_KEY);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setStatus('authenticated');
        } else {
          setStatus('unauthenticated');
        }
      } catch (e) {
        setStatus('unauthenticated');
      }
    };

    bootstrapAsync();
  }, []);

  // 2. LOGIN: Guardar en SecureStore si la API responde con éxito
  const login = async (credentials: LoginCredentials) => {
    setStatus('loading');
    setError(null);

    try {
      const response = await authService.login(credentials);

      // Guardar de forma encriptada en el SO del teléfono
      await SecureStore.setItemAsync(TOKEN_KEY, response.token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(response.user));

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
      setStatus('unauthenticated'); // Se establece unauthenticated en lugar de error si falla
    }
  };

  // 3. LOGOUT: Limpiar almacenamiento y restablecer estado
  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    setToken(null);
    setUser(null);
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, token, status, error, login, logout }}>
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