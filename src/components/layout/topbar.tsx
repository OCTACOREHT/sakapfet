 "use client";

import { useState, useEffect } from "react";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { YOUTUBE_CHANNEL_URL } from "@/lib/site-content";
import { useUiStore } from "@/store/ui-store";

const PRIMARY_NAV = [
  { href: "/", label: "Actualités" },
  { href: "/culture", label: "Culture" },
  { href: "/economie", label: "Économie" },
  { href: "/evenements", label: "Événements" },
  { href: "/sports", label: "Sports" },
  { href: "/societe", label: "Société" },
  { href: "/politique", label: "Politique" },
  { href: "/technologie", label: "Technologie" },
  { href: "/education", label: "Éducation" },
  { href: "/sante", label: "Santé" },
  { href: "/haiti", label: "Haïti" },
  { href: "/monde", label: "Monde" },
  { href: "/diaspora", label: "Diaspora" },
  { href: "/tourisme", label: "Tourisme" },
  { href: "/opinions", label: "Opinions" },
  { href: "/videos", label: "Vidéos" },
];

const LANGUAGES = [
  { code: "ht", label: "Kreyòl", flag: "https://flagcdn.com/w40/ht.png" },
  { code: "fr", label: "Français", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/us.png" },
];

export function Topbar() {
  const pathname = usePathname();
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const toggleMobileSidebar = useUiStore((state) => state.toggleMobileSidebar);
  const closeMobileSidebar = useUiStore((state) => state.closeMobileSidebar);

  const [now, setNow] = useState<Date | null>(null);
  const [lang, setLang] = useState("ht");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full left-0 border-b border-black/10 backdrop-blur-xl">
      {/* Black info bar */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 flex items-center justify-between py-1.5 text-xs">
          <span className="font-medium tracking-wide">www.sakapfetokap.org</span>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#FFD700] transition">
              <i className="ri-facebook-fill text-sm"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#FFD700] transition">
              <i className="ri-instagram-line text-sm"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-[#FFD700] transition">
              <i className="ri-tiktok-fill text-sm"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#FFD700] transition">
              <i className="ri-linkedin-fill text-sm"></i>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-[#FFD700] transition">
              <i className="ri-twitter-x-fill text-sm"></i>
            </a>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#FFD700] transition">
              <i className="ri-youtube-fill text-sm"></i>
            </a>
            <span className="mx-1 h-3 w-px bg-zinc-600"></span>
            <button className="hover:opacity-80 transition" title="Kreyòl Ayisyen">🇭🇹</button>
            <button className="hover:opacity-80 transition" title="Français">🇫🇷</button>
            <button className="hover:opacity-80 transition" title="English">🇺🇸</button>
          </div>
        </div>
      </div>

      {/* Yellow navbar */}
      <div className="bg-[#FFD700]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6">
        <div className="flex items-center gap-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-black hover:bg-black/5"
            onClick={toggleMobileSidebar}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="shrink-0">
            <img src="/Sakapfetokap.png" alt="logosakap fet" className="h-10 w-auto object-contain" />
          </Link>

          <div className="relative hidden lg:flex items-center flex-grow mx-3 gap-2">
            <div className="relative flex-grow">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
              <Input
                aria-label="Rechercher une actualité"
                placeholder="Rechercher sur Sakapfet Okap..."
                className="w-full border-black/10 bg-white text-black placeholder:text-zinc-500 pl-10"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 h-9 rounded-lg bg-black px-3 text-xs font-bold text-white cursor-pointer hover:bg-black/80 transition"
              >
                <img src={LANGUAGES.find(l => l.code === lang)?.flag} alt="" className="h-4 w-5 object-cover rounded-sm" />
                {lang.toUpperCase()}
                <i className="ri-arrow-down-s-line text-sm"></i>
              </button>
              {langOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-black/10 py-1 z-50 min-w-[120px]">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs text-black text-left hover:bg-black/5 transition ${lang === l.code ? "font-bold bg-black/5" : ""}`}
                    >
                      <img src={l.flag} alt={l.label} className="h-4 w-5 object-cover rounded-sm" />
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 shrink-0">
            {now && (
              <span className="hidden xl:block text-xs font-medium text-black/70 whitespace-nowrap" style={{ fontVariantNumeric: "tabular-nums" }}>
                {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                {" · "}
                {now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            )}
            <Link href="/newsletter" className="hidden md:flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-black/5 transition">
              <i className="ri-mail-line text-xs"></i>
              Newsletter
            </Link>
            <div className="flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              Direct
            </div>
          </div>
        </div>

        <nav
          className="hidden items-center gap-7 border-t border-black/10 py-3 text-sm font-bold text-zinc-800 lg:flex"
          aria-label="Navigation principale"
        >
          {PRIMARY_NAV.map((item) => {
            const isActive = item.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-black underline underline-offset-4"
                    : "transition hover:text-black"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {mobileSidebarOpen ? (
          <div className="space-y-3 border-t border-black/10 py-4 lg:hidden">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
              <Input
                aria-label="Rechercher une actualité"
                placeholder="Rechercher sur Sakapfet Okap..."
                className="border-black/10 bg-white text-black placeholder:text-zinc-500 pl-10"
              />
            </div>
            <div className="grid gap-2">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileSidebar}
                  className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-bold text-zinc-800 hover:bg-black/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      </div>
    </header>
  );
}
