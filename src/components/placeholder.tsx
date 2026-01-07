import { LucideMessageSquareWarning } from "lucide-react";
import type { ReactElement } from "react";
import { cloneElement, isValidElement } from "react";
import { cn } from "../lib/utils";

type PlaceholderProps = React.HTMLAttributes<HTMLDivElement> &
{
    label: string;
    icon?: ReactElement<{ className?: string }>;
    button?: ReactElement<{ className?: string }>;
};

export function Placeholder({
    label,
    icon = <LucideMessageSquareWarning />,
    button,
    className,
    ...props
}: PlaceholderProps) {
    return (
        <div className={cn("flex-1 self-center flex flex-col items-center justify-center gap-y-2 text-center",
            className
        )}
            {...props}
        >{isValidElement(icon) ? cloneElement(icon, {className: cn("h-16 w-16", icon.props.className),}) : null}
            <h2 className="text-lg text-muted-foreground">
                {label}
            </h2>
        {isValidElement(button) ? cloneElement(button, {className: cn("h-10", button.props.className)}) : null}
        </div>
    );
}