import "./globals.css";

export const metadata = {
    title: "AmbuStatus Dashboard",
    description: "Oversigt over ambulancestatus",
};

export default function RootLayout({ children }) {
    return (
        <html lang="da">
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
