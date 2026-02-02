"use client";
import {CommentCreateForm} from "./comment-create-form";
import {getComments} from "../queries/get-comments";
import {CommentWithMetadata} from "../types";
import {Button} from "../../../components/ui/button";
import {CommentDeleteButton} from "./comment-delete-button";
import {CardCompact} from "../../../components/card-compact";
import {useState} from "react";
import {CommentItem} from "./comment-item";

type CommentsProps = {
    ticketId: string,
    paginatedComments: {
        list: CommentWithMetadata[],
        metadata: {count: number, 
                   hasNextPage: boolean}
    }
};

const Comments = async ({ticketId, paginatedComments}: CommentsProps) => 
{
    const [comments, setComments] = useState(paginatedComments.list);

    const [metadata, setMetadata] = useState(paginatedComments.metadata);

    const handleMore = async () => {
        const morePaginatedComments = await getComments(ticketId, comments.length);

        const moreComments = morePaginatedComments.list

        setComments([...comments, ...moreComments]);

        setMetadata(morePaginatedComments.metadata);
    };

    const handleDeleteComment = (id: string) => {
        setComments((previousComments) => previousComments.filter((comment) => comment.id !== id));
    };

    const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
        if (!comment) {
            return;
        }

        setComments((previousComments) => [comment, ...previousComments]);
    };

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
            </div>
            <div className="flex flex-col justify-center ml-8">
                {metadata.hasNextPage && (<Button variant="ghost" onClick={handleMore} >
                    More 
                </Button>)
                }
            </div>
        </div>
    );
};

export {Comments};