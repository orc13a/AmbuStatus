import "./globals.css";

export const metadata = {
    title: "AmbuStatus Dashboard",
    description: "Oversigt over ambulancestatus",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="da">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
