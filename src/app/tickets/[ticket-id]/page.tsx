import Link from "next/link";
import {initialTickets} from "../../data";
import {ticketsPath} from "../../paths";
import {Button} from "../../../components/ui/button";
import {Placeholder} from "../../../components/placeholder";

type TicketPageProps = {
    params: Promise<{
        ticketId: string;
    }>;
};

const TicketPage = async ({params}: TicketPageProps) =>
{
    const {ticketId} = await params;
    const ticket = initialTickets.find(ticket => ticket.id === ticketId);

    if (!ticket) {
        return (
            <Placeholder label="Ticket not found" button={
                <Button variant="outline">
                    <Link href={ticketsPath()}>
                        Back to Tickets
                    </Link>
                </Button>
            }
            />
        );
    }

    return (
        <div>
            <h2 className="text-lg">
                {ticket.title}
            </h2>
            <p className="text-sm">
                {ticket.status}
            </p>
        </div>
    );
};

export default TicketPage;