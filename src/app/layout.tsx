import {Providers} from "./providers";
import "./globals.css"

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
        <head>
            <title>Skola77-3</title>
            <meta property="description" content="Skola77-3 alpha preview site" />
        </head>
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
