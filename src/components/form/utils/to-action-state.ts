import {ZodError} from "zod";

export type ActionState = {
    status?: "SUCCESS" | "ERROR",
    message: string,
    payload?: FormData,
    timestamp: number,
    fieldErrors: Record<string, string[] | undefined> 
};

export const EMPTY_ACTION_STATE: ActionState = {
    timestamp: Date.now(),
    message: "",
    fieldErrors: {}
};

export const fromErrorToActionState = (
    error: unknown,
    formData?: FormData
): ActionState => 
{
    if (error instanceof ZodError) {
        return {
            status: "ERROR",
            message: error.issues[0]?.message ?? "Validation error",
            payload: formData,
            timestamp: Date.now(),
            fieldErrors: error.flatten().fieldErrors 
        };
    } else if (error instanceof Error) {
        return {
            status: "ERROR",
            message: error.message,
            payload: formData,
            timestamp: Date.now(),
            fieldErrors: {} 
        };
    } else {
        return {
            status: "ERROR",
            message: "An unknown error occured",
            payload: formData,
            timestamp: Date.now(),
            fieldErrors: {}
        };
    }
};

export const toActionState = (
    status: ActionState["status"],
    message: string,
    formData?: FormData
): ActionState => {
    return {
        status,
        timestamp: Date.now(),
        message,
        payload: formData,
        fieldErrors: {}
    };
};