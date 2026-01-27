export const homePath = () => "/auth/home";
export const signUpPath = () => "/auth/sign-up";
export const signInPath = () => "/auth/sign-in";
export const passwordForgotPath = () => "/auth/password-forgot";
export const ticketsPath = () => "/auth/home/tickets";
export const accountProfilePath = () => "/account/profile";
export const accountPasswordPath = () => "/account/password";
export const ticketPath = (ticketId: string) => `/auth/home/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `/auth/home/tickets/${ticketId}/edit`;