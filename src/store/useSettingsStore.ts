import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'settings-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: 'en', // Always default to English in storage
      }),
    }
  )
);

export default useSettingsStore;