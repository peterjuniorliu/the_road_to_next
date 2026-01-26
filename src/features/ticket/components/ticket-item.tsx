import clsx from "clsx";
import {LucideArrowUpRightFromSquare, LucideMoreVertical, LucidePencil} from "lucide-react";
import {isOwner} from "../../auth/utils/is-owner";
import {Button} from "../../../components/ui/button";
import Link from "next/link";
import {toCurrency} from "../../../utils/currency";
import {CardContent, CardFooter} from "../../../components/ui/card"; 
import {ticketPath, ticketEditPath} from "../../../app/paths";
import {TicketWithMetadata} from "../types";
import {getAuth} from "../../auth/queries/get-auth";
import {TicketMoreMenu} from "./ticket-more-menu";

type TicketItemProps = {
    ticket: TicketWithMetadata,
    isDetail?: boolean 
};

const TicketItem = async ({ticket, isDetail}: TicketItemProps) => {
    const {user} = await getAuth();
    const isTicketOwner = isOwner(user, ticket);
    
    const detailButton = (
        <Button variant="outline" size="icon">
            <Link prefetch href={ticketPath(ticket.id)}>
                <LucideArrowUpRightFromSquare className="w-4 h-4" />
            </Link>
        </Button>
    );

    const editButton = isTicketOwner ? (
        <Button variant="outline" size="icon">
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil className="h-4 w-4" />
            </Link>
        </Button>
    ) : null;

    const moreMenu = isTicketOwner ? (
        <TicketMoreMenu ticket={ticket} trigger={
            <Button variant="outline" size="icon">
                <LucideMoreVertical className="h-4 w-4" />
            </Button>
        } />
    ) : null;

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
                    <span className="flex flex-col items-center gap-y-2 w-[280px] translate-x-10 justify-center">
                        Updated at {ticket.updatedAt.toDateString()}
                    </span>
                    <span className="block w-[300px] translate-x-36 text-left">
                        {ticket.status}
                    </span>
                </span>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                    {ticket.deadline} by {ticket.user?.username ?? "Unknown"}
                </p>
                <p className="text-sm text-muted-foreground">
                    {toCurrency(ticket.bounty)}
                </p>
            </CardFooter>
            {isDetail ? (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 gap-y-2">
                    {detailButton}
                    {editButton}
                    {moreMenu}
                </div>
            ) : (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 gap-y-2">
                    {detailButton}
                    {editButton}
                </div>
            )}
        </div>
    );
};

export {TicketItem};
