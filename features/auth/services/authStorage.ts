import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'ezacademy_jwt_token';

export const authStorage = {
  saveToken: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  getToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  removeToken: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};