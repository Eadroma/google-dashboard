import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncAcrossTabs } from '@utils/storage.utils';
import type { Theme, Background } from '@app-types/theme.types';

interface ThemeActions {
  /**
   * Replace the dashboard background.
   * @param background - New background definition
   */
  setBackground: (background: Background) => void;
}

type ThemeStore = Theme & ThemeActions;

const defaultTheme: Theme = {
  background: { type: 'solid', color: '#0f172a' },
};

/**
 * Manages the visual theme of the dashboard.
 * Persisted to localStorage and kept in sync across open tabs.
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...defaultTheme,
      setBackground: (background) => set({ background }),
    }),
    {
      name: 'dashboard-theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

syncAcrossTabs(useThemeStore);
