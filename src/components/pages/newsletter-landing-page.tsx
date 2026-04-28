"use client";

import { MailCheck, Send } from "lucide-react";

import { NEWSLETTER_EMAIL } from "@/lib/site-content";

const BENEFITS = [
  "Recap rapide des actualites du Grand Nord.",
  "Selection de sujets culturels, communautaires et videos.",
  "Point d'entree clair pour garder le lien avec la diaspora.",
];

export function NewsletterLandingPage() {
  return (
    <div className="space-y-10 font-poppins">
      <section className="rounded-[28px] border border-black/5 bg-black p-8 text-white md:p-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFD700]">
          <MailCheck className="h-3.5 w-3.5" />
          Newsletter
        </span>
        <h1 className="mt-5 font-poppins text-4xl font-black leading-tight md:text-5xl">
          Un point de contact simple pour fideliser l&apos;audience.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75">
          La newsletter donne au client un signe important : le media ne depend pas uniquement du
          trafic social. Il commence aussi a construire une audience directe.
        </p>
        <a
          href={`mailto:${NEWSLETTER_EMAIL}?subject=Inscription%20newsletter%20Sakapfet%20Okap`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#FFD700]/90"
        >
          Demander l&apos;inscription
          <Send className="h-4 w-4" />
        </a>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {BENEFITS.map((benefit) => (
          <article key={benefit} className="rounded-[24px] border border-black/5 bg-zinc-50 p-6">
            <p className="text-sm leading-relaxed text-zinc-700">{benefit}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

