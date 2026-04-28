"use client";

const PILLARS = [
  {
    title: "Ancrage local",
    description:
      "Le site met en avant le Cap-Haitien, le Grand Nord et les sujets qui comptent pour la communaute.",
  },
  {
    title: "Narration multimedia",
    description:
      "Articles, visuels, pages detaillees et diffusion YouTube construisent une marque media complete.",
  },
  {
    title: "Utilite publique",
    description:
      "L'objectif n'est pas d'accumuler du bruit, mais de rendre les informations locales lisibles et partageables.",
  },
];

export function AboutPage() {
  return (
    <div className="space-y-10 font-poppins">
      <section className="rounded-[28px] border border-black/5 bg-zinc-50 p-8 md:p-12">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          A propos
        </span>
        <h1 className="mt-4 font-poppins text-4xl font-black leading-tight text-black md:text-5xl">
          Sakapfet Okap se positionne comme un media local, visible et diffusable.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
          Cette page sert a clarifier la mission du projet. Elle montre qu&apos;il existe une ligne,
          un territoire, une ambition editoriale et un role concret pour le public local comme pour
          la diaspora.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <article key={pillar.title} className="rounded-[24px] border border-black/5 bg-white p-6">
            <h2 className="font-poppins text-xl font-bold text-black">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <div className="rounded-[28px] border border-black/5 bg-white p-8 md:p-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            Mission editoriale
          </span>
          <h2 className="mt-3 font-poppins text-2xl font-bold text-black">
            Raconter le Nord avec des formats solides et partageables.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-700">
            <p>
              Sakapfet Okap cherche a valoriser l&apos;actualite, la culture, la vie communautaire et
              les initiatives du Grand Nord d&apos;Haiti avec une presentation plus professionnelle.
            </p>
            <p>
              Le site structure l&apos;information. La video YouTube prolonge la diffusion. Ensemble,
              ces deux surfaces rendent le media plus credible face a un partenaire, un annonceur ou
              un client institutionnel.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-black/5 bg-black p-8 text-white md:p-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFD700]">
            Positionnement
          </span>
          <h2 className="mt-3 font-poppins text-2xl font-bold">
            Une presence locale avec une logique de marque media.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/75">
            Pour convaincre le client, il faut montrer que la plateforme peut publier, diffuser,
            accueillir des partenariats et donner une image stable du projet. Cette page joue ce
            role de cadrage.
          </p>
        </div>
      </section>
    </div>
  );
}

