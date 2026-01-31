import {getAuth} from "../../auth/queries/get-auth";
import {isOwner} from "../../auth/utils/is-owner";
import prisma from "../../../lib/prisma";
import {ParsedSearchParams} from "../search-params";
import {PaginatedTicketResult} from "../types";

export const getTickets = async (
    searchParams: ParsedSearchParams,
    userId?: string | undefined): Promise<PaginatedTicketResult> => 
{
    const {user} = await getAuth();

    const where = {
        userId,
        title: {
            contains: searchParams.search,
            mode: "insensitive" as const 
        },
    };

    const skip = searchParams.page * searchParams.size;
    const take = searchParams.size;

    const [tickets, count] = await prisma.$transaction([ 
        prisma.ticket.findMany({
            where,
            skip,
            take,
            orderBy: {
                [searchParams.sortKey]:
                searchParams.sortValue,
            },
            include: {
                user:{
                    select: {
                        username: true,
                    },
                },
            }
        }), 
        
        prisma.ticket.count({
            where,
        })
    ]);

    return {
        list: tickets.map((ticket) => ({
            ...ticket,
            isOwner: isOwner(user, ticket),
        })),
        metadata: {
            count,
            hasNextPage: count > skip + take
        }, 
    };
};