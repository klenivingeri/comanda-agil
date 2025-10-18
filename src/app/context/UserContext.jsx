"use client";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useCleaningTrigger } from "./CleaningContext";
import { fetchAndCache } from "../utils/fetchAndCache";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { refreshKey } = useCleaningTrigger();
  const [userSave, setUserSave] = useState({ all: [], error: false, isLoading: true });

  const getUser = useCallback(() => fetchAndCache("/api/user", "user", setUserSave, true), []);

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("user"));
    if (saved?.length > 0) {
      setUserSave({ all: saved, error: false, isLoading: false });
    } else {
      getUser();
    }
  }, [getUser, refreshKey]);


  const _user = useMemo(() => ({
    get: getUser,
    ...userSave
  }), [getUser, userSave]);

  return (
    <UserContext.Provider value={{ _user }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserConfig = () => useContext(UserContext);