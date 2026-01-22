export const homePath = () => "/";
export const signUpPath = () => "/auth?mode=signup";
export const signInPath = () => "/auth?mode=signin";
export const passwordForgotPath = () => "/password-forgot";
export const ticketsPath = () => "/tickets";
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;
