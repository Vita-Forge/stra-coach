"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const stats = [
    { label: "Sessioni Completate", value: "12", delta: "+3 questa sett." },
    { label: "Streak Giorni", value: "18", delta: "🔥 Record!" },
    { label: "Calorie Oggi", value: "1.840", delta: "Target: 2.100" },
    { label: "KPI Score", value: "84", delta: "+6 vs mese scorso" },
];

const quickActions = [
    { href: "/dashboard/chat", icon: "🤖", title: "Chatta con l'AI Coach", desc: "Chiedi aiuto, ricevi strategie personalizzate, 24/7" },
    { href: "/dashboard/call", icon: "📞", title: "Prenota la Call", desc: "30 min gratuiti con un coach certificato" },
    { href: "/dashboard/cibo", icon: "🥩", title: "Log Pasto", desc: "Monitora macro e calorie di oggi" },
    { href: "/dashboard/allenamento", icon: "💪", title: "Allenamento di Oggi", desc: "Vedi il tuo piano e registra la sessione" },
];

export default function DashboardPage() {
    const { user } = useAuth();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Buongiorno" : hour < 18 ? "Buon pomeriggio" : "Buonasera";

    return (
        <>
            {/* Header */}
            <div className="dash-header">
                <div className="dash-title">Dashboard</div>
                <div className="header-actions">
                    <button className="notif-btn" id="notif-btn" title="Notifiche">🔔</button>
                    <Link href="/dashboard/aiuto" className="btn btn-red btn-sm">
                        🆘 Aiuto
                    </Link>
                </div>
            </div>

            <div className="dash-content">
                {/* Welcome */}
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                    }}>
                        {greeting}, <span className="gradient-text">{user?.name?.split(" ")[0] || "Coach"}.</span>
                    </h1>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                        Oggi è il tuo giorno. Ecco il tuo riepilogo performance.
                    </p>
                </div>

                {/* KPI Stats */}
                <div className="grid-4" style={{ marginBottom: "1.5rem" }}>
                    {stats.map((s, i) => (
                        <div className="card" key={i} id={`stat-card-${i}`}>
                            <div className="card-title">{s.label}</div>
                            <div className="card-value">{s.value}</div>
                            <div className="card-delta">{s.delta}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div style={{ marginBottom: "0.6rem" }}>
                    <span className="section-label" style={{ marginBottom: "1rem" }}>Azioni Rapide</span>
                </div>
                <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
                    {quickActions.map((a, i) => (
                        <Link href={a.href} key={i} className="action-card" id={`action-${i}`}>
                            <div className="action-icon">{a.icon}</div>
                            <div>
                                <div className="action-title">{a.title}</div>
                                <div className="action-desc">{a.desc}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom row: Today's summary + Tools */}
                <div className="grid-2">
                    {/* Today Plan */}
                    <div className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <div className="card-title" style={{ margin: 0 }}>Piano Oggi</div>
                            <span className="tag tag-red">In corso</span>
                        </div>
                        {[
                            { time: "08:00", task: "Colazione: 50g proteine", done: true },
                            { time: "10:00", task: "AI Check-in mattutino", done: true },
                            { time: "13:00", task: "Pranzo — log macro", done: false },
                            { time: "18:00", task: "Allenamento: Push Day", done: false },
                            { time: "20:30", task: "Cena + Reflection", done: false },
                        ].map((t, i) => (
                            <div key={i} style={{
                                display: "flex",
                                gap: "0.75rem",
                                padding: "0.55rem 0",
                                borderBottom: i < 4 ? "1px solid var(--border)" : "none",
                                opacity: t.done ? 0.5 : 1,
                            }}>
                                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", width: "38px", flexShrink: 0, paddingTop: "0.1rem" }}>{t.time}</span>
                                <span style={{ fontSize: "0.85rem", textDecoration: t.done ? "line-through" : "none", color: t.done ? "var(--text-muted)" : "var(--text-primary)" }}>
                                    {t.done ? "✅ " : "⬜ "}{t.task}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Tool Stack */}
                    <div className="card">
                        <div className="card-title" style={{ marginBottom: "1rem" }}>Stack Tecnologico Attivo</div>
                        {[
                            { icon: "🤖", name: "Gemini 2.0 AI", status: "Attivo", color: "#4ade80" },
                            { icon: "📅", name: "Cal.com Booking", status: "Attivo", color: "#4ade80" },
                            { icon: "📧", name: "Resend Email", status: "Attivo", color: "#4ade80" },
                            { icon: "💳", name: "Stripe Payments", status: "Sandbox", color: "#f59e0b" },
                            { icon: "🗄️", name: "Neon DB", status: "Da configurare", color: "#6b6b6b" },
                            { icon: "🔐", name: "Clerk Auth", status: "Da configurare", color: "#6b6b6b" },
                        ].map((t, i) => (
                            <div key={i} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0.55rem 0",
                                borderBottom: i < 5 ? "1px solid var(--border)" : "none",
                            }}>
                                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                                    <span>{t.icon}</span>
                                    <span style={{ fontSize: "0.85rem" }}>{t.name}</span>
                                </div>
                                <span style={{ fontSize: "0.7rem", color: t.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                    ● {t.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
