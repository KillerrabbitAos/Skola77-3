import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Skola77-3</title>
        <meta property="description" content="Skola77-3 alpha preview site" />
        <meta property="og:title" content="Skola77-3 pre-alpha" />
        <meta property="og:site_name" content="Skola77-3 first alpha preview" />
        <meta
          property="og:description"
          content="Preview for those who are interested in the third version of Skola77, which is still only in it's first stages of development."
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
