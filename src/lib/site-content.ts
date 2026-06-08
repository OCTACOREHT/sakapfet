export const YOUTUBE_CHANNEL_URL =
  "https://youtube.com/@sakapfetokap?si=aqVZc90oqzlux_oN";

export const CONTACT_EMAIL = "contact@sakapfetokap.org";
export const ADS_EMAIL = "partenariats@sakapfetokap.org";
export const NEWSLETTER_EMAIL = "newsletter@sakapfetokap.org";

export type Story = {
  title: string;
  summary: string;
  image: string;
  category: string;
  href: string;
  time: string;
};

export type SectionDefinition = {
  slug: string;
  label: string;
  kicker: string;
  description: string;
  color: string;
  featured: Story;
  stories: Story[];
};

const articleHref = "/actualites/okap-flavors";

function makeStory(
  category: string,
  title: string,
  summary: string,
  image: string,
  time: string,
): Story {
  return {
    title,
    summary,
    image,
    category,
    href: articleHref,
    time,
  };
}

export const sectionDefinitions: SectionDefinition[] = [
  {
    slug: "culture",
    label: "Gonaives",
    kicker: "Territoire, memoire, creation",
    description:
      "Festivals, patrimoine, artistes et savoir-faire qui racontent le Grand Nord.",
    color: "#E67E22",
    featured: makeStory(
      "Culture",
      "Okap Flavors met la gastronomie du Cap-Haitien au premier plan",
      "Une vitrine concrete pour les chefs, artisans et producteurs du Nord d'Haiti.",
      "/images/hero-food.png",
      "Il y a 45 minutes",
    ),
    stories: [
      makeStory(
        "Culture",
        "La Saint-Jacques rassemble habitants, artistes et visiteurs",
        "Une tradition toujours vivante qui structure le calendrier culturel regional.",
        "/images/festival.png",
        "Il y a 3 heures",
      ),
      makeStory(
        "Histoire",
        "Sans-Souci reste un signal fort pour le tourisme culturel",
        "Le patrimoine du Nord peut devenir un actif editorial et economique majeur.",
        "/images/palace.png",
        "Il y a 6 heures",
      ),
      makeStory(
        "Societe",
        "De jeunes reporters documentent les scenes culturelles locales",
        "Une nouvelle generation de voix mediatise les initiatives du territoire.",
        "/images/journalism.png",
        "Il y a 9 heures",
      ),
    ],
  },
  {
    slug: "economie",
    label: "Jacmel",
    kicker: "Commerce, investissement, initiatives",
    description:
      "Suivi des activites economiques, de l'emploi local et des opportunites pour la region.",
    color: "#27AE60",
    featured: makeStory(
      "Economie",
      "Les producteurs du Nord cherchent plus de debouches locaux",
      "Transformation, distribution et mise en marche des produits regionaux.",
      "/images/artisan.png",
      "Il y a 1 heure",
    ),
    stories: [
      makeStory(
        "Tourisme",
        "La diaspora soutient des projets d'accueil dans le Nord",
        "Plusieurs initiatives ciblent l'hebergement, la restauration et les circuits locaux.",
        "/images/palace.png",
        "Il y a 4 heures",
      ),
      makeStory(
        "Environnement",
        "Des actions de nettoyage renforcent l'attractivite du front de mer",
        "L'image du Cap-Haitien reste un enjeu direct pour l'activite economique.",
        "/images/environment.png",
        "Il y a 7 heures",
      ),
      makeStory(
        "Societe",
        "Les medias communautaires aident les petits acteurs a gagner en visibilite",
        "Couverture locale et audience numerique peuvent accelerer la confiance commerciale.",
        "/images/journalism.png",
        "Il y a 10 heures",
      ),
    ],
  },
  {
    slug: "evenements",
    label: "Port-au-Prince",
    kicker: "Agenda, terrain, mobilisations",
    description:
      "Le calendrier des rendez-vous locaux, des lives et des temps forts communautaires.",
    color: "#C0392B",
    featured: makeStory(
      "Evenements",
      "Okap Flavors confirme son role de rendez-vous populaire",
      "Participation forte, couverture video, relais terrain et engagement du public.",
      "/images/hero-food.png",
      "En direct",
    ),
    stories: [
      makeStory(
        "Evenements",
        "Le festival de la Saint-Jacques relance les activations locales",
        "Commercants, habitants et visiteurs se retrouvent autour d'un programme dense.",
        "/images/festival.png",
        "Il y a 2 heures",
      ),
      makeStory(
        "Culture",
        "Des rencontres autour du patrimoine attirent un public plus jeune",
        "Le format reportage rend le contenu plus accessible et partageable.",
        "/images/palace.png",
        "Il y a 5 heures",
      ),
      makeStory(
        "Societe",
        "Ateliers communautaires et couverture mediatique montent en puissance",
        "Les acteurs locaux cherchent des formats plus reguliers et mieux diffuses.",
        "/images/journalism.png",
        "Il y a 8 heures",
      ),
    ],
  },
  {
    slug: "sports",
    label: "Port-de-Paix",
    kicker: "Jeunesse, clubs, competition",
    description:
      "Le sport local comme espace de cohesion, de visibilite et de mobilisation communautaire.",
    color: "#8E44AD",
    featured: makeStory(
      "Sports",
      "Les tournois de quartier retrouvent une vraie place dans la couverture locale",
      "Clubs, supporters et jeunes talents gagnent en exposition sur les plateformes video.",
      "/images/festival.png",
      "Il y a 1 heure",
    ),
    stories: [
      makeStory(
        "Sports",
        "Des coachs demandent plus de diffusion pour les competitions locales",
        "Une presence video reguliere peut faire monter la valeur percue des rencontres.",
        "/images/journalism.png",
        "Il y a 3 heures",
      ),
      makeStory(
        "Societe",
        "Le sport sert aussi de canal de mobilisation communautaire",
        "Les associations locales s'appuient sur ces evenements pour reunir le public.",
        "/images/environment.png",
        "Il y a 6 heures",
      ),
      makeStory(
        "Culture",
        "La couverture sportive s'insere dans l'identite du territoire",
        "Les formats courts et lives renforcent la diffusion locale et diasporique.",
        "/images/artisan.png",
        "Il y a 11 heures",
      ),
    ],
  },
  {
    slug: "societe",
    label: "Les Cayes",
    kicker: "Vie locale, citoyennete, proximite",
    description:
      "Initiatives de quartier, enjeux sociaux, terrain et parole communautaire.",
    color: "#3498DB",
    featured: makeStory(
      "Societe",
      "Le journalisme communautaire donne de la place aux voix du Nord",
      "Une information de proximite mieux structuree peut renforcer la confiance du public.",
      "/images/journalism.png",
      "Il y a 50 minutes",
    ),
    stories: [
      makeStory(
        "Environnement",
        "Les operations citoyennes de nettoyage gagnent en coordination",
        "Le relais media aide les initiatives locales a durer au-dela d'un seul evenement.",
        "/images/environment.png",
        "Il y a 4 heures",
      ),
      makeStory(
        "Culture",
        "La couverture des artisans locaux cree un lien direct avec le public",
        "Les portraits et reportages rendent les initiatives concretes et memorables.",
        "/images/artisan.png",
        "Il y a 7 heures",
      ),
      makeStory(
        "Haiti",
        "La diaspora suit de plus pres les sujets de proximite",
        "Les formats clairs et video rendent l'information plus partageable hors du pays.",
        "/images/palace.png",
        "Il y a 9 heures",
      ),
    ],
  },
  {
    slug: "politique",
    label: "Jeremie",
    kicker: "Decision publique et impact local",
    description:
      "Lecture locale des decisions, de la gouvernance et de leurs effets sur le terrain.",
    color: "#E74C3C",
    featured: makeStory(
      "Politique",
      "Les sujets publics du Nord demandent plus de contextualisation locale",
      "Le public attend des formats plus clairs, plus factuels et plus proches du terrain.",
      "/images/journalism.png",
      "Il y a 2 heures",
    ),
    stories: [
      makeStory(
        "Societe",
        "Les associations reclament une information plus suivie sur les decisions locales",
        "Le media peut jouer un role de traduction et de mise en contexte.",
        "/images/environment.png",
        "Il y a 5 heures",
      ),
      makeStory(
        "Economie",
        "L'environnement des affaires reste sensible a la stabilite locale",
        "Une lecture claire des enjeux publics aide les acteurs economiques a se projeter.",
        "/images/artisan.png",
        "Il y a 8 heures",
      ),
      makeStory(
        "Haiti",
        "Le public cherche des reperes fiables plus que des reactions bruyantes",
        "Une ligne editoriale sobre renforce la credibilite du media.",
        "/images/palace.png",
        "Il y a 12 heures",
      ),
    ],
  },
  {
    slug: "technologie",
    label: "Hinche",
    kicker: "Numerique utile et diffusion",
    description:
      "Outils, usages numeriques et transformation des contenus pour le public local.",
    color: "#2C3E50",
    featured: makeStory(
      "Technologie",
      "La video devient le principal point d'entree pour toucher la diaspora",
      "Site, mobile et YouTube doivent fonctionner ensemble pour renforcer la marque media.",
      "/images/journalism.png",
      "Il y a 1 heure",
    ),
    stories: [
      makeStory(
        "Technologie",
        "Le direct social change les attentes du public",
        "Les visiteurs veulent du live, des extraits clairs et des pages rapides a charger.",
        "/images/festival.png",
        "Il y a 4 heures",
      ),
      makeStory(
        "Education",
        "Les formats explicatifs courts sont plus faciles a relayer",
        "Infographies, recap et clips video rendent l'info plus accessible.",
        "/images/environment.png",
        "Il y a 7 heures",
      ),
      makeStory(
        "Opinions",
        "La credibilite repose autant sur la forme que sur le fond",
        "Pages completes, contacts visibles et preuves de publication comptent autant que le design.",
        "/images/palace.png",
        "Il y a 10 heures",
      ),
    ],
  },
  {
    slug: "education",
    label: "Miragoane",
    kicker: "Jeunesse, formation, transmission",
    description:
      "Ecoles, projets educatifs, apprentissage communautaire et initiatives pour la jeunesse.",
    color: "#1ABC9C",
    featured: makeStory(
      "Education",
      "Former de jeunes voix locales renforce l'ecosysteme media regional",
      "L'education aux medias peut produire des contenus plus rigoureux et mieux diffuses.",
      "/images/journalism.png",
      "Il y a 2 heures",
    ),
    stories: [
      makeStory(
        "Societe",
        "Des ateliers de terrain structurent les nouvelles contributions",
        "La formation permet d'ameliorer autant le fond que la qualite de presentation.",
        "/images/environment.png",
        "Il y a 5 heures",
      ),
      makeStory(
        "Culture",
        "Le patrimoine devient un support d'apprentissage local",
        "Les contenus culturels sont aussi un moyen de transmission intergenerationnelle.",
        "/images/palace.png",
        "Il y a 8 heures",
      ),
      makeStory(
        "Technologie",
        "Le numerique ouvre de nouveaux canaux de diffusion pedagogique",
        "Formats courts, lives et reels peuvent prolonger l'impact editorial.",
        "/images/festival.png",
        "Il y a 11 heures",
      ),
    ],
  },
  {
    slug: "sante",
    label: "Saint-Marc",
    kicker: "Prevention, acces, information claire",
    description:
      "Une couverture utile, simple et locale autour des enjeux de sante publique.",
    color: "#16A085",
    featured: makeStory(
      "Sante",
      "La prevention a besoin de formats plus accessibles pour toucher le public",
      "L'information utile gagne en impact lorsqu'elle est diffusee dans un langage clair.",
      "/images/environment.png",
      "Il y a 3 heures",
    ),
    stories: [
      makeStory(
        "Societe",
        "Les campagnes publiques gagnent a etre mieux contextualisees localement",
        "Le media joue un role de relais credible quand il reste concret et lisible.",
        "/images/journalism.png",
        "Il y a 6 heures",
      ),
      makeStory(
        "Education",
        "Les formats de sensibilisation courts peuvent mieux circuler",
        "Video, article recap et visuels simples restent les plus efficaces.",
        "/images/festival.png",
        "Il y a 9 heures",
      ),
      makeStory(
        "Haiti",
        "Le public attend des informations pratiques avant des discours generaux",
        "Le traitement editorial doit privilegier l'utilite et la verification.",
        "/images/palace.png",
        "Il y a 12 heures",
      ),
    ],
  },
  {
    slug: "haiti",
    label: "Fort-Liberte",
    kicker: "Lecture nationale avec ancrage local",
    description:
      "Le pays vu depuis le Nord, avec un angle utile pour la communaute et la diaspora.",
    color: "#34495E",
    featured: makeStory(
      "Haiti",
      "Le Nord veut une lecture nationale qui parte du terrain",
      "Le traitement local des sujets nationaux aide a sortir du commentaire abstrait.",
      "/images/palace.png",
      "Il y a 1 heure",
    ),
    stories: [
      makeStory(
        "Politique",
        "Les decisions nationales doivent etre relues a l'echelle des territoires",
        "Le public comprend mieux lorsqu'on montre l'impact concret.",
        "/images/journalism.png",
        "Il y a 4 heures",
      ),
      makeStory(
        "Diaspora",
        "Les Haitiens de l'exterieur veulent des signaux fiables depuis le Nord",
        "Le site et YouTube peuvent devenir un point de reference regulier.",
        "/images/environment.png",
        "Il y a 8 heures",
      ),
      makeStory(
        "Culture",
        "La couverture du patrimoine relie territoire et narration nationale",
        "Les histoires locales peuvent renforcer l'image globale du pays.",
        "/images/festival.png",
        "Il y a 11 heures",
      ),
    ],
  },
  {
    slug: "monde",
    label: "Ouanaminthe",
    kicker: "Ouvertures et reperes",
    description:
      "Regards internationaux utiles au public local sans perdre l'ancrage haitien.",
    color: "#5D6D7E",
    featured: makeStory(
      "Monde",
      "Les enjeux internationaux interessent surtout lorsqu'ils touchent la vie locale",
      "Migration, commerce, medias et diaspora restent les sujets les plus suivis.",
      "/images/environment.png",
      "Il y a 2 heures",
    ),
    stories: [
      makeStory(
        "Diaspora",
        "Les reseaux diasporiques relaient les contenus du territoire",
        "La video reste le canal le plus rapide pour sortir du cercle local.",
        "/images/journalism.png",
        "Il y a 6 heures",
      ),
      makeStory(
        "Haiti",
        "Le regard mondial sur Haiti influence aussi la confiance locale",
        "Un media credible doit maitriser sa presentation autant que son contenu.",
        "/images/palace.png",
        "Il y a 9 heures",
      ),
      makeStory(
        "Technologie",
        "Les plateformes changent la facon de distribuer l'information",
        "La page videos et les CTA clairs renforcent la perception de serieux.",
        "/images/festival.png",
        "Il y a 12 heures",
      ),
    ],
  },
  {
    slug: "diaspora",
    label: "Petit-Goave",
    kicker: "Lien, relais, rayonnement",
    description:
      "Les histoires, projets et connexions entre le Nord et les communautes a l'exterieur.",
    color: "#9B59B6",
    featured: makeStory(
      "Diaspora",
      "La diaspora suit d'abord les contenus qui sentent le terrain",
      "Pour convaincre, il faut montrer des preuves de presence, de cadence et de diffusion.",
      "/images/journalism.png",
      "Il y a 1 heure",
    ),
    stories: [
      makeStory(
        "Tourisme",
        "Les projets de retour et de visite ont besoin de reperes media solides",
        "Un site structure et une chaine YouTube active renforcent la confiance.",
        "/images/palace.png",
        "Il y a 5 heures",
      ),
      makeStory(
        "Culture",
        "Les grands evenements locaux restent de puissants points de connexion",
        "La diffusion video maintient le lien avec les communautes exterieures.",
        "/images/festival.png",
        "Il y a 8 heures",
      ),
      makeStory(
        "Economie",
        "La visibilite des acteurs locaux facilite partenariats et soutien",
        "Le media peut jouer un role concret de mise en relation.",
        "/images/artisan.png",
        "Il y a 11 heures",
      ),
    ],
  },
  {
    slug: "tourisme",
    label: "Leogane",
    kicker: "Destination, patrimoine, experience",
    description:
      "Le Nord comme territoire a vivre, documenter et rendre visible de facon credible.",
    color: "#F39C12",
    featured: makeStory(
      "Tourisme",
      "Le patrimoine du Cap-Haitien reste un levier fort de desirabilite",
      "Images, reportages et videos peuvent faire monter la confiance des visiteurs.",
      "/images/palace.png",
      "Il y a 2 heures",
    ),
    stories: [
      makeStory(
        "Culture",
        "Les festivals locaux structurent l'image du territoire",
        "La couverture editoriale transforme un evenement en actif de marque.",
        "/images/festival.png",
        "Il y a 4 heures",
      ),
      makeStory(
        "Economie",
        "Les artisans et restaurateurs ont besoin d'une meilleure vitrine",
        "Le contenu editorial peut soutenir la valeur percue de l'offre locale.",
        "/images/artisan.png",
        "Il y a 7 heures",
      ),
      makeStory(
        "Environnement",
        "L'image du littoral compte autant que l'offre touristique",
        "Les initiatives visibles de proprete et d'entretien rassurent le public.",
        "/images/environment.png",
        "Il y a 10 heures",
      ),
    ],
  },
  {
    slug: "opinions",
    label: "Mirebalais",
    kicker: "Points de vue et analyses",
    description:
      "Une rubrique pour la lecture, l'argument et les debats utiles au territoire.",
    color: "#7F8C8D",
    featured: makeStory(
      "Opinions",
      "Un media local convainc quand son discours rejoint ses preuves visibles",
      "Contact, lignes editoriales, pages completes et diffusion active font la difference.",
      "/images/journalism.png",
      "Il y a 1 heure",
    ),
    stories: [
      makeStory(
        "Technologie",
        "La forme du site influence directement la perception du fond",
        "Un client regarde d'abord la coherence, la completude et la friction utilisateur.",
        "/images/environment.png",
        "Il y a 3 heures",
      ),
      makeStory(
        "Diaspora",
        "La confiance se gagne aussi par des points d'entree evidents",
        "Une page videos et des preuves de publication rassurent vite.",
        "/images/festival.png",
        "Il y a 7 heures",
      ),
      makeStory(
        "Economie",
        "Les partenaires veulent voir un support diffusable et exploitable",
        "Le media doit donner envie d'acheter de la visibilite, pas seulement d'etre lu.",
        "/images/artisan.png",
        "Il y a 11 heures",
      ),
    ],
  },
];

export const sectionBySlug = Object.fromEntries(
  sectionDefinitions.map((section) => [section.slug, section]),
) as Record<string, SectionDefinition>;

export const allNewsStories = sectionDefinitions.flatMap((section) => [
  section.featured,
  ...section.stories,
]);
