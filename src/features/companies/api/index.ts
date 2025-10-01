// import { apiClient } from '@/shared/api';
import { MOCK_COMPANIES, mockDelay } from '@/shared/api/mockData';

export type CompanyTypeCode =
  | 'funeral_home'
  | 'logistics_services'
  | 'burial_care_contractor';

export interface CompanyContractDto {
  no: string;
  issue_date: string;
}

export interface CompanyPhotoDto {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

export interface CompanyDto {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: CompanyContractDto;
  type: CompanyTypeCode[];
  status: string;
  photos: CompanyPhotoDto[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCompanyPayload {
  name?: string;
  shortName?: string;
  businessEntity?: string;
  contract?: Partial<CompanyContractDto>;
  type?: CompanyTypeCode[];
}

export const companiesApi = {
  async getById(id: string | number): Promise<CompanyDto> {
    // ========== ЗАКОММЕНТИРОВАН СТАРЫЙ КОД С РЕАЛЬНЫМ API ==========
    // const { data } = await apiClient.get<CompanyDto>(`/companies/${id}`);
    // return data;
    // ========== КОНЕЦ СТАРОГО КОДА ==========

    // НОВЫЙ КОД: Используем моковые данные
    await mockDelay(250);

    const company = MOCK_COMPANIES[String(id)];
    if (!company) {
      throw new Error(`Company with id ${id} not found`);
    }

    return company;
  },

  async updateById(
    id: string | number,
    payload: UpdateCompanyPayload
  ): Promise<void> {
    // ========== ЗАКОММЕНТИРОВАН СТАРЫЙ КОД С РЕАЛЬНЫМ API ==========
    // await apiClient.patch(`/companies/${id}`, payload, {
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // ========== КОНЕЦ СТАРОГО КОДА ==========

    // НОВЫЙ КОД: Используем моковые данные
    await mockDelay(250);

    const company = MOCK_COMPANIES[String(id)];
    if (!company) {
      throw new Error(`Company with id ${id} not found`);
    }

    // Обновляем компанию в памяти
    if (payload.name !== undefined) company.name = payload.name;
    if (payload.shortName !== undefined) company.shortName = payload.shortName;
    if (payload.businessEntity !== undefined)
      company.businessEntity = payload.businessEntity;
    if (payload.type !== undefined) company.type = payload.type;
    if (payload.contract !== undefined) {
      company.contract = { ...company.contract, ...payload.contract };
    }
    company.updatedAt = new Date().toISOString();
  },

  async uploadImage(id: string | number, file: File): Promise<CompanyPhotoDto> {
    // ========== ЗАКОММЕНТИРОВАН СТАРЫЙ КОД С РЕАЛЬНЫМ API ==========
    // const form = new FormData();
    // form.append('file', file);
    // const { data } = await apiClient.post<CompanyPhotoDto>(
    //   `/companies/${id}/image`,
    //   form,
    //   { headers: { 'Content-Type': 'multipart/form-data' } }
    // );
    // return data;
    // ========== КОНЕЦ СТАРОГО КОДА ==========

    // НОВЫЙ КОД: Используем моковые данные
    await mockDelay(500); // Загрузка файла дольше

    const company = MOCK_COMPANIES[String(id)];
    if (!company) {
      throw new Error(`Company with id ${id} not found`);
    }

    // Создаем моковое фото
    const newPhoto: CompanyPhotoDto = {
      name: file.name,
      filepath: URL.createObjectURL(file), // Создаем временный URL для превью
      thumbpath: URL.createObjectURL(file),
      createdAt: new Date().toISOString(),
    };

    // Добавляем фото к компании
    company.photos.push(newPhoto);

    return newPhoto;
  },

  async deleteImage(id: string | number, imageName: string): Promise<void> {
    // ========== ЗАКОММЕНТИРОВАН СТАРЫЙ КОД С РЕАЛЬНЫМ API ==========
    // await apiClient.delete(`/companies/${id}/image/${imageName}`);
    // ========== КОНЕЦ СТАРОГО КОДА ==========

    // НОВЫЙ КОД: Используем моковые данные
    await mockDelay(200);

    const company = MOCK_COMPANIES[String(id)];
    if (!company) {
      throw new Error(`Company with id ${id} not found`);
    }

    // Удаляем фото из массива
    company.photos = company.photos.filter((photo) => photo.name !== imageName);
  },

  async deleteById(id: string | number): Promise<void> {
    // ========== ЗАКОММЕНТИРОВАН СТАРЫЙ КОД С РЕАЛЬНЫМ API ==========
    // await apiClient.delete(`/companies/${id}`);
    // ========== КОНЕЦ СТАРОГО КОДА ==========

    // НОВЫЙ КОД: Используем моковые данные
    await mockDelay(300);

    if (!MOCK_COMPANIES[String(id)]) {
      throw new Error(`Company with id ${id} not found`);
    }

    // Удаляем компанию из памяти
    delete MOCK_COMPANIES[String(id)];
  },
};
