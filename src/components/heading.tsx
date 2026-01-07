import type { ReactNode } from "react";

import { cn } from "../lib/utils";

type HeadingProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

export function Heading({ title, subtitle, actions, className }: HeadingProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
