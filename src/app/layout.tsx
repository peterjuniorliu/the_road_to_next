import "./globals.css";
import {Header} from "../components/header";
import {Sidebar} from "./_navigation/sidebar/components/sidebar";
import {Suspense} from "react";
import localFont from "next/font/local";
import {Toaster} from "../../components/ui/sonner";
import {ThemeProvider} from "../components/theme/theme-provider";
import type {Metadata} from "next";
import {getAuth} from "../features/auth/queries/get-auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "My Road to Next application ..."
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user} = await getAuth();

  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <div className="flex h-screen overflow-hidden border-collapse">
            <Sidebar user={user} />
            <main
              className="
                min-h-screen flex-1
                overflow-y-auto overflow-x-hidden
                py-24 px-8
                bg-secondary/20
                flex flex-col
              "
            >
              {children}
            </main>
          </div>
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
