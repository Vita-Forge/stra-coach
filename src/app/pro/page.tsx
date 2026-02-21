"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const clients = [
    { initials: "MR", name: "Marco Rossi", plan: "Stra Pro", streak: 18, kpi: 84, lastSeen: "Oggi 10:32", alert: false },
    { initials: "AL", name: "Alessio Longo", plan: "Stra Elite", streak: 31, kpi: 91, lastSeen: "Oggi 08:15", alert: false },
    { initials: "GF", name: "Giulia Ferrari", plan: "Stra Solo", streak: 4, kpi: 62, lastSeen: "Ieri 22:00", alert: true },
    { initials: "NB", name: "Nicola Bianchi", plan: "Stra Pro", streak: 9, kpi: 77, lastSeen: "2 giorni fa", alert: false },
    { initials: "CP", name: "Chiara Pellegrini", plan: "Stra Elite", streak: 22, kpi: 88, lastSeen: "Oggi 14:05", alert: false },
];

const stats = [
    { label: "Clienti Attivi", value: "24", delta: "+3 questo mese" },
    { label: "Call Questa Sett.", value: "8", delta: "2 da confermare" },
    { label: "Msg Non Letti", value: "5", delta: "Risposta media 2h" },
    { label: "NPS Medio", value: "4.9", delta: "↑ +0.2 vs mese" },
];

export default function ProPage() {
    const { user } = useAuth();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Buongiorno" : hour < 18 ? "Buon pomeriggio" : "Buonasera";

    return (
        <>
            <div className="dash-header">
                <div className="dash-title">Portale Staff</div>
                <div className="header-actions">
                    <Link href="/pro/clienti" className="btn btn-red btn-sm">+ Nuovo Cliente</Link>
                </div>
            </div>

            <div className="dash-content">
                {/* Welcome */}
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{
                        fontFamily: "var(--font-display)", fontWeight: 900,
                        fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "uppercase",
                        lineHeight: 1, letterSpacing: "-0.01em",
                    }}>
                        {greeting}, <span className="gradient-text">{user?.name?.split(" ")[0]}.</span>
                    </h1>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>
                        {user?.specialty} · Staff Dashboard
                    </p>
                </div>

                {/* KPI */}
                <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
                    {stats.map((s, i) => (
                        <div className="card" key={i}>
                            <div className="card-title">{s.label}</div>
                            <div className="card-value">{s.value}</div>
                            <div className="card-delta">{s.delta}</div>
                        </div>
                    ))}
                </div>

                <div className="grid-2" style={{ alignItems: "start" }}>
                    {/* Clienti recenti */}
                    <div className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <div className="card-title" style={{ margin: 0 }}>Clienti in Evidenza</div>
                            <Link href="/pro/clienti" style={{ fontSize: "0.75rem", color: "var(--red-400)", textDecoration: "none", fontWeight: 600 }}>
                                Vedi tutti →
                            </Link>
                        </div>
                        {clients.map((c, i) => (
                            <div key={i} style={{
                                display: "flex", alignItems: "center", gap: "0.85rem",
                                padding: "0.75rem 0",
                                borderBottom: i < clients.length - 1 ? "1px solid var(--border)" : "none",
                            }}>
                                <div style={{
                                    width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                                    background: c.alert ? "rgba(220,38,38,0.12)" : "linear-gradient(135deg,var(--iron-700),var(--iron-500))",
                                    border: c.alert ? "1px solid var(--border-red)" : "1px solid var(--border)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.8rem",
                                    color: c.alert ? "var(--red-400)" : "var(--text-secondary)",
                                }}>
                                    {c.initials}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{c.name}</span>
                                        {c.alert && (
                                            <span style={{
                                                fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
                                                letterSpacing: "0.06em", color: "var(--red-400)",
                                                background: "rgba(220,38,38,0.08)", border: "1px solid var(--border-red)",
                                                borderRadius: "3px", padding: "0.1rem 0.35rem",
                                            }}>
                                                Attenzione
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
                                        {c.plan} · Streak {c.streak}gg · KPI {c.kpi}
                                    </div>
                                </div>
                                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", flexShrink: 0 }}>{c.lastSeen}</div>
                            </div>
                        ))}
                    </div>

                    {/* Oggi + Actions rapide */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div className="card card-red">
                            <div className="card-title" style={{ marginBottom: "0.75rem" }}>Agenda di Oggi</div>
                            {[
                                { time: "10:00", name: "Call — Marco Rossi", type: "call" },
                                { time: "11:30", name: "Check-in — Giulia Ferrari", type: "check" },
                                { time: "14:00", name: "Call — Chiara Pellegrini", type: "call" },
                                { time: "16:00", name: "Review piani alimentari", type: "task" },
                            ].map((ev, i) => (
                                <div key={i} style={{
                                    display: "flex", gap: "0.75rem", padding: "0.55rem 0",
                                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                                    alignItems: "center",
                                }}>
                                    <span style={{ fontSize: "0.72rem", color: "var(--red-400)", fontFamily: "var(--font-display)", fontWeight: 700, width: "38px", flexShrink: 0 }}>{ev.time}</span>
                                    <span style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>{ev.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="card">
                            <div className="card-title" style={{ marginBottom: "0.75rem" }}>Azioni Rapide</div>
                            {[
                                { label: "Invia piano settimanale", href: "/pro/piani" },
                                { label: "Messaggi non letti (5)", href: "/pro/messaggi" },
                                { label: "Calendario sessioni", href: "/pro/calendario" },
                                { label: "Report KPI clienti", href: "/pro/statistiche" },
                            ].map((a, i) => (
                                <Link key={i} href={a.href} style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "0.6rem 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                                    textDecoration: "none", fontSize: "0.84rem", color: "var(--text-secondary)",
                                    transition: "color 0.15s",
                                }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                                >
                                    {a.label}
                                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
