"use client";
import { useState } from "react";
import { LEADS, DEMO_USERS, type Lead } from "@/lib/data";
import { IconCall, IconProfile, IconCheck, IconEdit } from "@/components/Icons";

const STATUS_COLORS: Record<string, string> = {
    nuovo: "var(--red-400)",
    contattato: "#fbbf24",
    call_fissata: "#60a5fa",
    convertito: "#4ade80",
    perso: "var(--text-muted)",
};

const STATUS_LABELS: Record<string, string> = {
    nuovo: "Nuovo Lead",
    contattato: "Contattato",
    call_fissata: "Call Fissata",
    convertito: "Convertito",
    perso: "Perso",
};

export default function CommercialePage() {
    const [leads, setLeads] = useState<Lead[]>(LEADS);
    const [selected, setSelected] = useState<Lead | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>("tutti");
    const [showNewLead, setShowNewLead] = useState(false);
    const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", interest: "", message: "" });

    const filtered = filterStatus === "tutti" ? leads : leads.filter(l => l.status === filterStatus);
    const updateStatus = (id: string, status: Lead["status"]) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    };

    const addLead = () => {
        if (!newLead.name || !newLead.email) return;
        const lead: Lead = { ...newLead, id: `lead_${Date.now()}`, status: "nuovo", date: new Date().toLocaleDateString("it-IT"), assignedTo: "comm_001" };
        setLeads(prev => [lead, ...prev]);
        setNewLead({ name: "", email: "", phone: "", interest: "", message: "" });
        setShowNewLead(false);
    };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconCall />
                    CRM Commerciale
                </div>
                <div className="header-actions">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {leads.filter(l => l.status === "nuovo").length} nuovi lead
                    </span>
                    <button onClick={() => setShowNewLead(true)} className="btn btn-red btn-sm">+ Nuovo Lead</button>
                </div>
            </div>

            {/* New Lead Modal */}
            {showNewLead && (
                <div className="modal-backdrop" onClick={() => setShowNewLead(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "480px" }}>
                        <div className="modal-header">
                            <div className="modal-title">Nuovo Lead</div>
                            <button className="icon-btn" onClick={() => setShowNewLead(false)}>✕</button>
                        </div>
                        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                            <div className="grid-2" style={{ gap: "0.75rem" }}>
                                <div><label className="form-label">Nome *</label><input className="form-input" value={newLead.name} onChange={e => setNewLead(p => ({ ...p, name: e.target.value }))} placeholder="Nome completo" /></div>
                                <div><label className="form-label">Email *</label><input className="form-input" type="email" value={newLead.email} onChange={e => setNewLead(p => ({ ...p, email: e.target.value }))} placeholder="email@mail.it" /></div>
                                <div><label className="form-label">Telefono</label><input className="form-input" value={newLead.phone} onChange={e => setNewLead(p => ({ ...p, phone: e.target.value }))} placeholder="+39..." /></div>
                                <div><label className="form-label">Interesse</label>
                                    <select className="form-input" value={newLead.interest} onChange={e => setNewLead(p => ({ ...p, interest: e.target.value }))}>
                                        <option value="">Seleziona...</option>
                                        <option>Stra Solo</option><option>Stra Pro</option><option>Stra Elite</option>
                                    </select>
                                </div>
                            </div>
                            <div><label className="form-label">Messaggio</label><textarea className="form-input" rows={3} value={newLead.message} onChange={e => setNewLead(p => ({ ...p, message: e.target.value }))} /></div>
                            <button onClick={addLead} className="btn btn-red" disabled={!newLead.name || !newLead.email}>Aggiungi Lead</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="dash-content">
                {/* KPI */}
                <div className="grid-4" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
                    {Object.entries(STATUS_LABELS).map(([k, v]) => (
                        <button key={k} onClick={() => setFilterStatus(k === filterStatus ? "tutti" : k)}
                            className="card"
                            style={{ textAlign: "left", cursor: "pointer", border: `1px solid ${filterStatus === k ? STATUS_COLORS[k] : "var(--border)"}`, background: filterStatus === k ? `rgba(${k === "convertito" ? "74,222,128" : k === "nuovo" ? "220,38,38" : "255,255,255"},0.03)` : "var(--bg-card)" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", color: STATUS_COLORS[k] }}>{leads.filter(l => l.status === k).length}</div>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{v}</div>
                        </button>
                    ))}
                </div>

                <div className="grid-2" style={{ gap: "1.5rem", alignItems: "start" }}>
                    {/* Leads list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                            <div className="card-label">Lead ({filtered.length})</div>
                            {filterStatus !== "tutti" && (
                                <button onClick={() => setFilterStatus("tutti")} style={{ fontSize: "0.65rem", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>✕ Rimuovi filtro</button>
                            )}
                        </div>
                        {filtered.map(l => (
                            <div key={l.id}
                                onClick={() => setSelected(l)}
                                style={{ padding: "0.85rem 1rem", border: `1px solid ${selected?.id === l.id ? "var(--border-red)" : "var(--border)"}`, borderLeft: `3px solid ${STATUS_COLORS[l.status]}`, borderRadius: "var(--radius-sm)", background: "var(--iron-900)", cursor: "pointer", transition: "all 0.15s" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{l.name}</div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{l.email} · {l.interest}</div>
                                    </div>
                                    <span style={{ fontSize: "0.6rem", fontWeight: 700, color: STATUS_COLORS[l.status], flexShrink: 0 }}>● {STATUS_LABELS[l.status]}</span>
                                </div>
                                <div style={{ fontSize: "0.7rem", color: "var(--iron-500)", marginTop: "0.4rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.message}</div>
                            </div>
                        ))}
                    </div>

                    {/* Lead detail */}
                    {selected ? (
                        <div className="card" style={{ position: "sticky", top: "1rem" }}>
                            <div className="card-label" style={{ marginBottom: "1rem" }}>Dettaglio Lead</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem" }}>{selected.name}</div>
                                {[
                                    { l: "Email", v: selected.email },
                                    { l: "Telefono", v: selected.phone },
                                    { l: "Interesse", v: selected.interest },
                                    { l: "Data", v: selected.date },
                                ].map(f => (
                                    <div key={f.l} style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{f.l}</span>
                                        <span style={{ fontSize: "0.78rem" }}>{f.v || "—"}</span>
                                    </div>
                                ))}
                                {selected.message && (
                                    <div style={{ padding: "0.75rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, borderLeft: "2px solid var(--border-red)" }}>
                                        {selected.message}
                                    </div>
                                )}
                            </div>
                            {/* Actions */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>Aggiorna stato</div>
                                {Object.entries(STATUS_LABELS).map(([k, v]) => (
                                    <button key={k} onClick={() => updateStatus(selected.id, k as Lead["status"])}
                                        className={`btn btn-sm ${selected.status === k ? "btn-red" : "btn-ghost"}`}
                                        style={{ textAlign: "left", justifyContent: "flex-start", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <span style={{ color: STATUS_COLORS[k], fontSize: "0.6rem" }}>●</span> {v}
                                        {selected.status === k && <span style={{ marginLeft: "auto" }}><IconCheck /></span>}
                                    </button>
                                ))}
                                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem", marginTop: "0.25rem", display: "flex", gap: "0.5rem" }}>
                                    <button className="btn btn-ghost btn-sm" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                                        <IconCall /> Chiama
                                    </button>
                                    <button className="btn btn-red btn-sm" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                                        <IconEdit /> Email
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase" }}>Seleziona un lead</div>
                            <div style={{ fontSize: "0.75rem", marginTop: "0.3rem" }}>per vedere dettagli e aggiornare lo stato</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
