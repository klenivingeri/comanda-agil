import { Inter, Roboto } from "next/font/google";
import { isMobile } from "react-device-detect";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "ComandaGo",
  description: "Aplicativo de gerenciamento de comandas",
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};
//select-none
export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="h-full ">
      <body
        className={`${inter.variable} ${roboto.variable} antialiased m-0 p-0 h-full flex justify-center`}
      >
        <div className="w-full background antialiased m-0 p-0 h-full flex justify-center">
          <div
            id="container"
            className="flex w-full md:max-w-[768px] relative h-full"
          >
            <Providers>
              <main className="flex-1 h-full">{children}</main>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
