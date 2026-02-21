// SVG icons — Stra Coach v3 — linee minimaliste, niente emoji, niente librerie
import React from "react";

const cls = "nav-icon-svg";
const s = {
    width: 18, height: 18, strokeWidth: 1.6, fill: "none",
    stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

// ─── Navigation ───────────────────────────────────────────────────────────────
export const IconDash = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
);

export const IconAI = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        <path d="M5.6 5.6l1.4 1.4M16.9 16.9l1.5 1.5M5.6 18.4l1.4-1.4M16.9 7.1l1.5-1.5" />
    </svg>
);

export const IconCall = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M8 2H6a2 2 0 00-2 2v1c0 9.4 7.6 17 17 17h1a2 2 0 002-2v-2l-5-2-1.5 1.5C14 16 10 12 8.5 9.5L10 8 8 2z" />
    </svg>
);

export const IconNutrition = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M12 3c0 0-6 5-6 11a6 6 0 0012 0c0-6-6-11-6-11z" />
        <path d="M12 12v5" />
    </svg>
);

export const IconTraining = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M4 12h3M17 12h3M7 12v-3a2 2 0 012-2h6a2 2 0 012 2v3" />
        <path d="M7 12v3a2 2 0 002 2h6a2 2 0 002-2v-3" />
        <path d="M2 10h2v4H2zM20 10h2v4h-2z" />
    </svg>
);

export const IconMessages = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);

export const IconProfile = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

export const IconBell = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a1.94 1.94 0 01-3.4 0" />
    </svg>
);

export const IconLogout = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

// ─── Gestionale ───────────────────────────────────────────────────────────────
export const IconClients = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <circle cx="9" cy="7" r="4" />
        <path d="M1 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
        <path d="M17 11l2 2 4-4" />
    </svg>
);

export const IconPlans = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="12" y2="17" />
    </svg>
);

export const IconStats = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

export const IconCalendar = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

export const IconSettings = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
);

// ─── Shop & Ordini ─────────────────────────────────────────────────────────────
export const IconShop = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
    </svg>
);

export const IconCart = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
);

export const IconOrder = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h10M7 11h6" />
    </svg>
);

// ─── Documenti & Files ─────────────────────────────────────────────────────────
export const IconDocument = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
        <polyline points="13 2 13 9 20 9" />
    </svg>
);

export const IconUpload = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
);

export const IconDownload = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <polyline points="8 17 12 21 16 17" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
    </svg>
);

// ─── Professionista ────────────────────────────────────────────────────────────
export const IconCertificate = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <rect x="2" y="4" width="20" height="12" rx="2" />
        <circle cx="12" cy="10" r="3" />
        <path d="M9 20l3-3 3 3" />
        <line x1="7" y1="10" x2="7" y2="10" />
        <line x1="17" y1="10" x2="17" y2="10" />
    </svg>
);

export const IconStar = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// ─── Ruoli / Utenti ───────────────────────────────────────────────────────────
export const IconAdmin = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
    </svg>
);

export const IconSupplier = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);

export const IconUsers = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
);

export const IconTrend = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

export const IconChevron = ({ dir = "right" }: { dir?: "right" | "left" | "down" | "up" }) => {
    const paths: Record<string, string> = {
        right: "M9 18l6-6-6-6",
        left: "M15 18l-6-6 6-6",
        down: "M6 9l6 6 6-6",
        up: "M18 15l-6-6-6 6",
    };
    return (
        <svg {...s} viewBox="0 0 24 24" className={cls}>
            <polyline points={paths[dir]} />
        </svg>
    );
};

export const IconSearch = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export const IconMenu = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

export const IconX = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const IconCheck = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const IconEdit = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

export const IconLink = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
);

export const IconPhone = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.41 11.5 19.79 19.79 0 01.36 2.88 2 2 0 012.34.7h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.77-.77a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
);

export const IconMail = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

export const IconLightbulb = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <path d="M9 18h6M10 22h4" />
        <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
    </svg>
);

export const IconPackage = () => (
    <svg {...s} viewBox="0 0 24 24" className={cls}>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);
