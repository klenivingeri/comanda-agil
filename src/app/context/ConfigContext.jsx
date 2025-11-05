"use client";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useCleaningTrigger } from "./CleaningContext";
import { isEmpty } from "../utils/empty";
const DEFAULT_CONFIG = {
  _config: {
    handleVibrate: () => { },
    hasVibrate: "off",
  },
};

const ConfigContext = createContext(DEFAULT_CONFIG);

export function ConfigProvider({ children }) {
  const { refreshKey } = useCleaningTrigger();
  const [hasVibrate, setHasVibrate] = useState("off");

  const handleVibrate = useCallback((vibrate) => {
    setHasVibrate(vibrate);
    localStorage.setItem("vibrate-button", vibrate);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedThemeButton = localStorage.getItem("theme-button");
    const savedVibrateButton = localStorage.getItem("vibrate-button");

    const root = document.documentElement;

    if (savedTheme) {
      root.classList.add(savedTheme);
    }

    if (isEmpty(savedThemeButton)) {
      root.classList.add("btn-orange");
      localStorage.setItem("theme-button", "btn-orange");
    } else {
      root.classList.add(savedThemeButton);
    }

    if (!isEmpty(savedVibrateButton)) {
      setHasVibrate(savedVibrateButton);
    } else {
      setHasVibrate("off");
    }
  }, [refreshKey]);

  const _config = useMemo(() => ({
    handleVibrate,
    hasVibrate,
  }), [handleVibrate, hasVibrate]);

  return (
    <ConfigContext.Provider value={{ _config }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);
