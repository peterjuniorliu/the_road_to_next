import {Suspense} from "react";
import {Heading} from "../../../../components/heading";
import {Spinner} from "../../../../components/spinner";
import {searchParamsCache} from "../../../../features/ticket/search-params";
import {SearchParams} from "nuqs/server";
import {TicketList} from "../../../../features/ticket/components/ticket-list";
import {getAuth} from "../../../../features/auth/queries/get-auth";

export const dynamic = "force-dynamic";

type TicketsPageProps = {
    searchParams: Promise<SearchParams>
};

const TicketsPage = async ({searchParams}: TicketsPageProps) => 
{
    const {user} = await getAuth();

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place" />
            <Suspense fallback={<Spinner />}>
                <TicketList searchParams={searchParamsCache.parse(await searchParams)} userId={user?.id} />
            </Suspense>
        </div>
    );
};

export default TicketsPage;