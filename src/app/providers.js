"use client";
import { usePathname } from "next/navigation";
import { ConfigProvider } from "./context/ConfigContext";
import { UserProvider } from "./context/UserContext";
export default function Providers({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith("/login")) {
    return children;
  }

  return (
    <ConfigProvider>
      <UserProvider>{children}</UserProvider>
    </ConfigProvider>
  );
}
