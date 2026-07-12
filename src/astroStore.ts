import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JungResult {
  dominant: string;
  secondary: string;
  scores: Record<string, number>;
}

interface AstroState {
  jungResult: JungResult | null;
  setJungResult: (result: JungResult) => void;
  clearJungResult: () => void;
}

export const useAstroStore = create<AstroState>()(
  persist(
    (set) => ({
      jungResult: null,

      setJungResult: (result) => set({ jungResult: result }),

      clearJungResult: () => set({ jungResult: null }),
    }),
    {
      name: 'astro-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
