// import { apiClient } from '@/shared/api';
import { MOCK_CONTACTS, mockDelay } from '@/shared/api/mockData';

export interface ContactDto {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateContactPayload {
  lastname?: string;
  firstname?: string;
  phone?: string;
  email?: string;
}

export const contactsApi = {
  async getById(id: string | number): Promise<ContactDto> {
    // ========== ЗАКОММЕНТИРОВАН СТАРЫЙ КОД С РЕАЛЬНЫМ API ==========
    // const { data } = await apiClient.get<ContactDto>(`/contacts/${id}`);
    // return data;
    // ========== КОНЕЦ СТАРОГО КОДА ==========

    // НОВЫЙ КОД: Используем моковые данные
    await mockDelay(200);

    const contact = MOCK_CONTACTS[String(id)];
    if (!contact) {
      throw new Error(`Contact with id ${id} not found`);
    }

    return contact;
  },

  async updateById(id: string | number, payload: UpdateContactPayload) {
    // ========== ЗАКОММЕНТИРОВАН СТАРЫЙ КОД С РЕАЛЬНЫМ API ==========
    // await apiClient.patch(`/contacts/${id}`, payload, {
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // ========== КОНЕЦ СТАРОГО КОДА ==========

    // НОВЫЙ КОД: Используем моковые данные
    await mockDelay(200);

    const contact = MOCK_CONTACTS[String(id)];
    if (!contact) {
      throw new Error(`Contact with id ${id} not found`);
    }

    // Обновляем контакт в памяти
    Object.assign(contact, payload);
    contact.updatedAt = new Date().toISOString();
  },
};
