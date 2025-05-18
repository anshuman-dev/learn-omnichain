import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  currentPage: string;
  completedPages: string[];
  setCurrentPage: (page: string) => void;
  markPageComplete: (page: string) => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPage: 'void',
      completedPages: [],
      setCurrentPage: (page) => set({ currentPage: page }),
      markPageComplete: (page) => set((state) => ({
        completedPages: [...state.completedPages, page]
      })),
      resetProgress: () => set({ currentPage: 'void', completedPages: [] })
    }),
    {
      name: 'layerzero-progress-storage',
    }
  )
);
