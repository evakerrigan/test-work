import { apiClient } from '@/shared/api';

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
    const { data } = await apiClient.get<CompanyDto>(`/companies/${id}`);
    return data;
  },

  async updateById(
    id: string | number,
    payload: UpdateCompanyPayload
  ): Promise<void> {
    await apiClient.patch(`/companies/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  async uploadImage(id: string | number, file: File): Promise<CompanyPhotoDto> {
    const form = new FormData();
    form.append('file', file);
    const { data } = await apiClient.post<CompanyPhotoDto>(
      `/companies/${id}/image`,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  },

  async deleteImage(id: string | number, imageName: string): Promise<void> {
    await apiClient.delete(`/companies/${id}/image/${imageName}`);
  },

  async deleteById(id: string | number): Promise<void> {
    await apiClient.delete(`/companies/${id}`);
  },
};
