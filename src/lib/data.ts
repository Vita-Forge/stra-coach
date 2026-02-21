// ─── Stra Coach — Shared Demo Data Store ─────────────────────────────────────
// Tutti i dati demo della piattaforma. Aggiornato per Stra Coach v3.

export type UserRole = "admin" | "manager" | "professionista" | "commerciale" | "fornitore" | "utente";

export interface AppUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    plan: string;
    initials: string;
    // Professional fields
    specialty?: string;
    bio?: string;
    certifications?: string[];
    skills?: string[];
    // Client fields
    assignedProfId?: string;
    phone?: string;
    birthday?: string;
    address?: string;
    cf?: string;
    goal?: string;
    // Shared
    avatar?: string;
    joinDate?: string;
}

// ─── Utenti Demo ──────────────────────────────────────────────────────────────
export const DEMO_USERS: Array<AppUser & { password: string }> = [
    // ADMIN
    {
        id: "admin_001",
        name: "Alessandro Greco",
        email: "admin@stracoach.it",
        password: "admin2026",
        role: "admin",
        plan: "Admin",
        initials: "AG",
        joinDate: "Gen 2025",
    },
    // MANAGER
    {
        id: "manager_001",
        name: "Sara Conti",
        email: "sara@stracoach.it",
        password: "manager2026",
        role: "manager",
        plan: "Staff — Manager",
        initials: "SC",
        specialty: "Operations & Client Success",
        bio: "Manager operativa con 6 anni nel settore fitness e benessere. Supervisiona il team di professionisti e garantisce la qualità del servizio.",
        certifications: ["MBA in Sport Management", "Certified Business Coach"],
        skills: ["Project Management", "Team Leadership", "Client Relations"],
        joinDate: "Gen 2025",
    },
    // PROFESSIONISTI
    {
        id: "prof_001",
        name: "Luca Romano",
        email: "luca@stracoach.it",
        password: "prof2026",
        role: "professionista",
        plan: "Staff — Professionista",
        initials: "LR",
        specialty: "Forza & Condizionamento",
        bio: "Coach certificato CONI con 8 anni di esperienza in strength training e ottimizzazione della performance atletica. Specializzato in powerlifting e ipertrofia.",
        certifications: ["CONI Istruttore Fitness", "NSCA-CSCS", "Precision Nutrition L1"],
        skills: ["Strength Training", "Powerlifting", "Nutrizione Sportiva", "Mental Coaching"],
        joinDate: "Mar 2025",
    },
    {
        id: "prof_002",
        name: "Elena Martini",
        email: "elena@stracoach.it",
        password: "prof5678",
        role: "professionista",
        plan: "Staff — Professionista",
        initials: "EM",
        specialty: "Nutrizione & Dimagrimento",
        bio: "Biologa nutrizionista con specializzazione in nutrizione funzionale. Supporta i clienti con approcci basati su evidenza scientifica per il raggiungimento degli obiettivi di composizione corporea.",
        certifications: ["Laurea in Biologia Nutrizionale", "Master in Nutrizione Clinica", "ISSN Sports Nutrition"],
        skills: ["Nutrizione Funzionale", "Dimagrimento", "Ricomposizione Corporea", "Intolleranze Alimentari"],
        joinDate: "Feb 2025",
    },
    // COMMERCIALE
    {
        id: "comm_001",
        name: "Matteo Vinci",
        email: "matteo@stracoach.it",
        password: "comm2026",
        role: "commerciale",
        plan: "Staff — Commerciale",
        initials: "MV",
        specialty: "Sales & Business Development",
        joinDate: "Apr 2025",
    },
    // FORNITORE
    {
        id: "forn_001",
        name: "SportGear Italia",
        email: "fornitore@stracoach.it",
        password: "forn2026",
        role: "fornitore",
        plan: "Partner Fornitore",
        initials: "SG",
        specialty: "Integratori & Attrezzatura",
        joinDate: "Giu 2025",
    },
    // UTENTI / CLIENTI
    {
        id: "user_001",
        name: "Marco Rossi",
        email: "marco@stracoach.it",
        password: "cliente123",
        role: "utente",
        plan: "Stra Pro",
        initials: "MR",
        assignedProfId: "prof_001",
        phone: "+39 333 111 2222",
        birthday: "1992-06-15",
        address: "Via Roma 12, Milano",
        cf: "RSSMRC92H15F205Z",
        goal: "Aumento massa muscolare e forza",
        joinDate: "Gen 2026",
    },
    {
        id: "user_002",
        name: "Giulia Ferrari",
        email: "giulia@stracoach.it",
        password: "cliente456",
        role: "utente",
        plan: "Stra Solo",
        initials: "GF",
        assignedProfId: "prof_001",
        phone: "+39 380 222 3333",
        birthday: "1997-11-08",
        address: "Via Garibaldi 5, Torino",
        goal: "Dimagrimento controllato",
        joinDate: "Feb 2026",
    },
    {
        id: "user_003",
        name: "Nicola Bianchi",
        email: "nicola@stracoach.it",
        password: "cliente789",
        role: "utente",
        plan: "Stra Elite",
        initials: "NB",
        assignedProfId: "prof_002",
        phone: "+39 347 333 4444",
        birthday: "1990-09-14",
        address: "Corso Vittorio 8, Roma",
        goal: "Performance atletica",
        joinDate: "Gen 2026",
    },
    {
        id: "user_004",
        name: "Chiara Pellegrini",
        email: "chiara@stracoach.it",
        password: "cliente101",
        role: "utente",
        plan: "Stra Elite",
        initials: "CP",
        assignedProfId: "prof_002",
        phone: "+39 328 444 5555",
        birthday: "1994-01-30",
        address: "Via Dante 22, Bologna",
        goal: "Forza + endurance",
        joinDate: "Nov 2025",
    },
];

