"use client";
import "./globals.css";
import {LucideKanban} from "lucide-react";
import type {Metadata} from "next";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {buttonVariants} from "../components/ui/button";
import {homePath, ticketsPath} from "./paths";

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
  const onTicketDetail = pathname.startsWith("/tickets/");
  const action = onTicketDetail ? {href: ticketsPath(), label: "Back to Tickets"} : onTicketsPage ? {href: homePath(), label: "Back to Home"} : {href: ticketsPath(), label: "Go to Tickets"}; 

  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
        >
          <div className={buttonVariants({ variant: "ghost"})}>
            <LucideKanban />
            <h1 className="text-lg font-semibold">TicketBounty</h1>
          </div>
          <div>
            <Link
              href={action.href}
              className={buttonVariants({ variant: "default"})}
            >
              {action.label}
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