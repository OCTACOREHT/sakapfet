"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-16 border-y border-black/5">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 bg-black z-0" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FFD700]/5 blur-[120px] rounded-full translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-[#FFD700]/5 blur-[100px] rounded-full -translate-x-1/2" />

      <div className="mx-auto max-w-5xl px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                Restez Connecté
              </span>
              <h2 className="font-poppins text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                Ne manquez rien de l&apos;actualité du <span className="text-[#FFD700]">Grand Nord</span>.
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                Inscrivez-vous à notre newsletter et recevez chaque matin l&apos;essentiel de l&apos;information directement dans votre boîte mail.
              </p>
            </motion.div>
          </div>

          {/* Form Content */}
          <div className="w-full lg:w-[480px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10"
            >
              {status === "success" ? (
                <div className="text-center py-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD700]/20 text-[#FFD700] mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Inscription Réussie !</h3>
                  <p className="text-zinc-400 text-sm">
                    Merci de votre confiance. Vous allez recevoir un email de confirmation.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="text-[#FFD700] mt-6 text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                    S&apos;inscrire avec un autre email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                      Votre adresse email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@mail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/10 text-white placeholder:text-zinc-600 h-14 rounded-xl focus:ring-[#FFD700] focus:border-[#FFD700]"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full h-14 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-black text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <span className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        S&apos;abonner Maintenant
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-[10px] text-center text-zinc-500 leading-relaxed mt-4">
                    En vous inscrivant, vous acceptez notre politique de confidentialité et recevrez des communications marketing de Sakapfet Okap.
                  </p>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
