import { useEffect, useState } from "react";

/**
 * useState that persists its value to localStorage under `key`.
 * Writes on every change, reads lazily on first render.
 * Falls back gracefully if storage is unavailable (private mode, etc.).
 */
export default function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn(`Could not read "${key}" from localStorage.`, err);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Could not save "${key}" to localStorage.`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
