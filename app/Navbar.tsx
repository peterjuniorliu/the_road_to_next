"use client";
import type {Metadata} from "next";
import Link from "next/link";
import {homePath, ticketsPath} from "./paths";
import {Ticket} from "lucide-react";
import {usePathname} from "next/navigation";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "The Road Next",
  description: "My Road to Next application ...",
};

export default function Navbar() 
{
  const pathname = usePathname();
  const onTicketsPage = pathname === "/tickets";
  const onTicketDetail = pathname.startsWith("/tickets/");
  const action = onTicketDetail ? {href: ticketsPath(), label: "Back to Tickets"}: onTicketsPage ? {href: homePath(), label: "Back to Home"}: {href: ticketsPath(), label: "Go to Tickets"};

  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <nav className="fixed inset-x-0 top-0 z-20 bg-background/95 backdrop-blur shadow-sm">
          <div className="mx-auto flex h-14 items-center justify-between px-5">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Ticket className="h-5 w-5" />
              <span>TicketBounty</span>
            </div>
            <Link href={action.href} className="text-sm font-semibold px-4 py-1.5 rounded-md bg-yellow-400 text-black hover:bg-yellow-500 transition">
              {action.label}
            </Link>
          </div>
        </nav>
      </body>  
    </html>
  );
}