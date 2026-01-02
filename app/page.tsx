import Link from "next/link";
import {ticketsPath} from "./paths";

const HomePage = () => 
{
    return (
        <div>
            <div className="flex-1 flex flex-col gap-y-30">
                <h2 className="text-3xl font-bold tracking-tight">
                    Home
                </h2>
                <p className="mt-2 text-5xl font-bold text-center text-muted-foreground">
                    Your home place to start~
                </p>
            </div>
        </div>
    );
};

export default HomePage;