"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DOCUMENTS, DEMO_USERS, getClientsByProfId, type DocFile } from "@/lib/data";
import { IconDocument, IconUpload, IconDownload, IconProfile } from "@/components/Icons";

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

export default function DocumentiStaffPage() {
    const { user } = useAuth();

    // Get all clients for this prof
    const clients = user ? getClientsByProfId(user.id) : [];
    const clientIds = clients.map(c => c.id);

    // Documents uploaded by this prof or visible to their clients
    const myDocs = DOCUMENTS.filter(d =>
        d.uploadedBy === user?.id || d.visibleTo.some(id => clientIds.includes(id))
    );

    const [filter, setFilter] = useState("tutti");
    const [selectedClient, setSelectedClient] = useState<string>("tutti");
    const [showUpload, setShowUpload] = useState(false);
    const [uploadForm, setUploadForm] = useState({ name: "", type: "scheda", description: "", clientId: "" });

    const filtered = myDocs
        .filter(d => filter === "tutti" || d.type === filter)
        .filter(d => selectedClient === "tutti" || d.visibleTo.includes(selectedClient));

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconDocument />
                    Documenti
                </div>
                <div className="header-actions">
                    <button onClick={() => setShowUpload(true)} className="btn btn-red btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <IconUpload /> Carica documento
                    </button>
                </div>
            </div>

            {/* Upload Modal */}
            {showUpload && (
                <div className="modal-backdrop" onClick={() => setShowUpload(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "460px" }}>
                        <div className="modal-header">
                            <div className="modal-title"><IconUpload /> Carica Documento</div>
                            <button className="icon-btn" onClick={() => setShowUpload(false)}>✕</button>
                        </div>
                        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                            <div>
                                <label className="form-label">Nome documento *</label>
                                <input className="form-input" value={uploadForm.name} onChange={e => setUploadForm(p => ({ ...p, name: e.target.value }))} placeholder="Es. Piano alimentare Gennaio" />
                            </div>
                            <div className="grid-2" style={{ gap: "0.75rem" }}>
                                <div>
                                    <label className="form-label">Tipo</label>
                                    <select className="form-input" value={uploadForm.type} onChange={e => setUploadForm(p => ({ ...p, type: e.target.value }))}>
                                        {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Visibile a</label>
                                    <select className="form-input" value={uploadForm.clientId} onChange={e => setUploadForm(p => ({ ...p, clientId: e.target.value }))}>
                                        <option value="">Tutti i clienti</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Descrizione</label>
                                <textarea className="form-input" rows={3} value={uploadForm.description} onChange={e => setUploadForm(p => ({ ...p, description: e.target.value }))} />
                            </div>
                            <div style={{ border: "2px dashed var(--border)", borderRadius: "var(--radius-sm)", padding: "1.5rem", textAlign: "center", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.78rem" }}
                                onClick={() => alert("File picker — collegato a storage in produzione")}>
                                <div style={{ marginBottom: "0.35rem" }}><IconUpload /></div>
                                Clicca per selezionare un file PDF, Word o Excel
                            </div>
                            <button
                                onClick={() => {
                                    if (!uploadForm.name) return;
                                    alert(`Documento "${uploadForm.name}" caricato!\n\nIn produzione verrebbe salvato nello storage.`);
                                    setUploadForm({ name: "", type: "scheda", description: "", clientId: "" });
                                    setShowUpload(false);
                                }}
                                className="btn btn-red"
                                disabled={!uploadForm.name}
                            >
                                Carica Documento
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="dash-content">
                {/* Filtri */}
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {["tutti", ...Object.keys(TYPE_LABELS)].map(f => (
                            <button key={f} onClick={() => setFilter(f)} className={`btn btn-sm ${filter === f ? "btn-red" : "btn-ghost"}`} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.7rem" }}>
                                {f === "tutti" ? "Tutti" : TYPE_LABELS[f]}
                            </button>
                        ))}
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        <select className="form-input" style={{ fontSize: "0.78rem", padding: "0.4rem 0.75rem" }} value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
                            <option value="tutti">Tutti i clienti</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Files */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                        <div style={{ marginBottom: "0.5rem" }}><IconDocument /></div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Nessun documento</div>
                        <div style={{ fontSize: "0.78rem", marginTop: "0.3rem" }}>Carica il primo documento per i tuoi clienti</div>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        {filtered.map(d => {
                            const recipients = DEMO_USERS.filter(u => d.visibleTo.includes(u.id));
                            return (
                                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--iron-900)" }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(220,38,38,0.2)")}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                                >
                                    <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-sm)", background: "var(--iron-800)", display: "flex", alignItems: "center", justifyContent: "center", color: TYPE_COLORS[d.type], flexShrink: 0 }}>
                                        <IconDocument />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{d.name}</div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
                                            <span style={{ color: TYPE_COLORS[d.type] }}>{TYPE_LABELS[d.type]}</span>
                                            {" · "}{d.date}{" · "}{d.size}
                                        </div>
                                        {recipients.length > 0 && (
                                            <div style={{ marginTop: "0.3rem", display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                                                {recipients.map(r => (
                                                    <span key={r.id} style={{ fontSize: "0.62rem", background: "var(--iron-700)", borderRadius: "10px", padding: "0.1rem 0.45rem", color: "var(--text-muted)" }}>
                                                        {r.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                                        <button className="btn btn-ghost btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
                                            onClick={() => alert(`Download: ${d.name}`)}>
                                            <IconDownload /><span className="hide-mobile">Scarica</span>
                                        </button>
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
