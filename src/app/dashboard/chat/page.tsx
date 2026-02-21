"use client";
import { useState, useRef, useEffect } from "react";

// Lion mascot SVG — original, minimalist line art
function LionFace({ size = 44, animated = false }: { size?: number; animated?: boolean }) {
    return (
        <svg
            viewBox="0 0 80 80"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={animated ? { animation: "lionPulse 2.5s ease-in-out infinite" } : undefined}
        >
            {/* Mane outer rays */}
            <circle cx="40" cy="40" r="35" stroke="rgba(220,38,38,0.18)" strokeWidth="2" fill="none" strokeDasharray="3 5" />
            {/* Mane */}
            <ellipse cx="40" cy="40" rx="29" ry="29" fill="rgba(220,38,38,0.07)" stroke="rgba(220,38,38,0.35)" strokeWidth="1.5" />
            {/* Mane texture lines */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 40 + 20 * Math.cos(rad);
                const y1 = 40 + 20 * Math.sin(rad);
                const x2 = 40 + 29 * Math.cos(rad);
                const y2 = 40 + 29 * Math.sin(rad);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(220,38,38,0.22)" strokeWidth="1.2" strokeLinecap="round" />;
            })}
            {/* Face */}
            <circle cx="40" cy="40" r="19" fill="var(--iron-900)" stroke="rgba(220,38,38,0.5)" strokeWidth="1.5" />
            {/* Ears */}
            <path d="M25 26 L21 18 L31 24Z" fill="var(--iron-800)" stroke="rgba(220,38,38,0.4)" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M55 26 L59 18 L49 24Z" fill="var(--iron-800)" stroke="rgba(220,38,38,0.4)" strokeWidth="1.2" strokeLinejoin="round" />
            {/* Inner ears */}
            <path d="M26 25 L23 20 L30 24Z" fill="rgba(220,38,38,0.15)" />
            <path d="M54 25 L57 20 L50 24Z" fill="rgba(220,38,38,0.15)" />
            {/* Eyes */}
            <ellipse cx="33.5" cy="38" rx="3.5" ry="4" fill="none" stroke="#E4E4E7" strokeWidth="1.4" />
            <ellipse cx="46.5" cy="38" rx="3.5" ry="4" fill="none" stroke="#E4E4E7" strokeWidth="1.4" />
            {/* Pupils */}
            <ellipse cx="34" cy="38.5" rx="1.8" ry="2.5" fill="#E4E4E7" opacity="0.9" />
            <ellipse cx="47" cy="38.5" rx="1.8" ry="2.5" fill="#E4E4E7" opacity="0.9" />
            {/* Eye glint */}
            <circle cx="35" cy="37" r="0.7" fill="rgba(220,38,38,0.8)" />
            <circle cx="48" cy="37" r="0.7" fill="rgba(220,38,38,0.8)" />
            {/* Nose */}
            <path d="M38.5 44 Q40 46 41.5 44 L40 42.5Z" fill="rgba(220,38,38,0.6)" />
            {/* Whiskers */}
            <line x1="22" y1="45" x2="35" y2="45.5" stroke="#E4E4E7" strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
            <line x1="22" y1="47.5" x2="35" y2="47" stroke="#E4E4E7" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" />
            <line x1="45" y1="45.5" x2="58" y2="45" stroke="#E4E4E7" strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
            <line x1="45" y1="47" x2="58" y2="47.5" stroke="#E4E4E7" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" />
            {/* Mouth */}
            <path d="M37 48 Q40 51.5 43 48" stroke="#E4E4E7" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
        </svg>
    );
}

function LionAvatar({ size = 32 }: { size?: number }) {
    return (
        <div style={{
            width: size, height: size, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(220,38,38,0.12), var(--iron-800))",
            border: "1px solid rgba(220,38,38,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
        }}>
            <LionFace size={size * 0.85} />
        </div>
    );
}

interface Message {
    id: string;
    role: "user" | "ai";
    text: string;
    ts: string;
}

const INITIAL: Message[] = [
    {
        id: "0",
        role: "ai",
        text: "Ciao! Sono Leo, il tuo coach personale — qui 24/7 per aiutarti a crescere.\n\nPuoi chiedermi strategie di allenamento, nutrizione, focus mentale, o qualsiasi cosa riguardi il tuo percorso. Cosa vuoi lavorare oggi?",
        ts: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    },
];

const SUGGESTIONS = [
    "Come costruisco una routine mattutina efficace?",
    "Crea un piano per aumentare la massa muscolare",
    "Come gestisco la mancanza di motivazione?",
    "Cosa mangio prima dell'allenamento?",
];

