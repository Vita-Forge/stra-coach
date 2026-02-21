"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DEMO_USERS } from "@/lib/data";
import { IconProfile, IconCertificate, IconStar, IconEdit, IconUpload, IconCheck } from "@/components/Icons";

type Section = "profilo" | "certificazioni" | "competenze";

export default function ProfiloStaffPage() {
    const { user } = useAuth();
    const [section, setSection] = useState<Section>("profilo");
    const [saved, setSaved] = useState(false);

    // Find full user data from store
    const fullUser = DEMO_USERS.find(u => u.id === user?.id);

    const [bio, setBio] = useState(fullUser?.bio ?? "");
    const [specialty, setSpecialty] = useState(fullUser?.specialty ?? "");
    const [phone, setPhone] = useState(fullUser?.phone ?? "");
    const [instagram, setInstagram] = useState("");
    const [maxClients, setMaxClients] = useState("15");

    const [certs, setCerts] = useState<string[]>(fullUser?.certifications ?? []);
    const [newCert, setNewCert] = useState("");

    const [skills, setSkills] = useState<string[]>(fullUser?.skills ?? []);
    const [newSkill, setNewSkill] = useState("");

    const save = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const addCert = () => {
        if (newCert.trim()) { setCerts(c => [...c, newCert.trim()]); setNewCert(""); }
    };
    const removeCert = (i: number) => setCerts(c => c.filter((_, idx) => idx !== i));
    const addSkill = () => {
        if (newSkill.trim()) { setSkills(s => [...s, newSkill.trim()]); setNewSkill(""); }
    };
    const removeSkill = (i: number) => setSkills(s => s.filter((_, idx) => idx !== i));

    const tabs: { id: Section; label: string; icon: React.ReactNode }[] = [
        { id: "profilo", label: "Profilo", icon: <IconProfile /> },
        { id: "certificazioni", label: "Attestati & Titoli", icon: <IconCertificate /> },
        { id: "competenze", label: "Competenze", icon: <IconStar /> },
    ];

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconProfile />
                    Il mio Profilo
                </div>
                <div className="header-actions">
                    {saved && <span style={{ fontSize: "0.78rem", color: "#4ade80", display: "flex", alignItems: "center", gap: "0.4rem" }}><IconCheck /> Salvato</span>}
                </div>
            </div>

            <div className="dash-content">
                {/* Photo + identity top bar */}
                <div className="card" style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                        <div style={{ position: "relative" }}>
                            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(220,38,38,0.1)", border: "2px solid var(--border-red)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", color: "var(--red-400)" }}>
                                {user?.initials}
                            </div>
                            <button
                                onClick={() => alert("Upload foto — in produzione collegato a storage")}
                                style={{ position: "absolute", bottom: 0, right: 0, width: "22px", height: "22px", borderRadius: "50%", background: "var(--iron-800)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)" }}>
                                <IconUpload />
                            </button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.3rem", textTransform: "uppercase" }}>{user?.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{user?.email}</div>
                            <div style={{ marginTop: "0.4rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                <span className="tag tag-red">{user?.role === "manager" ? "Manager" : "Professionista"}</span>
                                {user?.plan && <span className="tag">{user.plan}</span>}
                            </div>
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", color: "var(--red-400)", lineHeight: 1 }}>
                                {DEMO_USERS.filter(u => u.assignedProfId === user?.id).length}
                            </div>
                            Clienti assegnati
                        </div>
                    </div>
                </div>

                {/* Tab navigation */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", padding: "0.25rem" }}>
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setSection(t.id)}
                            className={`btn btn-sm ${section === t.id ? "btn-red" : "btn-ghost"}`}
                            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem" }}
                        >
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* Profilo */}
                {section === "profilo" && (
                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        <div className="grid-2" style={{ gap: "1rem" }}>
                            <div>
                                <label className="form-label">Specializzazione principale</label>
                                <input className="form-input" value={specialty} onChange={e => setSpecialty(e.target.value)} placeholder="Es. Forza & Condizionamento" />
                            </div>
                            <div>
                                <label className="form-label">Telefono</label>
                                <input className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+39 333 000 0000" />
                            </div>
                            <div>
                                <label className="form-label">Instagram</label>
                                <input className="form-input" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@username" />
                            </div>
                            <div>
                                <label className="form-label">Max clienti gestibili</label>
                                <input className="form-input" type="number" value={maxClients} onChange={e => setMaxClients(e.target.value)} min="1" max="100" />
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Bio professionale</label>
                            <textarea
                                className="form-input"
                                rows={5}
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                placeholder="Descrivi la tua esperienza, approccio e specializzazioni..."
                                style={{ resize: "vertical" }}
                            />
                            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "0.3rem", textAlign: "right" }}>{bio.length}/500 caratteri</div>
                        </div>
                        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={save} className="btn btn-red" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <IconEdit /> Salva Profilo
                            </button>
                        </div>
                    </div>
                )}

                {/* Certificazioni */}
                {section === "certificazioni" && (
                    <div className="card">
                        <div className="card-label" style={{ marginBottom: "1rem" }}>Attestati, Lauree e Certificazioni</div>
                        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                            Le tue certificazioni sono visibili ai clienti assegnati sul loro profilo.
                        </p>

                        {/* Existing certs */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                            {certs.length === 0 && (
                                <div style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                                    Nessuna certificazione aggiunta. Inizia ad aggiungere le tue qualifiche.
                                </div>
                            )}
                            {certs.map((c, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                                    <div style={{ color: "var(--red-400)", flexShrink: 0 }}><IconCertificate /></div>
                                    <div style={{ flex: 1, fontSize: "0.85rem", fontWeight: 500 }}>{c}</div>
                                    <button onClick={() => removeCert(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem" }}>✕</button>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
                            <input
                                className="form-input"
                                value={newCert}
                                onChange={e => setNewCert(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCert(); } }}
                                placeholder="Es. CONI Istruttore Fitness L2, Laurea in Scienze Motorie..."
                                style={{ flex: 1 }}
                            />
                            <button onClick={addCert} className="btn btn-red btn-sm" disabled={!newCert.trim()}>
                                + Aggiungi
                            </button>
                        </div>

                        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <button onClick={() => alert("Upload documento — collegato a storage in produzione")} className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
                                <IconUpload /> Allega documento (PDF)
                            </button>
                            <button onClick={save} className="btn btn-red" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <IconCheck /> Salva
                            </button>
                        </div>
                    </div>
                )}

                {/* Competenze */}
                {section === "competenze" && (
                    <div className="card">
                        <div className="card-label" style={{ marginBottom: "1rem" }}>Competenze e Aree di Specializzazione</div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem", minHeight: "60px", padding: "0.75rem", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                            {skills.length === 0 && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", alignSelf: "center" }}>Aggiungi le tue competenze...</span>}
                            {skills.map((s, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "rgba(220,38,38,0.1)", border: "1px solid var(--border-red)", borderRadius: "20px", padding: "0.3rem 0.75rem", fontSize: "0.75rem" }}>
                                    <span>{s}</span>
                                    <button onClick={() => removeSkill(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--red-400)", fontSize: "0.75rem", lineHeight: 1 }}>✕</button>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
                            <input
                                className="form-input"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                                placeholder="Es. Nutrizione Sportiva, Mental Coaching..."
                                style={{ flex: 1 }}
                            />
                            <button onClick={addSkill} className="btn btn-red btn-sm" disabled={!newSkill.trim()}>
                                + Aggiungi
                            </button>
                        </div>

                        {/* Suggested skills */}
                        <div style={{ marginBottom: "1.25rem" }}>
                            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                                Suggeriti
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                {["Strength Training", "Ipertrofia", "Dimagrimento", "Powerlifting", "CrossFit", "Running", "Calisthenics", "Nutrizione", "Coaching Mentale", "Yoga", "Pilates", "HIIT"].filter(s => !skills.includes(s)).map((s, i) => (
                                    <button key={i}
                                        onClick={() => { setSkills(prev => [...prev, s]); }}
                                        style={{ background: "var(--iron-800)", border: "1px solid var(--border)", borderRadius: "20px", padding: "0.3rem 0.75rem", fontSize: "0.72rem", cursor: "pointer", color: "var(--text-secondary)", transition: "all 0.12s" }}
                                        onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "var(--border-red)"; }}
                                        onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "var(--border)"; }}>
                                        + {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                            <button onClick={save} className="btn btn-red" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <IconCheck /> Salva Competenze
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
