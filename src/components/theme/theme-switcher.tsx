"use client";
import {LucideMoon, LucideSun} from "lucide-react";
import {useTheme} from "next-themes";
import {Button} from "../ui/button";

const ThemeSwitcher = () => 
{
    const {resolvedTheme, setTheme} = useTheme();

    if (!resolvedTheme) {
        return null;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            {isDark ? (
                <LucideSun className="h-4 w-4" />
            ) : (
                <LucideMoon className="h-4 w-4" />
            )}
            <span className="sr-only">
                Toggle theme
            </span>
        </Button>
    );
};

export {ThemeSwitcher};
