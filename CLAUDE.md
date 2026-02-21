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

## Stato attuale

- Il progetto è 100% frontend statico (nessun file usa process.env)
- Il file .env.local contiene solo placeholder — le chiavi API (Clerk, Resend, Neon, Gemini) NON sono ancora configurate
- `npm run dev` e `npm run build` funzionano senza chiavi
- Le chiavi serviranno quando si implementerà il backend (auth, DB, email, AI)

## Workflow team

- Progetto in team: due sviluppatori con Claude Code, stessa codebase
- Prima di ogni task: `git pull origin main`
- Lavorare sempre su feature branch (`feature/nome-feature`)
- Mai lavorare direttamente su `main`
- PR per merge su main con `gh pr create`
- Build deve passare (0 errori TS) prima di merge
- Non committare mai file .env
- Deploy: auto su Vercel quando si mergia su main
