import prisma from "../../../lib/prisma";

export const getTickets = async (userId?: string) => {
    return await prisma.ticket.findMany({
        where: userId ? {userId} : {},
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    });
};