import {initialTickets} from "../../data";

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
            <div>
                <div className="text-sm text-slate-600">
                    Ticket not found: {ticketId}. Available IDs:{" "}
                    {initialTickets.map(ticket => ticket.id).join(", ")}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-lg">        {ticket.title}</h2>
            <p className="text-sm">{ticket.status}</p>
        </div>
    );
};

export default TicketPage;
