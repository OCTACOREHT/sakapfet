/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";

import type { SectionDefinition, Story } from "@/lib/site-content";
import { YOUTUBE_CHANNEL_URL } from "@/lib/site-content";

function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={story.href} className="group block">
      <article className="overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
        <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
          <img
            src={story.image}
            alt={story.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              {story.category}
            </span>
            <span className="text-[11px] font-medium text-red-600">{story.time}</span>
          </div>
          <h3 className="font-poppins text-lg font-bold leading-snug text-black">
            {story.title}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600">{story.summary}</p>
        </div>
      </article>
    </Link>
  );
}

export function SectionPage({ section }: { section: SectionDefinition }) {
  return (
    <div className="space-y-10 font-poppins">
      <section className="overflow-hidden rounded-[28px] border border-black/5 bg-zinc-50">
        <div className="grid gap-0 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <span
              className="w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ backgroundColor: `${section.color}18`, color: section.color }}
            >
              {section.kicker}
            </span>
            <h1 className="mt-5 max-w-2xl font-poppins text-4xl font-black leading-tight text-black md:text-5xl">
              {section.label}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">
              {section.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={section.featured.href}
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
              >
                Lire l&apos;article principal
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-100"
              >
                Voir la chaine YouTube
                <PlayCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative min-h-[320px] overflow-hidden"
          >
            <img
              src={section.featured.image}
              alt={section.featured.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-8 text-white">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
                Mise en avant
              </span>
              <h2 className="mt-3 max-w-xl font-poppins text-2xl font-bold leading-tight md:text-3xl">
                {section.featured.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                {section.featured.summary}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {section.stories.map((story) => (
          <StoryCard key={`${section.slug}-${story.title}`} story={story} />
        ))}
      </section>

      <section className="grid gap-6 rounded-[28px] border border-black/5 bg-white p-7 md:grid-cols-3 md:p-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            Credibilite
          </span>
          <h2 className="mt-3 font-poppins text-2xl font-bold text-black">
            Un media qui montre ses preuves.
          </h2>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-black">
            Terrain
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Articles, images et formats live pour documenter le Nord avec un angle local.
          </p>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-black">
            Diffusion
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Site, page article et chaine YouTube travaillent ensemble pour toucher local et diaspora.
          </p>
        </div>
      </section>
    </div>
  );
}

