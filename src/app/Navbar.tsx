"use client";
import {Rocket} from "lucide-react";
import {homePath, ticketsPath} from "./paths";
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function Navbar() 
{
    const pathname = usePathname();
    const onTicketsPath = pathname === "/tickets";
    const onTicketDetail = pathname.startsWith("/tickets/");
    const action = onTicketsPath ? {href: homePath(), label: "返回首页"} : onTicketDetail ? {href: ticketsPath(), label: "查看门票"} : {href: ticketsPath(), label: "返回门票"};

    return (
        <nav className="fixed inset-x-0 top-0 z-20 bg-white/80 backdrop-blur border-b border-amber-100">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
                <div className="flex items-center gap-2 text-lg font-bold">
                    <Rocket className="h-5 w-5" />
                    <span className="font-display">Ai Maker Summit</span>
                </div>
                <Link href={action.href} className="friendship-cta text-sm font-semibold px-4 py-2 rounded-full transition">
                    {action.label}
                </Link>
            </div>
        </nav>
    )
}