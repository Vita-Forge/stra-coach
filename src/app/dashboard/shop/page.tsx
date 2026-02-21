"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PRODUCTS, ORDERS, type Product, type Order } from "@/lib/data";
import { IconShop, IconCart, IconOrder, IconPackage, IconCheck } from "@/components/Icons";

const CAT_LABELS: Record<string, string> = {
    tutti: "Tutti",
    pacchetto: "Pacchetti",
    servizio: "Servizi",
    integratore: "Integratori",
    attrezzatura: "Attrezzatura",
};

type Tab = "catalogo" | "ordini";

export default function ShopPage() {
    const { user } = useAuth();
    const [tab, setTab] = useState<Tab>("catalogo");
    const [cat, setCat] = useState("tutti");
    const [cart, setCart] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>(user ? ORDERS.filter(o => o.userId === user.id) : []);
    const [checkout, setCheckout] = useState(false);
    const [ordered, setOrdered] = useState(false);

    const prods = cat === "tutti" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
    const cartTotal = cart.reduce((s, p) => s + p.price, 0);

    const addToCart = (p: Product) => setCart(c => [...c, p]);
    const removeFromCart = (id: string) => setCart(c => { const i = c.findLastIndex(p => p.id === id); return c.filter((_, idx) => idx !== i); });
    const cartCount = (id: string) => cart.filter(p => p.id === id).length;

    const placeOrder = () => {
        if (!user || cart.length === 0) return;
        const newOrders: Order[] = cart.map(p => ({
            id: `ord_${Date.now()}_${p.id}`,
            userId: user.id,
            userName: user.name,
            productId: p.id,
            productName: p.name,
            price: p.price,
            status: "nuovo",
            date: new Date().toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" }),
            assignedProfId: p.supplierId?.startsWith("prof") ? p.supplierId : undefined,
        }));
        setOrders(prev => [...newOrders, ...prev]);
        setCart([]);
        setCheckout(false);
        setOrdered(true);
        setTimeout(() => setOrdered(false), 4000);
    };

    const STATUS_MAP = {
        nuovo: { label: "Ricevuto", color: "var(--red-400)" },
        in_lavorazione: { label: "In lavorazione", color: "#fbbf24" },
        consegnato: { label: "Consegnato", color: "#4ade80" },
        annullato: { label: "Annullato", color: "var(--text-muted)" },
    };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconShop />
                    Shop
                </div>
                <div className="header-actions">
                    {/* Cart indicator */}
                    {cart.length > 0 && (
                        <button onClick={() => setCheckout(true)} className="btn btn-red btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <IconCart />
                            Carrello ({cart.length}) — €{cartTotal.toFixed(2)}
                        </button>
                    )}
                    <div style={{ display: "flex", gap: "0.25rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", padding: "0.2rem" }}>
                        {(["catalogo", "ordini"] as Tab[]).map(t => (
                            <button key={t} onClick={() => setTab(t)} className={`btn btn-sm ${tab === t ? "btn-red" : "btn-ghost"}`} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem" }}>
                                {t === "ordini" ? `Ordini (${orders.length})` : "Catalogo"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            {checkout && (
                <div className="modal-backdrop" onClick={() => setCheckout(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "500px" }}>
                        <div className="modal-header">
                            <div className="modal-title"><IconCart /> Riepilogo ordine</div>
                            <button className="icon-btn" onClick={() => setCheckout(false)}>✕</button>
                        </div>
                        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {[...new Map(cart.map(p => [p.id, p])).values()].map(p => (
                                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{p.name}</div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{CAT_LABELS[p.category]}</div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <button onClick={() => removeFromCart(p.id)} style={{ background: "var(--iron-700)", border: "none", color: "var(--text-primary)", borderRadius: "4px", width: "22px", height: "22px", cursor: "pointer", fontSize: "0.9rem" }}>−</button>
                                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", minWidth: "20px", textAlign: "center" }}>{cartCount(p.id)}</span>
                                        <button onClick={() => addToCart(p)} style={{ background: "var(--iron-700)", border: "none", color: "var(--text-primary)", borderRadius: "4px", width: "22px", height: "22px", cursor: "pointer", fontSize: "0.9rem" }}>+</button>
                                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--red-400)", minWidth: "60px", textAlign: "right" }}>€{(p.price * cartCount(p.id)).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase" }}>Totale</span>
                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.2rem", color: "var(--red-400)" }}>€{cartTotal.toFixed(2)}</span>
                            </div>
                            <button onClick={placeOrder} className="btn btn-red" style={{ marginTop: "0.5rem" }}>
                                Conferma Ordine →
                            </button>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center" }}>
                                Il tuo coach riceverà notifica dell&apos;ordine entro pochi secondi
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success toast */}
            {ordered && (
                <div style={{ position: "fixed", bottom: "2rem", right: "2rem", background: "var(--iron-800)", border: "1px solid #4ade80", borderRadius: "var(--radius-md)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 9998, boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
                    <span style={{ color: "#4ade80" }}><IconCheck /></span>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>Ordine confermato!</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Il tuo coach è stato notificato</div>
                    </div>
                </div>
            )}

            <div className="dash-content">
                {tab === "catalogo" && (
                    <>
                        {/* Cat filters */}
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                            {Object.entries(CAT_LABELS).map(([k, v]) => (
                                <button key={k} onClick={() => setCat(k)} className={`btn btn-sm ${cat === k ? "btn-red" : "btn-ghost"}`} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem" }}>
                                    {v}
                                </button>
                            ))}
                        </div>

                        {/* Product grid */}
                        <div className="grid-3" style={{ gap: "1rem", alignItems: "start" }}>
                            {prods.map(p => (
                                <div key={p.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative" }}>
                                    {p.badge && (
                                        <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "var(--red-700)", color: "white", fontSize: "0.6rem", fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", borderRadius: "4px", padding: "0.2rem 0.45rem" }}>
                                            {p.badge}
                                        </div>
                                    )}
                                    <div style={{ width: "40px", height: "40px", background: "var(--iron-800)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red-400)" }}>
                                        {p.category === "attrezzatura" || p.category === "integratore" ? <IconPackage /> : <IconOrder />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: "0.88rem", lineHeight: 1.3 }}>{p.name}</div>
                                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.2rem" }}>{CAT_LABELS[p.category]}</div>
                                    </div>
                                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.55, flex: 1 }}>{p.description}</p>
                                    {p.features && (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                            {p.features.slice(0, 3).map((f, i) => (
                                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                                                    <span style={{ color: "#4ade80", fontSize: "0.7rem" }}>✓</span> {f}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {p.stock !== undefined && (
                                        <div style={{ fontSize: "0.65rem", color: p.stock < 20 ? "var(--red-400)" : "var(--text-muted)" }}>
                                            {p.stock < 20 ? `Solo ${p.stock} disponibili` : `${p.stock} disponibili`}
                                        </div>
                                    )}
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.2rem", color: "var(--red-400)" }}>
                                            €{p.price.toFixed(2)}
                                        </div>
                                        <button onClick={() => addToCart(p)} className="btn btn-red btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                            <IconCart />
                                            {cartCount(p.id) > 0 ? `+1 (${cartCount(p.id)})` : "Aggiungi"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {tab === "ordini" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        {orders.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase" }}>Nessun ordine ancora</div>
                                <div style={{ fontSize: "0.78rem", marginTop: "0.4rem" }}>Vai al catalogo per acquistare</div>
                            </div>
                        ) : (
                            orders.map(o => (
                                <div key={o.id} style={{ padding: "1rem 1.25rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--iron-900)", display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <div style={{ width: "36px", height: "36px", background: "var(--iron-800)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red-400)", flexShrink: 0 }}>
                                        <IconOrder />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{o.productName}</div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Ordinato il {o.date} · €{o.price.toFixed(2)}</div>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: STATUS_MAP[o.status].color }}>
                                            ● {STATUS_MAP[o.status].label}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
