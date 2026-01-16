import {Heading} from "../components/heading";
import {CardCompact} from "../components/card-compact";
import {Card, CardContent} from "../components/ui/card";
import {TicketUpsertForm} from "../features/ticket/components/ticket-upsert-form";

type HomePageProps = {
    searchParams: Promise<{
        created?: string
    }>;
};

const HomePage = async ({searchParams}: HomePageProps) => 
{
    const resolvedSearchParams = await searchParams;
    const isCreated = resolvedSearchParams?.created === "1";

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Home" />
            <div className="flex-1 flex-col items-center">
                <div className="flex text-3xl items-center justify-center">
                    Your home place to start
                </div>
            </div>
            {isCreated ? (
                <Card className="w-full max-w-[420px] self-center border-green-500/40 bg-green-50 text-green-900">
                    <CardContent className="py-4 text-center text-sm font-semibold">
                        Successfully created!
                    </CardContent>
                </Card>
            ) : null}
            <CardCompact
            title="Create Ticket"
            description="A new ticket will be created"
            className="w-full max-w-[420px] self-center"
            content={<TicketUpsertForm />}
            />
        </div>
    );
};

export default HomePage;
