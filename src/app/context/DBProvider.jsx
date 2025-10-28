import React, { useEffect } from 'react';
import { dbManager } from 'src/db/IndexedDBManager';

const DBProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && dbManager) {
      dbManager.openDB()
        .then()
        .catch(err => {
          console.error("Falha ao iniciar o IndexedDB:", err);
        });
    }
  }, []);

  return <>{children}</>;
};

export default DBProvider;