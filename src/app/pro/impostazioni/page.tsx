"use client";
import { useState } from "react";

type Section = "profilo" | "disponibilita" | "notifiche" | "piattaforma";

const DAYS_LABELS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const HOURS = Array.from({ length: 15 }, (_, i) => `${7 + i}:00`);

export default function ImpostazioniPage() {
    const [section, setSection] = useState<Section>("profilo");
    const [profilo, setProfilo] = useState({
        nome: "Sara Conti", email: "admin@stracoach.it", telefono: "+39 339 000 1111",
        specialita: "Nutrizione sportiva, Forza e condizionamento",
        bio: "Coach certificata CONI con 8 anni di esperienza. Specializzata in ricomposizione corporea e performance atletica.",
        instagram: "@saraconti_coach", maxClienti: "25",
    });
    const [saved, setSaved] = useState(false);
    const [workDays, setWorkDays] = useState([true, true, true, true, true, false, false]);
    const [workHours, setWorkHours] = useState({ start: "9:00", end: "18:00" });
    const [sessionDuration, setSessionDuration] = useState("60");
    const [notifiche, setNotifiche] = useState({
        nuovoMessaggio: true, sessioneCompletata: true, clienteInattivo: true,
        reportSettimanale: false, reminderCall: true,
    });

    const save = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const navItems: { id: Section; label: string }[] = [
        { id: "profilo", label: "Profilo Staff" },
        { id: "disponibilita", label: "Disponibilità" },
        { id: "notifiche", label: "Notifiche" },
        { id: "piattaforma", label: "Piattaforma" },
    ];

    return (
        <>
            <div className="dash-header">
                <div className="dash-title">Impostazioni</div>
                {saved && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: "var(--radius-sm)", padding: "0.4rem 0.85rem" }}>
                        <span style={{ color: "#4ade80", fontSize: "0.78rem", fontWeight: 600 }}>✓ Salvato con successo</span>
                    </div>
                )}
            </div>

            <div className="dash-content">
                <div className="grid-2" style={{ gap: "1.5rem", alignItems: "start" }}>
                    {/* Nav */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <div className="card" style={{ padding: "0.5rem" }}>
                            {navItems.map(item => (
                                <button key={item.id} onClick={() => setSection(item.id)} style={{
                                    display: "block", width: "100%", textAlign: "left",
                                    padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)",
                                    background: section === item.id ? "rgba(220,38,38,0.1)" : "transparent",
                                    border: "none", color: section === item.id ? "var(--red-400)" : "var(--text-secondary)",
                                    fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: section === item.id ? 600 : 400,
                                    cursor: "pointer", transition: "all 0.12s",
                                    borderLeft: `2px solid ${section === item.id ? "var(--red-600)" : "transparent"}`,
                                }}>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        {section === "profilo" && (
                            <div className="card">
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", marginBottom: "1.5rem" }}>Profilo Staff</div>

                                {/* Avatar */}
                                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,var(--red-700),var(--iron-600))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.4rem", color: "#fff", flexShrink: 0 }}>SC</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "1rem" }}>{profilo.nome}</div>
                                        <div style={{ fontSize: "0.78rem", color: "var(--red-400)", fontWeight: 600, marginTop: "0.15rem" }}>Staff · Head Coach</div>
                                        <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.72rem", fontFamily: "var(--font-display)", textTransform: "uppercase", marginTop: "0.5rem" }}>
                                            Cambia foto
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div className="grid-2" style={{ gap: "1rem" }}>
                                        <div>
                                            <label className="form-label">Nome completo</label>
                                            <input className="form-input" value={profilo.nome} onChange={e => setProfilo(p => ({ ...p, nome: e.target.value }))} />
                                        </div>
                                        <div>
                                            <label className="form-label">Email</label>
                                            <input className="form-input" type="email" value={profilo.email} onChange={e => setProfilo(p => ({ ...p, email: e.target.value }))} />
                                        </div>
                                    </div>
                                    <div className="grid-2" style={{ gap: "1rem" }}>
                                        <div>
                                            <label className="form-label">Telefono</label>
                                            <input className="form-input" value={profilo.telefono} onChange={e => setProfilo(p => ({ ...p, telefono: e.target.value }))} />
                                        </div>
                                        <div>
                                            <label className="form-label">Instagram</label>
                                            <input className="form-input" value={profilo.instagram} onChange={e => setProfilo(p => ({ ...p, instagram: e.target.value }))} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label">Specialità</label>
                                        <input className="form-input" value={profilo.specialita} onChange={e => setProfilo(p => ({ ...p, specialita: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label className="form-label">Bio professionale</label>
                                        <textarea className="form-input" rows={3} value={profilo.bio} onChange={e => setProfilo(p => ({ ...p, bio: e.target.value }))}
                                            style={{ resize: "vertical", fontFamily: "var(--font-body)" }} />
                                    </div>
                                    <div>
                                        <label className="form-label">Numero massimo clienti</label>
                                        <input className="form-input" type="number" value={profilo.maxClienti} style={{ maxWidth: "100px" }}
                                            onChange={e => setProfilo(p => ({ ...p, maxClienti: e.target.value }))} />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <button className="btn btn-red" onClick={save}>Salva Profilo</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {section === "disponibilita" && (
                            <div className="card">
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", marginBottom: "1.5rem" }}>Orari di Disponibilità</div>
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label className="form-label" style={{ marginBottom: "0.75rem" }}>Giorni attivi</label>
                                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                                        {DAYS_LABELS.map((d, i) => (
                                            <button key={d} onClick={() => setWorkDays(days => days.map((v, j) => j === i ? !v : v))} style={{
                                                width: "42px", height: "42px", borderRadius: "var(--radius-sm)",
                                                background: workDays[i] ? "var(--red-700)" : "var(--iron-800)",
                                                border: `1px solid ${workDays[i] ? "var(--red-600)" : "var(--border)"}`,
                                                color: workDays[i] ? "#fff" : "var(--text-muted)",
                                                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer",
                                                transition: "all 0.15s", textTransform: "uppercase",
                                            }}>{d}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid-2" style={{ gap: "1rem", marginBottom: "1.25rem" }}>
                                    <div>
                                        <label className="form-label">Orario inizio</label>
                                        <select className="form-input" value={workHours.start} onChange={e => setWorkHours(h => ({ ...h, start: e.target.value }))}>
                                            {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="form-label">Orario fine</label>
                                        <select className="form-input" value={workHours.end} onChange={e => setWorkHours(h => ({ ...h, end: e.target.value }))}>
                                            {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1.25rem" }}>
                                    <label className="form-label">Durata sessione standard</label>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        {[30, 45, 60, 90].map(d => (
                                            <button key={d} onClick={() => setSessionDuration(String(d))} style={{
                                                padding: "0.5rem 1rem",
                                                background: sessionDuration === String(d) ? "var(--red-700)" : "var(--iron-800)",
                                                border: `1px solid ${sessionDuration === String(d) ? "var(--red-600)" : "var(--border)"}`,
                                                borderRadius: "var(--radius-sm)", color: sessionDuration === String(d) ? "#fff" : "var(--text-muted)",
                                                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
                                                transition: "all 0.15s",
                                            }}>{d} min</button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <button className="btn btn-red" onClick={save}>Salva Disponibilità</button>
                                </div>
                            </div>
                        )}

                        {section === "notifiche" && (
                            <div className="card">
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", marginBottom: "1.5rem" }}>Preferenze Notifiche</div>
                                {([
                                    { key: "nuovoMessaggio", label: "Nuovo messaggio cliente", desc: "Notifica quando un cliente ti scrive" },
                                    { key: "sessioneCompletata", label: "Sessione completata", desc: "Quando un cliente registra una sessione" },
                                    { key: "clienteInattivo", label: "Cliente inattivo", desc: "Avviso se un cliente non è attivo da 3+ giorni" },
                                    { key: "reportSettimanale", label: "Report settimanale", desc: "Riepilogo performance ogni lunedì" },
                                    { key: "reminderCall", label: "Reminder call", desc: "Promemoria 30 min prima di ogni call" },
                                ] as const).map((item, i, arr) => (
                                    <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</div>
                                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{item.desc}</div>
                                        </div>
                                        <button onClick={() => setNotifiche(n => ({ ...n, [item.key]: !n[item.key] }))}
                                            style={{
                                                width: "44px", height: "24px", borderRadius: "12px", flexShrink: 0,
                                                background: notifiche[item.key] ? "var(--red-600)" : "var(--iron-700)",
                                                border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s",
                                            }}>
                                            <div style={{
                                                position: "absolute", top: "3px",
                                                left: notifiche[item.key] ? "22px" : "3px",
                                                width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
                                                transition: "left 0.2s",
                                            }} />
                                        </button>
                                    </div>
                                ))}
                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.25rem" }}>
                                    <button className="btn btn-red" onClick={save}>Salva Preferenze</button>
                                </div>
                            </div>
                        )}

                        {section === "piattaforma" && (
                            <div className="card">
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", marginBottom: "1.5rem" }}>Piattaforma</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {[
                                        { label: "Esporta tutti i dati", desc: "Scarica un archivio completo di tutti i dati clienti", action: "Esporta", color: "var(--ghost)" },
                                        { label: "Backup configurazione", desc: "Salva la configurazione attuale della piattaforma", action: "Backup", color: "var(--ghost)" },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.label}</div>
                                                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>{item.desc}</div>
                                            </div>
                                            <button className="btn btn-ghost btn-sm" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem", flexShrink: 0 }}>{item.action}</button>
                                        </div>
                                    ))}

                                    <div style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(220,38,38,0.04)", border: "1px solid var(--border-red)", borderRadius: "var(--radius-sm)" }}>
                                        <div style={{ fontSize: "0.75rem", color: "var(--red-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.35rem" }}>Zona pericolosa</div>
                                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Queste azioni sono irreversibili. Procedi con cautela.</div>
                                        <button className="btn btn-ghost btn-sm" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem", borderColor: "rgba(220,38,38,0.3)", color: "var(--red-400)" }}>
                                            Reset piattaforma
                                        </button>
                                    </div>

                                    <div style={{ padding: "0.85rem 1rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", marginTop: "0.25rem" }}>
                                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Versione piattaforma</div>
                                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem" }}>Stra Coach v2.0.0 <span style={{ color: "var(--red-400)" }}>beta</span></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
