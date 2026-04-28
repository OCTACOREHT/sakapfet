"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MailCheck, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NEWSLETTER_EMAIL, YOUTUBE_CHANNEL_URL } from "@/lib/site-content";

export function Newsletter() {
  return (
    <section className="relative overflow-hidden border-y border-black/5 py-10 md:py-16">
      <div className="absolute inset-0 z-0 bg-black" />
      <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/2 rounded-full bg-[#FFD700]/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-full w-1/4 -translate-x-1/2 rounded-full bg-[#FFD700]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-6 inline-block rounded-full bg-[#FFD700]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
                Audience directe
              </span>
              <h2 className="mb-4 font-poppins text-2xl font-black leading-tight text-white md:text-3xl">
                Donne au client un media qui publie, diffuse et capte son audience.
              </h2>
              <p className="mx-auto max-w-md text-base leading-relaxed text-zinc-400 lg:mx-0">
                Cette section remplace le faux formulaire par deux parcours credibles : une page
                newsletter claire et un point d&apos;entree direct vers la chaine YouTube.
              </p>
            </motion.div>
          </div>

          <div className="w-full lg:w-[480px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
            >
              <div className="space-y-5">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD700]/20 text-[#FFD700]">
                  <MailCheck className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">Newsletter et diffusion</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Un client fait vite la difference entre une animation de demo et un vrai
                    parcours. Ici, chaque bouton mene vers une action utile.
                  </p>
                </div>
                <div className="grid gap-3">
                  <Button
                    asChild
                    className="h-14 w-full rounded-xl bg-[#FFD700] text-sm font-black uppercase tracking-widest text-black hover:bg-[#FFD700]/90"
                  >
                    <Link href="/newsletter">
                      Ouvrir la page newsletter
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <a
                    href={`mailto:${NEWSLETTER_EMAIL}?subject=Inscription%20newsletter%20Sakapfet%20Okap`}
                    className="flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    Demander l&apos;inscription par email
                  </a>
                  <a
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 text-sm font-bold text-white transition hover:bg-white/5"
                  >
                    Voir les videos publiees
                    <PlayCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

