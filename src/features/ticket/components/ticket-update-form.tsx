import {Ticket} from "../../../generated/prisma/client";
import {Button} from "../../../components/ui/button";
import {Input} from "../../../components/ui/input";
import {Label} from "../../../components/ui/label";
import {Textarea} from "../../../components/ui/textarea";
import {updateTicket} from "../actions/update-ticket";

type TicketUpdateFormProps = {
    ticket: Ticket
};

const TicketUpdateForm = ({ticket}: TicketUpdateFormProps) => 
{
    return (
        <form action={updateTicket.bind(null, ticket.id)} className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={ticket.title} />
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={ticket.content} />
            <Label htmlFor="status">Status</Label>
            <select
                id="status"
                name="status"
                defaultValue={ticket.status}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
            >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
            <Button type="submit">Update</Button>
        </form>
    );
};

export {TicketUpdateForm};
