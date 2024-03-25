import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'; // Import the Link component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RAAO",
  description: "Rochester Asian American Organization's official website.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}