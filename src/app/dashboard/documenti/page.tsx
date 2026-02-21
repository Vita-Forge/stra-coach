"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DOCUMENTS, DEMO_USERS, type DocFile } from "@/lib/data";
import { IconDocument, IconDownload, IconProfile } from "@/components/Icons";

const TYPE_LABELS: Record<string, string> = {
    scheda: "Scheda Allenamento",
    piano_nutrizionale: "Piano Nutrizionale",
    referto: "Referto",
    contratto: "Contratto",
    altro: "Documento",
};

const TYPE_COLORS: Record<string, string> = {
    scheda: "var(--red-400)",
    piano_nutrizionale: "#60a5fa",
    referto: "#a78bfa",
    contratto: "#fbbf24",
    altro: "var(--text-muted)",
};

export default function DocumentiPage() {
    const { user } = useAuth();
    const [filter, setFilter] = useState<string>("tutti");

    const docs = user ? DOCUMENTS.filter(d => d.visibleTo.includes(user.id)) : [];
    const filtered = filter === "tutti" ? docs : docs.filter(d => d.type === filter);

    const prof = user?.assignedProfId ? DEMO_USERS.find(u => u.id === user.assignedProfId) : null;

    const DocRow = ({ doc }: { doc: DocFile }) => (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--iron-900)", transition: "border-color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(220,38,38,0.2)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
        >
            <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-sm)", background: "var(--iron-800)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: TYPE_COLORS[doc.type] }}>
                <IconDocument />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.name}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                    <span style={{ color: TYPE_COLORS[doc.type] }}>{TYPE_LABELS[doc.type]}</span>
                    {" · "}{doc.date}{" · "}{doc.size}
                </div>
                {doc.description && (
                    <div style={{ fontSize: "0.7rem", color: "var(--iron-500)", marginTop: "0.2rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.description}</div>
                )}
            </div>
            <button
                className="btn btn-ghost btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexShrink: 0 }}
                onClick={() => alert(`Download: ${doc.name}\n\nIn un'implementazione reale, scarica il file dal server.`)}
            >
                <IconDownload />
                <span className="hide-mobile">Scarica</span>
            </button>
        </div>
    );

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconDocument />
                    Documenti
                </div>
                <div className="header-actions">
                    {prof && (
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            Caricati da{" "}
                            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{prof.name}</span>
                        </span>
                    )}
                </div>
            </div>

            <div className="dash-content">
                {docs.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-muted)" }}>
                        <div style={{ marginBottom: "0.5rem", color: "var(--iron-600)" }}><IconDocument /></div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase" }}>Nessun documento ancora</div>
                        <div style={{ fontSize: "0.78rem", marginTop: "0.4rem" }}>Il tuo coach caricherà qui schede, piani e report</div>
                    </div>
                ) : (
                    <>
                        {/* Filtri */}
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                            {["tutti", "scheda", "piano_nutrizionale", "contratto", "altro"].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`btn btn-sm ${filter === f ? "btn-red" : "btn-ghost"}`}
                                    style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem" }}
                                >
                                    {f === "tutti" ? `Tutti (${docs.length})` : TYPE_LABELS[f] ?? f}
                                </button>
                            ))}
                        </div>

                        {/* Lista */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                            {filtered.length === 0 ? (
                                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                                    Nessun documento in questa categoria
                                </div>
                            ) : (
                                filtered.map(d => <DocRow key={d.id} doc={d} />)
                            )}
                        </div>

                        {/* Info coach */}
                        {prof && (
                            <div className="card" style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(220,38,38,0.1)", border: "1px solid var(--border-red)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.75rem", color: "var(--red-400)", flexShrink: 0 }}>
                                    {prof.initials}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{prof.name}</span> è il tuo coach — carica nuovi documenti regolarmente
                                    </div>
                                </div>
                                <a href="/dashboard/messaggi" className="btn btn-ghost btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexShrink: 0 }}>
                                    <IconProfile /> Contatta
                                </a>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
