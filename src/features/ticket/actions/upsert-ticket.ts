"use server";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {redirect} from "next/navigation";
import {ActionState, fromErrorToActionState} from "../../../components/form/utils/to-action-state"; 
import prisma from "../../../lib/prisma";
import {homePath, ticketPath, ticketsPath} from "../../../app/paths";
import {TicketStatus} from "../../../generated/prisma/client";

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
    status: z.nativeEnum(TicketStatus).optional(),
});

export const upsertTicket = async (
    id: string | undefined,
    _actionState: ActionState,
    formData: FormData
): Promise<ActionState> => 
{
    const title = formData.get("title");
    const content = formData.get("content");
    const rawStatus = formData.get("status");
    const status = typeof rawStatus === "string" && rawStatus in TicketStatus
        ? (rawStatus as TicketStatus)
        : undefined;
   
    const result = upsertTicketSchema.safeParse({
        title: typeof title === "string" ? title : "",
        content: typeof content === "string" ? content : "",
        ...(status ? {status} : {}),
    });

    if (!result.success) {
        return {
            status: "ERROR",
            message: "Invalid ticket data",
            payload: formData,
            timestamp: Date.now(),
            fieldErrors: result.error.flatten().fieldErrors
        };
    }

    const data = result.data;

    try {
        if (id) {
            await prisma.ticket.update({
                where: {id},
                data,
            });
        } else {
            await prisma.ticket.create({
                data,
            });
        }
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    revalidatePath(ticketsPath());

    if (id) {
        redirect(ticketPath(id));
    }

    revalidatePath(homePath());
    redirect(`${homePath()}?created=1`);
};