// ─── Prodotti Shop ─────────────────────────────────────────────────────────────
export type ProductCategory = "pacchetto" | "servizio" | "integratore" | "attrezzatura";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    supplierId?: string; // se fisico → fornitore; se servizio → professionista
    badge?: string;
    features?: string[];
    stock?: number;
}

export const PRODUCTS: Product[] = [
    {
        id: "prod_001",
        name: "Scheda Personalizzata Extra",
        description: "Scheda allenamento personalizzata aggiuntiva rispetto al tuo pacchetto. Elaborata dal tuo coach in 48h.",
        price: 49,
        category: "servizio",
        supplierId: "prof_001",
        badge: "Best seller",
        features: ["Personalizzata al tuo livello", "Consegna entro 48h", "Revisione inclusa"],
    },
    {
        id: "prod_002",
        name: "Piano Nutrizione Premium",
        description: "Piano nutrizionale completo di 4 settimane con macro personalizzati, lista spesa e ricette.",
        price: 79,
        category: "servizio",
        supplierId: "prof_001",
        badge: "Consigliato",
        features: ["4 settimane di piano", "Lista spesa inclusa", "10 ricette proteiche"],
    },
    {
        id: "prod_003",
        name: "Pacchetto Stra Elite — 3 Mesi",
        description: "Accesso completo alla piattaforma con coach dedicato, call mensili illimitate e check-in settimanali.",
        price: 299,
        category: "pacchetto",
        badge: "Top",
        features: ["Coach dedicato", "Call illimitate", "Check-in settimanali", "Accesso prioritario"],
    },
    {
        id: "prod_004",
        name: "Proteina Whey Premium 1kg",
        description: "Proteine del siero del latte di alta qualità con 25g di proteine per dose. Gusto cioccolato fondente.",
        price: 34.90,
        category: "integratore",
        supplierId: "forn_001",
        features: ["25g proteine / dose", "Senza aspartame", "Made in Italy"],
        stock: 48,
    },
    {
        id: "prod_005",
        name: "Creatina Monoidrata 300g",
        description: "Creatina monoidrata micronizzata per il massimo assorbimento. Supporta forza e recupero.",
        price: 19.90,
        category: "integratore",
        supplierId: "forn_001",
        features: ["3g per dose", "100% pura", "Certificata antidoping"],
        stock: 120,
    },
    {
        id: "prod_006",
        name: "Fasce da Polso Pro",
        description: "Fasce da polso professionali in neoprene con supporto al carpo per sollevamenti pesanti.",
        price: 24.90,
        category: "attrezzatura",
        supplierId: "forn_001",
        features: ["Neoprene professionale", "Chiusura velcro rinforzata", "Taglia unica"],
        stock: 35,
    },
    {
        id: "prod_007",
        name: "Call Strategia 1:1 — 60 min",
        description: "Sessione privata con il tuo coach per analizzare il percorso, sbloccare plateau e ridefinire gli obiettivi.",
        price: 89,
        category: "servizio",
        supplierId: "prof_002",
        features: ["60 minuti dedicati", "Analisi completa", "Piano d'azione post-call"],
    },
];

