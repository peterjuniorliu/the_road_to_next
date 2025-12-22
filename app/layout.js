export default function RootLayoutBoundary({children}) {
    return (
        <html>
            <body>
                <header>
                    <h1>Hello Next</h1>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}