"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { isEmpty } from "../utils/empty";

export const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  const [color, setColor] = useState({ id: '1234-test' });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedThemeButton = localStorage.getItem("theme-button");
    const root = window.document.documentElement;
    root.classList.add(savedTheme);
    if (isEmpty(savedThemeButton)) {
      root.classList.add('btn-orange');
      localStorage.setItem("theme-button", 'btn-orange');
    }
    root.classList.add(savedThemeButton);
  }, []);

  return (
    <ConfigContext.Provider value={{ color, setColor }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);
