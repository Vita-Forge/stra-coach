"use client";
import { useState } from "react";

type Client = {
    initials: string; name: string; email: string; phone: string;
    plan: string; streak: number; kpi: number; status: string;
    since: string; birthday: string; goal: string; note: string;
};

const INITIAL_CLIENTS: Client[] = [
    { initials: "MR", name: "Marco Rossi", email: "marco@stracoach.it", phone: "+39 333 111 2222", plan: "Stra Pro", streak: 18, kpi: 84, status: "attivo", since: "Gen 2026", birthday: "1992-06-15", goal: "Aumento massa muscolare", note: "" },
    { initials: "AL", name: "Alessio Longo", email: "alessio@mail.it", phone: "+39 347 222 3333", plan: "Stra Elite", streak: 31, kpi: 91, status: "attivo", since: "Dic 2025", birthday: "1988-03-22", goal: "Performance atletica", note: "" },
    { initials: "GF", name: "Giulia Ferrari", email: "giulia@mail.it", phone: "+39 380 333 4444", plan: "Stra Solo", streak: 4, kpi: 62, status: "attenzione", since: "Feb 2026", birthday: "1997-11-08", goal: "Dimagrimento", note: "Richiede supporto motivazionale aggiuntivo" },
    { initials: "NB", name: "Nicola Bianchi", email: "nicola@mail.it", phone: "+39 393 444 5555", plan: "Stra Pro", streak: 9, kpi: 77, status: "attivo", since: "Gen 2026", birthday: "1990-09-14", goal: "Definizione muscolare", note: "" },
    { initials: "CP", name: "Chiara Pellegrini", email: "chiara@mail.it", phone: "+39 328 555 6666", plan: "Stra Elite", streak: 22, kpi: 88, status: "attivo", since: "Nov 2025", birthday: "1994-01-30", goal: "Forza + endurance", note: "" },
    { initials: "FM", name: "Fabio Martini", email: "fabio@mail.it", phone: "+39 366 666 7777", plan: "Stra Pro", streak: 0, kpi: 45, status: "inattivo", since: "Gen 2026", birthday: "1985-07-20", goal: "Ricomposizione corporea", note: "Non risponde ai messaggi da 10 giorni" },
];

const EMPTY_FORM = { name: "", email: "", phone: "", plan: "Stra Solo", birthday: "", goal: "", note: "" };
const PLANS = ["Stra Solo", "Stra Pro", "Stra Elite"];
const statusColor = (s: string) => s === "attivo" ? "#4ade80" : s === "attenzione" ? "#f59e0b" : "#6b7280";

