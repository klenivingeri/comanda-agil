"use client";
import { usePathname } from "next/navigation";
import { ConfigProvider } from "./context/ConfigContext";
import { UserProvider } from "./context/UserContext";
import { ItemProvider } from "./context/ItemContext";
import { MenuProvider } from "./context/MenuContext";
import { CategoryProvider } from "./context/CategoryContext";
import { CommandProvider } from "./context/CommandContext";
import { CleaningProvider } from "./context/CleaningContext";

export default function Providers({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith("/login")) {
    return children;
  }

  return (
    <CleaningProvider>
      <ConfigProvider>
        <CategoryProvider>
          <ItemProvider>
            <UserProvider>
              <MenuProvider>
                <CommandProvider>{children}</CommandProvider>
              </MenuProvider>
            </UserProvider>
          </ItemProvider>
        </CategoryProvider>
      </ConfigProvider>
    </CleaningProvider>
  );
}
