import Link from "next/link";
import {initialTickets} from "../data";
import {FC} from "react";
import {ticketPath} from "../paths";

const CheckIcon = () => 
(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
        />
    </svg>
);

const PencilIcon = () =>
(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
    </svg>
);

const DocumentIcon = () =>
(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
    </svg>
);

type TicketStatus = "OPEN" | "DONE" | "IN_PROGRESS";

const TICKET_ICONS: Record<TicketStatus, FC> = {
    OPEN: DocumentIcon,
    DONE: CheckIcon,
    IN_PROGRESS: PencilIcon,
};

const TicketsPage = () => 
{
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    TicketsPage
                </h1>
            </div>
            <div className="flex-1 flex flex-col items-center gap-y-4">
                <div className="mb-26">
                    <p className="mt-2 text-5xl font-bold text-center text-muted-foreground">
                        All your tickets at one place~
                    </p>
                </div>
                {initialTickets.map(ticket => {
                    const Icon = TICKET_ICONS[ticket.status];

                    return (
                        <div
                        key={ticket.id}
                        className="w-full max-w-[680px] p-6 border border-slate-200 rounded-xl shadow-sm bg-white flex items-start gap-x-4"
                        >
                            {/* 图标 */}
                            <div className="shrink-0 mt-0.5 text-slate-700">
                                <Icon />
                            </div>

                            {/* 文本列：标题+内容 */}
                            <div className="min-w-0 flex-1 flex flex-col gap-y-1">
                                <h2 className="text-xl font-semibold leading-7 truncate">
                                {ticket.title}
                                </h2>
                                <p className="text-base text-slate-600 leading-6 line-clamp-2">
                                {ticket.content}
                                </p>
                            </div>

                            {/* 右侧操作 */}
                            <Link
                                href={ticketPath(ticket.id)}
                                className="shrink-0 inline-flex items-centerjustify-center self-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                            >
                                View
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TicketsPage;