const AI_RESPONSES: Record<string, string> = {
    default: "Ottima domanda. Basandomi sul tuo profilo e il tuo percorso, ecco cosa ti consiglio:\n\nL'approccio più efficace è costruire su fondamenta solide. I top performer dedicano tempo alla riflessione attiva — capire cosa funziona e cosa no nel loro caso specifico, non seguire un protocollo generico.\n\nVorresti che approfondissimo un aspetto specifico?",
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>(INITIAL);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;
        const ts = new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
        setMessages(p => [...p, { id: Date.now().toString(), role: "user", text, ts }]);
        setInput("");
        setTyping(true);
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));
        const aiText = AI_RESPONSES[text.toLowerCase()] || AI_RESPONSES.default;
        setMessages(p => [...p, { id: (Date.now() + 1).toString(), role: "ai", text: aiText, ts: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }) }]);
        setTyping(false);
    };

    const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
    };

    return (
        <>
            <style>{`
        @keyframes lionPulse {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(220,38,38,0.15)); }
          50% { filter: drop-shadow(0 0 10px rgba(220,38,38,0.35)); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .leo-typing-dot {
          width: 6px; height: 6px; background: var(--red-400);
          border-radius: 50%; animation: typingBounce 1.2s infinite;
        }
        .leo-typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .leo-typing-dot:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

            <div className="dash-header">
                <div className="dash-title" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <LionFace size={28} />
                    Leo — AI Coach
                </div>
                <div className="header-actions">
                    <span className="tag tag-green">● Online 24/7</span>
                    <button
                        onClick={() => setMessages(INITIAL)}
                        className="btn btn-ghost btn-sm"
                        style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.72rem" }}>
                        Nuova chat
                    </button>
                </div>
            </div>

            <div className="chat-layout">
                {/* Intro hero when only initial message */}
                {messages.length <= 1 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2.5rem 1.5rem 1rem", textAlign: "center" }}>
                        <div style={{ marginBottom: "1.25rem" }}>
                            <LionFace size={80} animated />
                        </div>
                        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
                            Ciao, sono <span className="gradient-text">Leo</span>
                        </h2>
                        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", maxWidth: "380px", lineHeight: 1.65 }}>
                            Il tuo coach AI personale — costruito su Gemini 2.0. Sono qui per aiutarti ad allenarsi meglio, mangiare con intelligenza e rimanere focalizzato.
                        </p>
                    </div>
                )}

                <div className="chat-messages" id="chat-messages">
                    {messages.map(m => (
                        <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: "0.35rem" }}>
                            {/* Avatar row */}
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                                {m.role === "ai" && <LionAvatar size={28} />}
                                {m.role === "user" && (
                                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--iron-700)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text-secondary)" }}>TU</div>
                                )}
                                <span className="chat-sender">{m.role === "ai" ? "Leo · AI Coach" : "Tu"} · {m.ts}</span>
                            </div>
                            <div style={{ marginLeft: m.role === "ai" ? "36px" : 0, marginRight: m.role === "user" ? "36px" : 0 }}>
                                <div className={`chat-bubble ${m.role}`} style={{ whiteSpace: "pre-line", borderRadius: m.role === "ai" ? "4px 16px 16px 16px" : "16px 4px 16px 16px" }}>
                                    {m.text}
                                </div>
                            </div>
                        </div>
                    ))}

                    {typing && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.35rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <LionAvatar size={28} />
                                <span className="chat-sender">Leo · sta scrivendo</span>
                            </div>
                            <div style={{ marginLeft: "36px" }}>
                                <div className="chat-bubble ai" style={{ display: "flex", gap: "5px", alignItems: "center", padding: "0.8rem 1.1rem", borderRadius: "4px 16px 16px 16px" }}>
                                    <span className="leo-typing-dot" />
                                    <span className="leo-typing-dot" />
                                    <span className="leo-typing-dot" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Suggestions — only when fresh */}
                {messages.length <= 1 && (
                    <div style={{ padding: "0 1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                        {SUGGESTIONS.map((s, i) => (
                            <button key={i} id={`suggestion-${i}`} onClick={() => sendMessage(s)}
                                style={{
                                    background: "var(--iron-800)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                                    padding: "0.45rem 0.85rem", fontSize: "0.78rem", color: "var(--text-secondary)",
                                    cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--font-body)",
                                }}
                                onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "var(--border-red)"; (e.target as HTMLButtonElement).style.color = "var(--text-primary)"; }}
                                onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "var(--border)"; (e.target as HTMLButtonElement).style.color = "var(--text-secondary)"; }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                <div className="chat-input-row">
                    <textarea id="chat-input" className="chat-input" rows={1}
                        placeholder="Scrivi a Leo... (Invio per inviare)"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKey}
                    />
                    <button id="chat-send-btn" className="btn btn-red" onClick={() => sendMessage(input)}
                        disabled={!input.trim() || typing}>
                        Invia →
                    </button>
                </div>
            </div>
        </>
    );
}
