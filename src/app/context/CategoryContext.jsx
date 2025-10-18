"use client";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { fetchAndCache } from "../utils/fetchAndCache";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categorySave, setCategorySave] = useState({ all: [], error: false, isLoading: true });

  const getCategory = useCallback(() => fetchAndCache("/api/category", "categories", setCategorySave), []);

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("categories"));
    if (saved?.length > 0) {
      setCategorySave({ all: saved, error: false, isLoading: false });
    } else {
      getCategory();
    }
  }, [getCategory]);

  const value = useMemo(() => ({ get: getCategory, ...categorySave }), [categorySave, getCategory]);
  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export const useCategory = () => useContext(CategoryContext);