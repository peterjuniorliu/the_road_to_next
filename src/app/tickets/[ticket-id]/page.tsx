import Link from "next/link";
import {initialTickets} from "../../data";
import {ticketsPath} from "../../paths";
import {EmptyState} from "../../../components/empty-state";
import {Heading} from "../../../components/heading";
import {TicketStatusBadge} from "../../../components/ticket-status-badge";

type TicketPageProps = {
    params: Promise<{
        ticketId: string | string[];
    }>;
};

const TicketPage = async ({params}: TicketPageProps) => 
{
    const {ticketId: paramTicketId} = await params;
    const rawTicketId = Array.isArray(paramTicketId) ? paramTicketId[0] : paramTicketId;
    const ticketId = decodeURIComponent(rawTicketId).trim();
    const ticket = initialTickets.find(ticket => ticket.id === ticketId);

    if (!ticket) {
        return (
            <EmptyState
                title="Ticket not found"
                description={`Ticket ID "${ticketId}" does not exist.`}
                action={
                    <Link href={ticketsPath()} className="text-sm underline">
                        Back to tickets
                    </Link>
                }
                className="max-w-xl"
            />
        );
    }

    return (
        <div className="flex flex-col gap-y-6">
            <Heading
                title={ticket.title}
                subtitle="Ticket detail"
                actions={<TicketStatusBadge status={ticket.status} />}
            />
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {ticket.content}
            </p>
        </div>
    );
};

export default TicketPage;
