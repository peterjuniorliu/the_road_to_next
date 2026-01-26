import {getTickets} from "../queries/get-tickets";
import {TicketItem} from "./ticket-item";
import {Card, CardHeader, CardTitle} from "../../../components/ui/card";
import {TICKET_ICONS} from "../constants";

type TicketListProps = {
    userId?: string 
};

const TicketList = async ({userId}: TicketListProps) => 
{
    const tickets = await getTickets(userId);

    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
            {tickets.map(ticket => (
                <Card key={ticket.id} className="relative w-full max-w-[520px]">
                    <CardHeader className="items-start gap-y-4">
                        <CardTitle className="flex items-center justify-start gap-x-2">
                            <span>
                                {TICKET_ICONS[ticket.status]}
                            </span>
                            <span>
                                {ticket.title}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <TicketItem ticket={ticket} />
                </Card>
            ))}
        </div>
    );
};

export {TicketList};
