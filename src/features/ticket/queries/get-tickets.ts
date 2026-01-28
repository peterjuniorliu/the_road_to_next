import prisma from "../../../lib/prisma";
import {ParsedSearchParams} from "../search-params";
import {TicketWithMetadata} from "../types";

export const getTickets = async (
    searchParams: ParsedSearchParams,
    userId?: string | undefined): Promise<TicketWithMetadata[]> => 
{
    return await prisma.ticket.findMany({
        where: {
            userId,
            title: {
                contains: searchParams.search,
                mode: "insensitive"
            },
        },
        orderBy: {
            [searchParams.sortKey]:
            searchParams.sortKey
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