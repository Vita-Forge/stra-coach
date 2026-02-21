"use client";
import { useState } from "react";
import { IconCall, IconCheck } from "@/components/Icons";

const SLOTS = [
    { day: "Lun 24 Feb", times: ["10:00", "14:00", "16:00"] },
    { day: "Mar 25 Feb", times: ["09:00", "11:00", "15:00"] },
    { day: "Mer 26 Feb", times: ["10:00", "13:00", "17:00"] },
];

const COACHES = [
    { name: "Marco Bianchi", role: "Senior Coach · Performance & Business", initials: "MB", specialties: ["Imprenditori", "Leadership", "Focus"] },
    { name: "Sara Conti", role: "Coach · Nutrizione & Benessere", initials: "SC", specialties: ["Nutrizione", "Mindset", "Energia"] },
    { name: "Luca Ferrari", role: "Coach Junior · Atletismo & Sport", initials: "LF", specialties: ["Allenamento", "Recupero", "Sport"] },
];

export default function CallPage() {
    const [selectedCoach, setSelectedCoach] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
    const [booked, setBooked] = useState(false);

    const handleBook = () => {
        if (!selectedSlot) return;
        setBooked(true);
    };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconCall /> Prenota Call Conoscitiva</div>
                <div className="header-actions">
                    <span className="tag tag-green">● Coach Disponibili</span>
                </div>
            </div>

            <div className="dash-content">
                {booked ? (
                    <div style={{
                        textAlign: "center",
                        padding: "4rem 2rem",
                        background: "var(--iron-900)",
                        border: "1px solid rgba(22,163,74,0.3)",
                        borderRadius: "var(--radius-lg)",
                        maxWidth: "500px",
                        margin: "0 auto",
                    }}>
                        <div style={{ fontSize: "3rem", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                            <IconCheck />
                        </div>
                        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                            Call Prenotata!
                        </h2>
                        <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                            {COACHES[selectedCoach].name} — {selectedSlot?.day} alle {selectedSlot?.time}
                        </p>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                            Riceverai una email di conferma con il link Zoom. Prepara 3 domande da fare al tuo coach!
                        </p>
                        <button
                            onClick={() => { setBooked(false); setSelectedSlot(null); }}
                            className="btn btn-ghost"
                            style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "0.85rem", textTransform: "uppercase" }}
                        >
                            Prenota un&apos;altra
                        </button>
                    </div>
                ) : (
                    <div className="grid-2" style={{ alignItems: "start" }}>
                        {/* Left: Info + Coach selection */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div className="card card-red">
                                <div className="page-header" style={{ marginBottom: "0.75rem" }}>
                                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 900, textTransform: "uppercase" }}>
                                        30 Min Gratuiti
                                    </h2>
                                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>
                                        Una call conoscitiva senza impegno per capire il tuo percorso ideale di coaching.
                                    </p>
                                </div>
                                {[
                                    "Analisi della tua situazione attuale",
                                    "Definizione degli obiettivi prioritari",
                                    "Presentazione del percorso personalizzato",
                                    "Q&A libero con il tuo coach",
                                ].map((i, idx) => (
                                    <div key={idx} style={{ display: "flex", gap: "0.6rem", padding: "0.4rem 0", fontSize: "0.85rem", alignItems: "flex-start" }}>
                                        <span style={{ color: "var(--red-500)", fontWeight: 700, flexShrink: 0 }}>→</span>
                                        <span style={{ color: "var(--text-secondary)" }}>{i}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Coach cards */}
                            <div>
                                <div className="section-label" style={{ marginBottom: "0.75rem" }}>Scegli il Coach</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {COACHES.map((c, i) => (
                                        <div
                                            key={i}
                                            id={`coach-${i}`}
                                            onClick={() => setSelectedCoach(i)}
                                            style={{
                                                background: selectedCoach === i ? "rgba(220,38,38,0.06)" : "var(--iron-900)",
                                                border: `1px solid ${selectedCoach === i ? "var(--border-red)" : "var(--border)"}`,
                                                borderRadius: "var(--radius-md)",
                                                padding: "1rem",
                                                cursor: "pointer",
                                                transition: "all 0.15s",
                                                display: "flex",
                                                gap: "0.85rem",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{
                                                width: "40px", height: "40px", borderRadius: "50%",
                                                background: "linear-gradient(135deg, var(--red-700), var(--iron-600))",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", flexShrink: 0,
                                            }}>{c.initials}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{c.name}</div>
                                                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.role}</div>
                                                <div style={{ display: "flex", gap: "0.35rem", marginTop: "0.35rem", flexWrap: "wrap" }}>
                                                    {c.specialties.map(s => (
                                                        <span key={s} className="tag tag-gray" style={{ fontSize: "0.62rem" }}>{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            {selectedCoach === i && <span style={{ color: "var(--red-500)" }}><IconCheck /></span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Calendar slots */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div className="card">
                                <div className="section-label" style={{ marginBottom: "1rem" }}>Seleziona Data e Ora</div>
                                {SLOTS.map((slot, si) => (
                                    <div key={si} style={{ marginBottom: "1.25rem" }}>
                                        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                                            {slot.day}
                                        </div>
                                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                            {slot.times.map(time => {
                                                const isSelected = selectedSlot?.day === slot.day && selectedSlot?.time === time;
                                                return (
                                                    <button
                                                        key={time}
                                                        id={`slot-${si}-${time}`}
                                                        onClick={() => setSelectedSlot({ day: slot.day, time })}
                                                        style={{
                                                            padding: "0.5rem 1rem",
                                                            background: isSelected ? "var(--red-700)" : "var(--iron-800)",
                                                            border: `1px solid ${isSelected ? "var(--red-600)" : "var(--border)"}`,
                                                            borderRadius: "var(--radius-sm)",
                                                            color: isSelected ? "#fff" : "var(--text-secondary)",
                                                            fontFamily: "var(--font-display)",
                                                            fontWeight: 700,
                                                            fontSize: "0.85rem",
                                                            cursor: "pointer",
                                                            transition: "all 0.15s",
                                                            letterSpacing: "0.04em",
                                                        }}
                                                    >
                                                        {time}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {si < SLOTS.length - 1 && <div className="hdivider" />}
                                    </div>
                                ))}
                            </div>

                            {/* Confirm */}
                            <div className="card">
                                <div style={{ marginBottom: "1rem" }}>
                                    <div className="card-title">Riepilogo</div>
                                    <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                                        Coach: <strong style={{ color: "var(--text-primary)" }}>{COACHES[selectedCoach].name}</strong>
                                    </div>
                                    {selectedSlot && (
                                        <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.3rem" }}>
                                            Slot: <strong style={{ color: "var(--red-400)" }}>{selectedSlot.day} — {selectedSlot.time}</strong>
                                        </div>
                                    )}
                                </div>
                                <button
                                    id="book-call-btn"
                                    className="btn btn-red"
                                    disabled={!selectedSlot}
                                    onClick={handleBook}
                                    style={{ width: "100%", opacity: selectedSlot ? 1 : 0.4, cursor: selectedSlot ? "pointer" : "not-allowed" }}
                                >
                                    CONFERMA PRENOTAZIONE →
                                </button>
                                <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
                                    Riceverai conferma via email · Cancellazione gratuita fino a 2h prima
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
