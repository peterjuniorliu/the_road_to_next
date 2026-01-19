"use client";
import {Ticket} from "../../../generated/prisma/client";
import {Input} from "../../../components/ui/input";
import {FieldError} from "../../../components/form/field-error";
import {useActionState} from "react";
import {Button} from "../../../components/ui/button"; 
import {Label} from "../../../components/ui/label";
import {ActionState, EMPTY_ACTION_STATE} from "../../../components/form/utils/to-action-state";
import {toast} from "sonner";
import {useActionFeedback} from "../../../components/form/hooks/use-action-feedback";
import {SubmitButton} from "../../../components/form/submit-button";
import {Textarea} from "../../../components/ui/textarea";
import {upsertTicket} from "../actions/upsert-ticket";
import {deleteTicket} from "../actions/delete-ticket";

type TicketUpsertFormProps = {
    ticket?: Ticket;
};

const TicketUpsertForm = ({ticket}: TicketUpsertFormProps) => 
{
    const [actionState, action] = useActionState<ActionState, FormData>(
        upsertTicket.bind(null, ticket?.id),
        EMPTY_ACTION_STATE
    );

    useActionFeedback(actionState, {
        onSuccess: ({actionState}) => {
            if (actionState.message) {
                toast.success(actionState.message);
            }
        },
        onError: ({actionState}) => {
            if (actionState.message) {
                toast.error(actionState.message);
            }
        }
    });

    return (
        <form action={action} className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={(actionState.payload?.get("title") as string) ?? ticket?.title} />
            <FieldError actionState={actionState} name="title" />
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={(actionState.payload?.get("content") as string) ?? ticket?.content} />
            <Label htmlFor="status">Status</Label>
            <select
                id="status"
                name="status"
                defaultValue={ticket?.status ?? "OPEN"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
            >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
            <div className="flex items-center justify-between gap-x-3">
                <SubmitButton label={ticket ? "Edit": "Create"} />
                {ticket?.id ? (
                    <Button
                        type="submit"
                        formAction={deleteTicket.bind(null, ticket?.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </Button>
                ) : null}
            </div>
        </form>
    );
};

export {TicketUpsertForm};
