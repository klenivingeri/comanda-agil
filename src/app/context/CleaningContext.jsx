"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { dbManager } from "src/db/IndexedDBManager";

const CleaningContext = createContext();

export function CleaningProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const logout = useCallback(async () => {
    sessionStorage.clear();
    await dbManager.recreateDatabase();
    localStorage.clear();
  }, []);

  const triggerCleaning = useCallback(async () => {
    await dbManager.recreateDatabase();
    const theme = localStorage.getItem("theme");
    const themeBtn = localStorage.getItem("theme-button");
    const vibrate = localStorage.getItem("vibrate-button");
    const customer = localStorage.getItem("customer");

    localStorage.clear();
    sessionStorage.clear();

    if (theme) localStorage.setItem("theme", theme);
    if (customer) localStorage.setItem("customer", customer);
    if (themeBtn) localStorage.setItem("theme-button", themeBtn);
    if (vibrate) localStorage.setItem("vibrate-button", vibrate);

    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <CleaningContext.Provider value={{ refreshKey, triggerCleaning, logout }}>
      {children}
    </CleaningContext.Provider>
  );
}

export const useCleaningTrigger = () => useContext(CleaningContext);
