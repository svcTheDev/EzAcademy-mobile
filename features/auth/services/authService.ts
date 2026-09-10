import { apiClient } from './api/client';
import { AuthResponse, LoginCredentials } from '../../../types/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },
};
