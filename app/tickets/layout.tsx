import type {Metadata} from "next";
import Link from "next/link";
import {homePath, ticketsPath} from "../paths";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "The Road Next",
  description: "My Road to Next application ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href={homePath()} className="text-sm font-semibold tracking-tight text-slate-900 hover:text-slate-700">
              Home
            </Link>
            <Link href={ticketsPath()} className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Tickets
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300">
              Sign in
            </button>
          </div>
        </nav>
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {children}
          </div>
        </main>
      </body>
      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-4 text-xs text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} The Road Next
      </footer>
    </html>
  );
}