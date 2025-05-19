import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./context/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { DEV_NAME } from "./data/staticDataProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: DEV_NAME + " | Software Engineer",
  description: "Skill Run UI - Portfolio of " + DEV_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SpeedInsights/>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
