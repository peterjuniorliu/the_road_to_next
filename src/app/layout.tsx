import {ReactNode} from "react";
import Navbar from "./Navbar";
import "./globals.css";

export default function PageLayout({children}: {children: ReactNode})
{
    return (
        <html lang="zh-CN">
            <body className="friendship-bg">
                <Navbar />
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}