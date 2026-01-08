import clsx from "clsx";
import {LucideArrowUpRightFromSquare} from "lucide-react";
import {Button} from "../../../components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "../../../components/ui/card";
import {ticketPath} from "../../../app/paths";
import {TICKET_ICONS} from "../constants";
import {Ticket} from "../types";

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
        <div className={clsx("w-full flex gap-x-1", {
            "max-w-[500px]": isDetail,
            "max-w-[420px]": !isDetail
        })}
        >
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex gap-x-2">
                        <span>
                            {TICKET_ICONS[ticket.status]}
                        </span>
                        <span className="truncate">
                            {ticket.title}
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <span className={clsx("whitespace-break-spaces", {
                        "line-clamp-3": !isDetail
                    })}
                    >
                        {ticket.status}
                    </span>
                </CardContent>
            </Card>
            {isDetail ? null : (
                <div className="flex flex-col gap-y-1">
                    {detailButton}
                </div>
            )}
        </div>
    );
};

export {TicketItem};