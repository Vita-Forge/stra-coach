"use client";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;
        if (!user || user.role !== "admin") router.push("/sign-in");
    }, [user, isLoaded, router]);

    if (!user || user.role !== "admin") return null;

    const handleSignOut = () => {
        // handled via buttons in children
    };

    const initials = user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) ?? "AD";

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "var(--iron-950)" }}>
            {/* Admin sidebar */}
            <aside style={{ width: "200px", flexShrink: 0, display: "flex", flexDirection: "column", borderRight: "1px solid var(--border)", background: "var(--iron-900)" }}>
                <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.1rem", textTransform: "uppercase" }}>
                        STRA<span style={{ color: "var(--red-600)" }}>.</span>ADMIN
                    </div>
                    <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Pannello Admin
                    </div>
                </div>
                <nav style={{ flex: 1, padding: "0.5rem 0" }}>
                    <a href="/admin" className="nav-item active">Panoramica</a>
                </nav>
                <div style={{ padding: "1rem", borderTop: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600 }}>{user.name}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Amministratore</div>
                    <button onClick={() => { localStorage.removeItem("sc_user"); window.location.href = "/sign-in"; }} style={{ marginTop: "0.75rem", fontSize: "0.72rem", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}>
                        Esci →
                    </button>
                </div>
            </aside>

            {/* Content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {children}
            </div>
        </div>
    );
}
