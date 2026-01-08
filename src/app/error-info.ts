export type ErrorInfo = {
    title: string;
    description: string;
    context: {label: string; value: string};
    hints: string[];
};

export const buildTicketNotFoundInfo = (ticketId: string): ErrorInfo => ({
    title: "Ticket not found",
    description: "We could not find a ticket matching this id.",
    context: {label: "Ticket ID", 
              value: ticketId},
    hints: [
        "Verify the URL or shared link is correct.",
        "The ticket may have been deleted or you may not have access.",
        "Return to the ticket list and choose another item.",
    ],
});