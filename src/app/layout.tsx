import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { poppins, inter, jakarta } from "@/lib/fonts/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
            {children}
            <GoogleAnalytics gaId="G-ZSJW5EM7NR" />
          </NextThemesProvider>
        </NextUIProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
