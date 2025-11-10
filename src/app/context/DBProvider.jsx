"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { dbManager } from 'src/db/IndexedDBManager';

const DBContext = createContext({ isDBReady: false });

export default function DBProvider({ children }) {
  const [isDBReady, setIsDBReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && dbManager) {
      dbManager.openDB()
        .then(() => {
          console.log("✅ IndexedDB pronto para uso.");
          setIsDBReady(true);
        })
        .catch(err => {
          console.error("Falha ao iniciar o IndexedDB:", err);
        });
    }
  }, []);

  return <DBContext.Provider value={{ isDBReady }}>{children}</DBContext.Provider>;
}

export const useDB = () => useContext(DBContext);