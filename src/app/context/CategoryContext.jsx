"use client";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useCleaningTrigger } from "./CleaningContext";
import { fetchAndCache } from "../utils/fetchAndCache";
import { usePathname } from 'next/navigation';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const pathname = usePathname()
  const { refreshKey } = useCleaningTrigger();
  const [categorySave, setCategorySave] = useState({ all: [], error: false, isLoading: true });

  const getCategory = useCallback(() => fetchAndCache("/api/category", "categories", setCategorySave), []);

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("categories"));
    if (saved?.length > 0) {
      setCategorySave({ all: saved, error: false, isLoading: false });
    } else {
      if (pathname === '/login') return;
      getCategory();
    }
  }, [getCategory, refreshKey]);

  const _category = useMemo(() => ({ get: getCategory, ...categorySave }), [categorySave, getCategory]);
  return <CategoryContext.Provider value={{_category}}>{children}</CategoryContext.Provider>;
}

export const useCategory = () => useContext(CategoryContext);