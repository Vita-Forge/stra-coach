"use client";
import { useState, useRef, useEffect } from "react";

type Contact = { id: number; name: string; initials: string; role: string; status: string; unread: number; lastMsg: string; lastTime: string };
type Message = { id: number; from: "staff" | "client"; text: string; time: string };

const CONTACTS: Contact[] = [
    { id: 1, name: "Marco Rossi", initials: "MR", role: "Cliente · Stra Pro", status: "online", unread: 2, lastMsg: "Grazie per il piano, domani inizio!", lastTime: "14:32" },
    { id: 2, name: "Giulia Ferrari", initials: "GF", role: "Cliente · Stra Solo", status: "offline", unread: 3, lastMsg: "Ho saltato gli ultimi due giorni...", lastTime: "Ieri" },
    { id: 3, name: "Alessio Longo", initials: "AL", role: "Cliente · Stra Elite", status: "online", unread: 0, lastMsg: "Fatto! PR nuovo al panca oggi", lastTime: "10:15" },
    { id: 4, name: "Nicola Bianchi", initials: "NB", role: "Cliente · Stra Pro", status: "offline", unread: 0, lastMsg: "Ok perfetto, ci vediamo giovedì", lastTime: "Lun" },
    { id: 5, name: "Chiara Pellegrini", initials: "CP", role: "Cliente · Stra Elite", status: "online", unread: 0, lastMsg: "Mandami il nuovo piano appena puoi", lastTime: "Dom" },
];

const MOCK_HISTORY: Record<number, Message[]> = {
    1: [
        { id: 1, from: "client", text: "Ciao Sara! Ho ricevuto il piano workout.", time: "14:00" },
        { id: 2, from: "staff", text: "Ottimo Marco! Come ti sembra? Hai domande su qualche esercizio?", time: "14:10" },
        { id: 3, from: "client", text: "No è chiaro. Posso sostituire le trazioni con lat machine?", time: "14:25" },
        { id: 4, from: "staff", text: "Sì, puoi usare la lat machine per ora, ma cerca di progredire verso le trazioni vere appena possibile — sono superiori per lo sviluppo della schiena.", time: "14:28" },
        { id: 5, from: "client", text: "Grazie per il piano, domani inizio!", time: "14:32" },
    ],
    2: [
        { id: 1, from: "client", text: "Ciao, ho avuto una settimana difficile...", time: "Ieri 20:00" },
        { id: 2, from: "staff", text: "Capisco Giulia, succede a tutti. Cosa è successo?", time: "Ieri 20:15" },
        { id: 3, from: "client", text: "Ho saltato gli ultimi due giorni...", time: "Ieri 20:20" },
    ],
    3: [
        { id: 1, from: "client", text: "Fatto! PR nuovo al panca oggi", time: "10:15" },
    ],
    4: [
        { id: 1, from: "client", text: "Ok perfetto, ci vediamo giovedì", time: "Lun" },
    ],
    5: [
        { id: 1, from: "client", text: "Mandami il nuovo piano appena puoi", time: "Dom" },
    ],
};

export default function MessaggiPage() {
    const [selected, setSelected] = useState<Contact>(CONTACTS[0]);
    const [history, setHistory] = useState<Record<number, Message[]>>(MOCK_HISTORY);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selected, history]);

    const messages = history[selected.id] ?? [];
    const totalUnread = CONTACTS.reduce((s, c) => s + c.unread, 0);

    const sendMessage = () => {
        if (!input.trim()) return;
        const now = new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
        const newMsg: Message = { id: Date.now(), from: "staff", text: input.trim(), time: now };
        setHistory(h => ({ ...h, [selected.id]: [...(h[selected.id] ?? []), newMsg] }));
        setInput("");
    };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title">
                    Messaggi
                    {totalUnread > 0 && (
                        <span style={{ marginLeft: "0.6rem", background: "var(--red-600)", color: "#fff", borderRadius: "12px", padding: "0.1rem 0.5rem", fontSize: "0.7rem", fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: 0, textTransform: "none" }}>
                            {totalUnread} nuovi
                        </span>
                    )}
                </div>
            </div>

            <div style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden" }}>
                {/* Sidebar contatti */}
                <div style={{ width: "280px", flexShrink: 0, borderRight: "1px solid var(--border)", overflowY: "auto", background: "var(--iron-900)" }}>
                    {CONTACTS.map(c => (
                        <div key={c.id} onClick={() => setSelected(c)}
                            style={{
                                padding: "1rem 1.25rem", cursor: "pointer", display: "flex", gap: "0.85rem", alignItems: "flex-start",
                                borderBottom: "1px solid var(--border)", transition: "background 0.12s",
                                background: selected.id === c.id ? "rgba(220,38,38,0.07)" : "transparent",
                                borderLeft: `2px solid ${selected.id === c.id ? "var(--red-600)" : "transparent"}`,
                            }}>
                            <div style={{ position: "relative", flexShrink: 0 }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,var(--iron-700),var(--iron-500))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.78rem", color: "var(--text-secondary)" }}>{c.initials}</div>
                                {c.status === "online" && <div style={{ position: "absolute", bottom: 0, right: 0, width: "9px", height: "9px", background: "#4ade80", borderRadius: "50%", border: "2px solid var(--iron-900)" }} />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{c.name}</span>
                                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", flexShrink: 0 }}>{c.lastTime}</span>
                                </div>
                                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{c.role}</div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>{c.lastMsg}</span>
                                    {c.unread > 0 && <span style={{ background: "var(--red-600)", color: "#fff", borderRadius: "10px", padding: "0.05rem 0.45rem", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>{c.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    {/* Chat header */}
                    <div style={{ padding: "0.85rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.85rem", background: "var(--iron-900)", flexShrink: 0 }}>
                        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg,var(--iron-700),var(--iron-500))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.75rem", color: "var(--text-secondary)" }}>{selected.initials}</div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{selected.name}</div>
                            <div style={{ fontSize: "0.72rem", color: selected.status === "online" ? "#4ade80" : "var(--text-muted)" }}>
                                {selected.status === "online" ? "● Online" : "● Offline"}
                            </div>
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
                            <button className="btn btn-ghost btn-sm" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.7rem" }}>Piano</button>
                            <button className="btn btn-ghost btn-sm" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.7rem" }}>Profilo</button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{ display: "flex", justifyContent: msg.from === "staff" ? "flex-end" : "flex-start" }}>
                                <div style={{
                                    maxWidth: "72%",
                                    background: msg.from === "staff" ? "var(--red-700)" : "var(--iron-800)",
                                    borderRadius: msg.from === "staff" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                    padding: "0.7rem 1rem",
                                    border: msg.from === "staff" ? "none" : "1px solid var(--border)",
                                }}>
                                    <p style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "#fff" }}>{msg.text}</p>
                                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", marginTop: "0.35rem", textAlign: msg.from === "staff" ? "right" : "left" }}>{msg.time}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem", background: "var(--iron-900)", flexShrink: 0 }}>
                        <input
                            className="form-input"
                            placeholder={`Scrivi a ${selected.name.split(" ")[0]}...`}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                            style={{ flex: 1 }}
                        />
                        <button className="btn btn-red" onClick={sendMessage} disabled={!input.trim()} style={{ flexShrink: 0, opacity: input.trim() ? 1 : 0.5 }}>
                            Invia
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
