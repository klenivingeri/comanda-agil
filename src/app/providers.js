"use client";
import { usePathname } from "next/navigation";
import { ConfigProvider } from "./context/ConfigContext";

export default function Providers({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith("/login")) {
    return children;
  }

  return <ConfigProvider>{children}</ConfigProvider>;
}
