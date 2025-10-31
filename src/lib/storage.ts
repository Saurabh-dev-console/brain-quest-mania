import { AppSettings, HistoryItem, Language } from '@/types';

const STORAGE_KEY = 'brainchecker:v1';

interface StorageData {
  settings: AppSettings;
  history: HistoryItem[];
}

const defaultSettings: AppSettings = {
  theme: 'system',
  language: 'en',
  soundEnabled: true,
};

export const getStorageData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return { settings: defaultSettings, history: [] };
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading storage:', error);
    return { settings: defaultSettings, history: [] };
  }
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    const data = getStorageData();
    data.settings = settings;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const saveHistory = (item: HistoryItem): void => {
  try {
    const data = getStorageData();
    data.history = [item, ...data.history].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

export const clearHistory = (): void => {
  try {
    const data = getStorageData();
    data.history = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

export const resetAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting data:', error);
  }
};

export const getBestScores = (history: HistoryItem[]) => {
  const grouped = history.reduce((acc, item) => {
    const key = `${item.config.mode}-${item.config.difficulty}`;
    if (!acc[key] || item.finalScore > acc[key].finalScore) {
      acc[key] = item;
    }
    return acc;
  }, {} as Record<string, HistoryItem>);

  return Object.values(grouped);
};
