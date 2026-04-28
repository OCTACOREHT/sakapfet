"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Share2, 
  MessageSquare, 
  Clock, 
  Calendar, 
  User, 
  ChevronRight, 
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data for the article
const ARTICLE = {
  id: 1,
  title: "Okap Flavors : Célébration de la diversité culinaire du Cap-Haïtien",
  category: "Culture",
  author: "Jean-Pierre Laurent",
  date: "28 Avril 2026",
  readTime: "6 min",
  image: "/images/hero-food.png",
  content: `
    <p class="text-lg leading-relaxed mb-6">
      L'événement annuel Okap Flavors a réuni des milliers de participants ce week-end dans la cité christophienne pour célébrer les saveurs uniques du Nord d'Haïti. Une vitrine exceptionnelle pour les chefs locaux et les artisans de la gastronomie haïtienne qui ont su émerveiller les papilles des visiteurs nationaux et internationaux.
    </p>
    
    <h2 class="text-2xl font-bold mb-4 text-black">Un carrefour des saveurs</h2>
    <p class="mb-6 text-zinc-700 leading-relaxed">
      Dès l'ouverture des portes à 10h, l'odeur du griot fraîchement préparé et du riz collé aux pois noirs a envahi l'espace du Boulevard. Les exposants, venus des quatre coins du département, ont rivalisé d'ingéniosité pour présenter des plats traditionnels revisités. Le célèbre "Consommé du Cap" a été, sans surprise, la star de la journée.
    </p>

    <div class="my-10 p-8 bg-[#FFD700]/10 border-l-4 border-[#FFD700] rounded-r-xl">
      <p class="italic text-xl text-zinc-800 font-medium">
        "Okap Flavors n'est pas seulement un festival, c'est une déclaration d'amour à notre terroir et à notre résilience."
      </p>
      <p class="mt-4 font-bold">— Marie-Lourdes, organisatrice de l'événement.</p>
    </div>

    <h2 class="text-2xl font-bold mb-4 text-black">Plus qu'une simple dégustation</h2>
    <p class="mb-6 text-zinc-700 leading-relaxed">
      Au-delà de la nourriture, l'événement a servi de plateforme de réseautage pour les jeunes entrepreneurs de l'agrobusiness. Des ateliers sur la transformation des produits locaux et la durabilité alimentaire ont été organisés tout au long de la journée, attirant un public jeune et motivé à investir dans le secteur.
    </p>
    
    <p class="mb-6 text-zinc-700 leading-relaxed">
      La soirée s'est clôturée par un concert acoustique mettant en vedette des artistes locaux, créant une ambiance électrique sous les étoiles du Cap-Haïtien. Les organisateurs estiment déjà que cette édition a battu tous les records de fréquentation, confirmant le statut d'Okap Flavors comme rendez-vous incontournable du calendrier culturel haïtien.
    </p>
  `,
  related: [
    { title: "Inauguration du nouveau marché central", image: "/images/palace.png", category: "Société" },
    { title: "La diaspora investit dans le tourisme", image: "/images/journalism.png", category: "Économie" },
    { title: "Le port du Cap modernise ses infrastructures", image: "/images/environment.png", category: "Transport" },
  ]
};

