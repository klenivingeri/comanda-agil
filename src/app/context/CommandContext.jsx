"use client";
import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { isEmpty } from "../utils/empty";

const CommandContext = createContext();

export function CommandProvider({ children }) {
  const [commandSave, setCommandSave] = useState({ all: [], error: false, isLoading: true });

  const getComandas = useCallback(async () => {
    try {
      setCommandSave((rest) => ({ ...rest, isLoading: true }));
      const res = await fetch("/api/comandas");
      const data = await res.json();
      if (isEmpty(data?.records)) {
        setCommandSave({ all: [], error: true, isLoading: false });
      } else {
        setCommandSave({ all: data.records, error: false, isLoading: false });
      }
    } catch {
      setCommandSave({ all: [], error: true, isLoading: false });
    }
  }, []);

  const value = useMemo(() => ({ get: getComandas, ...commandSave }), [commandSave, getComandas]);
  return <CommandContext.Provider value={value}>{children}</CommandContext.Provider>;
}

export const useCommand = () => useContext(CommandContext);
