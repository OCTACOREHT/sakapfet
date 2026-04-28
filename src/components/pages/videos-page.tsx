/* eslint-disable @next/next/no-img-element */

"use client";

import { PlayCircle, Radio, ShieldCheck, Users, Video } from "lucide-react";

import { YOUTUBE_CHANNEL_URL } from "@/lib/site-content";

const FEATURED_VIDEO_ID = "utGcaxQGVhY";

const VIDEO_FORMATS = [
  {
    title: "Directs et couvertures terrain",
    description:
      "Lives, recap d'evenements et formats de presence pour faire ressentir l'actualite locale.",
    icon: Radio,
  },
  {
    title: "Interviews et portraits",
    description:
      "Entrepreneurs, artistes, organisateurs et voix communautaires du Nord d'Haiti.",
    icon: Users,
  },
  {
    title: "Capsules partageables",
    description:
      "Formats courts et extraits pensés pour circuler facilement sur mobile et reseaux sociaux.",
    icon: Video,
  },
];

const TRUST_POINTS = [
  "Une page videos claire relie le site a la diffusion YouTube.",
  "Le client voit tout de suite qu'il existe deja un canal de publication actif.",
  "Le media ne depend plus seulement d'une maquette statique : il montre un support vivant.",
];

export function VideosPage() {
  return (
    <div className="space-y-10 font-poppins">
      <section className="overflow-hidden rounded-[28px] border border-black/5 bg-black text-white">
        <div className="grid gap-0 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Multimedia
            </span>
            <h1 className="mt-5 max-w-2xl font-poppins text-4xl font-black leading-tight md:text-5xl">
              Videos et diffusion YouTube
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Cette page donne au client une preuve immediate de diffusion. Le site n&apos;est plus
              seulement une vitrine d&apos;articles, il s&apos;appuie aussi sur une presence video visible
              et partageable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#FFD700]/90"
              >
                Voir la chaine YouTube
                <PlayCircle className="h-4 w-4" />
              </a>
              <a
                href={`${YOUTUBE_CHANNEL_URL}&view=0&sort=dd&shelf_id=0`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Ouvrir toutes les videos
                <Radio className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="min-h-[340px] p-5 md:p-7">
            <div className="h-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/30">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
                title="Sakapfet Okap sur YouTube"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="min-h-[340px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {VIDEO_FORMATS.map(({ title, description, icon: Icon }) => (
          <article key={title} className="rounded-[24px] border border-black/5 bg-zinc-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-[#FFD700]">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-poppins text-xl font-bold text-black">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-[28px] border border-black/5 bg-white p-7 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-[#FFD700]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                Pour la presentation client
              </span>
              <h2 className="mt-1 font-poppins text-2xl font-bold text-black">
                Pourquoi cette page rend le site plus credible
              </h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {TRUST_POINTS.map((point) => (
              <div key={point} className="rounded-2xl bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-black/5 bg-zinc-50 p-7 md:p-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            Usage commercial
          </span>
          <h2 className="mt-3 font-poppins text-2xl font-bold text-black">
            Ce que tu peux dire au client pendant la demo
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-700">
            <p>
              Sakapfet Okap n&apos;est pas seulement un site de lecture. C&apos;est aussi un point
              d&apos;entree vers des lives, des reportages et des formats video qui prolongent la
              marque media.
            </p>
            <p>
              La page videos facilite la projection business : couverture d&apos;evenements, relais
              sponsorises, interviews partenaires et diffusion a destination de la diaspora.
            </p>
            <p>
              Le client voit donc un support qui peut publier, distribuer et monetiser, pas juste
              une maquette de presentation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

