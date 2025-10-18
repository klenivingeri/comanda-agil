"use client";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { fetchAndCache } from "../utils/fetchAndCache";

const ItemContext = createContext();

export function ItemProvider({ children }) {
  const [itemSave, setItemSave] = useState({ all: [], error: false, isLoading: true });

  const getItems = useCallback(() => fetchAndCache("/api/items", "items-command", setItemSave), []);

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("items-command"));
    if (saved?.length > 0) {
      setItemSave({ all: saved, error: false, isLoading: false });
    } else {
      getItems();
    }
  }, [getItems]);

  const value = useMemo(() => ({ get: getItems, ...itemSave }), [itemSave, getItems]);
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}

export const useItem = () => useContext(ItemContext);