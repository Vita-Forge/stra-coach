"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !user) {
            router.push("/sign-in");
        }
    }, [user, isLoaded, router]);

    if (!isLoaded || !user) {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--iron-950)",
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
            }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                        width: "40px", height: "40px",
                        border: "3px solid var(--iron-700)",
                        borderTopColor: "var(--red-600)",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <span>Caricamento...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-wrap">
            <Sidebar />
            <main className="dash-main">{children}</main>
        </div>
    );
}
