import {ZodError} from "zod";

export type ActionState = {
    message: string,
    payload?: FormData 
};

export const fromErrorToActionState = (
    error: unknown,
    formData?: FormData
): ActionState => 
{
    if (error instanceof ZodError) {
        return {
            message: error.issues[0]?.message ?? "Validation error",
            payload: formData 
        };
    } else if (error instanceof Error) {
        return {
            message: error.message,
            payload: formData 
        };
    } else {
        return {
            message: "An unknown error occured",
            payload: formData
        };
    }
};
