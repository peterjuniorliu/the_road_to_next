import {getTicket} from "../../../../features/ticket/queries/get-ticket";
import type {NextRequest} from "next/server";

export async function GET(
    _request: NextRequest,
    {params}: {params: Promise<{"ticket-id": string}>}
) {
    const {"ticket-id": ticketId} = await params;
    const ticket = await getTicket(ticketId);

    return Response.json(ticket);
}
