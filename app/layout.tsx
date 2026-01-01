import type {Metadata} from "next";
import Link from "next/link";
import {homePath, ticketsPath} from "./paths";
import {Ticket} from "lucide-react";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "The Road Next",
  description: "My Road to Next application ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
          <div className="w-full flex items-center justify-between py-2.5 px-5">
            {/* Left: icon + brand */}
            <Link href={homePath()} className="flex items-center gap-2 text-lg font-bold">
              <Ticket className="w-5 h-5" />
              <span>TicketBounty</span>
            </Link>
            {/* Right: Tickets button */}
            <Link href={ticketsPath()} className="text-sm font-semibold px-3 py-1.5 rounded-md bg-yellow-400 text-black hover:bg-yellow-500 transition">
              Tickets
            </Link>
          </div>
        </nav>
        <div className="">
          <div>
            <Link href={homePath()} className="text-lg font-bold">
              Home
            </Link>
          </div>
        </div>
        <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">
            {children}
        </main>
      </body>
    </html>
  );
}