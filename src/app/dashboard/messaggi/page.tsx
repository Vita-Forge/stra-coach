"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { getClientsByProfId, getMessagesBetween, DEMO_USERS, type Message } from "@/lib/data";
import { IconMessages, IconProfile } from "@/components/Icons";

export default function MessaggiPage() {
    const { user } = useAuth();

    // Get contacts based on role
    const contacts = user ? (
        user.role === "utente"
            ? DEMO_USERS.filter(u => u.id === user.assignedProfId)
            : getClientsByProfId(user.id).concat(
                DEMO_USERS.filter(u => ["manager", "admin"].includes(u.role) && u.id !== user.id)
            )
    ) : [];

    const [selected, setSelected] = useState(contacts[0] ?? null);
    const [msgMap, setMsgMap] = useState<Record<string, Message[]>>(() => {
        const init: Record<string, Message[]> = {};
        if (user) {
            contacts.forEach(c => {
                init[c.id] = getMessagesBetween(user.id, c.id);
            });
        }
        return init;
    });
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [selected, msgMap]);

    const messages = selected ? (msgMap[selected.id] ?? []) : [];
    const unread = (cid: string) => (msgMap[cid] ?? []).filter(m => m.toId === user?.id && !m.read).length;

    const send = () => {
        if (!input.trim() || !selected || !user) return;
        const msg: Message = {
            id: Date.now().toString(),
            fromId: user.id, fromName: user.name,
            toId: selected.id, toName: selected.name,
            text: input.trim(),
            time: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
            read: false,
        };
        setMsgMap(m => ({ ...m, [selected.id]: [...(m[selected.id] ?? []), msg] }));
        setInput("");
    };

    return (
        <>
            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconMessages />
                    Messaggi
                </div>
            </div>

            <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 80px)" }}>
                {/* Contact list */}
                <div style={{ width: "220px", flexShrink: 0, borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <div style={{ padding: "0.75rem", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)" }}>
                        Conversazioni
                    </div>
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {contacts.map(c => {
                            const u = unread(c.id);
                            const last = (msgMap[c.id] ?? []).at(-1);
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => setSelected(c)}
                                    style={{ width: "100%", padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: "0.65rem", background: selected?.id === c.id ? "var(--iron-850)" : "none", border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer", textAlign: "left", transition: "background 0.12s" }}
                                >
                                    <div style={{ position: "relative", flexShrink: 0 }}>
                                        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--iron-700)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                                            {c.initials}
                                        </div>
                                        <div style={{ position: "absolute", bottom: "0", right: "0", width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", border: "1.5px solid var(--iron-900)" }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: "0.78rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                                        {last && <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "0.1rem" }}>{last.text}</div>}
                                    </div>
                                    {u > 0 && (
                                        <div style={{ background: "var(--red-600)", color: "white", fontSize: "0.6rem", fontWeight: 800, borderRadius: "10px", padding: "0.1rem 0.4rem", flexShrink: 0 }}>{u}</div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Chat area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    {selected ? (
                        <>
                            {/* Header */}
                            <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--iron-900)" }}>
                                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--iron-700)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.7rem" }}>
                                    {selected.initials}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{selected.name}</div>
                                    <div style={{ fontSize: "0.65rem", color: "#4ade80" }}>● Online</div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                                {messages.length === 0 && (
                                    <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "2rem" }}>
                                        Nessun messaggio ancora. Inizia la conversazione!
                                    </div>
                                )}
                                {messages.map(m => {
                                    const isMe = m.fromId === user?.id;
                                    return (
                                        <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start", gap: "0.2rem" }}>
                                            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{m.fromName} · {m.time}</div>
                                            <div style={{ maxWidth: "70%", padding: "0.65rem 1rem", borderRadius: isMe ? "16px 4px 16px 16px" : "4px 16px 16px 16px", background: isMe ? "var(--red-700)" : "var(--iron-800)", fontSize: "0.82rem", lineHeight: 1.5 }}>
                                                {m.text}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={bottomRef} />
                            </div>

                            {/* Input */}
                            <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.75rem" }}>
                                <input
                                    style={{ flex: 1, background: "var(--iron-850)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.65rem 1rem", color: "var(--text-primary)", fontSize: "0.85rem", fontFamily: "var(--font-body)", outline: "none" }}
                                    placeholder={`Scrivi a ${selected.name}...`}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === "Enter") send(); }}
                                />
                                <button onClick={send} disabled={!input.trim()} className="btn btn-red btn-sm">Invia →</button>
                            </div>
                        </>
                    ) : (
                        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ marginBottom: "0.5rem" }}><IconProfile /></div>
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Seleziona una conversazione</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
