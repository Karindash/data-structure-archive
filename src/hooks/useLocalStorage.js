import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pencatat-skenario-v1';

/**
 * Custom hook for localStorage with automatic sync
 */
export const useLocalStorage = (initialValue = { scenarios: [] }) => {
  const [data, setData] = useState(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed && Array.isArray(parsed.scenarios)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [data]);

  return [data, setData];
};
