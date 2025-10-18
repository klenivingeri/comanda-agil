"use client";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useCleaningTrigger } from "./CleaningContext";
import { fetchAndCache } from "../utils/fetchAndCache";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const { refreshKey } = useCleaningTrigger();
  const [menuSave, setMenuSave] = useState({ all: [], error: false, isLoading: true });

  const getMenu = useCallback(() => fetchAndCache("/api/menu", "menu", setMenuSave), []);

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("menu"));
    if (saved?.length > 0) {
      setMenuSave({ all: saved, error: false, isLoading: false });
    } else {
      getMenu();
    }
  }, [getMenu, refreshKey]);

  const _menu = useMemo(() => ({ get: getMenu, ...menuSave }), [menuSave, getMenu]);
  return <MenuContext.Provider value={{ _menu }}>{children}</MenuContext.Provider>;
}

export const useMenu = () => useContext(MenuContext);