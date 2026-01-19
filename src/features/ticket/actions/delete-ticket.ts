"use server";
import {setCookieByKey} from "../../../actions/cookies";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import prisma from "../../../lib/prisma";
import {ticketsPath} from "../../../app/paths";

export const deleteTicket = async (id: string) =>
{
    await prisma.ticket.delete({
        where: {
            id,
        },
    });

    revalidatePath(ticketsPath());

    await setCookieByKey("toast", "Ticket deleted");

    redirect(ticketsPath());
};