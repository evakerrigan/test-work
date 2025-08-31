import { makeAutoObservable, runInAction } from 'mobx';
import {
  contactsApi,
  type ContactDto,
  type UpdateContactPayload,
} from '../api';

export class ContactStore {
  contact: ContactDto | null = null;
  isLoading = false;
  isSaving = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async load(id: string | number) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await contactsApi.getById(id);
      runInAction(() => {
        this.contact = data;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load contact';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async update(id: string | number, payload: UpdateContactPayload) {
    this.isSaving = true;
    this.error = null;
    try {
      await contactsApi.updateById(id, payload);
      runInAction(() => {
        if (!this.contact) return;
        this.contact = { ...this.contact, ...payload } as ContactDto;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to save contact';
      });
      throw e;
    } finally {
      runInAction(() => {
        this.isSaving = false;
      });
    }
  }
}

export const contactStore = new ContactStore();
