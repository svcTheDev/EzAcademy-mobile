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

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthContextProps {
  status: AuthStatus;
  token: string | null;
  user: User | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; msg?: string }>;
  logout: () => Promise<void>;
}
