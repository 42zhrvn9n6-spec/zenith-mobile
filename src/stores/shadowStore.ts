import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ShadowResult {
  dominant: string;
  secondary: string;
  scores: Record<string, number>;
  completedAt?: string;
}

interface ShadowState {
  results: ShadowResult | null;
  answers: Record<number, number>;
  currentQuestion: number;
  isLoading: boolean;
  setAnswer: (questionId: number, optionIndex: number) => void;
  setResults: (results: ShadowResult) => void;
  resetTest: () => void;
  clearResults: () => void;
}

export const useShadowStore = create<ShadowState>()(
  persist(
    (set) => ({
      results: null,
      answers: {},
      currentQuestion: 0,
      isLoading: false,
      
      setAnswer: (questionId, optionIndex) => set((state) => ({
        answers: { ...state.answers, [questionId]: optionIndex },
        currentQuestion: state.currentQuestion + 1
      })),
      
      setResults: (results) => set({ results, isLoading: false }),
      
      resetTest: () => set({ answers: {}, currentQuestion: 0, results: null }),
      
      clearResults: () => set({ results: null }),
    }),
    {
      name: 'shadow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
