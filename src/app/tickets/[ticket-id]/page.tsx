import Link from "next/link";
import {Placeholder} from "../../../components/placeholder";
import {Button} from "../../../components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../components/ui/card";
import {initialTickets} from "../../data";
import {TicketItem} from "../../../features/ticket/components/ticket-item";
import {ticketsPath} from "../../paths";
import {buildTicketNotFoundInfo} from "../../error-info";

export type TicketPageProps = {
    params: Promise<{
        ticketId: string;
    }>;
};

const TicketPage = async ({params}: TicketPageProps) => 
{
    const {ticketId} = await params;
    const ticket = initialTickets.find(ticket => ticket.id === ticketId);

    if (!ticket) {
        const errorInfo = buildTicketNotFoundInfo(ticketId);

        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="flex w-full max-w-xl flex-col gap-y-6">
                    <Placeholder 
                        label={errorInfo.title}
                        className="flex-none"
                    />
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Error details
                            </CardTitle>
                            <CardDescription>
                                {errorInfo.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-y-4 text-sm">
                            <dl className="grid gap-2">
                                {errorInfo.context.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center justify-between gap-x-4"
                                    >
                                        <dt className="text-muted-foreground">
                                            {item.label}
                                        </dt>
                                        <dd className="font-medium">
                                            {item.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <div>
                                <p className="text-muted-foreground">
                                    What you can do
                                </p>
                                <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                                    {errorInfo.hints.map((hint) => (
                                        <li key={hint}>
                                            {hint}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center animate-fade-from-top">
            <TicketItem ticket={ticket} isDetail />
        </div>
    );
};

export default TicketPage;