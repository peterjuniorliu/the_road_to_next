import {Heading} from "../../../components/heading";
import {Placeholder} from "../../../components/placeholder";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../components/ui/card";
import {RedirectToast} from "../../../components/redirect-toast";
import {getTicket} from "../../../features/ticket/queries/get-ticket";
import {buildTicketNotFoundInfo} from "../../error-info";

export const dynamic = "force-dynamic";

type TicketPageProps = {
    params: Promise<{ 
        "ticket-id": string;
    }>;
};

const TicketPage = async ({params}: TicketPageProps) => 
{
    const {["ticket-id"]: ticketId} = await params;
    const ticket = await getTicket(ticketId);

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
                                <div
                                    key={errorInfo.context.label}
                                    className="flex items-center justify-between gap-x-4"
                                >
                                    <dt className="text-muted-foreground">
                                        {errorInfo.context.label}
                                    </dt>
                                    <dd className="font-medium">
                                        {errorInfo.context.value}
                                    </dd>
                                </div>
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
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title={ticket.title} />
            <div className="px-8 text-center">
                <p className="text-xl font-semibold">
                    {ticket.content}
                </p>
                <p className="mt-2 text-lg text-muted-foreground">
                    {ticket.status}
                </p>
            </div>
            <RedirectToast />
        </div>
    );
};

export default TicketPage;