"use client";
import {buttonVariants} from "../components/ui/button";
import {usePathname} from "next/navigation";
import {LucideKanban} from "lucide-react";
import Link from "next/link";
import {ThemeSwitcher} from "../components/theme/theme-switcher";
import {homePath, signInPath, signUpPath, ticketsPath} from "../app/paths";
 
const Header = () => 
{
    const pathname = usePathname() ?? "";
    const ticketsBase = ticketsPath();
    const onTicketsPage = pathname === ticketsBase;
    const onTicketDetail = pathname.startsWith(`${ticketsBase}/`);
    const onAuthSignUp = pathname === signUpPath();
    const onAuthSignIn = pathname === signInPath();
    const onAuthPage = pathname.startsWith("/auth") && !pathname.startsWith("/auth/home");
    const onSignUp = onAuthSignUp || (onAuthPage && !onAuthSignIn);
    const onSignIn = onAuthSignIn;
    const action = onSignUp
      ? {href: signInPath(), label: "Sign in"}
      : onSignIn
        ? {href: signUpPath(), label: "Sign up"}
        : onTicketDetail
          ? {href: ticketsPath(), label: "Back to Tickets"}
          : onTicketsPage
            ? {href: homePath(), label: "Back to Home"}
            : {href: ticketsPath(), label: "Go to Tickets"};

    return (
        <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between"
        >
            <div className={buttonVariants({ variant: "ghost"})}>
                <LucideKanban />
                <h1 className="text-lg font-semibold">TicketBounty</h1>
            </div>
            <div className="flex align-items gap-x-2">
                <ThemeSwitcher />
                <Link
                href={action.href}
                className={buttonVariants({variant: "default"})}
                >
                {action.label}
                </Link>
            </div>
        </nav>
    );
}

export {Header};
