import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/DarkMode";
import { poppins } from "@/lib/fonts/fonts";

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
      <body className={poppins.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            {children}
            {/* <ThemeSwitcher/> */}
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
