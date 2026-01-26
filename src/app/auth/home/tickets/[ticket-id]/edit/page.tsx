import {notFound} from "next/navigation";
import {CardCompact} from "../../../../../../components/card-compact";
import {TicketUpsertForm} from "../../../../../../features/ticket/components/ticket-upsert-form";
import {Breadcrumbs} from "../../../../../../components/breadcrumbs";
import {getAuth} from "../../../../../../features/auth/queries/get-auth";
import {isOwner} from "../../../../../../features/auth/utils/is-owner";
import {getTicket} from "../../../../../../features/ticket/queries/get-ticket";
import {Separator} from "../../../../../../components/ui/separator";
import {homePath, ticketPath} from "../../../../../paths";

type TicketEditPageProps = {
    params: Promise<{
        "ticket-id": string
    }>;
};

const TicketEditPage = async ({params}: TicketEditPageProps) =>
{
    const {"ticket-id": ticketId} = await params;
    const {user} = await getAuth();
    const ticket = await getTicket(ticketId);
    const isTicketFound = !!ticket;
    const isTicketOwner = isOwner(user, ticket);

    if (!ticket) {
        notFound();
    }

    const ticketForForm = ticket ? {
        id: ticket.id,
        title: ticket.title,
        content: ticket.content,
        status: ticket.status,
        deadline: ticket.deadline ?? null,
        bounty: ticket.bounty ? ticket.bounty.toString() : null,
    } : undefined;

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Breadcrumbs breadcrumbs={[
                {title: "Home", href: homePath()},
                {title: ticket.title, href: ticketPath(ticket.id)},
                {title: "Edit"}
            ]}
            />
            <Separator />            
            <div className="flex-1 flex flex-col justify-center items-center">
                <CardCompact title="Edit Ticket" description="Edit an existing ticket" className="w-full max-w-[420px] animate-fade-form-top" content={<TicketUpsertForm ticket={ticketForForm} />}
                />
            </div>
        </div>
    );
};

export default TicketEditPage;