"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import prisma from "../../../lib/prisma";
import {homePath, ticketsPath} from "../../../app/paths";
import {TicketStatus} from "../../../generated/prisma/client";

export const upsertTicket = async (id: string | undefined, formData: FormData) => 
{
    const title = formData.get("title");
    const content = formData.get("content");
    const rawStatus = formData.get("status");
    const status = typeof rawStatus === "string" && rawStatus in TicketStatus
        ? (rawStatus as TicketStatus)
        : undefined;

    const data = {
        title: (typeof title === "string" ? title : "") as string,
        content: (typeof content === "string" ? content : "") as string,
        ...(status ? {status} : {}),
    };

    await prisma.ticket.upsert({
        where: {id: id ?? ""},
        update: data,
        create: data,
    });

    revalidatePath(ticketsPath());

    if (!id) {
        revalidatePath(homePath());
        redirect(`${homePath()}?created=1`);
    }

    redirect(ticketsPath());
};
