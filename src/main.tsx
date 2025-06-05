import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';

// Initialize theme from localStorage
const theme = localStorage.getItem('settings-storage')
  ? JSON.parse(localStorage.getItem('settings-storage')!).state.theme
  : 'light';

if (theme === 'dark') {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);