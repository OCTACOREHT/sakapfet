/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  PlayCircle,
  Radio,
  Volume2,
} from "lucide-react";

import { Newsletter } from "@/components/sections/newsletter";
import { EventCountdown } from "@/components/sections/event-countdown";
import { YOUTUBE_CHANNEL_URL } from "@/lib/site-content";

const CATEGORIES = {
  culture: { label: "Culture", color: "#E67E22" },
  politique: { label: "Politique", color: "#E74C3C" },
  societe: { label: "Societe", color: "#3498DB" },
  economie: { label: "Economie", color: "#27AE60" },
  environnement: { label: "Environnement", color: "#16A085" },
  sports: { label: "Sports", color: "#8E44AD" },
  histoire: { label: "Histoire", color: "#2C3E50" },
  artisanat: { label: "Artisanat", color: "#D35400" },
} as const;

const TOP_STORY = {
  category: "culture",
  title: "Okap Flavors donne au Cap-Haitien une vitrine culinaire plus visible et plus diffusable",
  description:
    "Le sujet reunit evenement, public, video et territoire. C'est exactement le type de couverture qui donne a la home une allure de vrai media et non de simple maquette.",
  image: "/images/hero-food.png",
  source: "Sakapfet Okap",
  time: "Il y a 45 minutes",
  href: "/actualites/okap-flavors",
};

const FEATURED_HEADLINES = [
  {
    category: "histoire",
    title: "Le Palais Sans-Souci reste un actif fort pour l'image du Nord",
    time: "Il y a 1 heure",
    href: "/actualites/okap-flavors",
  },
  {
    category: "societe",
    title: "Le journalisme communautaire gagne en poids quand la forme devient plus claire",
    time: "Il y a 2 heures",
    href: "/actualites/okap-flavors",
  },
  {
    category: "environnement",
    title: "Les initiatives citoyennes ont besoin d'un support media stable pour durer",
    time: "Il y a 4 heures",
    href: "/actualites/okap-flavors",
  },
];

const ESSENTIAL_POINTS = [
  {
    category: "histoire",
    title: "Le Palais Sans-Souci reste un actif fort pour l'image du Nord",
    time: "Il y a 1 heure",
    href: "/actualites/okap-flavors",
  },
  {
    category: "societe",
    title: "Le journalisme communautaire gagne en poids quand la forme devient plus claire",
    time: "Il y a 2 heures",
    href: "/actualites/okap-flavors",
  },
  {
    category: "culture",
    title: "Les grands rendez-vous populaires restent les meilleurs accelerateurs de visibilite",
    time: "Il y a 3 heures",
    href: "/actualites/okap-flavors",
  },
  {
    category: "environnement",
    title: "Les initiatives citoyennes ont besoin d'un support media stable pour durer",
    time: "Il y a 4 heures",
    href: "/actualites/okap-flavors",
  },
];

const LATEST_NEWS = [
  {
    category: "culture",
    title: "Les festivites de la Saint-Jacques gardent un vrai poids dans le calendrier local",
    summary:
      "Un sujet qui melange tradition, affluence et narration territoriale.",
    image: "/images/festival.png",
    source: "Sakapfet Okap",
    time: "Il y a 3 heures",
    href: "/actualites/okap-flavors",
  },
  {
    category: "artisanat",
    title: "Les artisans du Nord gagnent en visibilite quand le media montre les usages et les visages",
    summary:
      "Le traitement editorial donne plus de valeur aux acteurs locaux.",
    image: "/images/artisan.png",
    source: "Sakapfet Okap",
    time: "Il y a 5 heures",
    href: "/actualites/okap-flavors",
  },
  {
    category: "societe",
    title: "Former les jeunes voix locales reste un enjeu fort pour la credibilite du media",
    summary:
      "La proximite editoriale passe aussi par une meilleure structure de publication.",
    image: "/images/journalism.png",
    source: "Sakapfet Okap",
    time: "Il y a 7 heures",
    href: "/actualites/okap-flavors",
  },
  {
    category: "environnement",
    title: "Le front de mer du Cap-Haitien devient un sujet de mobilisation concrete",
    summary:
      "Le support editorial sert alors de trace, de preuve et de relai.",
    image: "/images/environment.png",
    source: "Sakapfet Okap",
    time: "Il y a 9 heures",
    href: "/actualites/okap-flavors",
  },
];

const QUICK_HEADLINES = [
  "La diaspora suit plus facilement un media quand la home montre un vrai rythme de publication.",
  "Les lives YouTube donnent une preuve immediate de presence terrain et de diffusion.",
  "Les pages A propos et Contact rassurent les partenaires et les annonceurs potentiels.",
  "Un support editorial plus mobile aide les sujets locaux a mieux circuler.",
  "Le patrimoine, la culture et la vie communautaire donnent une identite plus nette au media.",
  "La home doit montrer l'information avant de chercher a montrer le design.",
];

