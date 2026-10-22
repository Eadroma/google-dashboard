import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncAcrossTabs } from '@utils/storage.utils';
import type { Locale } from '@locales/translations';

interface LocaleState {
  locale: Locale;
}

interface LocaleActions {
  /** Switch the dashboard language. */
  setLocale: (locale: Locale) => void;
}

/**
 * Stores the user's chosen display language.
 * Persisted to localStorage and kept in sync across open tabs.
 */
export const useLocaleStore = create<LocaleState & LocaleActions>()(
  persist(
    (set) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'dashboard-locale',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

syncAcrossTabs(useLocaleStore);
