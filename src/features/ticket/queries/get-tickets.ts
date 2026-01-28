import prisma from "../../../lib/prisma";
import {ParsedSearchParams} from "../search-params";
import {TicketWithMetadata} from "../types";

export const getTickets = async (
    searchParams: ParsedSearchParams,
    userId?: string | undefined): Promise<TicketWithMetadata[]> => 
{
    const sortKey = searchParams.sortKey ?? "createdAt";
    const sortOrder = searchParams.sortValue === "asc" ? "asc" : "desc";

    return await prisma.ticket.findMany({
        where: {
            userId,
            title: {
                contains: searchParams.search,
                mode: "insensitive"
            },
        },
        orderBy: {
            [sortKey]: sortOrder
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
