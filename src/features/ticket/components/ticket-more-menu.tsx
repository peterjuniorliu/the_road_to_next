"use client";
import {Ticket, TicketStatus} from "../../../generated/prisma/client";
import {toast} from "sonner";
import {deleteTicket} from "../actions/delete-ticket";
import {LucideTrash} from "lucide-react";
import {TICKET_STATUS_LABELS} from "../constants";
import {DropdownMenu, 
        DropdownMenuContent, 
        DropdownMenuItem, 
        DropdownMenuRadioGroup,
        DropdownMenuRadioItem,
        DropdownMenuSeparator,
        DropdownMenuTrigger} from "../../../components/ui/dropdown-menu";
import {updateTicketStatus} from "../actions/update-ticket-status";
import {Button} from "../../../components/ui/button";

type TicketMoreMenuProps = {
    ticket: Ticket,
    trigger: React.ReactElement 
};

const TicketMoreMenu = ({ticket, trigger}: TicketMoreMenuProps) => 
{
    const deleteButton = (
        <DropdownMenuItem className="p-0" onSelect={(event) => event.preventDefault()}>
            <form action={deleteTicket.bind(null, ticket.id)} className="w-full">
                <Button
                    type="submit"
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive"
                >
                    <LucideTrash className="h-4 w-4" />
                    Delete
                </Button>
            </form>
        </DropdownMenuItem>
    );

    const handleUpdateTicketStatus = async (value: string) => 
    {
        const promise = updateTicketStatus(ticket.id, value as TicketStatus);

        toast.promise(promise, {
            loading: "Updating status...",
        });

        const result = await promise;

        if (result.status === "ERROR") {
            toast.error(result.message);
        } else if (result.status === "SUCCESS") {
            toast.success(result.message);
        }
    };

    const ticketStatusRadioGroupItem = (
        <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
            {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
                <DropdownMenuRadioItem key={key} value={key}>
                    {TICKET_STATUS_LABELS[key]}
                </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="right">
                {ticketStatusRadioGroupItem}
                <DropdownMenuSeparator />
                {deleteButton}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export {TicketMoreMenu};