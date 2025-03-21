import { Providers } from "./providers";
import "./globals.css"
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
        <head>
            <title>Skola77-3 3</title>
        </head>
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
