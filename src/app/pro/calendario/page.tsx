"use client";
import { useState } from "react";

const DAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const HOURS = Array.from({ length: 13 }, (_, i) => `${7 + i}:00`);

type Event = { id: number; day: number; hour: number; title: string; client: string; type: "call" | "check" | "other"; duration: number };

const INITIAL_EVENTS: Event[] = [
    { id: 1, day: 0, hour: 10, title: "Call strategia", client: "Marco Rossi", type: "call", duration: 60 },
    { id: 2, day: 0, hour: 11, title: "Check-in settimana", client: "Giulia Ferrari", type: "check", duration: 30 },
    { id: 3, day: 2, hour: 14, title: "Call mensile", client: "Chiara Pellegrini", type: "call", duration: 60 },
    { id: 4, day: 4, hour: 9, title: "Aggiornamento piani", client: "Alessio Longo", type: "check", duration: 45 },
    { id: 5, day: 4, hour: 16, title: "Consulenza nutrizione", client: "Nicola Bianchi", type: "call", duration: 60 },
];

const CLIENTS_LIST = ["Marco Rossi", "Alessio Longo", "Giulia Ferrari", "Nicola Bianchi", "Chiara Pellegrini"];
const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    call: { bg: "rgba(220,38,38,0.15)", border: "var(--border-red)", text: "var(--red-400)" },
    check: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)", text: "#60a5fa" },
    other: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.25)", text: "#fbbf24" },
};

function NewEventModal({ onClose, onSave }: { onClose: () => void; onSave: (e: Event) => void }) {
    const [form, setForm] = useState({ title: "", client: CLIENTS_LIST[0], day: 0, hour: 10, type: "call" as Event["type"], duration: 60 });
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
            <div style={{ background: "var(--iron-900)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: "440px" }}>
                <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", textTransform: "uppercase" }}>Nuovo Appuntamento</h2>
                    <button onClick={onClose} className="icon-btn">✕</button>
                </div>
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    <div><label className="form-label">Titolo</label><input className="form-input" placeholder="es. Call mensile" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
                    <div><label className="form-label">Cliente</label>
                        <select className="form-input" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))}>
                            {CLIENTS_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                        </select></div>
                    <div className="grid-2" style={{ gap: "0.75rem" }}>
                        <div><label className="form-label">Giorno</label>
                            <select className="form-input" value={form.day} onChange={e => setForm(f => ({ ...f, day: Number(e.target.value) }))}>
                                {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
                            </select></div>
                        <div><label className="form-label">Ora</label>
                            <select className="form-input" value={form.hour} onChange={e => setForm(f => ({ ...f, hour: Number(e.target.value) }))}>
                                {HOURS.map(h => <option key={h} value={parseInt(h)}>{h}</option>)}
                            </select></div>
                    </div>
                    <div className="grid-2" style={{ gap: "0.75rem" }}>
                        <div><label className="form-label">Tipo</label>
                            <select className="form-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Event["type"] }))}>
                                <option value="call">Call Video</option>
                                <option value="check">Check-in</option>
                                <option value="other">Altro</option>
                            </select></div>
                        <div><label className="form-label">Durata (min)</label>
                            <select className="form-input" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: Number(e.target.value) }))}>
                                {[30, 45, 60, 90].map(d => <option key={d} value={d}>{d} min</option>)}
                            </select></div>
                    </div>
                </div>
                <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.6rem", justifyContent: "flex-end" }}>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>Annulla</button>
                    <button className="btn btn-red btn-sm" disabled={!form.title.trim()} onClick={() => { onSave({ ...form, id: Date.now() }); onClose(); }} style={{ opacity: form.title.trim() ? 1 : 0.5 }}>Salva</button>
                </div>
            </div>
        </div>
    );
}

