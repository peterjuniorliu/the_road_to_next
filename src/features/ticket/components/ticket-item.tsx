"use client";
import clsx from "clsx";
import {LucideArrowUpRightFromSquare, LucideMoreVertical, LucidePencil} from "lucide-react";
import {toCurrency} from "../../../utils/currency";
import {Button} from "../../../components/ui/button";
import {CardContent} from "../../../components/ui/card";
import Link from "next/link";
import {ticketPath, ticketEditPath} from "../../../app/paths";
import {TicketWithMetadata} from "../types";
import {TicketMoreMenu} from "./ticket-more-menu";

type TicketItemProps = {
    ticket: TicketWithMetadata,
    isDetail?: boolean, 
    comments?: React.ReactNode
};

const TicketItem = async ({ticket, isDetail, comments}: TicketItemProps) => {
    const detailButton = (
        <Button variant="outline" size="icon">
            <Link prefetch href={ticketPath(ticket.id)}>
                <LucideArrowUpRightFromSquare className="w-4 h-4" />
            </Link>
        </Button>
    );

    const editButton = ticket.isOwner ? (
        <Button variant="outline" size="icon">
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil className="h-4 w-4" />
            </Link>
        </Button>
    ) : null;

    const moreMenu = ticket.isOwner ? (
        <TicketMoreMenu ticket={ticket} trigger={
            <Button variant="outline" size="icon">
                <LucideMoreVertical className="h-4 w-4" />
            </Button>
        } />
    ) : null;

    return (
        <div className={clsx("w-full flex flex-col gap-y-4", {
            "max-w-[500px]": isDetail,
            "max-w-[420px]": !isDetail
        })}
        >
            <CardContent className="py-6">
                <div className="grid grid-cols-[1fr_1fr_auto_auto] items-start gap-x-6">
                    <div className="text-sm text-muted-foreground">
                        Updated at {ticket.updatedAt.toDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <p>{ticket.deadline ?? "No deadline"}</p>
                        <p>by {ticket.user?.username ?? "Unknown"}</p>
                    </div>
                    <div className="text-sm font-semibold text-foreground text-right">
                        {toCurrency(ticket.bounty)}
                    </div>
                    {isDetail ? (
                        <div className="flex flex-col items-end gap-y-2">
                            {detailButton}
                            {editButton}
                            {moreMenu}
                        </div>
                    ) : (
                        <div className="flex flex-col items-end gap-y-2">
                            {detailButton}
                            {editButton}
                        </div>
                    )}
                </div>
                <div className="mt-4 text-center text-sm font-semibold tracking-wide text-foreground">
                    {ticket.status}
                </div>
            </CardContent>
            {comments}
        </div>
    );
};

export {TicketItem};
