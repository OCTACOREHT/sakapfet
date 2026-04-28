import { notFound } from "next/navigation";

import { AboutPage } from "@/components/pages/about-page";
import { ContactPage } from "@/components/pages/contact-page";
import { LegalPage } from "@/components/pages/legal-page";
import { NewsletterLandingPage } from "@/components/pages/newsletter-landing-page";
import { SectionPage } from "@/components/pages/section-page";
import { VideosPage } from "@/components/pages/videos-page";
import { sectionDefinitions, sectionBySlug } from "@/lib/site-content";

const legalPages = {
  "politique-confidentialite": {
    title: "Politique de confidentialite",
    kicker: "Confidentialite",
    paragraphs: [
      "Sakapfet Okap collecte uniquement les informations necessaires au fonctionnement du site, aux demandes de contact et aux inscriptions volontaires a la newsletter.",
      "Les informations partagees par les visiteurs ne sont pas revendues. Elles servent a repondre aux demandes, a gerer la relation editoriale et a ameliorer la presentation du media.",
      "Les visiteurs peuvent demander la suppression ou la mise a jour de leurs informations via les points de contact affiches sur le site.",
    ],
  },
  conditions: {
    title: "Conditions d'utilisation",
    kicker: "Conditions",
    paragraphs: [
      "Les contenus publies sur Sakapfet Okap sont proposes a titre informatif et editorial. Leur reutilisation doit respecter les credits et les autorisations necessaires.",
      "Le site peut contenir des liens vers des plateformes tierces, notamment YouTube. Leur consultation reste soumise aux conditions de ces services.",
      "Sakapfet Okap se reserve le droit de faire evoluer le contenu, la structure et les services proposes sur le site afin de renforcer la qualite editoriale et la diffusion.",
    ],
  },
} satisfies Record<string, { title: string; kicker: string; paragraphs: string[] }>;

export function generateStaticParams() {
  return [
    ...sectionDefinitions.map((section) => ({ slug: section.slug })),
    { slug: "videos" },
    { slug: "a-propos" },
    { slug: "contact" },
    { slug: "newsletter" },
    { slug: "politique-confidentialite" },
    { slug: "conditions" },
  ];
}

export default function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const section = sectionBySlug[params.slug];

  if (section) {
    return <SectionPage section={section} />;
  }

  if (params.slug === "videos") {
    return <VideosPage />;
  }

  if (params.slug === "a-propos") {
    return <AboutPage />;
  }

  if (params.slug === "contact") {
    return <ContactPage />;
  }

  if (params.slug === "newsletter") {
    return <NewsletterLandingPage />;
  }

  if (params.slug in legalPages) {
    const legalPage = legalPages[params.slug as keyof typeof legalPages];
    return <LegalPage {...legalPage} />;
  }

  notFound();
}

