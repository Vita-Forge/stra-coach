# Stra Coach

Piattaforma SaaS multi-ruolo per coaching fitness/benessere.

## Stack

- Next.js 15 (App Router) + React 18 + TypeScript strict
- Auth: Clerk (@clerk/nextjs)
- Icons: SVG custom in `src/components/Icons.tsx` — NO emoji, NO librerie esterne
- Animazioni: Framer Motion
- Email: Resend
- Deploy: Vercel (auto-deploy da `main`)

## Architettura

```
src/
├── app/                    # Route (App Router)
│   ├── admin/              # Dashboard admin
│   ├── commerciale/        # Dashboard commerciale
│   ├── fornitore/          # Dashboard fornitore
│   ├── pro/                # Dashboard professionista (10 pagine)
│   ├── dashboard/          # Dashboard utente (10 pagine)
│   ├── sign-in/            # Login
│   ├── sign-up/            # Registrazione
│   └── page.tsx            # Landing page
├── components/
│   ├── Icons.tsx           # Tutte le icone SVG del progetto
│   ├── Sidebar.tsx         # Sidebar utenti
│   └── StaffSidebar.tsx    # Sidebar staff
├── context/
│   └── AuthContext.tsx      # Context autenticazione
└── lib/
    └── data.ts             # Dati e costanti condivise
```

## Convenzioni di codice

- Componenti: `"use client"` solo dove serve (useState, useEffect, ecc.)
- CSS: un unico `globals.css` con variabili CSS custom (`--iron-*`, `--red-*`, `--text-*`, `--border-*`)
- Classi CSS: BEM-like (`card`, `card-red`, `btn`, `btn-red`, `btn-sm`, `dash-header`, `dash-content`)
- Icone: sempre SVG da `Icons.tsx`, mai emoji o icon library
- Font: `var(--font-display)` per titoli, font-weight 800-900, text-transform uppercase
- Layout: `grid-2` per layout a 2 colonne, responsive con breakpoint 768px

## Comandi

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Build produzione
npm run lint     # ESLint
```

## Workflow

- Branch `main` = produzione (auto-deploy Vercel)
- Lavorare sempre su feature branch (`feature/nome-feature`)
- PR per merge su main
- Build deve passare (0 errori TS) prima di merge
- Non committare mai file .env
