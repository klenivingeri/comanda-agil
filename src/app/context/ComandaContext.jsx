"use client";
import { createContext, useState, useContext } from "react";

export const ComandaContext = createContext();

export function ComandaProvider({ children }) {
  const [comanda, setComanda] = useState({ id: '1234-test' });

  return (
    <ComandaContext.Provider value={{ comanda, setComanda }}>
      {children}
    </ComandaContext.Provider>
  );
}

export const useComanda = () => useContext(ComandaContext);
