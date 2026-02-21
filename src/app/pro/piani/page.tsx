"use client";
import { useState } from "react";

type Macro = { kcal: number; prot: number; carb: number; fat: number };
type Exercise = { name: string; sets: string; reps: string; rest: string; note: string };
type DayPlan = { day: string; focus: string; exercises: Exercise[] };
type Plan = {
    id: number; clientName: string; clientInitials: string; type: "alimentare" | "workout";
    title: string; createdAt: string; status: "bozza" | "attivo" | "archiviato";
    macro?: Macro; days?: DayPlan[]; note: string;
};

const CLIENTS_LIST = ["Marco Rossi", "Alessio Longo", "Giulia Ferrari", "Nicola Bianchi", "Chiara Pellegrini"];

const INITIAL_PLANS: Plan[] = [
    {
        id: 1, clientName: "Marco Rossi", clientInitials: "MR", type: "alimentare",
        title: "Bulk Invernale — 3200 kcal", createdAt: "15 Feb 2026", status: "attivo",
        macro: { kcal: 3200, prot: 180, carb: 380, fat: 95 }, note: "Aumentare gradualmente carb post-workout",
    },
    {
        id: 2, clientName: "Marco Rossi", clientInitials: "MR", type: "workout",
        title: "Push Pull Legs 6gg", createdAt: "15 Feb 2026", status: "attivo",
        days: [
            {
                day: "Lunedì", focus: "Push — Petto/Spalle/Tricipiti", exercises: [
                    { name: "Panca Piana", sets: "4", reps: "6-8", rest: "2 min", note: "" },
                    { name: "Military Press", sets: "4", reps: "8-10", rest: "90s", note: "" },
                    { name: "Dip alle parallele", sets: "3", reps: "10", rest: "90s", note: "Con zavorra se possibile" },
                ]
            },
            {
                day: "Martedì", focus: "Pull — Schiena/Bicipiti", exercises: [
                    { name: "Trazioni", sets: "4", reps: "6-8", rest: "2 min", note: "" },
                    { name: "Rematore bilanciere", sets: "4", reps: "8-10", rest: "90s", note: "" },
                ]
            },
            {
                day: "Mercoledì", focus: "Legs — Quadricipiti/Femorali/Glutei", exercises: [
                    { name: "Squat", sets: "4", reps: "6-8", rest: "2.5 min", note: "Focus profondità" },
                    { name: "Leg Press", sets: "3", reps: "12-15", rest: "90s", note: "" },
                ]
            },
        ],
        note: "Aumentare il peso ogni 2 settimane se form corretto",
    },
    {
        id: 3, clientName: "Giulia Ferrari", clientInitials: "GF", type: "alimentare",
        title: "Deficit Controllato — 1600 kcal", createdAt: "10 Feb 2026", status: "attivo",
        macro: { kcal: 1600, prot: 140, carb: 150, fat: 50 }, note: "Mantenere proteine alte per preservare massa",
    },
];

const EMPTY_MACRO: Macro = { kcal: 2000, prot: 150, carb: 220, fat: 65 };
const EMPTY_EXERCISE: Exercise = { name: "", sets: "3", reps: "10", rest: "90s", note: "" };
const EMPTY_DAY: DayPlan = { day: "", focus: "", exercises: [{ ...EMPTY_EXERCISE }] };

function PlanCard({ plan, onView }: { plan: Plan; onView: () => void }) {
    const statusColors: Record<string, string> = { attivo: "#4ade80", bozza: "#f59e0b", archiviato: "#6b7280" };
    return (
        <div className="card" style={{ cursor: "pointer", transition: "border-color 0.15s" }}
            onClick={onView}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-red)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,var(--iron-700),var(--iron-500))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.72rem", color: "var(--text-secondary)", flexShrink: 0 }}>{plan.clientInitials}</div>
                    <div>
                        <div style={{ fontSize: "0.78rem", fontWeight: 600 }}>{plan.clientName}</div>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                            {plan.type === "alimentare" ? "Piano Alimentare" : "Piano Workout"}
                        </div>
                    </div>
                </div>
                <span style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: statusColors[plan.status] }}>● {plan.status}</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>{plan.title}</div>
            {plan.type === "alimentare" && plan.macro && (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {[
                        { l: "Kcal", v: plan.macro.kcal },
                        { l: "Prot", v: `${plan.macro.prot}g` },
                        { l: "Carb", v: `${plan.macro.carb}g` },
                        { l: "Fats", v: `${plan.macro.fat}g` },
                    ].map((m, i) => (
                        <div key={i} style={{ background: "var(--iron-800)", borderRadius: "4px", padding: "0.2rem 0.55rem", fontSize: "0.72rem" }}>
                            <span style={{ color: "var(--text-muted)" }}>{m.l} </span>
                            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{m.v}</span>
                        </div>
                    ))}
                </div>
            )}
            {plan.type === "workout" && plan.days && (
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {plan.days.length} giorni · {plan.days.reduce((s, d) => s + d.exercises.length, 0)} esercizi
                </div>
            )}
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>Creato {plan.createdAt}</div>
        </div>
    );
}

