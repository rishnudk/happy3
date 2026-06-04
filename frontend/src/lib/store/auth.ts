import { create } from 'zustand';
import type { User } from '@/types/auth';

interface AuthState {
  isInitialized: boolean;
  user: User | null;
  isAdmin: boolean;
  setCredentials: (data: { user: User; isAdmin?: boolean }) => void;
  setInitialized: (initialized: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isInitialized: false,
  user: null,
  isAdmin: false,
  setCredentials: ({ user, isAdmin }) =>
    set({
      user,
      isAdmin: isAdmin !== undefined ? isAdmin : user.role === 'ADMIN',
    }),
  setInitialized: (initialized) => set({ isInitialized: initialized }),
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    set({ user: null, isAdmin: false });
  },
}));
