"use client";
import { useState } from "react";

type Priority = "bassa" | "media" | "alta" | "urgente";

const PRIORITY_COLORS: Record<Priority, string> = {
    bassa: "#6b6b6b",
    media: "#f59e0b",
    alta: "#ef4444",
    urgente: "#dc2626",
};

const CATEGORIES = ["Performance & Mindset", "Nutrizione", "Allenamento", "Tecnico / Piattaforma", "Abbonamento & Billing", "Altro"];

export default function AiutoPage() {
    const [priority, setPriority] = useState<Priority>("media");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setSent(true);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title">🆘 Richiesta d&apos;Aiuto</div>
                <div className="header-actions">
                    <span className="tag tag-red">Risposta in &lt;4h</span>
                </div>
            </div>

            <div className="dash-content">
                <div className="grid-2" style={{ alignItems: "start" }}>
                    {/* Form */}
                    <div>
                        {sent ? (
                            <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                                    Ricevuto!
                                </h2>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                                    Il tuo team Stra Coach ha ricevuto la tua richiesta.<br />
                                    Ti risponderemo entro <strong style={{ color: "var(--red-400)" }}>4 ore</strong> all&apos;email registrata.
                                </p>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => { setSent(false); setSubject(""); setMessage(""); }}
                                    style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.85rem" }}
                                >
                                    Nuova Richiesta
                                </button>
                            </div>
                        ) : (
                            <form className="card help-form" onSubmit={handleSend}>
                                <div className="page-header" style={{ marginBottom: "1rem" }}>
                                    <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 900, textTransform: "uppercase", lineHeight: 1 }}>
                                        Hai bisogno di aiuto?
                                    </h1>
                                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                                        Compila il form e il tuo team di coach riceverà la tua richiesta istantaneamente.
                                    </p>
                                </div>

                                {/* Priority */}
                                <div>
                                    <label className="form-label">Priorità</label>
                                    <div className="priority-grid">
                                        {(["bassa", "media", "alta", "urgente"] as Priority[]).map(p => (
                                            <button
                                                key={p}
                                                type="button"
                                                id={`priority-${p}`}
                                                className={`priority-btn ${priority === p ? "active" : ""}`}
                                                onClick={() => setPriority(p)}
                                                style={priority === p ? { background: PRIORITY_COLORS[p], borderColor: PRIORITY_COLORS[p] } : {}}
                                            >
                                                {p === "bassa" ? "🟢 Bassa" : p === "media" ? "🟡 Media" : p === "alta" ? "🟠 Alta" : "🔴 Urgente"}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="form-label">Categoria</label>
                                    <select id="help-category" className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="form-label">Oggetto</label>
                                    <input
                                        id="help-subject"
                                        type="text"
                                        className="form-input"
                                        placeholder="Descrivi brevemente il problema..."
                                        value={subject}
                                        onChange={e => setSubject(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="form-label">Descrizione dettagliata</label>
                                    <textarea
                                        id="help-message"
                                        className="form-textarea"
                                        placeholder="Raccontaci tutto... Più dettagli dai, più velocemente possiamo aiutarti."
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    id="help-send-btn"
                                    type="submit"
                                    className="btn btn-red btn-lg"
                                    disabled={loading}
                                    style={{ width: "100%" }}
                                >
                                    {loading ? "Invio in corso..." : "🆘 INVIA RICHIESTA D'AIUTO →"}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right: info panel */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        <div className="card card-red">
                            <div className="section-label" style={{ margin: "0 0 0.75rem" }}>📞 Contatti Diretti</div>
                            {[
                                { icon: "💬", label: "AI Coach", desc: "Disponibile 24/7 in chat", action: "/dashboard/chat" },
                                { icon: "📅", label: "Prenota Call", desc: "30 min con il tuo coach", action: "/dashboard/call" },
                                { icon: "📧", label: "Email Support", desc: "support@stracoach.it", action: "mailto:support@stracoach.it" },
                            ].map((c, i) => (
                                <a
                                    key={i}
                                    href={c.action}
                                    style={{
                                        display: "flex",
                                        gap: "0.75rem",
                                        padding: "0.75rem 0",
                                        borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                                        textDecoration: "none",
                                        alignItems: "center",
                                        color: "inherit",
                                        transition: "opacity 0.15s",
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                                >
                                    <span style={{ fontSize: "1.2rem" }}>{c.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{c.label}</div>
                                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.desc}</div>
                                    </div>
                                    <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: "0.8rem" }}>→</span>
                                </a>
                            ))}
                        </div>

                        <div className="card">
                            <div className="section-label" style={{ margin: "0 0 0.75rem" }}>⏱ Tempi di Risposta</div>
                            {[
                                { p: "Urgente 🔴", t: "< 1 ora" },
                                { p: "Alta 🟠", t: "< 4 ore" },
                                { p: "Media 🟡", t: "< 24 ore" },
                                { p: "Bassa 🟢", t: "< 72 ore" },
                            ].map((i, idx) => (
                                <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: idx < 3 ? "1px solid var(--border)" : "none", fontSize: "0.85rem" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>{i.p}</span>
                                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--red-400)" }}>{i.t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
