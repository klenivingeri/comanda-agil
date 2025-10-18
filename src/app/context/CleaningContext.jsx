"use client";
import { createContext, useContext, useState, useCallback } from "react";

const CleaningContext = createContext();

export function CleaningProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerCleaning = useCallback(() => {
    // 🔹 Limpa sessionStorage e localStorage
    sessionStorage.clear();
    // Mantém o tema e vibração se quiser
    const theme = localStorage.getItem("theme");
    const themeBtn = localStorage.getItem("theme-button");
    const vibrate = localStorage.getItem("vibrate-button");
    localStorage.clear();
    if (theme) localStorage.setItem("theme", theme);
    if (themeBtn) localStorage.setItem("theme-button", themeBtn);
    if (vibrate) localStorage.setItem("vibrate-button", vibrate);

    // 🔹 Atualiza a chave pra forçar re-fetch nos outros contextos
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <CleaningContext.Provider value={{ refreshKey, triggerCleaning }}>
      {children}
    </CleaningContext.Provider>
  );
}

export const useCleaningTrigger = () => useContext(CleaningContext);
