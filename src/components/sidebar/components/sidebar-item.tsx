"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cloneElement} from "react";
import {buttonVariants} from "../../ui/button";
import {cn} from "../../../lib/utils";
import {Separator} from "../../ui/separator";
import {closedClassName} from "../constants";
import {NavItem} from "../types";

type SidebarItemProps = {
    isOpen: boolean,
    navItem: NavItem 
};

const SidebarItem = ({isOpen, navItem}: SidebarItemProps) => 
{
    const path = usePathname();
    const isActive = path === navItem.href;

    return (
        <div>
            {navItem.separator && <Separator />}
            <Link href={navItem.href} className={cn(
                buttonVariants({variant: "ghost"}), "group relative flex h-12 justify-start", isActive && "bg-muted font-bold hover:bg-muted"
            )}
            >
                {cloneElement(navItem.icon, {
                    className: "h-5 w-5",  
                })}
                <span className={cn(
                    "absolute left-12 text-base duration-200", !isOpen && closedClassName
                )}
                >
                    {navItem.title}
                </span>
            </Link>
        </div>
    );
};

export {SidebarItem};