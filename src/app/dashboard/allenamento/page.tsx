"use client";
import { useState } from "react";

const WEEKLY_PLAN = [
    { day: "Lun", name: "Push Day — Petto & Spalle", done: true, exercises: 6 },
    { day: "Mar", name: "Cardio + Core", done: true, exercises: 4 },
    { day: "Mer", name: "Pull Day — Schiena & Bicipiti", done: true, exercises: 6 },
    { day: "Gio", name: "Push Day — Tricipiti & Spalle", today: true, exercises: 5 },
    { day: "Ven", name: "Leg Day — Quadricipiti & Glutei", done: false, exercises: 6 },
    { day: "Sab", name: "Full Body HIIT", done: false, exercises: 4 },
    { day: "Dom", name: "Riposo Attivo — Yoga + Stretching", done: false, exercises: 3 },
];

const TODAY_EXERCISES = [
    { name: "Shoulder Press (Manubri)", sets: 4, reps: "10-12", weight: "20 kg", done: true },
    { name: "Lateral Raise", sets: 3, reps: "15", weight: "8 kg", done: true },
    { name: "Tri Pushdown (Cavo)", sets: 4, reps: "12", weight: "30 kg", done: false },
    { name: "Overhead Extension", sets: 3, reps: "10", weight: "15 kg", done: false },
    { name: "Dips", sets: 3, reps: "MAX", weight: "Corpo", done: false },
];

export default function AllenamentoPage() {
    const [exercises, setExercises] = useState(TODAY_EXERCISES);
    const [showLog, setShowLog] = useState(false);

    const toggleEx = (i: number) => {
        setExercises(prev => prev.map((e, idx) => idx === i ? { ...e, done: !e.done } : e));
    };

    const completedCount = exercises.filter(e => e.done).length;

    return (
        <>
            <div className="dash-header">
                <div className="dash-title">💪 Piano Allenamento</div>
                <div className="header-actions">
                    <button id="log-session-btn" className="btn btn-red btn-sm" onClick={() => setShowLog(!showLog)}>
                        {showLog ? "↑ Nascondi" : "📝 Log Sessione"}
                    </button>
                </div>
            </div>

            <div className="dash-content">
                <div className="grid-2" style={{ alignItems: "start" }}>
                    {/* Weekly plan */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        <div className="card">
                            <div className="section-label" style={{ marginBottom: "1rem" }}>Piano Settimanale</div>
                            {WEEKLY_PLAN.map((d, i) => (
                                <div
                                    key={i}
                                    id={`day-plan-${i}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.85rem",
                                        padding: "0.85rem 0",
                                        borderBottom: i < WEEKLY_PLAN.length - 1 ? "1px solid var(--border)" : "none",
                                        opacity: d.done ? 0.55 : 1,
                                    }}
                                >
                                    <div className={`day-pill ${d.done ? "done" : ""} ${d.today ? "today" : ""}`} style={{ flexShrink: 0 }}>
                                        <span className="day-name">{d.day}</span>
                                        <span className="day-dot" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: "0.85rem", color: d.today ? "var(--red-400)" : "var(--text-primary)" }}>
                                            {d.today && "→ "}{d.name}
                                        </div>
                                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{d.exercises} esercizi</div>
                                    </div>
                                    {d.done && <span style={{ fontSize: "0.8rem", color: "#4ade80" }}>✅</span>}
                                    {d.today && <span className="tag tag-red">Oggi</span>}
                                </div>
                            ))}
                        </div>

                        {/* Progress */}
                        <div className="card card-red">
                            <div className="section-label" style={{ margin: "0 0 0.75rem" }}>📊 Progressione</div>
                            {[
                                { label: "Volume Settimanale", val: 85 },
                                { label: "Intensità Media", val: 72 },
                                { label: "Consistenza (4 sett.)", val: 91 },
                            ].map((s, i) => (
                                <div key={i} style={{ marginBottom: "0.8rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                                        <span>{s.label}</span>
                                        <span style={{ color: "var(--red-400)", fontWeight: 700 }}>{s.val}%</span>
                                    </div>
                                    <div className="macro-bar">
                                        <div className="macro-fill" style={{ width: `${s.val}%`, background: "var(--red-600)" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Today's session */}
                    <div className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <div>
                                <div className="section-label" style={{ margin: 0 }}>Sessione di Oggi</div>
                                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800, textTransform: "uppercase", marginTop: "0.3rem" }}>
                                    Push Day — Tricipiti & Spalle
                                </div>
                            </div>
                            <span className="tag tag-red">{completedCount}/{exercises.length}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="macro-bar" style={{ marginBottom: "1.25rem" }}>
                            <div className="macro-fill" style={{ width: `${(completedCount / exercises.length) * 100}%`, background: "var(--red-600)" }} />
                        </div>

                        {/* Exercises */}
                        <div style={{ borderTop: "1px solid var(--border)" }}>
                            {exercises.map((ex, i) => (
                                <div key={i} id={`exercise-${i}`} className="exercise-row" style={{ opacity: ex.done ? 0.55 : 1 }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "0.88rem", textDecoration: ex.done ? "line-through" : "none", color: ex.done ? "var(--text-muted)" : "var(--text-primary)" }}>
                                            {ex.name}
                                        </div>
                                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
                                            {ex.sets} serie × {ex.reps}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{ex.weight}</span>
                                    <span style={{ fontSize: "0.78rem", color: "var(--silver-400)" }}>{ex.sets}×{ex.reps}</span>
                                    <button
                                        onClick={() => toggleEx(i)}
                                        style={{
                                            width: "28px", height: "28px",
                                            borderRadius: "50%",
                                            border: `2px solid ${ex.done ? "#4ade80" : "var(--border)"}`,
                                            background: ex.done ? "rgba(22,163,74,0.1)" : "var(--iron-800)",
                                            color: ex.done ? "#4ade80" : "var(--text-muted)",
                                            cursor: "pointer",
                                            fontSize: "0.8rem",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        {ex.done ? "✓" : "○"}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {completedCount === exercises.length && (
                            <div style={{ marginTop: "1rem", textAlign: "center", padding: "0.75rem", background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.3)", borderRadius: "var(--radius-sm)" }}>
                                <span style={{ color: "#4ade80", fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase" }}>
                                    🏆 Sessione Completata!
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
