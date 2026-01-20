"use client";
import {Ticket} from "../../../generated/prisma/client";
import {DatePicker, ImperativeHandleFromDatePicker} from "../../../components/date-picker";
import {toDecimalString} from "../../../utils/currency";
import {Input} from "../../../components/ui/input";
import {FieldError} from "../../../components/form/field-error";
import {useActionState, useRef} from "react";
import {Button} from "../../../components/ui/button"; 
import {Label} from "../../../components/ui/label";
import {ActionState, EMPTY_ACTION_STATE} from "../../../components/form/utils/to-action-state";
import {Form} from "../../../components/form/form";
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

    const datePickerImperativeHandleRef = useRef<ImperativeHandleFromDatePicker>(null);

    const handleSuccess = () => 
    {
        datePickerImperativeHandleRef.current?.reset();
    }

    return (
        <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={(actionState.payload?.get("title") as string) ?? ticket?.title} />
            <FieldError actionState={actionState} name="title" />
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={(actionState.payload?.get("content") as string) ?? ticket?.content} />
            <Label htmlFor="status">Status</Label>
            <FieldError actionState={actionState} name="content" />
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
            <div className="flex gap-x-2 mb-1">
                <div className="w-1/2">
                    <Label htmlFor="deadline">
                        Deadline
                    </Label>
                    <DatePicker id="deadline" name="deadline" defaultValue={
                        (actionState.payload?.get("deadline") as string) ?? ticket?.deadline
                    } 
                        imperativeHandleRef={datePickerImperativeHandleRef}
                    />
                    <FieldError actionState={actionState} name="deadline" />
                </div>
                <div className="w-1/2">
                    <Label htmlFor="bounty">
                        Bounty ($)
                    </Label>
                    <Input id="bounty" name="bounty" type="number" step=".01" defaultValue={
                        (actionState.payload?.get("bounty") as string) ?? (ticket?.bounty ? toDecimalString(ticket?.bounty) : "")
                    } />
                    <FieldError actionState={actionState} name="bounty" />
                </div>
            </div>
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
        </Form>
    );
};

export {TicketUpsertForm};