export default function ArticlePage() {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: "Mireille J.", date: "Il y a 2 heures", text: "Magnifique article ! J'y étais et la nourriture était divine." },
    { id: 2, user: "Ricardo D.", date: "Il y a 5 heures", text: "Est-ce qu'on aura les recettes bientôt ?" }
  ]);

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = `Découvrez cet article sur Sakapfet Okap : ${ARTICLE.title} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      user: "Utilisateur",
      date: "À l'instant",
      text: comment
    };
    setCommentsList([newComment, ...commentsList]);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Progress Bar ── */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-[#FFD700] z-[110]"
        initial={{ width: 0 }}
        style={{ scaleX: 1 }}
      />

      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ── LEFT SIDEBAR (Sharing) ── */}
          <div className="hidden lg:block w-16">
            <div className="sticky top-40 flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 rotate-180 [writing-mode:vertical-lr]">Partager</span>
              <button onClick={handleShareWhatsApp} className="h-11 w-11 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-[#25D366] hover:text-white transition-all shadow-sm">
                <i className="ri-whatsapp-line text-xl"></i>
              </button>
              <button className="h-11 w-11 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="h-11 w-11 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-black hover:text-white transition-all shadow-sm">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="h-11 w-11 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-all shadow-sm">
                <LinkIcon className="h-5 w-5" />
              </button>
              <div className="h-12 w-px bg-zinc-200 mt-2" />
              <button className="h-11 w-11 flex items-center justify-center rounded-full bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all">
                <MessageSquare className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
              <Link href="/" className="hover:text-black transition">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/actualites" className="hover:text-black transition">Actualités</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[#FFD700]">{ARTICLE.category}</span>
            </nav>

            {/* Header */}
            <header className="mb-8">
              <h1 className="font-poppins text-4xl lg:text-5xl font-black leading-[1.1] text-black mb-6">
                {ARTICLE.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-black/5">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold">
                    JP
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-black">{ARTICLE.author}</span>
                    <span className="text-[11px] text-zinc-400">Journaliste Sakapfet Okap</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Calendar className="h-4 w-4" />
                    {ARTICLE.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Clock className="h-4 w-4" />
                    {ARTICLE.readTime} de lecture
                  </div>
                </div>
              </div>
            </header>

            {/* Main Image */}
            <figure className="mb-6 overflow-hidden rounded-2xl shadow-2xl shadow-black/10">
              <img 
                src={ARTICLE.image} 
                alt={ARTICLE.title} 
                className="w-full aspect-[16/9] object-cover"
              />
              <figcaption className="p-4 text-xs italic text-zinc-500 text-center bg-zinc-50 border-t border-black/5">
                © Crédit Photo : Sakapfet Okap Media - 2026
              </figcaption>
            </figure>

            {/* Article Content */}
            <div 
              className="text-zinc-800 space-y-6"
              dangerouslySetInnerHTML={{ 
                __html: ARTICLE.content.replace(/class="text-lg/g, 'class="text-xl text-black font-medium') 
              }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pb-12 border-b border-black/5">
              {["Cap-Haïtien", "Gastronomie", "Culture", "Nord d'Haïti"].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-zinc-100 rounded-full text-xs font-bold text-zinc-600 hover:bg-black hover:text-white cursor-pointer transition">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Comments Section */}
            <section className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-poppins text-2xl font-bold text-black">
                  Commentaires ({commentsList.length})
                </h3>
                <div className="h-px flex-1 bg-black/5 mx-6" />
              </div>

              <form onSubmit={submitComment} className="mb-10 space-y-4">
                <Textarea 
                  placeholder="Laissez votre commentaire ici..." 
                  className="min-h-[120px] bg-black border-white/10 focus:ring-[#FFD700] rounded-xl text-white placeholder:text-zinc-500"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button type="submit" className="bg-black text-white hover:bg-zinc-800 rounded-full px-8 font-bold">
                    Publier
                  </Button>
                </div>
              </form>

              <div className="space-y-6">
                {commentsList.map(item => (
                  <div key={item.id} className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border border-black/5">
                    <div className="h-10 w-10 rounded-full bg-[#FFD700] flex items-center justify-center font-bold text-black shrink-0">
                      {item.user[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-bold text-black">{item.user}</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">{item.date}</span>
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {item.text}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="text-[10px] font-bold text-[#FFD700] hover:underline uppercase tracking-widest">Répondre</button>
                        <button className="text-[10px] font-bold text-zinc-400 hover:text-red-500 uppercase tracking-widest">Signaler</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR (Related) ── */}
          <aside className="w-full lg:w-[320px] space-y-10">
            {/* Featured Selection */}
            <div>
              <h4 className="font-poppins text-sm font-black uppercase tracking-[0.2em] mb-6 text-black flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FFD700]" />
                À lire aussi
              </h4>
              <div className="space-y-6">
                {ARTICLE.related.map((item, i) => (
                  <Link key={i} href="#" className="group block">
                    <div className="overflow-hidden rounded-xl bg-zinc-100 mb-3 aspect-[16/10]">
                      <img src={item.image} alt="" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-[#FFD700]">{item.category}</span>
                    <h5 className="mt-1 font-poppins text-sm font-bold text-black group-hover:text-zinc-600 transition leading-snug">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter card */}
            <div className="p-6 bg-black rounded-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-poppins text-lg font-bold mb-2">Restez informé</h4>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  Recevez les dernières nouvelles du Cap-Haïtien directement dans votre boîte mail.
                </p>
                <div className="space-y-2">
                  <Input placeholder="Votre email" className="bg-white/10 border-white/20 text-white placeholder:text-zinc-500 h-9 text-xs" />
                  <Button className="w-full bg-[#FFD700] text-black font-bold h-9 text-xs hover:bg-[#FFD700]/90 transition">S'inscrire</Button>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-[#FFD700]/10 rounded-full blur-3xl" />
            </div>

            {/* Ad Placeholder */}
            <div className="aspect-[4/5] bg-zinc-100 rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-dashed border-zinc-300">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Publicité</span>
              <p className="text-xs text-zinc-400">Boostez votre visibilité sur Sakapfet Okap</p>
              <Button variant="outline" className="mt-4 border-black/10 text-xs font-bold h-8">En savoir plus</Button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
