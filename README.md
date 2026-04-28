# Sakapfet Okap

Plateforme media orientee actualites, culture, videos et vie communautaire pour le Grand Nord d'Haiti, construite avec Next.js 14, TypeScript, Tailwind CSS et Framer Motion.

## Positionnement

- Page d'accueil editoriale avec hero, article principal et live YouTube
- Rubriques dediees pour culture, economie, societe, politique, tourisme, diaspora et plus
- Page videos reliee a la chaine YouTube `@sakapfetokap`
- Pages de credibilite pour la demo client : a propos, contact, newsletter, confidentialite, conditions
- Parcours article detaille avec partage, commentaires et contenus associes

## Stack

- Next.js 14.2.35 avec App Router
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Lucide React

## Installation

```bash
npm install
npm run dev
```

Application disponible sur `http://localhost:3000`.

## Routes principales

- `/`
- `/actualites`
- `/videos`
- `/a-propos`
- `/contact`
- `/newsletter`
- `/culture`
- `/economie`
- `/evenements`
- `/sports`
- `/societe`
- `/politique`
- `/technologie`
- `/education`
- `/sante`
- `/haiti`
- `/monde`
- `/diaspora`
- `/tourisme`
- `/opinions`

## Verification

- `npx tsc --noEmit --pretty false`

Notes:

- Le `lint` global contient encore des erreurs historiques hors du perimetre de cette livraison.
- Le serveur de dev demarre correctement hors sandbox sur le poste local.

