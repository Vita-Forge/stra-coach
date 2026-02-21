"use client";
import { useState } from "react";
import { IconNutrition, IconLightbulb } from "@/components/Icons";

const MACRO_GOALS = { cal: 2100, prot: 175, carb: 200, fat: 65 };
const DAYS = [
    { name: "Lun", done: true }, { name: "Mar", done: true }, { name: "Mer", done: true },
    { name: "Gio", done: false, today: true }, { name: "Ven", done: false }, { name: "Sab", done: false }, { name: "Dom", done: false },
];

const INITIAL_FOODS = [
    { name: "Uova (3) + Avena 80g", time: "08:00", cal: 520, prot: 36, carb: 52, fat: 14 },
    { name: "Pollo 200g + Riso 100g", time: "13:00", cal: 480, prot: 48, carb: 40, fat: 8 },
];

export default function CiboPage() {
    const [foods, setFoods] = useState(INITIAL_FOODS);
    const [showAdd, setShowAdd] = useState(false);
    const [newFood, setNewFood] = useState({ name: "", cal: "", prot: "", carb: "", fat: "" });

    const totals = foods.reduce((acc, f) => ({
        cal: acc.cal + f.cal, prot: acc.prot + f.prot,
        carb: acc.carb + f.carb, fat: acc.fat + f.fat,
    }), { cal: 0, prot: 0, carb: 0, fat: 0 });

    const pct = (val: number, goal: number) => Math.min((val / goal) * 100, 100);

    const addFood = () => {
        if (!newFood.name) return;
        setFoods(p => [...p, {
            name: newFood.name,
            time: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
            cal: Number(newFood.cal) || 0,
            prot: Number(newFood.prot) || 0,
            carb: Number(newFood.carb) || 0,
            fat: Number(newFood.fat) || 0,
        }]);
        setNewFood({ name: "", cal: "", prot: "", carb: "", fat: "" });
        setShowAdd(false);
    };

    const macros = [
        { label: "Calorie", val: totals.cal, goal: MACRO_GOALS.cal, color: "#ef4444", unit: "kcal" },
        { label: "Proteine", val: totals.prot, goal: MACRO_GOALS.prot, color: "#f87171", unit: "g" },
        { label: "Carboidrati", val: totals.carb, goal: MACRO_GOALS.carb, color: "#9ca3af", unit: "g" },
        { label: "Grassi", val: totals.fat, goal: MACRO_GOALS.fat, color: "#6b7280", unit: "g" },
    ];

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconNutrition /> Nutrizione &amp; Macro</div>
                <div className="header-actions">
                    <button id="add-food-btn" className="btn btn-red btn-sm" onClick={() => setShowAdd(true)}>
                        + Aggiungi Pasto
                    </button>
                </div>
            </div>

            <div className="dash-content">
                {/* Week streak */}
                <div className="card" style={{ marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div className="section-label" style={{ margin: 0 }}>Settimana in Corso</div>
                        <span className="tag tag-red">3-day streak</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        {DAYS.map((d, i) => (
                            <div key={i} className={`day-pill ${d.done ? "done" : ""} ${d.today ? "today" : ""}`}>
                                <span className="day-name">{d.name}</span>
                                <span className="day-dot" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid-2" style={{ alignItems: "start" }}>
                    {/* Macros */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        <div className="grid-2" style={{ gap: "0.75rem" }}>
                            {macros.map((m, i) => (
                                <div className="card" key={i} id={`macro-${i}`}>
                                    <div className="card-title">{m.label}</div>
                                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", lineHeight: 1, color: m.color }}>
                                        {m.val}<span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400, marginLeft: "0.2rem" }}>{m.unit}</span>
                                    </div>
                                    <div className="macro-bar">
                                        <div className="macro-fill" style={{ width: `${pct(m.val, m.goal)}%`, background: m.color }} />
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                                        {m.val} / {m.goal} {m.unit}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI Tip */}
                        <div className="card card-red">
                            <div className="section-label" style={{ margin: "0 0 0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><IconLightbulb /> AI Insight</div>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                                Hai raggiunto l&apos;84% del tuo obiettivo proteico. Aggiungi <strong style={{ color: "var(--text-primary)" }}>25g di proteine</strong> nel pasto serale (es. 100g di fiocchi di latte) per chiudere il target.
                            </p>
                        </div>
                    </div>

                    {/* Food log */}
                    <div className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <div className="section-label" style={{ margin: 0 }}>Log di Oggi</div>
                            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "var(--red-400)", fontWeight: 700 }}>
                                {totals.cal} kcal
                            </span>
                        </div>

                        {foods.map((f, i) => (
                            <div className="food-log-item" key={i} id={`food-item-${i}`}>
                                <div>
                                    <div className="food-name">{f.name}</div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                                        {f.time} · P:{f.prot}g C:{f.carb}g F:{f.fat}g
                                    </div>
                                </div>
                                <div className="food-cals">{f.cal}</div>
                            </div>
                        ))}

                        {/* Add food form */}
                        {showAdd && (
                            <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--iron-800)", borderRadius: "var(--radius-sm)" }}>
                                <div className="help-form">
                                    <div>
                                        <label className="form-label">Nome pasto</label>
                                        <input className="form-input" placeholder="es. Pasta con tonno 150g" value={newFood.name}
                                            onChange={e => setNewFood(p => ({ ...p, name: e.target.value }))} id="food-name-input" />
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.5rem" }}>
                                        {["cal", "prot", "carb", "fat"].map(k => (
                                            <div key={k}>
                                                <label className="form-label">{k === "cal" ? "Kcal" : k === "prot" ? "Prot (g)" : k === "carb" ? "Carb (g)" : "Grassi (g)"}</label>
                                                <input className="form-input" type="number" placeholder="0"
                                                    value={newFood[k as keyof typeof newFood]}
                                                    onChange={e => setNewFood(p => ({ ...p, [k]: e.target.value }))} id={`food-${k}-input`} />
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <button id="save-food-btn" className="btn btn-red btn-sm" onClick={addFood} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Salva</button>
                                        <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)} style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Annulla</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
