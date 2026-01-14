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
        <div className={clsx("mx-auto flex items-center justify-center gap-x-3", {
            "max-w-[500px]": isDetail,
            "max-w-[420px]": !isDetail
        })}
        >
            <div className="w-full max-w-[280px]">
                <CardContent className="text-center">
                    <span className={clsx("whitespace-break-spaces text-lg", {
                        "line-clamp-3": !isDetail
                    })}
                    >
                        {ticket.status}
                    </span>
                </CardContent>
            </div>
            <div className="flex flex-col items-center justify-center">
                {isDetail ? null : detailButton}
            </div>
        </div>
    );
};

export {TicketItem};
