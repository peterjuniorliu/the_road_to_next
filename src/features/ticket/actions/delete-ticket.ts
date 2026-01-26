"use server";
import {isOwner} from "../../../features/auth/utils/is-owner";
import {setCookieByKey} from "../../../actions/cookies";
import {revalidatePath} from "next/cache";
import {fromErrorToActionState, toActionState} from "../../../components/form/utils/to-action-state";
import {getAuthOrRedirect} from "../../../features/auth/queries/get-auth-or-redirect";
import {redirect} from "next/navigation";
import prisma from "../../../lib/prisma";
import {ticketsPath} from "../../../app/paths";

export const deleteTicket = async (id: string) =>
{   
    const {user} = await getAuthOrRedirect();

    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id,
            },
        });

        if (!ticket || !isOwner(user, ticket)) {
            return toActionState("ERROR", "Not authorized");
        }

        await prisma.ticket.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        return fromErrorToActionState(error);
    }

    revalidatePath(ticketsPath());

    await setCookieByKey("toast", "Ticket deleted");

    redirect(ticketsPath());
};