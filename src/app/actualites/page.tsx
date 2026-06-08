import { SectionPage } from "@/components/pages/section-page";
import { sectionDefinitions } from "@/lib/site-content";

const actualitesSection = {
  slug: "actualites",
  label: "Okap",
  kicker: "Couverture editoriale",
  description:
    "Le fil principal des sujets publies par Sakapfet Okap autour du Grand Nord, de la culture, des initiatives locales et des temps forts communautaires.",
  color: "#111111",
  featured: sectionDefinitions[0].featured,
  stories: sectionDefinitions.slice(0, 3).flatMap((section) => section.stories.slice(0, 1)),
};

export default function ActualitesPage() {
  return <SectionPage section={actualitesSection} />;
}
