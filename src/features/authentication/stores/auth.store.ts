import { makeAutoObservable, runInAction } from 'mobx';
import { authApi } from '../api';
import { setAuthToken } from '@/shared/api';

const STORAGE_KEY = 'af_auth_token';

export class AuthStore {
  token: string | null = null;
  userName: string | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    const savedToken = localStorage.getItem(STORAGE_KEY);
    if (savedToken) {
      this.token = savedToken;
      setAuthToken(savedToken);
    }
  }

  get isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  async signIn(userName: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const token = await authApi.signIn(userName);
      runInAction(() => {
        this.token = token;
        this.userName = userName;
        localStorage.setItem(STORAGE_KEY, token);
        setAuthToken(token);
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Sign-in failed';
      });
      throw e;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  signOut() {
    this.token = null;
    this.userName = null;
    this.error = null;
    localStorage.removeItem(STORAGE_KEY);
    setAuthToken(null);
  }
}

export const authStore = new AuthStore();
