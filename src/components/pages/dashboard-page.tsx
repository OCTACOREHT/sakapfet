/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { Newsletter } from "@/components/sections/newsletter";

const CATEGORIES = {
  culture: { label: "Culture", color: "#E67E22" },
  politique: { label: "Politique", color: "#E74C3C" },
  societe: { label: "Société", color: "#3498DB" },
  economie: { label: "Économie", color: "#27AE60" },
  environnement: { label: "Environnement", color: "#16A085" },
  sports: { label: "Sports", color: "#8E44AD" },
  histoire: { label: "Histoire", color: "#2C3E50" },
  artisanat: { label: "Artisanat", color: "#D35400" },
};

const HERO_ARTICLE = {
  category: "culture",
  title: "Okap Flavors : Célébration de la diversité culinaire du Cap-Haïtien",
  description:
    "L'événement annuel Okap Flavors a réuni des milliers de participants pour célébrer les saveurs uniques du Nord d'Haïti. Une vitrine exceptionnelle pour les chefs locaux et les artisans de la gastronomie haïtienne.",
  image: "/images/hero-food.png",
  source: "Sakapfet Okap",
  time: "Il y a 45 minutes",
  bullets: [
    "Les meilleurs chefs du Nord réunis pour une compétition culinaire inédite",
    "Plus de 5 000 visiteurs attendus pour cette édition record",
  ],
};

const SECONDARY_ARTICLES = [
  {
    category: "histoire",
    title: "Le Palais Sans-Souci : Un patrimoine mondial à préserver",
    summary:
      "Un appel à la protection de l'héritage d'Henri Christophe pour booster le tourisme culturel dans le Nord.",
    image: "/images/palace.png",
    source: "Sakapfet Okap",
    time: "Il y a 1 heure",
  },
  {
    category: "societe",
    title: "Journalisme communautaire : Former les jeunes voix du Nord",
    summary:
      "Renforcer la démocratie locale par une information de proximité et de qualité faite par et pour la communauté.",
    image: "/images/journalism.png",
    source: "Sakapfet Okap",
    time: "Il y a 3 heures",
  },
  {
    category: "culture",
    title: "Festivités de la Saint-Jacques : Une tradition vivante à la Plaine du Nord",
    summary:
      "Un mélange unique de foi, de culture et de traditions qui anime tout le département du Nord.",
    image: "/images/festival.png",
    source: "Sakapfet Okap",
    time: "Il y a 5 heures",
  },
  {
    category: "environnement",
    title: "Opération nettoyage dans la baie du Cap-Haïtien",
    summary:
      "Une initiative communautaire exemplaire pour un Cap-Haïtien plus propre et plus vert.",
    image: "/images/environment.png",
    source: "Sakapfet Okap",
    time: "Il y a 8 heures",
  },
];

const FEATURED_ARTICLE = {
  category: "artisanat",
  title: "Artisanat local : Le savoir-faire des mains du Nord à l'honneur",
  summary:
    "Valoriser la créativité haïtienne et soutenir l'économie circulaire dans le département du Nord.",
  image: "/images/artisan.png",
  source: "Sakapfet Okap",
  time: "Il y a 10 heures",
};

const TOP_STORIES = [
  "Inauguration du nouveau marché central du Cap-Haïtien",
  "La diaspora investit dans le tourisme du Nord",
  "Réforme éducative : nouveaux programmes pour les écoles du Nord",
  "Le port du Cap-Haïtien modernise ses infrastructures",
  "Festival de jazz du Cap : programmation dévoilée",
  "Agriculture : les coopératives du Nord se mobilisent",
  "Santé publique : campagne de vaccination dans le département",
  "Transport : nouvelle ligne de bus Cap-Haïtien — Port-au-Prince",
];

function CategoryBadge({ category }: { category: string }) {
  const cat = CATEGORIES[category as keyof typeof CATEGORIES];
  if (!cat) return null;
  return (
    <span
      className="text-[11px] font-bold uppercase tracking-wide"
      style={{ color: cat.color }}
    >
      {cat.label}
    </span>
  );
}

