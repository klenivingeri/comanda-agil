import { Inter, Roboto, Poppins } from "next/font/google";

import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "ComandaGo",
  description: "Aplicativo de gerenciamento de comandas",
  manifest: "/manifest.json",
  icons: {
    apple: [
      {
        url: "/assets/logo.png", 
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ComandaGo",
  },
};

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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-poppins",
});


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};
//

//tag html select-none overscroll-y-contain
//tag div touch-pan-y
export default function RootLayout({ children }) {

  return (
    <html lang="pt" className="h-full">
      <body
        className={`${poppins.variable} ${inter.variable} ${roboto.variable} antialiased m-0 p-0 h-full flex justify-center select-none`}
      >
        <div
          id="container"
          className="flex w-full md:max-w-[768px] relative h-full "
        >
          <Providers>
            <main className="flex flex-1 h-full">{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