function NewPlanModal({ onClose, onSave }: { onClose: () => void; onSave: (p: Plan) => void }) {
    const [type, setType] = useState<"alimentare" | "workout">("alimentare");
    const [clientName, setClientName] = useState(CLIENTS_LIST[0]);
    const [title, setTitle] = useState("");
    const [macro, setMacro] = useState<Macro>({ ...EMPTY_MACRO });
    const [days, setDays] = useState<DayPlan[]>([{ ...EMPTY_DAY, exercises: [{ ...EMPTY_EXERCISE }] }]);
    const [note, setNote] = useState("");

    const handleSave = () => {
        if (!title.trim()) return;
        const clientInitials = clientName.split(" ").map(p => p[0]).join("").toUpperCase().slice(0, 2);
        onSave({ id: Date.now(), clientName, clientInitials, type, title, createdAt: new Date().toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" }), status: "bozza", macro: type === "alimentare" ? macro : undefined, days: type === "workout" ? days : undefined, note });
        onClose();
    };

    const addDay = () => setDays(d => [...d, { ...EMPTY_DAY, exercises: [{ ...EMPTY_EXERCISE }] }]);
    const addExercise = (di: number) => setDays(d => d.map((day, i) => i === di ? { ...day, exercises: [...day.exercises, { ...EMPTY_EXERCISE }] } : day));
    const updateExercise = (di: number, ei: number, key: keyof Exercise, value: string) =>
        setDays(d => d.map((day, i) => i === di ? { ...day, exercises: day.exercises.map((ex, j) => j === ei ? { ...ex, [key]: value } : ex) } : day));

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem 1.5rem", overflowY: "auto" }}>
            <div style={{ background: "var(--iron-900)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: "680px", marginTop: "1rem" }}>
                <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", textTransform: "uppercase" }}>Nuovo Piano</h2>
                    <button onClick={onClose} className="icon-btn" style={{ fontSize: "1.2rem" }}>✕</button>
                </div>

                <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="grid-2" style={{ gap: "1rem" }}>
                        <div>
                            <label className="form-label">Cliente</label>
                            <select className="form-input" value={clientName} onChange={e => setClientName(e.target.value)}>
                                {CLIENTS_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Tipo piano</label>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                {(["alimentare", "workout"] as const).map(t => (
                                    <button key={t} onClick={() => setType(t)} style={{
                                        flex: 1, padding: "0.6rem", background: type === t ? "var(--red-700)" : "var(--iron-800)",
                                        border: `1px solid ${type === t ? "var(--red-600)" : "var(--border)"}`,
                                        borderRadius: "var(--radius-sm)", color: type === t ? "#fff" : "var(--text-muted)",
                                        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase",
                                        cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.05em",
                                    }}>{t}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Titolo del piano</label>
                        <input className="form-input" placeholder={type === "alimentare" ? "es. Bulk Invernale — 3000 kcal" : "es. Push Pull Legs 5gg"} value={title} onChange={e => setTitle(e.target.value)} />
                    </div>

                    {type === "alimentare" && (
                        <div>
                            <label className="form-label" style={{ marginBottom: "0.75rem" }}>Macro target</label>
                            <div className="grid-4" style={{ gap: "0.75rem" }}>
                                {([["kcal", "Calorie"], ["prot", "Proteine (g)"], ["carb", "Carb (g)"], ["fat", "Grassi (g)"]] as const).map(([key, label]) => (
                                    <div key={key}>
                                        <label style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.3rem" }}>{label}</label>
                                        <input className="form-input" type="number" value={macro[key as keyof Macro]}
                                            onChange={e => setMacro(m => ({ ...m, [key]: Number(e.target.value) }))}
                                            style={{ padding: "0.5rem 0.75rem" }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {type === "workout" && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                                <label className="form-label" style={{ margin: 0 }}>Giorni di allenamento</label>
                                <button onClick={addDay} className="btn btn-ghost btn-sm" style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", textTransform: "uppercase" }}>+ Giorno</button>
                            </div>
                            {days.map((day, di) => (
                                <div key={di} style={{ background: "var(--iron-850)", borderRadius: "var(--radius-sm)", padding: "1rem", marginBottom: "0.75rem" }}>
                                    <div className="grid-2" style={{ gap: "0.75rem", marginBottom: "0.75rem" }}>
                                        <input className="form-input" placeholder="Giorno (es. Lunedì)" value={day.day} style={{ padding: "0.45rem 0.75rem" }}
                                            onChange={e => setDays(d => d.map((dd, i) => i === di ? { ...dd, day: e.target.value } : dd))} />
                                        <input className="form-input" placeholder="Focus (es. Push — Petto)" value={day.focus} style={{ padding: "0.45rem 0.75rem" }}
                                            onChange={e => setDays(d => d.map((dd, i) => i === di ? { ...dd, focus: e.target.value } : dd))} />
                                    </div>
                                    {day.exercises.map((ex, ei) => (
                                        <div key={ei} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                                            <input className="form-input" placeholder="Esercizio" value={ex.name} style={{ flex: 2, minWidth: "140px", padding: "0.4rem 0.6rem", fontSize: "0.82rem" }}
                                                onChange={e => updateExercise(di, ei, "name", e.target.value)} />
                                            <input className="form-input" placeholder="Serie" value={ex.sets} style={{ flex: 0.5, minWidth: "55px", padding: "0.4rem 0.6rem", fontSize: "0.82rem" }}
                                                onChange={e => updateExercise(di, ei, "sets", e.target.value)} />
                                            <input className="form-input" placeholder="Reps" value={ex.reps} style={{ flex: 0.7, minWidth: "65px", padding: "0.4rem 0.6rem", fontSize: "0.82rem" }}
                                                onChange={e => updateExercise(di, ei, "reps", e.target.value)} />
                                            <input className="form-input" placeholder="Riposo" value={ex.rest} style={{ flex: 0.7, minWidth: "60px", padding: "0.4rem 0.6rem", fontSize: "0.82rem" }}
                                                onChange={e => updateExercise(di, ei, "rest", e.target.value)} />
                                        </div>
                                    ))}
                                    <button onClick={() => addExercise(di)} style={{ fontSize: "0.72rem", color: "var(--red-400)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Esercizio</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div>
                        <label className="form-label">Note per il cliente</label>
                        <textarea className="form-input" rows={2} placeholder="Indicazioni generali, avvertenze, progressioni..." value={note}
                            onChange={e => setNote(e.target.value)} style={{ resize: "vertical", fontFamily: "var(--font-body)" }} />
                    </div>
                </div>

                <div style={{ padding: "1.25rem 1.75rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                    <button className="btn btn-ghost" onClick={onClose}>Annulla</button>
                    <button className="btn btn-red" onClick={handleSave} disabled={!title.trim()} style={{ opacity: title.trim() ? 1 : 0.5 }}>Crea Piano</button>
                </div>
            </div>
        </div>
    );
}

function ViewPlanModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem 1.5rem", overflowY: "auto" }}>
            <div style={{ background: "var(--iron-900)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", width: "100%", maxWidth: "620px", marginTop: "1rem" }}>
                <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: "0.65rem", color: "var(--red-400)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.2rem" }}>
                            {plan.type === "alimentare" ? "Piano Alimentare" : "Piano Workout"} · {plan.clientName}
                        </div>
                        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", textTransform: "uppercase" }}>{plan.title}</h2>
                    </div>
                    <button onClick={onClose} className="icon-btn" style={{ fontSize: "1.2rem" }}>✕</button>
                </div>

                <div style={{ padding: "1.5rem 1.75rem" }}>
                    {plan.type === "alimentare" && plan.macro && (
                        <>
                            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                                {[
                                    { label: "Calorie", value: plan.macro.kcal, unit: "kcal", color: "var(--red-400)" },
                                    { label: "Proteine", value: plan.macro.prot, unit: "g", color: "#4ade80" },
                                    { label: "Carboidrati", value: plan.macro.carb, unit: "g", color: "#60a5fa" },
                                    { label: "Grassi", value: plan.macro.fat, unit: "g", color: "#fbbf24" },
                                ].map((m, i) => (
                                    <div key={i} style={{ flex: 1, minWidth: "80px", background: "var(--iron-850)", borderRadius: "var(--radius-sm)", padding: "1rem", textAlign: "center" }}>
                                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", color: m.color, lineHeight: 1 }}>{m.value}</div>
                                        <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.25rem" }}>{m.unit} {m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {plan.type === "workout" && plan.days && plan.days.map((d, di) => (
                        <div key={di} style={{ marginBottom: "1.25rem" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--red-400)", marginBottom: "0.5rem" }}>
                                {d.day} — {d.focus}
                            </div>
                            <div style={{ background: "var(--iron-850)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                            {["Esercizio", "Serie", "Reps", "Riposo"].map(h => (
                                                <th key={h} style={{ padding: "0.5rem 0.85rem", textAlign: "left", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {d.exercises.map((ex, ei) => (
                                            <tr key={ei} style={{ borderBottom: ei < d.exercises.length - 1 ? "1px solid var(--border)" : "none" }}>
                                                <td style={{ padding: "0.6rem 0.85rem", fontSize: "0.84rem", fontWeight: 500 }}>{ex.name}</td>
                                                <td style={{ padding: "0.6rem 0.85rem", fontSize: "0.84rem", fontFamily: "var(--font-display)", fontWeight: 700 }}>{ex.sets}</td>
                                                <td style={{ padding: "0.6rem 0.85rem", fontSize: "0.84rem" }}>{ex.reps}</td>
                                                <td style={{ padding: "0.6rem 0.85rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>{ex.rest}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {d.exercises.some(e => e.note) && <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.4rem", fontStyle: "italic" }}>{d.exercises.find(e => e.note)?.note}</p>}
                        </div>
                    ))}

                    {plan.note && (
                        <div style={{ background: "rgba(220,38,38,0.06)", border: "1px solid var(--border-red)", borderRadius: "var(--radius-sm)", padding: "0.85rem", marginTop: "0.5rem" }}>
                            <div style={{ fontSize: "0.65rem", color: "var(--red-400)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.35rem" }}>Note</div>
                            <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>{plan.note}</p>
                        </div>
                    )}
                </div>

                <div style={{ padding: "1rem 1.75rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.6rem", justifyContent: "flex-end" }}>
                    <button className="btn btn-ghost btn-sm" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.75rem" }}>Duplica</button>
                    <button className="btn btn-ghost btn-sm" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.75rem" }}>Invia al Cliente</button>
                    <button className="btn btn-red btn-sm" onClick={onClose} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.75rem" }}>Chiudi</button>
                </div>
            </div>
        </div>
    );
}

export default function PianiPage() {
    const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
    const [showNewModal, setShowNewModal] = useState(false);
    const [viewPlan, setViewPlan] = useState<Plan | null>(null);
    const [filterClient, setFilterClient] = useState("tutti");
    const [filterType, setFilterType] = useState("tutti");

    const filtered = plans.filter(p => {
        const matchClient = filterClient === "tutti" || p.clientName === filterClient;
        const matchType = filterType === "tutti" || p.type === filterType;
        return matchClient && matchType;
    });

    return (
        <>
            {showNewModal && <NewPlanModal onClose={() => setShowNewModal(false)} onSave={p => setPlans(prev => [p, ...prev])} />}
            {viewPlan && <ViewPlanModal plan={viewPlan} onClose={() => setViewPlan(null)} />}

            <div className="dash-header">
                <div className="dash-title">Piani & Programmi</div>
                <div className="header-actions">
                    <button className="btn btn-red btn-sm" onClick={() => setShowNewModal(true)}>+ Nuovo Piano</button>
                </div>
            </div>

            <div className="dash-content">
                {/* Filtri */}
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                    <select className="form-input" value={filterClient} onChange={e => setFilterClient(e.target.value)} style={{ maxWidth: "200px", padding: "0.4rem 0.75rem" }}>
                        <option value="tutti">Tutti i clienti</option>
                        {CLIENTS_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {["tutti", "alimentare", "workout"].map(t => (
                        <button key={t} onClick={() => setFilterType(t)} style={{
                            padding: "0.4rem 0.85rem", background: filterType === t ? "var(--red-700)" : "var(--iron-800)",
                            border: `1px solid ${filterType === t ? "var(--red-600)" : "var(--border)"}`,
                            borderRadius: "var(--radius-sm)", color: filterType === t ? "#fff" : "var(--text-muted)",
                            fontSize: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s",
                        }}>{t}</button>
                    ))}
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: "auto" }}>{filtered.length} piani</span>
                </div>

                {/* Grid piani */}
                {filtered.length === 0 ? (
                    <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Nessun piano trovato. <button onClick={() => setShowNewModal(true)} style={{ color: "var(--red-400)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Crea il primo →</button></p>
                    </div>
                ) : (
                    <div className="grid-3" style={{ gap: "1rem" }}>
                        {filtered.map(plan => <PlanCard key={plan.id} plan={plan} onView={() => setViewPlan(plan)} />)}
                    </div>
                )}
            </div>
        </>
    );
}
