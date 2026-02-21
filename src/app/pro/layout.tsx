"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import StaffSidebar from "@/components/StaffSidebar";

const STAFF_ROLES = ["manager", "professionista"] as const;

export default function ProLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    const isStaff = user && STAFF_ROLES.includes(user.role as typeof STAFF_ROLES[number]);

    useEffect(() => {
        if (isLoaded && !user) router.push("/sign-in");
        if (isLoaded && user && !STAFF_ROLES.includes(user.role as typeof STAFF_ROLES[number])) {
            router.push("/sign-in");
        }
    }, [user, isLoaded, router]);

    if (!isLoaded || !user || !isStaff) {
        return (
            <div style={{
                minHeight: "100vh", display: "flex", alignItems: "center",
                justifyContent: "center", background: "var(--iron-950)",
                fontFamily: "var(--font-display)", fontSize: "1rem",
                color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "36px", height: "36px", border: "2px solid var(--iron-700)", borderTopColor: "var(--red-600)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    Verifica accesso...
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-wrap">
            <StaffSidebar />
            <main className="dash-main">{children}</main>
        </div>
    );
}
