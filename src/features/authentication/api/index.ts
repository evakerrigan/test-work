import { apiClient } from '@/shared/api';

export const authApi = {
  async signIn(userName: string): Promise<string> {
    const response = await apiClient.get('/auth', {
      params: { user: userName },
    });
    const authHeader =
      response.headers['authorization'] ?? response.headers['Authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
      throw new Error('Authorization header is missing');
    }
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token) {
      throw new Error('Token is empty');
    }
    return token;
  },
};
