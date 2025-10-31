import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings, Language, HistoryItem } from '@/types';
import { getStorageData, saveSettings } from '@/lib/storage';

interface AppContextType {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  language: Language;
  history: HistoryItem[];
  refreshHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => getStorageData().settings);
  const [history, setHistory] = useState<HistoryItem[]>(() => getStorageData().history);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
  };

  const refreshHistory = () => {
    setHistory(getStorageData().history);
  };

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (theme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    };

    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');
      
      const handler = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      applyTheme(settings.theme);
    }
  }, [settings.theme]);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        language: settings.language,
        history,
        refreshHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
