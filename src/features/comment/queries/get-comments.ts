"use server";
import {getAuth} from "../../auth/queries/get-auth";
import {isOwner} from "../../auth/utils/is-owner";
import prisma from "../../../lib/prisma";
import {Prisma} from "../../../generated/prisma";

export const getComments = async (
    ticketId: string, 
    cursor?: {
        id: string,
        createdAt: number
    } 
) => {
    const {user} = await getAuth();

    const where: Prisma.CommentWhereInput = {
        ticketId,
    };

    const take = 2;

    const [comments, count] = await Promise.all([
        prisma.comment.findMany({
            where,
            take,
            cursor: cursor ? {
                createdAt: new Date(cursor.createdAt),
                id: cursor.id
            } : undefined,
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: [{
                createdAt: "desc"
            }, {
                id: "desc"
            }],
        }),
        prisma.comment.count({
            where,
        }),
    ]);

    const hasNextPage = true;
    const lastComment = comments.at(-1);

    return {
        list: comments.map((comment) => ({
            ...comment,
            isOwner: isOwner(user, comment),
        })),
        metadata: {
            count,
            hasNextPage,
            cursor: lastComment ? {
                createdAt: lastComment.createdAt.valueOf(),
                id: lastComment.id 
            } : undefined, 
        }
    };
};