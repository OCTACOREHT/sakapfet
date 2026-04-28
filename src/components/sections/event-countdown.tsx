"use client";

import { useEffect, useState } from "react";
import { Calendar, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Target date: 15 days from now for demo
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 15);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-xl bg-zinc-900 px-3 py-2 text-white shadow-inner min-w-[54px] text-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="block text-xl font-black tabular-nums"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
        {label}
      </span>
    </div>
  );

  return (
    <Card className="relative overflow-hidden border-none bg-[#0a0a0a] p-0 shadow-2xl">
      {/* Abstract Background Decoration */}
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-red-600/10 blur-[60px]" />
      <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-blue-600/10 blur-[60px]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-5 md:p-7">
        <div className="flex flex-col gap-3 md:max-w-[30%]">
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 border border-white/10 w-fit">
            <Timer className="h-3.5 w-3.5 text-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
              Événement
            </span>
          </div>
          <h2 className="font-poppins text-xl md:text-2xl font-black leading-tight text-white">
            Okap Flavors <span className="text-red-500 text-lg md:text-xl">2026</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 flex-1">
          <TimeUnit value={timeLeft.days} label="Jours" />
          <TimeUnit value={timeLeft.hours} label="Heures" />
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <TimeUnit value={timeLeft.seconds} label="Sec" />
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <Button 
            className="w-full md:w-auto bg-white text-black hover:bg-zinc-200 font-bold rounded-xl px-8 py-6 h-auto text-xs uppercase tracking-wider"
          >
            Réserver ma place
          </Button>
        </div>
      </div>
    </Card>
  );
}
