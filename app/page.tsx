import Link from "next/link";
import {ticketsPath} from "./paths";

const HomePage = () => 
{
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">
                    Home
                </h2>
                <p className="text-sm text-muted-foreground">
                    Your home place to start
                </p>
            </div>
            <Link href={ticketsPath()} className="flex-1 flex flex-col items-center gap-y-4">
                Go to Tickets
            </Link>
        </div>
    );
};

export default HomePage;