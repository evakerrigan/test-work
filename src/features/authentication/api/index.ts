// import { apiClient } from '@/shared/api';
import { MOCK_AUTH_TOKEN, mockDelay } from '@/shared/api/mockData';

export const authApi = {
  async signIn(userName: string): Promise<string> {
    // ========== ЗАКОММЕНТИРОВАН СТАРЫЙ КОД С РЕАЛЬНЫМ API ==========
    // const response = await apiClient.get('/auth', {
    //   params: { user: userName },
    // });
    // const authHeader =
    //   response.headers['authorization'] ?? response.headers['Authorization'];
    // if (!authHeader || typeof authHeader !== 'string') {
    //   throw new Error('Authorization header is missing');
    // }
    // const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    // if (!token) {
    //   throw new Error('Token is empty');
    // }
    // return token;
    // ========== КОНЕЦ СТАРОГО КОДА ==========

    // НОВЫЙ КОД: Используем моковые данные
    await mockDelay(300); // Имитация задержки сети

    // Проверяем, что имя пользователя не пустое
    if (!userName || userName.trim() === '') {
      throw new Error('Username is required');
    }

    // Возвращаем моковый токен
    return MOCK_AUTH_TOKEN;
  },
};
