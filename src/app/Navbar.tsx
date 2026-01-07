"use client";
import {buttonVariants} from "../components/ui/button";
import {usePathname} from "next/navigation";
import {LucideKanban} from "lucide-react";
import Link from "next/link";
import {homePath, ticketsPath} from "./paths";

export default function Navbar()
{
    const pathname = usePathname();
    const onTicketsPage = pathname === "/tickets";
    const onTicketDetail = pathname.startsWith("/tickets/");
    const action = onTicketDetail ? {href: ticketsPath(), label: "Back to Tickets"} : onTicketsPage ? {href: homePath(), label: "Back to Home"} : {href: ticketsPath(), label: "Go to Tickets"};

    return (
        <nav className="supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between"
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
    );
}