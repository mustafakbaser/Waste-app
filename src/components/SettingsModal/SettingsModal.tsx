import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, X, Sun, Moon } from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { theme, language, setTheme, setLanguage } = useSettingsStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  ];

  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    setLanguage(langCode);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="settings-modal" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left shadow-2xl transition-all animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <h3 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                {t('settings.title')}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              {t('settings.theme')}
            </h4>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                {theme === 'light' ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-400" />
                )}
                <span className="ml-3 text-gray-900 dark:text-white">
                  {theme === 'light' ? t('settings.lightMode') : t('settings.darkMode')}
                </span>
              </div>
            </button>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              {t('settings.language')}
            </h4>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full flex items-center p-4 rounded-xl transition-all duration-200
                    ${language === lang.code
                      ? 'bg-blue-50 dark:bg-blue-900/50 ring-2 ring-blue-500'
                      : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'}
                  `}
                >
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <span className={`
                    flex-1 text-left
                    ${language === lang.code
                      ? 'text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-gray-700 dark:text-gray-200'}
                  `}>
                    {lang.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;