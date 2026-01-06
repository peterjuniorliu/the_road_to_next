import Link from "next/link";
import {Heading} from "../components/heading";
import {ticketsPath} from "./paths";

const HomePage = () => 
{
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Home" />
            <div className="flex-1 flex-col items-center">
                <Link href={ticketsPath()} className="text-sm underline">
                    Your home place to start
                </Link>
            </div>
        </div>
    );
};

export default HomePage;