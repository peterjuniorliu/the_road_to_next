import clsx from "clsx";
import {LucideArrowUpRightFromSquare} from "lucide-react";
import {Button} from "../../../components/ui/button";
import Link from "next/link";
import {CardContent} from "../../../components/ui/card"; 
import {ticketPath} from "../../../app/paths";
import {Ticket} from "../../../generated/prisma/client";

type TicketItemProps = {
    ticket: Ticket,
    isDetail?: boolean 
};

const TicketItem = ({ticket, isDetail}: TicketItemProps) =>
{
    const detailButton = (
        <Button variant="outline" size="icon">
            <Link href={ticketPath(ticket.id)}>
                <LucideArrowUpRightFromSquare className="w-4 h-4" />
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
                    <span className="mx-auto block w-[360px] translate-x-40 text-left">
                        {ticket.status}
                    </span>
                </span>
            </CardContent>
            {isDetail ? null : (
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    {detailButton}
                </div>
            )}
        </div>
    );
};

export {TicketItem};
