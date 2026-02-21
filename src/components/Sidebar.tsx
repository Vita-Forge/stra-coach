"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    IconDash, IconAI, IconCall, IconNutrition, IconTraining,
    IconMessages, IconShop, IconDocument, IconProfile, IconLogout, IconMenu, IconX,
} from "./Icons";

const clientNav = [
    { href: "/dashboard", icon: <IconDash />, label: "Dashboard", exact: true },
    { href: "/dashboard/chat", icon: <IconAI />, label: "Leo AI Coach" },
    { href: "/dashboard/call", icon: <IconCall />, label: "Prenota Call" },
    { href: "/dashboard/cibo", icon: <IconNutrition />, label: "Nutrizione" },
    { href: "/dashboard/allenamento", icon: <IconTraining />, label: "Allenamento" },
    { href: "/dashboard/messaggi", icon: <IconMessages />, label: "Messaggi" },
    { href: "/dashboard/shop", icon: <IconShop />, label: "Shop" },
    { href: "/dashboard/documenti", icon: <IconDocument />, label: "Documenti" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, signOut } = useAuth();
    const [open, setOpen] = useState(false);

    const handleSignOut = () => { signOut(); router.push("/sign-in"); };

    const initials = user?.name
        ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) ?? "SC";

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <Link href="/dashboard" className="sidebar-logo" onClick={() => setOpen(false)}>
                STRA<span>.</span>COACH
            </Link>

            {/* Nav */}
            <div style={{ flex: 1, padding: "0.5rem 0", overflowY: "auto" }}>
                <nav>
                    {clientNav.map((item) => {
                        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item ${isActive ? "active" : ""}`}
                                title={item.label}
                                onClick={() => setOpen(false)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {item.label}
                                {item.label === "Shop" && (
                                    <span style={{ marginLeft: "auto", fontSize: "0.6rem", background: "var(--red-700)", color: "white", borderRadius: "10px", padding: "0.1rem 0.4rem", fontFamily: "var(--font-display)", fontWeight: 800 }}>NEW</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Piano attivo */}
            <div style={{ padding: "0 1rem 0.75rem" }}>
                <div style={{ background: "rgba(220,38,38,0.06)", border: "1px solid var(--border-red)", borderRadius: "var(--radius-sm)", padding: "0.65rem 0.85rem" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--red-400)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {user?.plan ?? "—"}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                        Piano attivo
                    </div>
                </div>
            </div>

            {/* User footer */}
            <div className="sidebar-bottom">
                <Link href="/dashboard/profilo" className="user-chip" style={{ textDecoration: "none" }} onClick={() => setOpen(false)}>
                    <div className="user-avatar">{initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="user-name" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user?.name ?? "—"}
                        </div>
                        <div className="user-plan">{user?.plan ?? "—"}</div>
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>
                        <IconProfile />
                    </span>
                </Link>
                <button id="sidebar-logout-btn" onClick={handleSignOut} className="icon-btn" title="Esci" style={{ marginLeft: "0.25rem" }}>
                    <IconLogout />
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile hamburger */}
            <button
                className="mobile-menu-btn"
                onClick={() => setOpen(v => !v)}
                style={{ display: "none" }}
                id="mobile-menu-btn"
            >
                {open ? <IconX /> : <IconMenu />}
            </button>

            {/* Mobile overlay */}
            {open && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
                <SidebarContent />
            </aside>
        </>
    );
}
