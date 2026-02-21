"use client";

const STATS = {
    totaleClienti: 24,
    clientiAttivi: 20,
    clientiAttenzione: 3,
    clientiInattivi: 1,
    streakMedio: 14,
    kpiMedio: 78,
    callSettimanali: 8,
    tassoCompletamento: 82,
    npsMedio: 4.9,
};

const TOP_CLIENTS = [
    { initials: "AL", name: "Alessio Longo", streak: 31, kpi: 91, trend: "+8" },
    { initials: "CP", name: "Chiara Pellegrini", streak: 22, kpi: 88, trend: "+5" },
    { initials: "MR", name: "Marco Rossi", streak: 18, kpi: 84, trend: "+3" },
];

const NEED_ATTENTION = [
    { initials: "GF", name: "Giulia Ferrari", streak: 4, kpi: 62, issue: "Streak basso, 2 sessioni saltate" },
    { initials: "FM", name: "Fabio Martini", streak: 0, kpi: 45, issue: "Nessuna attività negli ultimi 10 giorni" },
];

const WEEKLY_COMPLETIONS = [65, 72, 58, 80, 82, 75, 88, 82];
const WEEKLY_LABELS = ["4 Gen", "11 Gen", "18 Gen", "25 Gen", "1 Feb", "8 Feb", "15 Feb", "Questa"];

