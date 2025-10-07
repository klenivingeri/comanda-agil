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

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="overflow-y-scroll">
      <body className={`${inter.variable} ${roboto.variable} antialiased`}>
        <div className="min-h-screen flex justify-center">
          {/* Container central */}
          <div
            id="container"
            className="flex w-full md:max-w-[768px] min-h-screen relative"
          >
            <Providers>
              <main className="flex-1">{children}</main>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
