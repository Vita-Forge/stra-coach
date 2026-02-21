"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ORDERS, DEMO_USERS, type Order } from "@/lib/data";
import { IconOrder, IconCheck, IconPackage } from "@/components/Icons";

const STATUS_COLORS = {
    nuovo: "var(--red-400)",
    in_lavorazione: "#fbbf24",
    consegnato: "#4ade80",
    annullato: "var(--text-muted)",
};

const STATUS_LABELS = {
    nuovo: "Ricevuto",
    in_lavorazione: "In lavorazione",
    consegnato: "Consegnato",
    annullato: "Annullato",
};

type Tab = "pendenti" | "tutti";

export default function OrdiniPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>(
        user ? ORDERS.filter(o => o.assignedProfId === user.id) : ORDERS
    );
    const [tab, setTab] = useState<Tab>("pendenti");

    const filteredOrders = tab === "pendenti"
        ? orders.filter(o => o.status === "nuovo" || o.status === "in_lavorazione")
        : orders;

    const updateStatus = (id: string, status: Order["status"]) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconOrder />
                    Ordini Clienti
                </div>
                <div className="header-actions">
                    {orders.filter(o => o.status === "nuovo").length > 0 && (
                        <span className="tag tag-red">
                            {orders.filter(o => o.status === "nuovo").length} nuovi ordini
                        </span>
                    )}
                    <div style={{ display: "flex", gap: "0.25rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", padding: "0.2rem" }}>
                        {(["pendenti", "tutti"] as Tab[]).map(t => (
                            <button key={t} onClick={() => setTab(t)} className={`btn btn-sm ${tab === t ? "btn-red" : "btn-ghost"}`} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem" }}>
                                {t === "pendenti" ? `Da gestire (${orders.filter(o => ["nuovo", "in_lavorazione"].includes(o.status)).length})` : "Tutti"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dash-content">
                {filteredOrders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-muted)" }}>
                        <div style={{ marginBottom: "0.5rem", color: "var(--iron-600)" }}><IconOrder /></div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase" }}>Nessun ordine {tab === "pendenti" ? "da gestire" : ""}</div>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {filteredOrders.map(o => {
                            const client = DEMO_USERS.find(u => u.id === o.userId);
                            return (
                                <div key={o.id} style={{ padding: "1.25rem", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", background: "var(--iron-900)", borderLeft: `3px solid ${STATUS_COLORS[o.status]}` }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                                        <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-sm)", background: "var(--iron-800)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red-400)", flexShrink: 0 }}>
                                            <IconPackage />
                                        </div>
                                        <div style={{ flex: 1, minWidth: "200px" }}>
                                            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{o.productName}</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.3rem" }}>
                                                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "var(--iron-700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontFamily: "var(--font-display)", fontWeight: 800 }}>
                                                    {client?.initials}
                                                </div>
                                                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{o.userName}</span>
                                                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>· {o.date}</span>
                                            </div>
                                            {o.notes && (
                                                <div style={{ marginTop: "0.5rem", padding: "0.5rem 0.75rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", fontSize: "0.75rem", color: "var(--text-secondary)", borderLeft: "2px solid var(--border-red)" }}>
                                                    {o.notes}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0, flexWrap: "wrap" }}>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.1rem", color: "var(--red-400)" }}>€{o.price.toFixed(2)}</div>
                                                <div style={{ fontSize: "0.65rem", color: STATUS_COLORS[o.status], fontWeight: 700 }}>● {STATUS_LABELS[o.status]}</div>
                                            </div>
                                            {/* Actions */}
                                            <div style={{ display: "flex", gap: "0.4rem" }}>
                                                {o.status === "nuovo" && (
                                                    <button onClick={() => updateStatus(o.id, "in_lavorazione")} className="btn btn-ghost btn-sm" style={{ fontSize: "0.72rem" }}>
                                                        Accetta
                                                    </button>
                                                )}
                                                {o.status === "in_lavorazione" && (
                                                    <button onClick={() => updateStatus(o.id, "consegnato")} className="btn btn-red btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem" }}>
                                                        <IconCheck /> Consegnato
                                                    </button>
                                                )}
                                                {o.status !== "annullato" && o.status !== "consegnato" && (
                                                    <button onClick={() => updateStatus(o.id, "annullato")} className="btn btn-ghost btn-sm" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                                                        Annulla
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
