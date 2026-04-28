# Neon Finance Nexus

Dashboard financier temps reel construit avec Next.js 14, TypeScript, Tailwind CSS, Framer Motion, TanStack Query, SWR, Zustand, Recharts, Lightweight Charts, CoinGecko, Alpha Vantage, Yahoo Finance fallback et NewsAPI.

## Stack

- Next.js 14.2.35 avec App Router
- TypeScript strict
- Tailwind CSS 3 avec theme neon/glassmorphism
- Framer Motion pour les animations
- TanStack Query + SWR pour le data fetching et le refresh temps reel
- Zustand pour la watchlist, les alertes et le portefeuille simule
- Recharts + Lightweight Charts
- react-hot-toast pour les notifications
- tsparticles pour le fond anime

## Fonctionnalites

- Dashboard hero avec horloges des marches, statut live et ticker horizontal
- Graphique chandeliers interactif pour les actions
- Watchlist personnalisable avec alertes de prix navigateur
- Flux news financier filtre avec sentiment heuristique
- Portefeuille simule avec P&L temps reel et allocation sectorielle
- Screener d'actions avec filtres et export CSV
- Section crypto temps reel via CoinGecko + CoinCap WebSocket

## Installation

Prerequis recommandes:

- Node.js 20 LTS
- npm 10+

Installation:

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Application disponible sur `http://localhost:3000`.

## Variables d'environnement

Copiez `.env.local.example` vers `.env.local` puis renseignez:

```env
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
NEWS_API_KEY=your_newsapi_api_key
NEXT_PUBLIC_COINCAP_WS_URL=wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,xrp,dogecoin,cardano
NEXT_PUBLIC_ENABLE_PARTICLES=true
```

Notes:

- Sans `ALPHA_VANTAGE_API_KEY`, le projet bascule sur Yahoo Finance puis sur des donnees mock coherentes.
- Sans `NEWS_API_KEY`, les news utilisent un fallback local categorie.
- CoinGecko ne requiert pas de cle.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Structure

```text
src/
├─ app/
│  ├─ api/
│  ├─ crypto/
│  ├─ news/
│  ├─ portfolio/
│  ├─ screener/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ charts/
│  ├─ layout/
│  ├─ pages/
│  ├─ providers/
│  ├─ ui/
│  └─ widgets/
├─ hooks/
├─ lib/
├─ store/
└─ types/
```

## Verification

Commandes validees localement:

```bash
npm run lint
npm run build
```

## Notes runtime

- Le projet fonctionne en mode demo sans cles API grace aux fallbacks integres.
- Les alertes de prix utilisent l'API `Notification` du navigateur.
- Les images d'articles restent en balises `img` pour accepter des sources distantes variees sans liste blanche stricte.
- Si vous voulez un environnement totalement stable, utilisez Node 20 LTS plutot que Node 21.
