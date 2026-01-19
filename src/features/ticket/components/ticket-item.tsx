import clsx from "clsx";
import {LucideArrowUpRightFromSquare, LucidePencil} from "lucide-react";
import {Button} from "../../../components/ui/button";
import Link from "next/link";
import {CardContent, CardFooter} from "../../../components/ui/card"; 
import {ticketPath, ticketEditPath} from "../../../app/paths";
import {Ticket} from "../../../generated/prisma/client";

type TicketItemProps = {
    ticket: Ticket,
    isDetail?: boolean 
};

const TicketItem = ({ticket, isDetail}: TicketItemProps) =>
{
    const detailButton = (
        <Button variant="outline" size="icon">
            <Link prefetch href={ticketPath(ticket.id)}>
                <LucideArrowUpRightFromSquare className="w-4 h-4" />
            </Link>
        </Button>
    );

    const editButton = (
        <Button variant="outline" size="icon">
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil className="h-4 w-4" />
            </Link>
        </Button>
    );

    return (
        <div className={clsx("w-full", {
            "max-w-[500px]": isDetail,
            "max-w-[420px]": !isDetail
        })}
        >
            <CardContent className="flex items-center py-6">
                <span className={clsx("whitespace-break-spaces text-lg", {
                    "line-clamp-3": !isDetail
                })}
                >
                    <span className="flex flex-col items-center gap-y-2 w-[240px] translate-x-30 justify-center">
                        Updated at {ticket.updatedAt.toDateString()}
                    </span>
                    <span className="block w-[360px] translate-x-40 text-left">
                        {ticket.status}
                    </span>
                </span>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                    {ticket.deadline}
                </p>
                <p className="text-sm text-muted-foreground">
                    {ticket.bounty}
                </p>
            </CardFooter>
            {isDetail ? (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 gap-y-2">
                    <div>
                        {editButton}
                        {detailButton}
                    </div>
                </div>
            ) : (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 gap-y-2">
                    <div>
                        {detailButton}
                        {editButton}
                    </div>
                </div>
            )}
        </div>
    );
};

export {TicketItem};