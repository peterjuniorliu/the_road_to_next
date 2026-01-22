import "./globals.css";
import {Header} from "../components/header";
import {Suspense} from "react";
import localFont from "next/font/local";
import {Toaster} from "../../components/ui/sonner";
import {ThemeProvider} from "../components/theme/theme-provider";
import type {Metadata} from "next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
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
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
