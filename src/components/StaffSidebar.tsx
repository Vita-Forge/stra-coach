"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    IconDash, IconClients, IconPlans, IconMessages, IconCalendar,
    IconStats, IconSettings, IconLogout, IconProfile, IconDocument, IconOrder, IconMenu, IconX,
} from "./Icons";

const staffNav = [
    { href: "/pro", icon: <IconDash />, label: "Panoramica", exact: true },
    { href: "/pro/clienti", icon: <IconClients />, label: "Clienti" },
    { href: "/pro/piani", icon: <IconPlans />, label: "Piani & Programmi" },
    { href: "/pro/messaggi", icon: <IconMessages />, label: "Messaggi" },
    { href: "/pro/calendario", icon: <IconCalendar />, label: "Calendario" },
    { href: "/pro/statistiche", icon: <IconStats />, label: "Statistiche" },
    { href: "/pro/documenti", icon: <IconDocument />, label: "Documenti" },
    { href: "/pro/ordini", icon: <IconOrder />, label: "Ordini" },
    { href: "/pro/impostazioni", icon: <IconSettings />, label: "Impostazioni" },
];

export default function StaffSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, signOut } = useAuth();
    const [open, setOpen] = useState(false);

    const handleSignOut = () => { signOut(); router.push("/sign-in"); };

    const initials = user?.name
        ?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) ?? "SC";

    const SidebarContent = () => (
        <>
            {/* Logo + Staff badge */}
            <div style={{ padding: "1.2rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
                <Link href="/pro" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.3rem", textTransform: "uppercase", color: "var(--text-primary)", textDecoration: "none", display: "block" }} onClick={() => setOpen(false)}>
                    STRA<span style={{ color: "var(--red-600)" }}>.</span>COACH
                </Link>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", marginTop: "0.4rem", background: "rgba(220,38,38,0.1)", border: "1px solid var(--border-red)", borderRadius: "3px", padding: "0.15rem 0.5rem", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red-400)" }}>
                    Staff Portal
                </div>
            </div>

            {/* Nav */}
            <div style={{ flex: 1, padding: "0.5rem 0", overflowY: "auto" }}>
                <nav>
                    {staffNav.map((item) => {
                        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href} className={`nav-item ${isActive ? "active" : ""}`} title={item.label} onClick={() => setOpen(false)}>
                                <span className="nav-icon">{item.icon}</span>
                                {item.label}
                                {item.label === "Ordini" && <span style={{ marginLeft: "auto", fontSize: "0.6rem", background: "var(--red-700)", color: "white", borderRadius: "10px", padding: "0.1rem 0.4rem", fontFamily: "var(--font-display)", fontWeight: 800 }}>NEW</span>}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Specialty */}
            {user?.specialty && (
                <div style={{ padding: "0 1rem 0.75rem" }}>
                    <div style={{ background: "var(--iron-800)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.55rem 0.75rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {user.specialty}
                    </div>
                </div>
            )}

            {/* User footer */}
            <div className="sidebar-bottom">
                <Link href="/pro/profilo" className="user-chip" style={{ textDecoration: "none" }} onClick={() => setOpen(false)}>
                    <div className="user-avatar" style={{ background: "linear-gradient(135deg, var(--red-700), #7f0000)" }}>{initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="user-name" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name ?? "—"}</div>
                        <div style={{ fontSize: "0.65rem", color: "var(--red-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            {user?.role === "manager" ? "Manager" : "Staff"}
                        </div>
                    </div>
                    <span style={{ color: "var(--text-muted)", display: "flex" }}><IconProfile /></span>
                </Link>
                <button id="staff-logout-btn" onClick={handleSignOut} className="icon-btn" title="Esci" style={{ marginLeft: "0.25rem" }}>
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
                id="staff-mobile-menu-btn"
            >
                {open ? <IconX /> : <IconMenu />}
            </button>

            {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

            <aside className={`sidebar ${open ? "sidebar-open" : ""}`} style={{ borderRightColor: "rgba(220,38,38,0.12)" }}>
                <SidebarContent />
            </aside>
        </>
    );
}
