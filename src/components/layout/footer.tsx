import Link from "next/link";

import { YOUTUBE_CHANNEL_URL } from "@/lib/site-content";

const FOOTER_SECTIONS = [
  {
    title: "Rubriques",
    links: [
      { href: "/", label: "Okap" },
      { href: "/culture", label: "Gonaives" },
      { href: "/economie", label: "Jacmel" },
      { href: "/evenements", label: "Port-au-Prince" },
      { href: "/sports", label: "Port-de-Paix" },
      { href: "/politique", label: "Jeremie" },
    ],
  },
  {
    title: "Explorer",
    links: [
      { href: "/societe", label: "Les Cayes" },
      { href: "/technologie", label: "Hinche" },
      { href: "/education", label: "Miragoane" },
      { href: "/sante", label: "Saint-Marc" },
      { href: "/diaspora", label: "Petit-Goave" },
      { href: "/tourisme", label: "Leogane" },
    ],
  },
  {
    title: "Médias",
    links: [
      { href: "/videos", label: "Aquin" },
      { href: "/opinions", label: "Mirebalais" },
      { href: "/haiti", label: "Fort-Liberte" },
      { href: "/monde", label: "Ouanaminthe" },
    ],
  },
  {
    title: "À propos",
    links: [
      { href: "/a-propos", label: "Qui sommes-nous ?" },
      { href: "/contact", label: "Nous contacter" },
      { href: "/politique-confidentialite", label: "Confidentialité" },
      { href: "/conditions", label: "Conditions d'utilisation" },
    ],
  },
];

const SOCIALS = [
  { href: "https://facebook.com", icon: "ri-facebook-fill", label: "Facebook" },
  { href: "https://instagram.com", icon: "ri-instagram-line", label: "Instagram" },
  { href: "https://tiktok.com", icon: "ri-tiktok-fill", label: "TikTok" },
  { href: "https://linkedin.com", icon: "ri-linkedin-fill", label: "LinkedIn" },
  { href: "https://x.com", icon: "ri-twitter-x-fill", label: "X" },
  { href: YOUTUBE_CHANNEL_URL, icon: "ri-youtube-fill", label: "YouTube" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/Sakapfetokap.png"
                alt="Sakapfet Okap"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Votre source d&apos;information de confiance pour le département du Nord d&apos;Haïti. Actualités, culture et vie communautaire.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-zinc-400 transition hover:text-[#FFD700]"
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#FFD700]">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#FFD700]">
              Newsletter
            </h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Recevez l&apos;essentiel de l&apos;actualité du Nord chaque matin.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none transition focus:border-[#FFD700]"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-[#FFD700] py-2 text-[10px] font-black uppercase tracking-widest text-black transition hover:bg-[#FFD700]/90"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-zinc-500">
            © {currentYear} Sakapfet Okap. Tous droits réservés.
          </p>
          <p className="text-xs text-zinc-500">
            Cap-Haïtien, Département du Nord, Haïti
          </p>
        </div>
      </div>
    </footer>
  );
}
