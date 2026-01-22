"use server";
import {TicketStatus} from "../../../generated/prisma";
import {revalidatePath} from "next/cache";
import {fromErrorToActionState, toActionState} from "../../../components/form/utils/to-action-state";
import prisma from "../../../lib/prisma";
import {ticketsPath} from "../../../app/paths";

export const updateTicketStatus = async (id: string, status: TicketStatus) => 
{
    try {
        await prisma.ticket.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    } catch (error) {
        return fromErrorToActionState(error);
    }

    revalidatePath(ticketsPath());

    return toActionState("SUCCESS", "Status updated");
};