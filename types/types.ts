export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
}
