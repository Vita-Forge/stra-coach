import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
    title: "Stra Coach — Coaching d'Élite. Risultati Reali.",
    description:
        "La piattaforma italiana che unisce coach umani d'élite con AI 24/7. Accountability, KPI misurabili, risultati straordinari.",
    keywords: "coaching, AI coach, performance, nutrizione, allenamento, business coaching Italia",
    openGraph: {
        title: "Stra Coach — Coaching d'Élite. Risultati Reali.",
        description: "La prima piattaforma italiana di coaching ibrido umano + AI.",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="it">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
