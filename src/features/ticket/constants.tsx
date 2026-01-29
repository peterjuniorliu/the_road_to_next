import {LucideCheckCircle, LucideFileText, LucidePencil} from "lucide-react";
import type {ReactNode} from "react";
import {TicketStatus} from "../../generated/prisma";

export const TICKET_ICONS: Record<TicketStatus, ReactNode> = {
    OPEN: <LucideFileText />,
    DONE: <LucideCheckCircle />,
    IN_PROGRESS: <LucidePencil />
};

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
    OPEN: "Open",
    DONE: "Done",
    IN_PROGRESS: "In Progress"
};