// ─── Ordini ────────────────────────────────────────────────────────────────────
export type OrderStatus = "nuovo" | "in_lavorazione" | "consegnato" | "annullato";

export interface Order {
    id: string;
    userId: string;
    userName: string;
    productId: string;
    productName: string;
    price: number;
    status: OrderStatus;
    date: string;
    assignedProfId?: string;
    notes?: string;
}

export const ORDERS: Order[] = [
    { id: "ord_001", userId: "user_001", userName: "Marco Rossi", productId: "prod_001", productName: "Scheda Personalizzata Extra", price: 49, status: "nuovo", date: "19 Feb 2026", assignedProfId: "prof_001" },
    { id: "ord_002", userId: "user_002", userName: "Giulia Ferrari", productId: "prod_002", productName: "Piano Nutrizione Premium", price: 79, status: "in_lavorazione", date: "18 Feb 2026", assignedProfId: "prof_001", notes: "Richiede dieta senza lattosio" },
    { id: "ord_003", userId: "user_003", userName: "Nicola Bianchi", productId: "prod_004", productName: "Proteina Whey Premium 1kg", price: 34.90, status: "consegnato", date: "15 Feb 2026" },
    { id: "ord_004", userId: "user_004", userName: "Chiara Pellegrini", productId: "prod_007", productName: "Call Strategia 1:1 — 60 min", price: 89, status: "nuovo", date: "20 Feb 2026", assignedProfId: "prof_002" },
];

// ─── Documenti ─────────────────────────────────────────────────────────────────
export type DocType = "scheda" | "piano_nutrizionale" | "referto" | "contratto" | "altro";

export interface DocFile {
    id: string;
    name: string;
    type: DocType;
    uploadedBy: string; // prof id
    visibleTo: string[]; // user ids
    date: string;
    size: string;
    description?: string;
}

export const DOCUMENTS: DocFile[] = [
    { id: "doc_001", name: "Scheda PPL — Dicembre 2025", type: "scheda", uploadedBy: "prof_001", visibleTo: ["user_001"], date: "1 Dic 2025", size: "245 KB", description: "Push Pull Legs versione invernale, focus ipertrofia" },
    { id: "doc_002", name: "Piano Alimentare — Bulk", type: "piano_nutrizionale", uploadedBy: "prof_001", visibleTo: ["user_001"], date: "1 Dic 2025", size: "128 KB", description: "3200 kcal, 180g proteine, carboidrati periodizzati" },
    { id: "doc_003", name: "Scheda PPL — Febbraio 2026", type: "scheda", uploadedBy: "prof_001", visibleTo: ["user_001", "user_002"], date: "1 Feb 2026", size: "312 KB", description: "Aggiornamento ciclo forza" },
    { id: "doc_004", name: "Piano Deficit Controllato", type: "piano_nutrizionale", uploadedBy: "prof_001", visibleTo: ["user_002"], date: "10 Feb 2026", size: "98 KB" },
    { id: "doc_005", name: "Contratto Servizio Stra Elite", type: "contratto", uploadedBy: "prof_002", visibleTo: ["user_003", "user_004"], date: "5 Gen 2026", size: "56 KB" },
    { id: "doc_006", name: "Scheda Forza — Ciclo A", type: "scheda", uploadedBy: "prof_002", visibleTo: ["user_003"], date: "15 Gen 2026", size: "280 KB" },
    { id: "doc_007", name: "Piano Performance — Endurance", type: "scheda", uploadedBy: "prof_002", visibleTo: ["user_004"], date: "20 Gen 2026", size: "195 KB" },
];

// ─── Lead Commerciale ──────────────────────────────────────────────────────────
export type LeadStatus = "nuovo" | "contattato" | "call_fissata" | "convertito" | "perso";

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    interest: string;
    message: string;
    status: LeadStatus;
    date: string;
    assignedTo?: string;
}

