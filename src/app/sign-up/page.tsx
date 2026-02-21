"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const PLANS = ["Stra Solo — €97/mese", "Stra Pro — €297/mese", "Stra Elite — €997/mese"];

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [plan, setPlan] = useState(PLANS[1]);
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            signIn(email, name);
            router.push("/dashboard");
        }, 900);
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--iron-950)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
        }}>
            <div style={{
                position: "fixed", inset: 0, zIndex: 0,
                backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }} />

            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "460px" }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <Link href="/" style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900, fontSize: "2rem",
                        textTransform: "uppercase",
                        color: "var(--text-primary)", textDecoration: "none",
                    }}>
                        STRA<span style={{ color: "var(--red-600)" }}>.</span>COACH
                    </Link>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                        Inizia il tuo percorso di performance
                    </p>
                </div>

                <div style={{
                    background: "var(--iron-900)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "2rem",
                }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <label className="form-label">Nome completo</label>
                            <input id="signup-name" type="text" className="form-input" placeholder="Mario Rossi"
                                value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label className="form-label">Email</label>
                            <input id="signup-email" type="email" className="form-input" placeholder="mario@esempio.it"
                                value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label className="form-label">Scegli il piano</label>
                            <select id="signup-plan" className="form-select" value={plan} onChange={e => setPlan(e.target.value)}>
                                {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div style={{ padding: "1rem", background: "var(--iron-800)", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                            ✅ 30 giorni gratis &nbsp;·&nbsp; ✅ Nessuna carta richiesta &nbsp;·&nbsp; ✅ Cancella quando vuoi
                        </div>
                        <button id="signup-btn" type="submit" className="btn btn-red btn-lg"
                            disabled={loading} style={{ width: "100%", marginTop: "0.25rem" }}>
                            {loading ? "Creazione account..." : "INIZIA ORA — GRATIS →"}
                        </button>
                    </form>

                    <div className="hdivider" style={{ margin: "1.5rem 0" }} />
                    <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        Hai già un account?{" "}
                        <Link href="/sign-in" style={{ color: "var(--red-400)", textDecoration: "none", fontWeight: 600 }}>
                            Accedi →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
