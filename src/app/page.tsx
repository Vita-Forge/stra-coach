"use client";
import { useState } from "react";
import Link from "next/link";

const features = [
    { icon: "🤖", title: "AI Coach 24/7", desc: "Gemini 2.0 personalizzato sul tuo profilo. Strategie, supporto e risposte a qualsiasi ora." },
    { icon: "📞", title: "Coach Umani Certificati", desc: "2-4 sessioni/mese con professionisti selezionati. Niente bot, niente script — solo expertise reale." },
    { icon: "🥩", title: "Nutrizione Intelligente", desc: "Log macro automatico, piano alimentare AI-generato e tracking calorico giornaliero." },
    { icon: "💪", title: "Piano Allenamento", desc: "Routine personalizzate settimanali con progressione automatica e log sessioni." },
    { icon: "📊", title: "KPI di Performance", desc: "Dashboard con le tue metriche reali. Misura ogni progresso. I numeri non mentono." },
    { icon: "🔴", title: "Support Urgente", desc: "Team disponibile con SLA garantito. Risposta in meno di 4 ore su qualsiasi issue." },
];

const tools = [
    { icon: "🤖", name: "Gemini 2.0" },
    { icon: "📅", name: "Cal.com" },
    { icon: "📧", name: "Resend" },
    { icon: "💳", name: "Stripe" },
    { icon: "🗄️", name: "Neon DB" },
    { icon: "🔐", name: "Clerk" },
    { icon: "▲", name: "Vercel" },
];

const plans = [
    {
        tier: "Tier 1",
        name: "Stra Solo",
        price: "97",
        features: ["AI Coach 24/7 personalizzato", "Check-in settimanali auto", "Dashboard KPI completa", "Log nutrizione & allenamento", "Community privata"],
        featured: false,
    },
    {
        tier: "Tier 2",
        name: "Stra Pro",
        price: "297",
        features: ["Tutto di Stra Solo +", "2 sessioni/mese con coach umano", "Piano 90 giorni personalizzato", "Mastermind privato mensile", "Support prioritario 24h", "Accesso beta nuove feature"],
        featured: true,
    },
    {
        tier: "Tier 3",
        name: "Stra Elite",
        price: "997",
        features: ["Tutto di Stra Pro +", "4 sessioni/mese coach senior", "Accesso diretto al fondatore", "VIP onboarding dedicato", "Garanzia risultati o rimborso", "Mentoring on-demand"],
        featured: false,
    },
];

const testimonials = [
    { initials: "MR", name: "Marco R.", role: "Founder SaaS B2B", stars: "★★★★★", text: "In 3 mesi ho chiuso deal che inseguivo da un anno. L'AI Coach alle 2 di notte mi ha salvato dal panico pre-lancio. Nessun coach tradizionale sarebbe stato disponibile." },
    { initials: "SB", name: "Sara B.", role: "Business Consultant", stars: "★★★★★", text: "Fatturato +40%, ore lavorate -20%. Il sistema di accountability di Stra Coach ti tiene focalizzato quando vuoi mollare tutto. Risultati misurabili, non promesse." },
    { initials: "LP", name: "Luca P.", role: "E-commerce Manager", stars: "★★★★★", text: "Il tracking nutrizionale integrato con il piano allenamento è geniale. Per la prima volta nella mia vita ho dati reali sui miei progressi. Game changer totale." },
];

