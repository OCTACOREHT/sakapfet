"use client";

import { Mail, Megaphone, PlayCircle } from "lucide-react";

import { ADS_EMAIL, CONTACT_EMAIL, YOUTUBE_CHANNEL_URL } from "@/lib/site-content";

const CONTACT_BLOCKS = [
  {
    title: "Redaction",
    text: "Pour les informations, propositions de sujets, invitations et demandes de couverture.",
    action: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
  {
    title: "Partenariats",
    text: "Pour les marques, institutions, activations editoriales et visibilite commerciale.",
    action: ADS_EMAIL,
    href: `mailto:${ADS_EMAIL}`,
    icon: Megaphone,
  },
  {
    title: "YouTube",
    text: "Pour voir les directs, les reportages et la diffusion video de Sakapfet Okap.",
    action: "@sakapfetokap",
    href: YOUTUBE_CHANNEL_URL,
    icon: PlayCircle,
  },
];

export function ContactPage() {
  return (
    <div className="space-y-10 font-poppins">
      <section className="rounded-[28px] border border-black/5 bg-zinc-50 p-8 md:p-12">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          Contact
        </span>
        <h1 className="mt-4 font-poppins text-4xl font-black leading-tight text-black md:text-5xl">
          Parlons contenu, diffusion et partenariats.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
          Cette page pose un cadre professionnel clair. Le client voit immediatement comment
          joindre la redaction, proposer une collaboration ou verifier la presence video du media.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {CONTACT_BLOCKS.map(({ title, text, action, href, icon: Icon }) => (
          <a
            key={title}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded-[24px] border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-[#FFD700]">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-poppins text-xl font-bold text-black">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{text}</p>
            <span className="mt-5 inline-block text-sm font-bold text-black">{action}</span>
          </a>
        ))}
      </section>

      <section className="rounded-[28px] border border-black/5 bg-black p-8 text-white md:p-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFD700]">
          Pour convaincre
        </span>
        <h2 className="mt-3 font-poppins text-2xl font-bold">
          Ce que le client doit ressentir en arrivant ici
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75">
          Le media est joignable, structure et diffusable. Une page contact propre transforme
          l&apos;impression generale : on ne regarde plus une maquette isolee, on regarde un support
          editorial avec des points d&apos;entree clairs.
        </p>
      </section>
    </div>
  );
}

