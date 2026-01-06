"use client";
import "./globals.css";
import {LucideKanban} from "lucide-react";
import type {Metadata} from "next";
import localFont from "next/font/local";
import {usePathname} from "react-dom";
import Link from "next/link";
import {buttonVariants} from "../components/ui/button";
import {homePath, ticketsPath} from "./paths";

const geistSans = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "My Road to Next application ..."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const onTicketsPage = pathname === "/tickets";
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistSans.variable} antialized`}>
        <nav className="supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
        >
          <div>
            <Link
              href={homePath()}
              className={buttonVariants({ variant: "ghost"})}
            >
              <LucideKanban />
              <h1 className="text-lg font-semibold">TicketBounty</h1>
            </Link>
          </div>
          <div>
            <Link
              href={ticketsPath()}
              className={buttonVariants({ variant: "default"})}
            >
              Go to Tickets
            </Link>
          </div>
        </nav>
        <main
          className="
            min-h-screen flex-1
            overflow-y-auto overflow-x-hidden
            py-24 px-8
            bg-secondary/20
            flex flex-col
          "
        >
          {children}
        </main>
      </body>
    </html>
  );
}