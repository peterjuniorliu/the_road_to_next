"use client";
import Link from "next/link";
import {homePath, ticketsPath} from "./paths";
import {Ticket} from "lucide-react";
import {usePathname} from "next/navigation";

export default function Navbar() 
{
  const pathname = usePathname();
  const onTicketsPage = pathname === "/tickets";
  const onTicketDetail = pathname.startsWith("/tickets/");
  const action = onTicketDetail ? {href: ticketsPath(), label: "Back to Tickets"}: onTicketsPage ? {href: homePath(), label: "Back to Home"}: {href: ticketsPath(), label: "Go to Tickets"};

  return (
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
  );
}