export default function CalendarioPage() {
    const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
    const [showModal, setShowModal] = useState(false);

    const today = new Date();
    const dayNames = DAYS.map((d, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - today.getDay() + 1 + i);
        return { name: d, date: date.getDate(), isToday: date.toDateString() === today.toDateString() };
    });

    const upcoming = events
        .slice()
        .sort((a, b) => a.day * 100 + a.hour - (b.day * 100 + b.hour))
        .slice(0, 5);

    return (
        <>
            {showModal && <NewEventModal onClose={() => setShowModal(false)} onSave={e => setEvents(p => [...p, e])} />}

            <div className="dash-header">
                <div className="dash-title">Calendario</div>
                <div className="header-actions">
                    <button className="btn btn-red btn-sm" onClick={() => setShowModal(true)}>+ Appuntamento</button>
                </div>
            </div>

            <div className="dash-content">
                <div className="grid-2" style={{ gap: "1.5rem", alignItems: "start" }}>
                    {/* Calendar grid */}
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase" }}>
                                {today.toLocaleDateString("it-IT", { month: "long", year: "numeric" }).toUpperCase()}
                            </div>
                            <div style={{ display: "flex", gap: "0.4rem" }}>
                                <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem" }}>←</button>
                                <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem" }}>→</button>
                            </div>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                            <div style={{ minWidth: "600px" }}>
                                {/* Day headers */}
                                <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid var(--border)" }}>
                                    <div />
                                    {dayNames.map((d, i) => (
                                        <div key={i} style={{ padding: "0.6rem 0.25rem", textAlign: "center", borderLeft: "1px solid var(--border)" }}>
                                            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d.name}</div>
                                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: d.isToday ? "var(--red-400)" : "var(--text-primary)", marginTop: "0.1rem" }}>{d.date}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Hour rows */}
                                {HOURS.map((hour, hi) => {
                                    const h = 7 + hi;
                                    return (
                                        <div key={hi} style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid var(--border)", minHeight: "52px" }}>
                                            <div style={{ padding: "0.35rem 0.5rem", fontSize: "0.65rem", color: "var(--text-muted)", display: "flex", alignItems: "flex-start" }}>{hour}</div>
                                            {DAYS.map((_, di) => {
                                                const ev = events.find(e => e.day === di && e.hour === h);
                                                const col = ev ? TYPE_COLORS[ev.type] : null;
                                                return (
                                                    <div key={di} style={{ borderLeft: "1px solid var(--border)", padding: "0.2rem", position: "relative" }}>
                                                        {ev && col && (
                                                            <div style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: "4px", padding: "0.25rem 0.4rem", fontSize: "0.68rem" }}>
                                                                <div style={{ fontWeight: 700, color: col.text, textTransform: "uppercase", fontSize: "0.6rem", letterSpacing: "0.05em" }}>{ev.type === "call" ? "Call" : ev.type === "check" ? "Check" : "Evento"}</div>
                                                                <div style={{ color: "var(--text-secondary)", lineHeight: 1.2, marginTop: "0.1rem" }}>{ev.client.split(" ")[0]}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Upcoming */}
                    <div className="card">
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1rem" }}>Prossimi Appuntamenti</div>
                        {upcoming.map((ev, i) => {
                            const col = TYPE_COLORS[ev.type];
                            return (
                                <div key={ev.id} style={{ display: "flex", gap: "0.85rem", padding: "0.85rem 0", borderBottom: i < upcoming.length - 1 ? "1px solid var(--border)" : "none", alignItems: "flex-start" }}>
                                    <div style={{ width: "36px", height: "36px", background: col.bg, border: `1px solid ${col.border}`, borderRadius: "var(--radius-sm)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <div style={{ fontSize: "0.65rem", color: col.text, fontWeight: 700, textTransform: "uppercase" }}>{dayNames[ev.day]?.name}</div>
                                        <div style={{ fontSize: "0.75rem", color: col.text, fontFamily: "var(--font-display)", fontWeight: 800 }}>{ev.hour}:00</div>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{ev.title}</div>
                                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{ev.client} · {ev.duration} min</div>
                                    </div>
                                    <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto", fontSize: "0.68rem", fontFamily: "var(--font-display)", textTransform: "uppercase", padding: "0.25rem 0.55rem", flexShrink: 0 }}>
                                        Elimina
                                    </button>
                                </div>
                            );
                        })}
                        {upcoming.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", textAlign: "center", padding: "1.5rem 0" }}>Nessun appuntamento questa settimana</p>}

                        <button className="btn btn-outline" onClick={() => setShowModal(true)} style={{ width: "100%", marginTop: "1rem", fontSize: "0.8rem", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                            + Aggiungi Appuntamento
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
