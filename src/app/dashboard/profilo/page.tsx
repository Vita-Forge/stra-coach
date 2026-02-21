"use client";
import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/lib/data";
import { IconProfile, IconMail, IconPhone, IconEdit, IconStar } from "@/components/Icons";

export default function ProfiloPage() {
    const { user } = useAuth();
    const prof = user?.assignedProfId ? getUserById(user.assignedProfId) : null;

    const fields = [
        { label: "Nome completo", value: user?.name ?? "—" },
        { label: "Email", value: user?.email ?? "—" },
        { label: "Telefono", value: user?.phone ?? "Non inserito" },
        { label: "Data di nascita", value: user?.birthday ?? "Non inserita" },
        { label: "Indirizzo", value: user?.address ?? "Non inserito" },
        { label: "Codice Fiscale", value: user?.cf ?? "Non inserito" },
        { label: "Obiettivo", value: user?.goal ?? "Non definito" },
        { label: "Pacchetto", value: user?.plan ?? "—" },
        { label: "Iscritto dal", value: user?.joinDate ?? "—" },
    ];

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconProfile />
                    Profilo
                </div>
                <div className="header-actions">
                    <button className="btn btn-ghost btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <IconEdit /> Modifica
                    </button>
                </div>
            </div>

            <div className="dash-content">
                <div className="grid-2" style={{ gap: "1.5rem", alignItems: "start" }}>
                    {/* Anagrafica */}
                    <div>
                        <div className="card" style={{ marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--iron-700)", border: "2px solid var(--border-red)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 900 }}>
                                    {user?.initials}
                                </div>
                                <div>
                                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", textTransform: "uppercase" }}>{user?.name}</div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{user?.email}</div>
                                    <div style={{ marginTop: "0.4rem" }}>
                                        <span className="tag tag-red">{user?.plan}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                                {fields.map(f => (
                                    <div key={f.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500, minWidth: "130px" }}>{f.label}</span>
                                        <span style={{ fontSize: "0.82rem", color: f.value === "Non inserito" || f.value === "Non definito" || f.value === "Non inserita" ? "var(--iron-500)" : "var(--text-primary)", textAlign: "right", fontStyle: f.value.startsWith("Non") ? "italic" : "normal" }}>
                                            {f.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Coach assegnato + Obiettivi */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        {/* Il tuo Coach */}
                        {prof && (
                            <div className="card">
                                <div className="card-label" style={{ marginBottom: "1rem" }}>Il tuo Coach</div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(220,38,38,0.1)", border: "1.5px solid var(--border-red)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1rem", color: "var(--red-400)", flexShrink: 0 }}>
                                        {prof.initials}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{prof.name}</div>
                                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{prof.specialty}</div>
                                    </div>
                                </div>
                                {prof.bio && (
                                    <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1rem" }}>
                                        {prof.bio}
                                    </p>
                                )}
                                {prof.certifications && prof.certifications.length > 0 && (
                                    <div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Certificazioni</div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                            {prof.certifications.map((c, i) => (
                                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem" }}>
                                                    <span style={{ color: "var(--red-400)" }}><IconStar /></span>
                                                    <span style={{ color: "var(--text-secondary)" }}>{c}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                                    <a href="/dashboard/messaggi" className="btn btn-ghost btn-sm" style={{ flex: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                                        <IconMail /> Scrivi
                                    </a>
                                    <a href="/dashboard/call" className="btn btn-red btn-sm" style={{ flex: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                                        <IconPhone /> Prenota Call
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* KPI rapidi */}
                        <div className="card">
                            <div className="card-label" style={{ marginBottom: "1rem" }}>Il tuo percorso</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                                {[
                                    { label: "Allenamenti", value: "24", sub: "questo mese" },
                                    { label: "Streak", value: "8", sub: "giorni consecutivi" },
                                    { label: "Progressi", value: "92%", sub: "obiettivi raggiunti" },
                                    { label: "Check-in", value: "12", sub: "totali" },
                                ].map(k => (
                                    <div key={k.label} style={{ background: "var(--iron-850)", borderRadius: "var(--radius-sm)", padding: "0.85rem" }}>
                                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.5rem", color: "var(--red-400)" }}>{k.value}</div>
                                        <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{k.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
