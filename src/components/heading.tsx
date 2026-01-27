import type { ReactNode } from "react";
import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  subtitle?: string;
  tabs?: React.ReactNode;
  actions?: ReactNode
};

export function Heading({
  title,
  description,
  subtitle,
  tabs,
  actions,
}: HeadingProps) {
  const helperText = subtitle ?? description;

  return (
    <div className="px-8">
      {tabs}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {helperText ? (
            <p className="text-sm text-muted-foreground">{helperText}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <Separator className="mt-4" />
    </div>
  );
}