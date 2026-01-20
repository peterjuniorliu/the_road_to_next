"use server";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {redirect} from "next/navigation";
import {ActionState, fromErrorToActionState} from "../../../components/form/utils/to-action-state";
import prisma from "../../../lib/prisma";
import {setCookieByKey} from "../../../actions/cookies";
import {homePath, ticketPath, ticketsPath} from "../../../app/paths";
import {TicketStatus} from "../../../generated/prisma/client";
import {toDecimalString} from "../../../utils/currency";

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
    deadline: z.string().min(1),
    bounty: z.coerce.number().int().nonnegative(),
    status: z.nativeEnum(TicketStatus).optional(),
});

export const upsertTicket = async (
    id: string | undefined,
    _actionState: ActionState,
    formData: FormData
): Promise<ActionState> => {
    const title = formData.get("title");
    const content = formData.get("content");
    const deadline = formData.get("deadline");
    const bounty = formData.get("bounty");
    const rawStatus = formData.get("status");
    const status = typeof rawStatus === "string" && rawStatus in TicketStatus
        ? (rawStatus as TicketStatus)
        : undefined;

    const result = upsertTicketSchema.safeParse({
        title: typeof title === "string" ? title : "",
        content: typeof content === "string" ? content : "",
        deadline: typeof deadline === "string" ? deadline : "",
        bounty: typeof bounty === "string" ? bounty : "",
        ...(status ? {status} : {}),
    });

    if (!result.success) {
        return {
            status: "ERROR",
            message: "Invalid ticket data",
            payload: formData,
            timestamp: Date.now(),
            fieldErrors: result.error.flatten().fieldErrors,
        };
    }

    const data = result.data;
    const dbData = {
        ...data,
        bounty: toDecimalString(data.bounty),
    };

    try {
        if (id) {
            await prisma.ticket.update({
                where: {id},
                data: dbData,
            });
        } else {
            await prisma.ticket.create({
                data: dbData,
            });
        }
    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    revalidatePath(ticketsPath());

    if (id) {
        await setCookieByKey("toast", "Ticket updated");

        redirect(ticketPath(id));
    }

    revalidatePath(homePath());
    redirect(`${homePath()}?created=1`);
};
