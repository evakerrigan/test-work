import { apiClient } from '@/shared/api';

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
    const { data } = await apiClient.get<ContactDto>(`/contacts/${id}`);
    return data;
  },

  async updateById(id: string | number, payload: UpdateContactPayload) {
    await apiClient.patch(`/contacts/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
