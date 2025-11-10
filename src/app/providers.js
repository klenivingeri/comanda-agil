"use client";
import { usePathname } from "next/navigation";
import DBProvider from "./context/DBProvider";
import { ConfigProvider } from "./context/ConfigContext";
import { MenuProvider } from "./context/MenuContext";
import { CommandProvider } from "./context/CommandContext";
import { CleaningProvider } from "./context/CleaningContext";


export default function Providers({ children }) {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/cadastrar-empresa") {
    return children;
  }

  return (
    <DBProvider>
      <CleaningProvider>
        <ConfigProvider>
            <MenuProvider>
              <CommandProvider>{children}</CommandProvider>
            </MenuProvider>
        </ConfigProvider>
      </CleaningProvider>
    </DBProvider>
  );
}
