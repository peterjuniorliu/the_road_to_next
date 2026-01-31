import {Prisma} from "../../generated/prisma";

export type TicketWithMetadata = Prisma.TicketGetPayload<{
    include: {
        user: {
            select: {username: true}
        }
    }
}> & {isOwner: boolean};

export type PaginatedTicketResult = {
    list: TicketWithMetadata[];
    metadata: {
        count: number;
        hasNextPage: boolean;
    };
};