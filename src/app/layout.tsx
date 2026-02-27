import type { Metadata } from "next";
import { Providers } from "./providers";
import "../index.css"; // We'll keep index.css as the global CSS

export const metadata: Metadata = {
    title: "Osman Egehan Gezici | Architecture Portfolio",
    description: "Architecture portfolio showcasing spatial design, research-led practice, and technical clarity.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
