"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {consumeCookieByKey} from "../actions/cookies";
import {toast} from "sonner";

const RedirectToast = () => 
{
    const pathname = usePathname();

    useEffect(() => {
        const showCookieToast = async () =>
        {
            const message = await consumeCookieByKey("toast");

            if (message) {
                toast.success(message);
            }
        };

        showCookieToast();
    }, [pathname]);

    return null;
};

export {RedirectToast};