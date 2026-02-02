"use client";
import clsx from "clsx";
import {LucideArrowUpRightFromSquare, LucideMoreVertical, LucidePencil} from "lucide-react";
import {toCurrency} from "../../../utils/currency";
import {Button} from "../../../components/ui/button";
import {CardContent, CardFooter} from "../../../components/ui/card";
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
            <div className="relative">
                <CardContent className="py-6">
                    <div className="flex items-start justify-between gap-x-8">
                        <div className="min-w-0">
                            <p className="text-sm text-muted-foreground">
                                Updated at {ticket.updatedAt.toDateString()}
                            </p>
                            <p className="mt-2 text-sm font-semibold tracking-wide text-foreground">
                                {ticket.status}
                            </p>
                        </div>
                        <div className="flex items-start gap-x-6 text-right">
                            <div className="text-sm text-muted-foreground">
                                <p>{ticket.deadline ?? "No deadline"}</p>
                                <p>by {ticket.user?.username ?? "Unknown"}</p>
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                                {toCurrency(ticket.bounty)}
                            </p>
                        </div>
                    </div>
                </CardContent>
                {isDetail ? (
                    <div className="absolute right-4 top-4 flex flex-col gap-y-2">
                        {detailButton}
                        {editButton}
                        {moreMenu}
                    </div>
                ) : (
                    <div className="absolute right-4 top-4 flex flex-col gap-y-2">
                        {detailButton}
                        {editButton}
                    </div>
                )}
            </div>
            {comments}
        </div>
    );
};

export {TicketItem};
