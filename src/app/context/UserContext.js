"use client";
import { createContext, useState, useContext, useEffect } from "react";

export const ConfigContext = createContext();
const defaultValue = {};

export function UserProvider({ children }) {
  const [user, setUserSave] = useState({
    all: {},
    error: false,
    isLoading: true,
  });

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const user = await res.json();

      setUserSave({ all: user.records[0], error: false, isLoading: false });
      if (user.records) {
        sessionStorage.setItem("user", JSON.stringify(user.records[0]));
      }
    } catch (_) {
      setUserSave({ all: [], error: true, isLoading: false });
    } finally {
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    if (savedUser?.length > 0) {
      setUserSave({ all: savedUser, error: false, isLoading: false });
    } else {
      getUser();
    }
  }, []);

  const _user = {
    get: getUser,
    ...user,
  };

  return (
    <ConfigContext.Provider value={{ _user }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useUserConfig = () => useContext(ConfigContext) || defaultValue;