const EXTRA_NEWS = [
  {
    category: "histoire",
    title: "Le patrimoine du Nord peut soutenir une image media plus institutionnelle",
    summary:
      "Les sujets patrimoniaux donnent du relief a la ligne editoriale et sortent le site du simple flux d'actualites.",
    image: "/images/palace.png",
    source: "Sakapfet Okap",
    time: "Il y a 1 heure",
    href: "/actualites/okap-flavors",
  },
  {
    category: "societe",
    title: "Les jeunes reporters apportent plus de densite au traitement des sujets locaux",
    summary:
      "Plus de terrain, plus de suivi, et une meilleure sensation de media vivant pour le lecteur.",
    image: "/images/journalism.png",
    source: "Sakapfet Okap",
    time: "Il y a 4 heures",
    href: "/actualites/okap-flavors",
  },
  {
    category: "culture",
    title: "Les grands rendez-vous populaires restent les meilleurs accelerateurs de visibilité",
    summary:
      "Quand ils sont bien racontes, ils servent autant la marque media que le territoire.",
    image: "/images/festival.png",
    source: "Sakapfet Okap",
    time: "Il y a 6 heures",
    href: "/actualites/okap-flavors",
  },
];

function CategoryBadge({ category }: { category: string }) {
  const cat = CATEGORIES[category as keyof typeof CATEGORIES];

  if (!cat) return null;

  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ color: cat.color }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: cat.color }}
      />
      {cat.label}
    </span>
  );
}

function StoryMeta({ source, time }: { source: string; time: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
      <span className="font-medium">{source}</span>
      <span className="h-1 w-1 rounded-full bg-current opacity-50" />
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-3.5 w-3.5" />
        {time}
      </span>
    </div>
  );
}

import { CurrencyTicker } from "@/components/layout/currency-ticker";

