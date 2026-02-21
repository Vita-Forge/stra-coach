"use client";
import { useState } from "react";
import { PRODUCTS, ORDERS, type Product } from "@/lib/data";
import { IconSupplier, IconOrder, IconShop, IconPackage, IconEdit } from "@/components/Icons";

type Tab = "prodotti" | "ordini";

export default function FornitorePage() {
    const myProducts = PRODUCTS.filter(p => p.supplierId === "forn_001");
    const myOrders = ORDERS.filter(o => {
        const prod = PRODUCTS.find(p => p.id === o.productId);
        return prod?.supplierId === "forn_001";
    });

    const [tab, setTab] = useState<Tab>("ordini");
    const [orders, setOrders] = useState(myOrders);

    const updateStatus = (id: string, status: typeof orders[0]["status"]) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    };

    const STATUS_COLORS = {
        nuovo: "var(--red-400)", in_lavorazione: "#fbbf24", consegnato: "#4ade80", annullato: "var(--text-muted)"
    };
    const STATUS_LABELS = { nuovo: "Ricevuto", in_lavorazione: "In spedizione", consegnato: "Consegnato", annullato: "Annullato" };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconSupplier />
                    Pannello Fornitore
                </div>
                <div className="header-actions">
                    <div style={{ display: "flex", gap: "0.25rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", padding: "0.2rem" }}>
                        {(["ordini", "prodotti"] as Tab[]).map(t => (
                            <button key={t} onClick={() => setTab(t)} className={`btn btn-sm ${tab === t ? "btn-red" : "btn-ghost"}`} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem" }}>
                                {t === "ordini" ? `Ordini (${orders.length})` : `Catalogo (${myProducts.length})`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dash-content">
                {/* KPI */}
                <div className="grid-4" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
                    {[
                        { label: "Prodotti attivi", value: myProducts.length, color: "var(--red-400)" },
                        { label: "Ordini totali", value: orders.length, color: "#60a5fa" },
                        { label: "Da spedire", value: orders.filter(o => o.status === "nuovo" || o.status === "in_lavorazione").length, color: "#fbbf24" },
                        { label: "Fatturato", value: `€${orders.filter(o => o.status === "consegnato").reduce((s, o) => s + o.price, 0).toFixed(2)}`, color: "#4ade80" },
                    ].map(k => (
                        <div key={k.label} className="card">
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", color: k.color }}>{k.value}</div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>{k.label}</div>
                        </div>
                    ))}
                </div>

                {tab === "ordini" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        {orders.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>Nessun ordine ancora</div>
                        ) : orders.map(o => (
                            <div key={o.id} style={{ padding: "1rem 1.25rem", border: `1px solid var(--border)`, borderLeft: `3px solid ${STATUS_COLORS[o.status]}`, borderRadius: "var(--radius-sm)", background: "var(--iron-900)", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                                <div style={{ width: "36px", height: "36px", background: "var(--iron-800)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red-400)", flexShrink: 0 }}>
                                    <IconPackage />
                                </div>
                                <div style={{ flex: 1, minWidth: "150px" }}>
                                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{o.productName}</div>
                                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{o.userName} · {o.date}</div>
                                </div>
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--red-400)" }}>€{o.price.toFixed(2)}</div>
                                <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: STATUS_COLORS[o.status] }}>● {STATUS_LABELS[o.status]}</span>
                                    {o.status === "nuovo" && <button onClick={() => updateStatus(o.id, "in_lavorazione")} className="btn btn-ghost btn-sm" style={{ fontSize: "0.7rem" }}>Invia</button>}
                                    {o.status === "in_lavorazione" && <button onClick={() => updateStatus(o.id, "consegnato")} className="btn btn-red btn-sm" style={{ fontSize: "0.7rem" }}>Confermato</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tab === "prodotti" && (
                    <div className="grid-3" style={{ gap: "1rem" }}>
                        {myProducts.map(p => (
                            <div key={p.id} className="card" style={{ position: "relative" }}>
                                <div style={{ width: "36px", height: "36px", background: "var(--iron-800)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red-400)", marginBottom: "0.75rem" }}>
                                    <IconPackage />
                                </div>
                                <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{p.name}</div>
                                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>Stock: {p.stock ?? "—"} pz</div>
                                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.5rem", lineHeight: 1.5 }}>{p.description}</div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
                                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, color: "var(--red-400)" }}>€{p.price.toFixed(2)}</div>
                                    <button className="btn btn-ghost btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><IconEdit /> Modifica</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
