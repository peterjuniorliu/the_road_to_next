"use client";
import { useEffect, useState } from "react";
import type {User} from "lucia";
import { getAuth } from "../queries/get-auth";

export function HomeClient() 
{
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { user } = await getAuth();
            setUser(user);
        };

        fetchUser();
    }, []);

    return <div>{user?.email}</div>;
}