function Modal({ onClose, onSave }: { onClose: () => void; onSave: (c: Client) => void }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Campo obbligatorio";
        if (!form.email.trim() || !form.email.includes("@")) e.email = "Email non valida";
        return e;
    };

    const handleSave = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        const parts = form.name.trim().split(" ");
        const initials = parts.map(p => p[0]).join("").toUpperCase().slice(0, 2);
        onSave({
            ...form, initials, streak: 0, kpi: 50, status: "attivo",
            since: new Date().toLocaleDateString("it-IT", { month: "short", year: "numeric" }),
        });
        onClose();
    };

    const f = (key: string, value: string) => { setForm(p => ({ ...p, [key]: value })); setErrors(p => ({ ...p, [key]: "" })); };

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
            <div style={{ background: "var(--iron-900)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto" }}>
                <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", textTransform: "uppercase" }}>Nuovo Cliente</h2>
                        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>Crea l'anagrafica del cliente</p>
                    </div>
                    <button onClick={onClose} className="icon-btn" style={{ fontSize: "1.2rem" }}>✕</button>
                </div>

                <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="grid-2" style={{ gap: "1rem" }}>
                        <div>
                            <label className="form-label">Nome completo *</label>
                            <input className="form-input" placeholder="Mario Rossi" value={form.name} onChange={e => f("name", e.target.value)} />
                            {errors.name && <span style={{ fontSize: "0.72rem", color: "var(--red-400)", marginTop: "0.25rem", display: "block" }}>{errors.name}</span>}
                        </div>
                        <div>
                            <label className="form-label">Email *</label>
                            <input className="form-input" type="email" placeholder="mario@mail.it" value={form.email} onChange={e => f("email", e.target.value)} />
                            {errors.email && <span style={{ fontSize: "0.72rem", color: "var(--red-400)", marginTop: "0.25rem", display: "block" }}>{errors.email}</span>}
                        </div>
                    </div>

                    <div className="grid-2" style={{ gap: "1rem" }}>
                        <div>
                            <label className="form-label">Telefono</label>
                            <input className="form-input" placeholder="+39 333 000 0000" value={form.phone} onChange={e => f("phone", e.target.value)} />
                        </div>
                        <div>
                            <label className="form-label">Data di nascita</label>
                            <input className="form-input" type="date" value={form.birthday} onChange={e => f("birthday", e.target.value)} style={{ colorScheme: "dark" }} />
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Piano</label>
                        <select className="form-input" value={form.plan} onChange={e => f("plan", e.target.value)}
                            style={{ cursor: "pointer" }}>
                            {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Obiettivo principale</label>
                        <input className="form-input" placeholder="es. Dimagrimento, Aumento massa, Performance..." value={form.goal} onChange={e => f("goal", e.target.value)} />
                    </div>

                    <div>
                        <label className="form-label">Note interne</label>
                        <textarea className="form-input" rows={3} placeholder="Note visibili solo allo staff..." value={form.note} onChange={e => f("note", e.target.value)}
                            style={{ resize: "vertical", fontFamily: "var(--font-body)" }} />
                    </div>
                </div>

                <div style={{ padding: "1.25rem 1.75rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                    <button className="btn btn-ghost" onClick={onClose}>Annulla</button>
                    <button id="save-client-btn" className="btn btn-red" onClick={handleSave}>Aggiungi Cliente</button>
                </div>
            </div>
        </div>
    );
}

function DetailModal({ client, onClose }: { client: Client; onClose: () => void }) {
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
            <div style={{ background: "var(--iron-900)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto" }}>
                <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,var(--red-700),var(--iron-600))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem" }}>{client.initials}</div>
                        <div>
                            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", textTransform: "uppercase" }}>{client.name}</h2>
                            <p style={{ fontSize: "0.75rem", color: "var(--red-400)", fontWeight: 600 }}>{client.plan}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="icon-btn" style={{ fontSize: "1.2rem" }}>✕</button>
                </div>

                <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* KPI row */}
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {[
                            { label: "Streak", value: `${client.streak}gg`, color: client.streak >= 10 ? "var(--red-400)" : "var(--text-muted)" },
                            { label: "KPI Score", value: `${client.kpi}/100`, color: client.kpi >= 80 ? "#4ade80" : client.kpi >= 60 ? "#f59e0b" : "#ef4444" },
                            { label: "Stato", value: client.status, color: statusColor(client.status) },
                        ].map((k, i) => (
                            <div key={i} style={{ flex: 1, background: "var(--iron-850)", borderRadius: "var(--radius-sm)", padding: "0.85rem", textAlign: "center" }}>
                                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{k.label}</div>
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: k.color }}>{k.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Details */}
                    {[
                        { label: "Email", value: client.email },
                        { label: "Telefono", value: client.phone || "—" },
                        { label: "Data di nascita", value: client.birthday || "—" },
                        { label: "Cliente dal", value: client.since },
                        { label: "Obiettivo", value: client.goal || "—" },
                    ].map((item, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{item.label}</span>
                            <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
                        </div>
                    ))}

                    {client.note && (
                        <div style={{ background: "rgba(220,38,38,0.06)", border: "1px solid var(--border-red)", borderRadius: "var(--radius-sm)", padding: "0.85rem" }}>
                            <div style={{ fontSize: "0.65rem", color: "var(--red-400)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.4rem" }}>Note staff</div>
                            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{client.note}</p>
                        </div>
                    )}
                </div>

                <div style={{ padding: "1rem 1.75rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.6rem" }}>
                    <button className="btn btn-ghost" style={{ flex: 1, fontSize: "0.78rem", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Messaggio</button>
                    <button className="btn btn-ghost" style={{ flex: 1, fontSize: "0.78rem", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Piano</button>
                    <button className="btn btn-red" style={{ flex: 1, fontSize: "0.78rem", fontFamily: "var(--font-display)", textTransform: "uppercase" }} onClick={onClose}>Chiudi</button>
                </div>
            </div>
        </div>
    );
}

export default function ClientiPage() {
    const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
    const [filter, setFilter] = useState("tutti");
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [detailClient, setDetailClient] = useState<Client | null>(null);

    const filtered = clients.filter(c => {
        const matchFilter = filter === "tutti" || c.status === filter;
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const addClient = (c: Client) => setClients(p => [c, ...p]);

    const exportCSV = () => {
        const headers = ["Nome", "Email", "Telefono", "Piano", "Streak", "KPI", "Stato", "Cliente dal", "Obiettivo", "Note"];
        const rows = clients.map(c => [c.name, c.email, c.phone, c.plan, c.streak, c.kpi, c.status, c.since, c.goal, c.note]);
        const csv = [headers, ...rows].map(r => r.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `clienti_stracoach_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            {showAddModal && <Modal onClose={() => setShowAddModal(false)} onSave={addClient} />}
            {detailClient && <DetailModal client={detailClient} onClose={() => setDetailClient(null)} />}

            <div className="dash-header">
                <div className="dash-title">Clienti <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-muted)", textTransform: "none", letterSpacing: 0, fontFamily: "var(--font-body)" }}>({clients.length} totali)</span></div>
                <div className="header-actions">
                    <button id="export-btn" className="btn btn-ghost btn-sm" onClick={exportCSV}
                        style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.75rem" }}>
                        Esporta CSV
                    </button>
                    <button id="add-client-btn" className="btn btn-red btn-sm" onClick={() => setShowAddModal(true)}>
                        + Aggiungi
                    </button>
                </div>
            </div>

            <div className="dash-content">
                {/* Summary KPI row */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                    {[
                        { label: "Attivi", value: clients.filter(c => c.status === "attivo").length, color: "#4ade80" },
                        { label: "Attenzione", value: clients.filter(c => c.status === "attenzione").length, color: "#f59e0b" },
                        { label: "Inattivi", value: clients.filter(c => c.status === "inattivo").length, color: "#6b7280" },
                        { label: "Streak medio", value: Math.round(clients.reduce((s, c) => s + c.streak, 0) / clients.length) + "gg", color: "var(--red-400)" },
                    ].map((s, i) => (
                        <div key={i} style={{ background: "var(--iron-900)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: s.color }}>{s.value}</span>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
                    <input id="client-search" type="text" className="form-input" placeholder="Cerca per nome o email..." value={search}
                        onChange={e => setSearch(e.target.value)} style={{ maxWidth: "260px" }} />
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                        {["tutti", "attivo", "attenzione", "inattivo"].map(f => (
                            <button key={f} id={`filter-${f}`} onClick={() => setFilter(f)} style={{
                                padding: "0.4rem 0.85rem", background: filter === f ? "var(--red-700)" : "var(--iron-800)",
                                border: `1px solid ${filter === f ? "var(--red-600)" : "var(--border)"}`,
                                borderRadius: "var(--radius-sm)", color: filter === f ? "#fff" : "var(--text-muted)",
                                fontSize: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 700,
                                textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s",
                            }}>
                                {f}
                            </button>
                        ))}
                    </div>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: "auto" }}>{filtered.length} risultati</span>
                </div>

                {/* Table */}
                <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                    {filtered.length === 0 ? (
                        <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.88rem" }}>
                            Nessun cliente trovato. <button onClick={() => setShowAddModal(true)} style={{ color: "var(--red-400)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Aggiungine uno →</button>
                        </div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                        {["Cliente", "Piano", "Streak", "KPI", "Stato", "Dal", "Azioni"].map((h, i) => (
                                            <th key={i} style={{ padding: "0.85rem 1.25rem", textAlign: "left", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((c, i) => (
                                        <tr key={i} id={`client-row-${i}`} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", transition: "background 0.12s", cursor: "pointer" }}
                                            onMouseEnter={e => (e.currentTarget.style.background = "var(--iron-850)")}
                                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                                        >
                                            <td style={{ padding: "0.85rem 1.25rem" }} onClick={() => setDetailClient(c)}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,var(--iron-700),var(--iron-500))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.78rem", color: "var(--text-secondary)" }}>{c.initials}</div>
                                                    <div>
                                                        <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{c.name}</div>
                                                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{c.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: "0.85rem 1.25rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>{c.plan}</td>
                                            <td style={{ padding: "0.85rem 1.25rem" }}>
                                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: c.streak >= 10 ? "var(--red-400)" : c.streak === 0 ? "#6b7280" : "var(--text-muted)" }}>
                                                    {c.streak}gg
                                                </span>
                                            </td>
                                            <td style={{ padding: "0.85rem 1.25rem" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <div style={{ width: "52px", height: "4px", background: "var(--iron-700)", borderRadius: "2px", overflow: "hidden" }}>
                                                        <div style={{ height: "100%", width: `${c.kpi}%`, background: c.kpi >= 80 ? "#4ade80" : c.kpi >= 60 ? "#f59e0b" : "#ef4444", borderRadius: "2px" }} />
                                                    </div>
                                                    <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-display)", fontWeight: 700, color: c.kpi >= 80 ? "#4ade80" : "var(--text-primary)" }}>{c.kpi}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: "0.85rem 1.25rem" }}>
                                                <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: statusColor(c.status) }}>● {c.status}</span>
                                            </td>
                                            <td style={{ padding: "0.85rem 1.25rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>{c.since}</td>
                                            <td style={{ padding: "0.85rem 1.25rem" }}>
                                                <div style={{ display: "flex", gap: "0.35rem" }}>
                                                    <button className="btn btn-ghost btn-sm" onClick={() => setDetailClient(c)}
                                                        style={{ fontSize: "0.68rem", fontFamily: "var(--font-display)", textTransform: "uppercase", padding: "0.28rem 0.6rem" }}>
                                                        Profilo
                                                    </button>
                                                    <button className="btn btn-ghost btn-sm"
                                                        style={{ fontSize: "0.68rem", fontFamily: "var(--font-display)", textTransform: "uppercase", padding: "0.28rem 0.6rem" }}>
                                                        Piano
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
