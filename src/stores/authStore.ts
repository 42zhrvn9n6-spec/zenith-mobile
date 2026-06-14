import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id?: string;
  name?: string;
  birthData?: {
    date: string;
    time: string;
    city: string;
    lat?: number;
    lng?: number;
  };
}

interface AuthState {
  isGuest: boolean;
  user: User | null;
  setGuest: () => void;
  setUser: (user: User) => void;
  updateBirthData: (birthData: User['birthData']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isGuest: true,
      user: null,
      
      setGuest: () => set({ isGuest: true, user: null }),
      
      setUser: (user) => set({ isGuest: false, user }),
      
      updateBirthData: (birthData) => set((state) => ({
        user: { ...state.user, birthData }
      })),
      
      logout: () => set({ isGuest: true, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
