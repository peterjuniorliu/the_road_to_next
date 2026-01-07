import { cn } from "../lib/utils";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

const STATUS_STYLES: Record<TicketStatus, { label: string; className: string }> =
  {
    OPEN: {
      label: "Open",
      className: "border-amber-200 bg-amber-50 text-amber-900",
    },
    IN_PROGRESS: {
      label: "In Progress",
      className: "border-sky-200 bg-sky-50 text-sky-900",
    },
    DONE: {
      label: "Done",
      className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
  };

type TicketStatusBadgeProps = {
  status: TicketStatus;
  className?: string;
};

export function TicketStatusBadge({ status, className }: TicketStatusBadgeProps) {
  const styles = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        styles.className,
        className
      )}
    >
      {styles.label}
    </span>
  );
}
