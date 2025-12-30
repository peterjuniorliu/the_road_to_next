import Link from "next/link";
import {initialTickets} from "../data";
import {ticketPath} from "../paths";

const CheckIcon = () => 
{
    <svg
        xmlns="http://www.w3/org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
        />
    </svg>
};

const PencilIcon = () => 
{
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path 
            strokeLinecap="round"
            strokeLinejoin="round"
        />    
    </svg>
}

const DocumentIcon = () => 
{
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}

const TICKET_ICONS = {
    OPEN: "O",
    DONE: "X",
    IN_PROGRESS: ">",
};

const TicketsPage = () => 
{
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    TicketsPage
                </h1>
                <p className="text-sm text-muted-foreground">
                    All your tickets at one place
                </p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-y-4">
                {initialTickets.map(ticket => (
                    <div key={ticket.id} className="w=full max-w=[420px] p-4 border border-slate-100 rounded">
                        <div>
                            {TICKET_ICONS[ticket.status]}
                        </div>
                        <h2 className="text-lg font-semlbold truncate">             {ticket.title}
                        </h2>
                        <p className="text-sm text-slate-500 truncate">
                            {ticket.content}
                        </p>
                        <Link href={ticketPath(ticket.id)} className="text-sm underline">
                            View
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketsPage;