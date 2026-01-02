import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}: {children: ReactNode}) 
{
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-20 px-8 bg-secondary/20">
          {children}
        </main>
      </body>
    </html>
  );
}