export default function Home() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleWaitlist = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setTimeout(() => { setSubmitted(true); setLoading(false); }, 800);
    };

    return (
        <>
            {/* NAV */}
            <nav className="nav">
                <div className="nav-inner">
                    <span className="logo">STRA<span>.</span>COACH</span>
                    <ul className="nav-links">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#pricing">Prezzi</a></li>
                        <li><a href="#testimonianze">Risultati</a></li>
                    </ul>
                    <div className="nav-actions">
                        <Link href="/sign-in" className="btn btn-outline btn-sm">Accedi</Link>
                        <Link href="/sign-up" className="btn btn-red btn-sm">Inizia Gratis →</Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero" id="home">
                <div className="hero-grid" />
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-eyebrow">
                            <span className="eyebrow-line" />
                            Coaching d&apos;élite · 2026
                            <span className="eyebrow-line" />
                        </div>
                        <h1>
                            Coaching<br />
                            <span className="gradient-text">Senza</span><br />
                            Compromessi
                        </h1>
                        <p className="hero-sub">
                            La prima piattaforma italiana che unisce coach umani certificati con AI 24/7.
                            KPI reali. Accountability strutturata. Risultati che cambiano la traiettoria della tua vita — garantiti.
                        </p>
                        <div className="hero-cta-row">
                            <Link href="/sign-up" className="btn btn-red btn-lg" id="hero-cta-btn">
                                Inizia Ora — 30 Giorni Gratis →
                            </Link>
                            <Link href="/sign-in" className="btn btn-outline btn-lg">
                                Ho già un account
                            </Link>
                        </div>
                        <div className="hero-social-proof">
                            <div className="proof-avatars">
                                {["MR", "SB", "LP", "AF"].map((i, idx) => (
                                    <div key={idx} className="proof-avatar">{i}</div>
                                ))}
                            </div>
                            <span>+127 professionisti già nel percorso · ⭐ 4.9/5 media NPS</span>
                        </div>
                        <div className="hero-metrics" style={{ marginTop: "2.5rem" }}>
                            <div className="metric-item">
                                <span className="metric-number">3x</span>
                                <span className="metric-label">Risultati Più Veloci</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-number">24/7</span>
                                <span className="metric-label">AI Coach Live</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-number">100%</span>
                                <span className="metric-label">Garanzia Risultati</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOLS STRIP */}
            <div className="tools-strip">
                <p className="tools-label">Stack tecnologico 2026 — Usato dai migliori al mondo</p>
                <div className="tools-row">
                    {tools.map((t, i) => (
                        <div className="tool-pill" key={i}>
                            <span className="tool-icon">{t.icon}</span>
                            {t.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* FEATURES */}
            <section className="section" id="features">
                <div className="container">
                    <span className="section-label">Piattaforma Completa</span>
                    <h2 className="section-title">
                        Tutto quello che ti serve.<br />
                        <span className="silver-text">Niente di superfluo.</span>
                    </h2>
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div className="feature-item" key={i} id={`feature-${i}`}>
                                <div className="feature-icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="section" id="pricing" style={{ background: "var(--iron-900)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
                        <span className="section-label" style={{ justifyContent: "center" }}>Investimento</span>
                        <h2 className="section-title">Scegli il tuo livello</h2>
                        <p className="section-sub" style={{ margin: "0 auto" }}>
                            30 giorni gratis su tutti i piani. Nessuna carta richiesta. Cancelli quando vuoi.
                        </p>
                    </div>
                    <div className="pricing-grid">
                        {plans.map((p, i) => (
                            <div key={i} className={`pricing-card ${p.featured ? "featured" : ""}`} id={`plan-${i}`}>
                                {p.featured && <div className="featured-tag">⚡ Più Scelto</div>}
                                <div className="plan-badge">{p.tier}</div>
                                <div className="plan-name">{p.name}</div>
                                <div className="plan-price">
                                    <span className="price-sym">€</span>
                                    <span className="price-num">{p.price}</span>
                                    <span className="price-per">/mese</span>
                                </div>
                                <div className="plan-divider" />
                                <ul className="plan-features">
                                    {p.features.map((f, fi) => (
                                        <li key={fi}><span className="check">✓</span>{f}</li>
                                    ))}
                                </ul>
                                <Link
                                    href="/sign-up"
                                    className={`btn ${p.featured ? "btn-red" : "btn-outline"}`}
                                    style={{ width: "100%", display: "flex" }}
                                    id={`plan-cta-${i}`}
                                >
                                    Inizia ora →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section" id="testimonianze">
                <div className="container">
                    <span className="section-label">Risultati Reali</span>
                    <h2 className="section-title">
                        Le voci di chi ha già<br />
                        <span className="gradient-text">cambiato traiettoria</span>
                    </h2>
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <div className="testimonial-card" key={i} id={`testimonial-${i}`}>
                                <div className="t-stars">{t.stars}</div>
                                <p className="t-text">&ldquo;{t.text}&rdquo;</p>
                                <div className="t-author">
                                    <div className="t-avatar">{t.initials}</div>
                                    <div>
                                        <div className="t-name">{t.name}</div>
                                        <div className="t-role">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BAND */}
            <div className="cta-band">
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div className="section-label" style={{ justifyContent: "center", marginBottom: "1rem" }}>
                        L&apos;unica scelta giusta
                    </div>
                    <h2 className="section-title" style={{ maxWidth: "600px", margin: "0 auto 1rem" }}>
                        Smettila di rimandare.<br />
                        <span className="gradient-text">Il momento è adesso.</span>
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginBottom: "0.5rem" }}>
                        30 giorni gratis · Nessuna carta di credito · Cancelli quando vuoi
                    </p>
                    {!submitted ? (
                        <form className="waitlist-row" onSubmit={handleWaitlist} style={{ justifyContent: "center" }}>
                            <input
                                id="email-cta"
                                type="email"
                                className="input-iron"
                                placeholder="La tua email..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button id="cta-submit-btn" type="submit" className="btn btn-red" disabled={loading}>
                                {loading ? "..." : "INIZIA GRATIS →"}
                            </button>
                        </form>
                    ) : (
                        <div className="success-toast">✅ Sei dentro! Ti contatteremo a breve. Benvenuto in Stra Coach.</div>
                    )}
                </div>
            </div>

            {/* FOOTER */}
            <footer className="footer">
                <span className="logo" style={{ fontSize: "1rem" }}>STRA<span>.</span>COACH</span>
                <p className="footer-copy">© {new Date().getFullYear()} Stra Coach · Built in Italy 🇮🇹 · All rights reserved</p>
                <div style={{ display: "flex", gap: "1.25rem" }}>
                    <Link href="/sign-in" className="footer-copy" style={{ textDecoration: "none", transition: "color 0.15s" }}>Accedi</Link>
                    <Link href="/sign-up" className="footer-copy" style={{ textDecoration: "none", transition: "color 0.15s" }}>Registrati</Link>
                </div>
            </footer>
        </>
    );
}
