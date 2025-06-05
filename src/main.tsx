import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';

// Initialize theme and language from localStorage or defaults
const settings = localStorage.getItem('settings-storage')
  ? JSON.parse(localStorage.getItem('settings-storage')!)
  : { state: { theme: 'light', language: 'en' } };

// Apply theme
if (settings.state.theme === 'dark') {
  document.documentElement.classList.add('dark');
}

// Set HTML lang attribute
document.documentElement.lang = 'en';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);