export default function DashboardPage() {
  const [videoWithSound, setVideoWithSound] = useState(false);
  const [secondaryVideoPlaying, setSecondaryVideoPlaying] = useState(false);

  const videoSrc = videoWithSound
    ? "https://www.youtube.com/embed/Xz0NdEZPpOk?si=K_97J5NIT6djTzXe&autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&loop=1&playlist=Xz0NdEZPpOk&playsinline=1"
    : "https://www.youtube.com/embed/Xz0NdEZPpOk?si=K_97J5NIT6djTzXe&autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&loop=1&playlist=Xz0NdEZPpOk&playsinline=1";

  const secondaryVideoSrc = secondaryVideoPlaying
    ? "https://www.youtube.com/embed/9fWLnUDACT8?si=M-LamoQU2rwP3hZ3&autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&playsinline=1"
    : "https://www.youtube.com/embed/9fWLnUDACT8?si=M-LamoQU2rwP3hZ3&autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1";

  return (
    <div className="space-y-8 font-poppins">
      <CurrencyTicker />

      <section className="grid items-start gap-6 xl:grid-cols-[1.2fr,0.72fr]">
        <div className="space-y-6 self-start">
          <section className="overflow-hidden rounded-[26px] border border-black/5 bg-white">
            <div className="grid lg:grid-cols-[0.92fr,1.08fr]">
              <Link href={TOP_STORY.href} className="group block">
                <div className="flex h-full flex-col justify-between p-5 md:p-7">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <CategoryBadge category={TOP_STORY.category} />
                      <span className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                        Top story
                      </span>
                    </div>
                    <h1 className="max-w-2xl font-poppins text-3xl font-black leading-[1.06] text-black transition group-hover:text-zinc-700 md:text-5xl">
                      {TOP_STORY.title}
                    </h1>
                    <p className="max-w-xl text-base leading-relaxed text-zinc-600">
                      {TOP_STORY.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-4 border-t border-black/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <StoryMeta source={TOP_STORY.source} time={TOP_STORY.time} />
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-black">
                      Lire l&apos;article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>

              <motion.div
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="min-h-[300px] overflow-hidden bg-zinc-100"
              >
                <img
                  src={TOP_STORY.image}
                  alt={TOP_STORY.title}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </section>

          <EventCountdown />

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[26px] border border-black/5 bg-white">
              <div className="border-b border-black/5 px-5 py-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  L&apos;essentiel
                </span>
              </div>
              <div className="divide-y divide-black/5">
                {ESSENTIAL_POINTS.map((story, index) => (
                  <Link key={story.title} href={story.href} className="group block">
                    <motion.article
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                      className="px-5 py-4 transition hover:bg-zinc-50"
                    >
                      <CategoryBadge category={story.category} />
                      <div className="mt-3 flex items-start justify-between gap-4">
                        <h2 className="max-w-2xl font-poppins text-lg font-bold leading-snug text-black transition group-hover:text-zinc-700">
                          {story.title}
                        </h2>
                        <span className="shrink-0 text-xs font-medium text-zinc-500">
                          {story.time}
                        </span>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[26px] border border-black/5 bg-white">
              <div className="border-b border-black/5 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    Video locale
                  </span>
                  <span className="text-xs font-medium text-zinc-500">Nouveau</span>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div className="relative overflow-hidden rounded-[22px] bg-zinc-950">
                  <iframe
                    width="560"
                    height="315"
                    src={secondaryVideoSrc}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={`aspect-video w-full ${secondaryVideoPlaying ? "" : "pointer-events-none"}`}
                  />
                  {!secondaryVideoPlaying ? (
                    <button
                      type="button"
                      onClick={() => setSecondaryVideoPlaying(true)}
                      className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-full bg-black/85 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-black"
                      aria-label="Lire la video locale"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Lancer la video
                    </button>
                  ) : null}
                </div>
                <h2 className="font-poppins text-xl font-bold leading-tight text-black">
                  Une deuxieme video pour occuper cette zone et enrichir la home.
                </h2>
                <p className="text-sm leading-relaxed text-zinc-600">
                  Ce bloc reprend exactement la nouvelle video YouTube que tu viens d&apos;envoyer.
                </p>
              </div>
            </section>
          </div>

        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-[26px] border border-black/5 bg-black text-white">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-red-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                    Latest video
                  </span>
                </div>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFD700]"
                >
                  Chaine YouTube
                  <PlayCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="relative overflow-hidden rounded-[22px] bg-zinc-950">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoSrc}
                  title="Sakapfet Okap Live"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={`aspect-video w-full ${videoWithSound ? "" : "pointer-events-none"}`}
                />
                {!videoWithSound ? (
                  <button
                    type="button"
                    onClick={() => setVideoWithSound(true)}
                    className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-full bg-black/85 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-black"
                    aria-label="Activer le son de la video"
                  >
                    <Volume2 className="h-4 w-4" />
                    Activer le son
                  </button>
                ) : null}
              </div>
              <h2 className="font-poppins text-xl font-bold leading-tight">
                Une vraie preuve de diffusion vaut plus qu&apos;une zone decorative.
              </h2>
              <p className="text-sm leading-relaxed text-white/72">
                Le bloc video sert de preuve immediate pour la presentation client et rapproche la
                home d&apos;un usage mobile type media d&apos;info.
              </p>
            </div>
          </section>

          <section className="rounded-[26px] border border-black/5 bg-white">
            <div className="border-b border-black/5 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    Dernieres actualites
                  </span>
                  <h2 className="mt-1 font-poppins text-2xl font-bold text-black">
                    Le fil principal
                  </h2>
                </div>
                <Link
                  href="/actualites"
                  className="text-xs font-bold uppercase tracking-[0.18em] text-black"
                >
                  Tout voir
                </Link>
              </div>
            </div>

            <div className="divide-y divide-black/5">
              {LATEST_NEWS.map((story, index) => (
                <Link key={story.title} href={story.href} className="group block">
                  <motion.article
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.28 }}
                    className="grid gap-4 p-4 transition hover:bg-zinc-50 md:grid-cols-[164px,1fr]"
                  >
                    <div className="overflow-hidden rounded-2xl bg-zinc-100">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-3">
                      <CategoryBadge category={story.category} />
                      <h3 className="font-poppins text-xl font-bold leading-snug text-black transition group-hover:text-zinc-700">
                        {story.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-600">{story.summary}</p>
                      <StoryMeta source={story.source} time={story.time} />
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.72fr,1.28fr]">
        <section className="rounded-[26px] border border-black/5 bg-zinc-50">
            <div className="border-b border-black/5 px-5 py-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                More headlines
              </span>
            </div>
            <ul className="divide-y divide-black/5">
              {QUICK_HEADLINES.map((headline) => (
                <li key={headline}>
                  <Link
                    href="/actualites/okap-flavors"
                    className="block px-5 py-4 text-sm font-medium leading-relaxed text-zinc-700 transition hover:bg-white"
                  >
                    {headline}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

        <section className="rounded-[26px] border border-black/5 bg-white">
          <div className="border-b border-black/5 px-5 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Top headlines
            </span>
          </div>
          <div className="divide-y divide-black/5">
            {FEATURED_HEADLINES.map((story) => (
              <Link
                key={story.title}
                href={story.href}
                className="block px-5 py-4 transition hover:bg-zinc-50"
              >
                <CategoryBadge category={story.category} />
                <h2 className="mt-3 font-poppins text-xl font-bold leading-snug text-black">
                  {story.title}
                </h2>
                <p className="mt-2 text-xs font-medium text-zinc-500">{story.time}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {EXTRA_NEWS.map((story, index) => (
          <Link key={story.title} href={story.href} className="group block">
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="overflow-hidden rounded-[24px] border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-5">
                <CategoryBadge category={story.category} />
                <h3 className="font-poppins text-xl font-bold leading-snug text-black transition group-hover:text-zinc-700">
                  {story.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">{story.summary}</p>
                <StoryMeta source={story.source} time={story.time} />
              </div>
            </motion.article>
          </Link>
        ))}
      </section>

      <Newsletter />
    </div>
  );
}
