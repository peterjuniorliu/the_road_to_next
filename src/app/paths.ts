import {SCHEDULE} from "./data";

const ALL_START_TIMES = Object.keys(SCHEDULE).map(
    (time) => time.split(" - ")[0].replace(":", "")
);

export const homePath = () => "/";
export const ticketsPath = () => "/tickets";
export const ticketPath = () => `/tickets/${ALL_START_TIMES}`;