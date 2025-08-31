import { makeAutoObservable, runInAction } from 'mobx';
import {
  companiesApi,
  type CompanyDto,
  type UpdateCompanyPayload,
  type CompanyPhotoDto,
} from '../api';

export class CompanyStore {
  company: CompanyDto | null = null;
  isLoading = false;
  isSaving = false;
  error: string | null = null;
  isDeleting = false;

  constructor() {
    makeAutoObservable(this);
  }

  async load(id: string | number) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await companiesApi.getById(id);
      runInAction(() => {
        this.company = data;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load company';
      });
      throw e;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async update(id: string | number, payload: UpdateCompanyPayload) {
    this.isSaving = true;
    this.error = null;
    try {
      await companiesApi.updateById(id, payload);

      runInAction(() => {
        if (!this.company) return;
        this.company = {
          ...this.company,
          ...payload,
          contract: {
            ...this.company.contract,
            ...(payload.contract ?? {}),
          },
          type: payload.type ?? this.company.type,
        } as CompanyDto;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to save company';
      });
      throw e;
    } finally {
      runInAction(() => {
        this.isSaving = false;
      });
    }
  }

  async uploadPhoto(id: string | number, file: File) {
    this.isSaving = true;
    try {
      const photo = await companiesApi.uploadImage(id, file);
      runInAction(() => {
        if (!this.company) return;
        const prev = this.company.photos || [];
        this.company = {
          ...this.company,
          photos: [...prev, photo as CompanyPhotoDto],
        } as CompanyDto;
      });
    } finally {
      runInAction(() => {
        this.isSaving = false;
      });
    }
  }

  async deletePhoto(id: string | number, imageName: string) {
    this.isSaving = true;
    try {
      await companiesApi.deleteImage(id, imageName);
      runInAction(() => {
        if (!this.company || !this.company.photos) return;
        this.company = {
          ...this.company,
          photos: this.company.photos.filter((p) => p.name !== imageName),
        } as CompanyDto;
      });
    } finally {
      runInAction(() => {
        this.isSaving = false;
      });
    }
  }

  async delete(id: string | number) {
    this.isDeleting = true;
    this.error = null;
    try {
      await companiesApi.deleteById(id);
      runInAction(() => {
        this.company = null;
      });
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : 'Failed to delete company';
      });
      throw e;
    } finally {
      runInAction(() => {
        this.isDeleting = false;
      });
    }
  }
}

export const companyStore = new CompanyStore();