export default function DashboardPage() {
  const [videoWithSound, setVideoWithSound] = useState(false);

  const videoSrc = videoWithSound
    ? "https://www.youtube.com/embed/utGcaxQGVhY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&loop=1&playlist=utGcaxQGVhY&playsinline=1"
    : "https://www.youtube.com/embed/utGcaxQGVhY?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&loop=1&playlist=utGcaxQGVhY&playsinline=1";

  return (
    <div className="space-y-10 font-poppins">
      {/* ── HERO SECTION ── */}
      <section>
        <div className="grid lg:grid-cols-[1fr,1fr,0.8fr] gap-0 bg-zinc-50 rounded-xl overflow-hidden border border-black/5">
          {/* Left: Text */}
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <CategoryBadge category={HERO_ARTICLE.category} />
            <Link href="/actualites/okap-flavors" className="group/title">
              <h1 className="mt-3 font-poppins text-3xl lg:text-4xl font-extrabold leading-tight text-black group-hover/title:text-zinc-600 transition">
                {HERO_ARTICLE.title}
              </h1>
            </Link>
            <ul className="mt-4 space-y-2">
              {HERO_ARTICLE.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Center: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-[320px] lg:min-h-[400px]"
          >
            <img
              src={HERO_ARTICLE.image}
              alt={HERO_ARTICLE.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Right: Video/Live panel */}
          <div className="flex flex-col bg-zinc-900 text-white p-5 lg:p-6">
            <div className="relative flex-1 overflow-hidden rounded-lg bg-black mb-4 min-h-[140px] mx-auto w-full max-w-[240px]">
              <iframe
                width="100%"
                height="100%"
                src={videoSrc}
                title="Sakapfet Okap Live"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={`h-full w-full scale-[1.15] select-none ${videoWithSound ? "" : "pointer-events-none"}`}
              ></iframe>
              {!videoWithSound ? (
                <button
                  type="button"
                  onClick={() => setVideoWithSound(true)}
                  className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-black"
                  aria-label="Activer le son de la vidéo"
                >
                  <Volume2 className="h-4 w-4" />
                  Activer le son
                </button>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Direct
              </span>
              <span className="text-sm font-medium text-white/80">Sakapfet Okap Live</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-COLUMN ARTICLES ── */}
      <section className="grid gap-4 md:grid-cols-3">
        <Link href="/videos" className="rounded-2xl border border-black/5 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-600">Videos</span>
          <h2 className="mt-3 font-poppins text-xl font-bold text-black">Une presence YouTube visible</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Directs, reportages et diffusion video pour montrer que le media publie vraiment.
          </p>
        </Link>
        <Link href="/a-propos" className="rounded-2xl border border-black/5 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Mission</span>
          <h2 className="mt-3 font-poppins text-xl font-bold text-black">Une ligne editoriale claire</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Le client peut comprendre le role du media, son territoire et son positionnement.
          </p>
        </Link>
        <Link href="/contact" className="rounded-2xl border border-black/5 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Contact</span>
          <h2 className="mt-3 font-poppins text-xl font-bold text-black">Des points d&apos;entree concrets</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Redaction, partenariats et newsletter sont maintenant visibles dans le parcours.
          </p>
        </Link>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {SECONDARY_ARTICLES.map((article, index) => (
          <Link key={index} href="/actualites/okap-flavors">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-zinc-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 space-y-1.5">
                <CategoryBadge category={article.category} />
                <h3 className="font-poppins text-[15px] font-bold leading-snug text-black group-hover:text-zinc-600 transition">
                  {article.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-500 line-clamp-2">
                  {article.summary}
                </p>
              </div>
            </motion.article>
          </Link>
        ))}
      </section>

      {/* ── FEATURED + SIDEBAR ── */}
      <section className="grid lg:grid-cols-[1fr,0.4fr] gap-8">
        {/* Featured article */}
        <Link href="/actualites/okap-flavors" className="group block">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cursor-pointer"
          >
            <div className="aspect-[16/8] overflow-hidden rounded-lg bg-zinc-100">
              <img
                src={FEATURED_ARTICLE.image}
                alt={FEATURED_ARTICLE.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 space-y-2">
              <CategoryBadge category={FEATURED_ARTICLE.category} />
              <h2 className="font-poppins text-2xl font-bold leading-tight text-black group-hover:text-zinc-600 transition">
                {FEATURED_ARTICLE.title}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-500 max-w-2xl">
                {FEATURED_ARTICLE.summary}
              </p>
              <p className="text-xs text-zinc-400">
                {FEATURED_ARTICLE.source} / {FEATURED_ARTICLE.time}
              </p>
            </div>
          </motion.article>
        </Link>

        {/* Top Stories Sidebar */}
        <div>
          <div className="rounded-xl border border-black/5 bg-zinc-50 overflow-hidden">
            <div className="bg-[#E74C3C] px-5 py-3">
              <h3 className="font-poppins text-sm font-bold text-white uppercase tracking-wide">
                Top Stories
              </h3>
            </div>
            <ul className="divide-y divide-black/5">
              {TOP_STORIES.map((story, i) => (
                <li key={i}>
                  <Link
                    href="/actualites/okap-flavors"
                    className="flex items-start gap-3 px-5 py-3 text-sm text-black hover:bg-zinc-100 transition group"
                  >
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/30 group-hover:bg-[#FFD700] transition" />
                    <span className="font-medium leading-snug group-hover:text-zinc-600 transition">{story}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Newsletter />
      
      {/* ── DERNIÈRES NOUVELLES ── */}
      <section className="border-t border-black/10 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-poppins text-2xl font-bold text-black">Dernières Nouvelles</h2>
            <p className="text-sm text-zinc-500 mt-1">
              L&apos;essentiel de l&apos;information du Grand Nord d&apos;Haïti.
            </p>
          </div>
          <Link
            href="/actualites"
            className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-black/5 transition"
          >
            6 Stories
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[HERO_ARTICLE, ...SECONDARY_ARTICLES.slice(0, 3)].map((article, index) => (
            <Link key={index} href="/actualites/okap-flavors" className="group">
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="flex gap-4 cursor-pointer"
              >
                <div className="w-40 h-28 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-1.5 min-w-0">
                  <CategoryBadge category={article.category} />
                  <h3 className="font-poppins font-bold text-black group-hover:text-zinc-600 transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {article.source ?? "Sakapfet Okap"} / {article.time}
                  </p>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
