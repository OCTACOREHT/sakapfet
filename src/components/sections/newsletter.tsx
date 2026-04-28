"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MailCheck, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NEWSLETTER_EMAIL, YOUTUBE_CHANNEL_URL } from "@/lib/site-content";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24 rounded-[32px] mx-4 md:mx-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-full w-1/3 rounded-full bg-[#FFD700]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-full w-1/4 rounded-full bg-[#FFD700]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-[#FFD700]/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Newsletter Exclusive
            </span>
            <h2 className="font-poppins text-3xl font-black leading-tight text-white md:text-5xl">
              Rejoignez l&apos;élite du Nord <br />
              <span className="text-zinc-500">en un clic.</span>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-zinc-400">
              Recevez chaque matin une sélection pointue de l&apos;actualité, de la culture et des opportunités au Cap-Haïtien.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="relative mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="Votre adresse email professionnelle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-16 w-full rounded-2xl border-white/10 bg-white/5 px-6 text-base transition-all focus:border-[#FFD700]/50 focus:ring-4 focus:ring-[#FFD700]/10"
              />
              <MailCheck className={`absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${status === "success" ? "text-green-500" : "text-zinc-600"}`} />
            </div>
            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="h-16 rounded-2xl bg-[#FFD700] px-10 text-sm font-black uppercase tracking-widest text-black hover:bg-[#FFD700]/90 disabled:opacity-50"
            >
              {status === "loading" ? "Chargement..." : status === "success" ? "Inscrit !" : "S'abonner"}
            </Button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#FFD700]" />
              Zéro Spam
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#FFD700]" />
              Désinscription en un clic
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#FFD700]" />
              Contenu Exclusif
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

