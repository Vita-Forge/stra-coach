"use client";
import { DEMO_USERS, ORDERS, LEADS, DOCUMENTS, ROLE_LABELS } from "@/lib/data";
import { IconAdmin, IconUsers, IconTrend, IconOrder, IconShop } from "@/components/Icons";

export default function AdminPage() {
    const users = DEMO_USERS;
    const profs = users.filter(u => u.role === "professionista" || u.role === "manager");
    const clienti = users.filter(u => u.role === "utente");
    const revenue = ORDERS.filter(o => o.status === "consegnato").reduce((s, o) => s + o.price, 0);

    const ROLE_BADGE_COLORS: Record<string, string> = {
        admin: "rgba(220,38,38,0.15)",
        manager: "rgba(139,92,246,0.15)",
        professionista: "rgba(59,130,246,0.15)",
        commerciale: "rgba(16,185,129,0.15)",
        fornitore: "rgba(245,158,11,0.15)",
        utente: "rgba(255,255,255,0.05)",
    };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconAdmin />
                    Pannello Amministrazione
                </div>
                <div className="header-actions">
                    <span className="tag tag-red">Admin</span>
                </div>
            </div>

            <div className="dash-content">
                {/* KPI row */}
                <div className="grid-4" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
                    {[
                        { label: "Utenti totali", value: users.length, sub: `${clienti.length} clienti`, icon: <IconUsers />, color: "var(--red-400)" },
                        { label: "Professionisti", value: profs.length, sub: "attivi sulla piattaforma", icon: <IconAdmin />, color: "#a78bfa" },
                        { label: "Ordini totali", value: ORDERS.length, sub: `${ORDERS.filter(o => o.status === "nuovo").length} nuovi`, icon: <IconOrder />, color: "#60a5fa" },
                        { label: "Fatturato", value: `€${revenue.toFixed(0)}`, sub: "ordini consegnati", icon: <IconTrend />, color: "#4ade80" },
                    ].map(k => (
                        <div key={k.label} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-sm)", background: "var(--iron-800)", display: "flex", alignItems: "center", justifyContent: "center", color: k.color, flexShrink: 0 }}>
                                {k.icon}
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", color: k.color, lineHeight: 1 }}>{k.value}</div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</div>
                                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{k.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid-2" style={{ gap: "1.5rem", alignItems: "start" }}>
                    {/* Tutti gli utenti */}
                    <div className="card">
                        <div className="card-label" style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
                            <span>Utenti Registrati ({users.length})</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {users.map(u => (
                                <div key={u.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 0.85rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)" }}>
                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: ROLE_BADGE_COLORS[u.role], border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.65rem", flexShrink: 0 }}>
                                        {u.initials}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: "0.8rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{u.email}</div>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: "0.6rem", background: ROLE_BADGE_COLORS[u.role], padding: "0.15rem 0.5rem", borderRadius: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                            {ROLE_LABELS[u.role]}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ordini recenti + Leads */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        <div className="card">
                            <div className="card-label" style={{ marginBottom: "1rem" }}>Ordini Recenti</div>
                            {ORDERS.map(o => (
                                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.55rem 0", borderBottom: "1px solid var(--border)" }}>
                                    <div>
                                        <div style={{ fontSize: "0.78rem", fontWeight: 600 }}>{o.productName}</div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{o.userName} · {o.date}</div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", color: "var(--red-400)" }}>€{o.price.toFixed(2)}</div>
                                        <div style={{ fontSize: "0.6rem", color: o.status === "consegnato" ? "#4ade80" : o.status === "nuovo" ? "var(--red-400)" : "#fbbf24", fontWeight: 700 }}>
                                            {o.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card">
                            <div className="card-label" style={{ marginBottom: "1rem" }}>Lead Commerciali</div>
                            {LEADS.map(l => (
                                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.55rem 0", borderBottom: "1px solid var(--border)" }}>
                                    <div>
                                        <div style={{ fontSize: "0.78rem", fontWeight: 600 }}>{l.name}</div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{l.interest} · {l.date}</div>
                                    </div>
                                    <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "10px", background: l.status === "convertito" ? "rgba(74,222,128,0.15)" : l.status === "call_fissata" ? "rgba(96,165,250,0.15)" : "rgba(255,255,255,0.05)" }}>
                                        {l.status.replace("_", " ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
