import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
  activeOption: 'begin' | 'settings' | 'about' | 'resume' | 'exit';
  isPaused: boolean;
  soundEnabled: boolean;
  storeCookies: boolean;
  setActiveOption: (option: 'begin' | 'settings' | 'about' | 'resume' | 'exit') => void;
  togglePause: () => void;
  toggleSound: () => void;
  toggleStoreCookies: () => void;
}

export const useMenuStore = create<MenuState>()(
  (set) => ({
    activeOption: 'begin',
    isPaused: false,
    soundEnabled: true,
    storeCookies: true,
    setActiveOption: (option) => set({ activeOption: option }),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    toggleStoreCookies: () => set((state) => ({ storeCookies: !state.storeCookies })),
  })
);
