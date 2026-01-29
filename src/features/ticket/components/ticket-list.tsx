import {getTickets} from "../queries/get-tickets";
import {TicketSortSelect} from "./ticket-sort-select";
import {TicketSearchInput} from "./ticket-search-input";
import {Placeholder} from "../../../components/placeholder";
import {TicketItem} from "./ticket-item";
import {Card, CardHeader, CardTitle} from "../../../components/ui/card";
import {TicketPagination} from "./ticket-pagination";
import {TICKET_ICONS} from "../constants";
import {ParsedSearchParams} from "../search-params";

type TicketListProps = {
    searchParams: ParsedSearchParams,
    userId?: string 
};

const TicketList = async ({searchParams, userId}: TicketListProps) => 
{
    const {list: tickets, 
           metadata: ticketMetadata} 
    = await getTickets(searchParams, userId);

    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
            <div className="w-full max-w-[420px] flex gap-x-2">
                <TicketSearchInput placeholder="Search tickets..." />
                <TicketSortSelect options={[
                    {
                        sortKey: "createdAt",
                        sortValue: "desc",
                        label: "Newest"
                    },
                    {
                        sortKey: "createdAt",
                        sortValue: "asc",
                        label: "Oldest"
                    },
                    {
                        sortKey: "bounty",
                        sortValue: "desc",
                        label: "Bounty"
                    }
                ]} />
            </div>
            {tickets.length ? (tickets.map((ticket) => (
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
            ))) : (
                <Placeholder label="No tickets found" />
            )}
            <div className="w-full max-w-[420px]">
                <TicketPagination paginatedTicketMetadata={ticketMetadata} />
            </div>
        </div>
    );
};

export {TicketList};