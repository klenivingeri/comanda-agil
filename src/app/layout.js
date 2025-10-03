import { Montserrat, Poppins } from "next/font/google";

import Providers from "./providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased `} //select-none
      >
        <div className="flex justify-center min-h-screen">
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