export const LEADS: Lead[] = [
    { id: "lead_001", name: "Federico Basso", email: "federico@mail.it", phone: "+39 349 111 0001", interest: "Stra Pro", message: "Voglio perdere 8kg in vista dell'estate", status: "call_fissata", date: "20 Feb 2026", assignedTo: "comm_001" },
    { id: "lead_002", name: "Valentina Sordi", email: "valentina@mail.it", phone: "+39 366 222 0002", interest: "Stra Elite", message: "Sono un'atleta amatoriale, voglio migliorare le performance", status: "nuovo", date: "21 Feb 2026" },
    { id: "lead_003", name: "Giorgio Mele", email: "giorgio@mail.it", phone: "+39 328 333 0003", interest: "Stra Solo", message: "Prima volta in palestra, ho bisogno di una guida", status: "contattato", date: "19 Feb 2026", assignedTo: "comm_001" },
    { id: "lead_004", name: "Francesca Nori", email: "francesca@mail.it", phone: "+39 393 444 0004", interest: "Stra Elite", message: "Voglio prepararmi per una gara di crossfit", status: "convertito", date: "15 Feb 2026" },
];

// ─── Messaggi (cross-platform) ────────────────────────────────────────────────
export interface Message {
    id: string;
    fromId: string;
    fromName: string;
    toId: string;
    toName: string;
    text: string;
    time: string;
    read: boolean;
}

export const MESSAGES: Message[] = [
    { id: "msg_001", fromId: "user_001", fromName: "Marco Rossi", toId: "prof_001", toName: "Luca Romano", text: "Ciao Luca! Ho completato la scheda di questa settimana, domani inizio il nuovo ciclo.", time: "14:32", read: true },
    { id: "msg_002", fromId: "prof_001", fromName: "Luca Romano", toId: "user_001", toName: "Marco Rossi", text: "Ottimo Marco! Come ti senti con i carichi? Hai avuto progressi al panca?", time: "14:45", read: true },
    { id: "msg_003", fromId: "user_001", fromName: "Marco Rossi", toId: "prof_001", toName: "Luca Romano", text: "Sì! Ho alzato di 5kg rispetto al mese scorso. Grazie per la scheda!", time: "15:01", read: false },
    { id: "msg_004", fromId: "user_002", fromName: "Giulia Ferrari", toId: "prof_001", toName: "Luca Romano", text: "Ho saltato due allenamenti questa settimana, mi dispiace...", time: "Ieri 20:15", read: false },
    { id: "msg_005", fromId: "user_004", fromName: "Chiara Pellegrini", toId: "prof_002", toName: "Elena Martini", text: "Il piano nutrizionale è ottimo! Mandami il nuovo quando puoi", time: "Dom 18:30", read: false },
];

// ─── Helper functions ──────────────────────────────────────────────────────────
export function getUserById(id: string) {
    return DEMO_USERS.find(u => u.id === id);
}

export function getClientsByProfId(profId: string) {
    return DEMO_USERS.filter(u => u.role === "utente" && u.assignedProfId === profId);
}

export function getDocumentsByUserId(userId: string) {
    return DOCUMENTS.filter(d => d.visibleTo.includes(userId));
}

export function getDocumentsByProfId(profId: string) {
    return DOCUMENTS.filter(d => d.uploadedBy === profId);
}

export function getOrdersByUserId(userId: string) {
    return ORDERS.filter(o => o.userId === userId);
}

export function getOrdersByProfId(profId: string) {
    return ORDERS.filter(o => o.assignedProfId === profId);
}

export function getMessagesBetween(id1: string, id2: string) {
    return MESSAGES.filter(m =>
        (m.fromId === id1 && m.toId === id2) || (m.fromId === id2 && m.toId === id1)
    );
}

export const ROLE_ROUTES: Record<UserRole, string> = {
    admin: "/admin",
    manager: "/pro",
    professionista: "/pro",
    commerciale: "/commerciale",
    fornitore: "/fornitore",
    utente: "/dashboard",
};

export const ROLE_LABELS: Record<UserRole, string> = {
    admin: "Amministratore",
    manager: "Manager",
    professionista: "Professionista",
    commerciale: "Commerciale",
    fornitore: "Fornitore",
    utente: "Cliente",
};
