import {CommentCreateForm} from "./comment-create-form";
import {CommentWithMetadata} from "../types";
import {CommentDeleteButton} from "./comment-delete-button";
import {CardCompact} from "../../../components/card-compact";
import {CommentItem} from "./comment-item";

type CommentsProps = {
    ticketId: string,
    comments?: CommentWithMetadata[]  
};

const Comments = async ({ticketId, comments = []}: CommentsProps) => 
{
    return (
        <div>
            <CardCompact title="Create Comment" description="A new comment will be created" content={<CommentCreateForm ticketId={ticketId} />} 
            />
            <div className="flex flex-col gap-y-2 ml-8">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} buttons={
                        [...(comment.isOwner ? [<CommentDeleteButton key="0" id={comment.id} />] : [])]
                    } comment={comment} 
                    />
                ))}
            </div>
        </div>
    );
};

export {Comments};