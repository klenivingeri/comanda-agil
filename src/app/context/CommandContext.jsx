"use client";
import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CommandContext = createContext();

export function CommandProvider({ children }) {
  const [commandSave, setCommandSave] = useState({ all: [], error: false, isLoading: false });

  const getComandas = useCallback(async (params = "") => {

    try {
      setCommandSave((rest) => ({ ...rest, isLoading: true }));
      const res = await fetch(`/api/comandas${params}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data?.records.length > 0) {
        setCommandSave({ all: data.records, error: false, isLoading: false });
      } else {
        setCommandSave({ all: [], error: true, isLoading: false });
      }
    } catch {
      setCommandSave({ all: [], error: true, isLoading: false });
    }
  }, []);

  const _command = useMemo(() => ({ get: getComandas, ...commandSave }), [commandSave, getComandas]);
  return <CommandContext.Provider value={{ _command }}>{children}</CommandContext.Provider>;
}

export const useCommand = () => useContext(CommandContext);
