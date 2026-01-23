"use client";
import type {User} from "lucia";

type HomeClientProps = {
    user: User | null
};

export function HomeClient({user}: HomeClientProps) 
{
    return <div>{user?.email}</div>;
}
