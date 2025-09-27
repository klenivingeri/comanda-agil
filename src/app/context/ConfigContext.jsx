"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { isEmpty } from "../utils/empty";

export const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  const [hasVibrate, setHasVibrate] = useState("off");

  const handleVibrate = (vibrate) => {
    setHasVibrate(vibrate);
    localStorage.setItem("vibrate-button", vibrate);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedThemeButton = localStorage.getItem("theme-button");
    const savedVibrateButton = localStorage.getItem("vibrate-button");

    const root = window.document.documentElement;

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
    }
  }, []);

  return (
    <ConfigContext.Provider value={{ handleVibrate, hasVibrate }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);