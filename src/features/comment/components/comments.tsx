"use client";
import {CommentCreateForm} from "./comment-create-form";
import {getComments} from "../queries/get-comments";
import {CommentWithMetadata} from "../types";
import {useEffect} from "react";
import {useInView} from "react-intersection-observer"; 
import {Skeleton} from "../../../components/ui/skeleton";
import {CommentDeleteButton} from "./comment-delete-button";
import {CardCompact} from "../../../components/card-compact";
import {InfiniteData, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {PaginatedData} from "../../../types/pagination";
import {CommentItem} from "./comment-item";

type CommentsCursor = {
    id: string,
    createdAt: number
};

type PaginatedComments = PaginatedData<CommentWithMetadata, CommentsCursor>;

type CommentsProps = {
    ticketId: string,
    paginatedComments: PaginatedComments
};

const Comments = ({ticketId, paginatedComments}: CommentsProps) => 
{
    const queryClient = useQueryClient();
    const queryKey = ["comments", ticketId];

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery<
        PaginatedComments,
        Error,
        InfiniteData<PaginatedComments>,
        string[],
        CommentsCursor | undefined
    >({
        queryKey,
        queryFn: ({pageParam}) => getComments(ticketId, pageParam),
        initialPageParam: undefined,
        initialData: {
            pages: [paginatedComments],
            pageParams: [undefined],
        },
        getNextPageParam: (lastPage) =>
            lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

    const comments = data?.pages.flatMap((page) => page.list) ?? [];

    const handleDeleteComment = async (_id: string) => {
        await queryClient.invalidateQueries({queryKey: ["comments", ticketId]});
    };

    const handleCreateComment = async (comment: CommentWithMetadata | undefined) => {
        if (!comment) {
            return;
        }

        await queryClient.invalidateQueries({queryKey: ["comments", ticketId]});
    };

    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

    return (
        <div>
            <CardCompact title="Create Comment" description="A new comment will be created" content={
                <CommentCreateForm ticketId={ticketId} onCreateComment={handleCreateComment} />
            } />
            <div className="flex flex-col gap-y-2 ml-8">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} buttons={[
                        ...(comment.isOwner ? [
                            <CommentDeleteButton key="0" id={comment.id} onDeleteComment={handleDeleteComment} />
                        ] : []),
                    ]} comment={comment}
                    />
                ))}
                {isFetchingNextPage && (
                    <div>
                        <div className="flex gap-x-2">
                            <Skeleton className="h=[82px] w-full" />
                            <Skeleton className="h-[40px] w-[40px]" />
                        </div>
                        <div className="flex gap-x-2">
                            <Skeleton className="h-[82px] w-full" />
                            <Skeleton className="h-[40px] w-[40px]" />
                        </div>
                    </div>
                )}
            </div>
            <div ref={ref} >
                {!hasNextPage && (
                    <p className="text-right text-xsitalic">
                        No more comments.
                    </p>  
                )}
            </div>
        </div>
    );
};

export {Comments};