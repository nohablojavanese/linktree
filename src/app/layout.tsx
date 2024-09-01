import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { poppins,inter, jakarta } from "@/lib/fonts/fonts";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Link.ID",
  description: "Tools Link-in-Bio Gratis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <GoogleAnalytics gaId="G-ZSJW5EM7NR" />
            <GoogleTagManager gtmId="GTM-NK2XDJ29" />

            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
