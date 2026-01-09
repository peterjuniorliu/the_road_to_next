import {LucideLoaderCircle} from "lucide-react";

const Spinner = () =>
{
    return (
        <div role="status" className="flex-1 flex flex-col items-center justify-center selr-center">
            <LucideLoaderCircle className="w-16 h-16 animate-spin" />
        </div>
    );
};

export {Spinner};