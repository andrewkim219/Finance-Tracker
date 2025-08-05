import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const [storageKey, setStorageKey] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error parsing storageKey from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storageKey));
    } catch (error) {
      console.error("Error setting storageKey in localStorage", error);
    }
  }, [key, storageKey]);

  return [storageKey, setStorageKey];
}