function MiniBar({ value, max = 100, color = "var(--red-500)" }: { value: number; max?: number; color?: string }) {
    return (
        <div style={{ flex: 1, height: "6px", background: "var(--iron-700)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(100, (value / max) * 100)}%`, background: color, borderRadius: "3px", transition: "width 0.5s ease" }} />
        </div>
    );
}

export default function StatistichePage() {
    const maxCompletion = Math.max(...WEEKLY_COMPLETIONS);

    return (
        <>
            <div className="dash-header">
                <div className="dash-title">Statistiche</div>
                <div className="header-actions">
                    <button className="btn btn-ghost btn-sm" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.75rem" }}>
                        Esporta Report
                    </button>
                </div>
            </div>

            <div className="dash-content">
                {/* KPI principali */}
                <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
                    {[
                        { label: "Clienti Attivi", value: `${STATS.clientiAttivi}/${STATS.totaleClienti}`, sub: "+3 questo mese", color: "var(--text-primary)" },
                        { label: "KPI Medio", value: STATS.kpiMedio, sub: "↑ +4 vs mese scorso", color: "#4ade80" },
                        { label: "Streak Medio", value: `${STATS.streakMedio}gg`, sub: "↑ +2gg vs mese", color: "var(--red-400)" },
                        { label: "NPS Medio", value: STATS.npsMedio, sub: "↑ +0.2 vs mese", color: "#fbbf24" },
                    ].map((s, i) => (
                        <div className="card" key={i}>
                            <div className="card-title">{s.label}</div>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2rem", color: s.color, lineHeight: 1, marginBottom: "0.3rem" }}>{s.value}</div>
                            <div style={{ fontSize: "0.75rem", color: "#4ade80" }}>{s.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="grid-2" style={{ gap: "1.5rem", alignItems: "start" }}>
                    {/* Tasso completamento sessioni nel tempo */}
                    <div className="card">
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.25rem" }}>
                            Sessioni Completate (%) — Ultime 8 settimane
                        </div>
                        <div style={{ display: "flex", gap: "0.3rem", alignItems: "flex-end", height: "120px" }}>
                            {WEEKLY_COMPLETIONS.map((v, i) => (
                                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                                    <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-display)", fontWeight: 700 }}>{v}%</div>
                                    <div style={{ width: "100%", height: `${(v / maxCompletion) * 90}px`, background: i === WEEKLY_COMPLETIONS.length - 1 ? "var(--red-600)" : "var(--iron-700)", borderRadius: "3px 3px 0 0", transition: "height 0.5s ease", position: "relative" }}>
                                        {i === WEEKLY_COMPLETIONS.length - 1 && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(220,38,38,0.3) 0%, var(--red-700) 100%)", borderRadius: "3px 3px 0 0" }} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.4rem" }}>
                            {WEEKLY_LABELS.map((l, i) => (
                                <div key={i} style={{ flex: 1, fontSize: "0.55rem", color: i === WEEKLY_LABELS.length - 1 ? "var(--red-400)" : "var(--text-muted)", textAlign: "center", lineHeight: 1.2 }}>{l}</div>
                            ))}
                        </div>
                    </div>

                    {/* Status distribuzione */}
                    <div className="card">
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.25rem" }}>
                            Distribuzione Clienti
                        </div>
                        {[
                            { label: "Attivi", value: STATS.clientiAttivi, total: STATS.totaleClienti, color: "#4ade80" },
                            { label: "Attenzione", value: STATS.clientiAttenzione, total: STATS.totaleClienti, color: "#f59e0b" },
                            { label: "Inattivi", value: STATS.clientiInattivi, total: STATS.totaleClienti, color: "#6b7280" },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
                                <span style={{ width: "70px", fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>{item.label}</span>
                                <MiniBar value={item.value} max={item.total} color={item.color} />
                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: item.color, width: "30px", textAlign: "right" }}>{item.value}</span>
                            </div>
                        ))}

                        <div style={{ height: "1px", background: "var(--border)", margin: "0.5rem 0 1rem" }} />

                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.85rem" }}>
                            Piani attivi
                        </div>
                        {[
                            { label: "Stra Elite", value: 8, color: "var(--red-400)" },
                            { label: "Stra Pro", value: 12, color: "var(--silver-400)" },
                            { label: "Stra Solo", value: 4, color: "var(--iron-400)" },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.75rem" }}>
                                <span style={{ width: "70px", fontSize: "0.78rem", color: "var(--text-secondary)" }}>{item.label}</span>
                                <MiniBar value={item.value} max={24} color={item.color} />
                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: item.color, width: "30px", textAlign: "right" }}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid-2" style={{ gap: "1.5rem", marginTop: "1.5rem", alignItems: "start" }}>
                    {/* Top performer */}
                    <div className="card">
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1rem" }}>
                            Top Performer
                        </div>
                        {TOP_CLIENTS.map((c, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.85rem", padding: "0.75rem 0", borderBottom: i < TOP_CLIENTS.length - 1 ? "1px solid var(--border)" : "none" }}>
                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.2rem", color: ["var(--red-400)", "var(--silver-400)", "var(--iron-400)"][i], width: "24px" }}>#{i + 1}</span>
                                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,var(--iron-700),var(--iron-500))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.75rem" }}>{c.initials}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{c.name}</div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Streak {c.streak}gg · KPI {c.kpi}</div>
                                </div>
                                <span style={{ fontSize: "0.78rem", color: "#4ade80", fontFamily: "var(--font-display)", fontWeight: 700 }}>{c.trend}</span>
                            </div>
                        ))}
                    </div>

                    {/* Attenzione */}
                    <div className="card card-red">
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--red-400)", marginBottom: "1rem" }}>
                            Richiedono Attenzione
                        </div>
                        {NEED_ATTENTION.map((c, i) => (
                            <div key={i} style={{ padding: "0.85rem", background: "rgba(220,38,38,0.06)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-red)", marginBottom: i < NEED_ATTENTION.length - 1 ? "0.75rem" : 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(220,38,38,0.12)", border: "1px solid var(--border-red)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.72rem", color: "var(--red-400)" }}>{c.initials}</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{c.name}</div>
                                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Streak {c.streak}gg · KPI {c.kpi}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontStyle: "italic" }}>{c.issue}</p>
                                <button className="btn btn-ghost btn-sm" style={{ marginTop: "0.6rem", fontSize: "0.7rem", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                                    Invia messaggio
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
