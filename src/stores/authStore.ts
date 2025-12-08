import {
  persist,
  createJSONStorage,
  type StateStorage,
} from 'zustand/middleware';
import { create } from 'zustand';
import type { Admin } from '@/interfaces';

interface AuthStore {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (admin: Admin, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      setAuth: (admin: Admin, token: string) => {
        set({
          admin,
          token,
          isAuthenticated: true,
        });
        localStorage.setItem('authToken', token);
      },
      clearAuth: () => {
        set({ admin: null, token: null, isAuthenticated: false });
        localStorage.removeItem('authToken');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage as StateStorage),
    },
  ),
);
