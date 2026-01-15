"use client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import prisma from "../../../lib/prisma";
import {ticketsPath} from "../../../app/paths";
import {TicketStatus} from "../../../generated/prisma/client";

export const updateTicket = async (id: string, formData: FormData) =>
{
    const title = formData.get("title");
    const content = formData.get("content");
    const rawStatus = formData.get("status");
    const status = typeof rawStatus === "string" && rawStatus in TicketStatus
        ? (rawStatus as TicketStatus)
        : undefined;

    await prisma.ticket.update({
        where: {
            id,
        },
        data: {
            title: (typeof title === "string" ? title : "") as string,
            content: (typeof content === "string" ? content : "") as string,
            ...(status ? {status} : {}),
        },
    });

    revalidatePath(ticketsPath());
    redirect(ticketsPath());
}