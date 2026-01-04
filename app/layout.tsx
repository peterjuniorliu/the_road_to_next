import {ReactNode} from "react";
import Navbar from "./Navbar";

export default function PageLayout({children}: {children: ReactNode})
{
    return (
        <html>
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}