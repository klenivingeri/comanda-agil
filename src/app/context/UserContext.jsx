"use client";

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useCleaningTrigger } from "./CleaningContext";
import { fetchAndCache } from "../utils/fetchAndCache";
import { usePathname } from 'next/navigation';
 
const DEFAULT_USER_STATE = {
  _user: {
    all: [],
    error: false,
    isLoading: true,
    get: () => {},
    clear: () => {},
  },
};

const UserContext = createContext(DEFAULT_USER_STATE);

export function UserProvider({ children }) {
  const pathname = usePathname()
  const router = useRouter();
  const { refreshKey } = useCleaningTrigger();
  const [userSave, setUserSave] = useState({ all: [], error: false, isLoading: true });

  const getUser = useCallback(() => fetchAndCache("/api/user/perfil", "user", setUserSave, true), [] ,'catalog_users');

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("user"));
    if (saved?.length > 0) {
      setUserSave({ all: saved, error: false, isLoading: false });
    } else {
      if( pathname === '/login' ) return;
      getUser();
    }
  }, [getUser, refreshKey]);


  const clear = () => {
    sessionStorage.removeItem("user");
    router.push('/login');
  }

  const _user = useMemo(() => ({
    clear,
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