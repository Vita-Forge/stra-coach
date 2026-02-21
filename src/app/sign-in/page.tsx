"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ROLE_LABELS } from "@/lib/data";

const ALL_CREDS = [
    { role: "Admin", email: "admin@stracoach.it", password: "admin2026" },
    { role: "Manager", email: "sara@stracoach.it", password: "manager2026" },
    { role: "Professionista", email: "luca@stracoach.it", password: "prof2026" },
    { role: "Professionista", email: "elena@stracoach.it", password: "prof5678" },
    { role: "Commerciale", email: "matteo@stracoach.it", password: "comm2026" },
    { role: "Fornitore", email: "fornitore@stracoach.it", password: "forn2026" },
    { role: "Utente", email: "marco@stracoach.it", password: "cliente123" },
    { role: "Utente", email: "giulia@stracoach.it", password: "cliente456" },
    { role: "Utente", email: "nicola@stracoach.it", password: "cliente789" },
    { role: "Utente", email: "chiara@stracoach.it", password: "cliente101" },
];

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCreds, setShowCreds] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        await new Promise(r => setTimeout(r, 300));
        const result = signIn(email.trim(), password);
        setLoading(false);
        if (!result.ok) { setError(result.error || "Credenziali non valide"); return; }
        router.push(result.route!);
    };

    const fillCreds = (e: string, p: string) => { setEmail(e); setPassword(p); setError(""); };

    return (
        <div style={{
            minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "1.5rem",
            background: "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.06) 0%, transparent 60%), var(--iron-950)",
        }}>
            <div style={{ width: "100%", maxWidth: "420px" }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2rem", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1 }}>
                        STRA<span style={{ color: "var(--red-600)" }}>.</span>COACH
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        Piattaforma di Performance
                    </div>
                </div>

                {/* Card */}
                <div style={{ background: "var(--iron-900)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "2rem" }}>
                    <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                        Accedi
                    </h1>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <label className="form-label">Email</label>
                            <input
                                id="email-input"
                                className="form-input"
                                type="email"
                                placeholder="nome@stracoach.it"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setError(""); }}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Password</label>
                            <input
                                id="password-input"
                                className="form-input"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setError(""); }}
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        {error && (
                            <div style={{ background: "rgba(220,38,38,0.08)", border: "1px solid var(--border-red)", borderRadius: "var(--radius-sm)", padding: "0.65rem 0.85rem", fontSize: "0.82rem", color: "var(--red-400)" }}>
                                {error}
                            </div>
                        )}

                        <button
                            id="signin-btn"
                            type="submit"
                            className="btn btn-red"
                            disabled={loading}
                            style={{ marginTop: "0.25rem", opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? "Accesso in corso..." : "Entra →"}
                        </button>
                    </form>
                </div>

                {/* Demo Credentials */}
                <div style={{ marginTop: "1.25rem", background: "var(--iron-900)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                    <button
                        onClick={() => setShowCreds(v => !v)}
                        style={{ width: "100%", padding: "0.85rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.78rem", fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        <span>Credenziali Demo ({ALL_CREDS.length} utenti)</span>
                        <span style={{ fontSize: "0.9rem" }}>{showCreds ? "▲" : "▼"}</span>
                    </button>

                    {showCreds && (
                        <div style={{ borderTop: "1px solid var(--border)", maxHeight: "320px", overflowY: "auto" }}>
                            {ALL_CREDS.map((c, i) => (
                                <button
                                    key={i}
                                    onClick={() => fillCreds(c.email, c.password)}
                                    style={{
                                        width: "100%", padding: "0.65rem 1.25rem", display: "flex", alignItems: "center",
                                        gap: "0.75rem", background: "none", border: "none", cursor: "pointer",
                                        borderBottom: i < ALL_CREDS.length - 1 ? "1px solid var(--border)" : "none",
                                        textAlign: "left", transition: "background 0.12s",
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = "var(--iron-850)")}
                                    onMouseLeave={e => (e.currentTarget.style.background = "none")}
                                >
                                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: c.role === "Admin" ? "rgba(220,38,38,0.2)" : c.role === "Utente" ? "var(--iron-700)" : "rgba(96,165,250,0.15)", border: `1px solid ${c.role === "Admin" ? "var(--border-red)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", fontFamily: "var(--font-display)", fontWeight: 800, color: c.role === "Admin" ? "var(--red-400)" : "var(--text-muted)", flexShrink: 0 }}>
                                        {c.role.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.email}</div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>{c.role} — <code style={{ fontFamily: "monospace", color: "var(--red-400)" }}>{c.password}</code></div>
                                    </div>
                                    <div style={{ fontSize: "0.65rem", color: "var(--iron-500)", flexShrink: 0 }}>→ usa</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "1.5rem" }}>
                    Non hai un account?{" "}
                    <a href="/sign-up" style={{ color: "var(--red-400)", fontWeight: 600, textDecoration: "none" }}>Registrati</a>
                    {" · "}
                    <a href="/#prenota" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Prenota una call</a>
                </p>
            </div>
        </div>
    );
}
