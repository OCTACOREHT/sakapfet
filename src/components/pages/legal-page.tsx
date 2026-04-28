"use client";

type LegalPageProps = {
  title: string;
  kicker: string;
  paragraphs: string[];
};

export function LegalPage({ title, kicker, paragraphs }: LegalPageProps) {
  return (
    <div className="space-y-8 font-poppins">
      <section className="rounded-[28px] border border-black/5 bg-zinc-50 p-8 md:p-12">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          {kicker}
        </span>
        <h1 className="mt-4 font-poppins text-4xl font-black leading-tight text-black md:text-5xl">
          {title}
        </h1>
      </section>

      <section className="rounded-[28px] border border-black/5 bg-white p-8 md:p-10">
        <div className="space-y-5 text-sm leading-relaxed text-zinc-700">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}

