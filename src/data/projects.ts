import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'freightworkshop',
    name: 'freightworkshop.re',
    seoTitle: 'freightworkshop.re, site de transport à La Réunion · Étude de cas',
    metaDescription: 'Site de Freight Workshop, transport maritime, routier et ferroviaire : présentation des services, demandes en ligne et tableau de bord. Next.js, La Réunion.',
    sections: [
      {
        title: 'Avant le site',
        paragraphs: [
          'Les demandes de transport arrivaient par e-mail, sans format commun, mêlées au reste de la messagerie.'
        ]
      },
      {
        title: 'Des demandes complètes, rangées dans un tableau de bord',
        paragraphs: [
          'Le formulaire de demande recueille d\'emblée les informations utiles au devis. Chaque demande est enregistrée en base de données, et Freight Workshop les retrouve toutes dans un tableau de bord dédié, au lieu de les chercher dans ses e-mails.'
        ]
      },
      {
        title: 'Choix techniques',
        paragraphs: [
          'Le site est développé avec Next.js et React. Les pages sont générées côté serveur : elles s\'affichent vite sur téléphone et sont lisibles immédiatement par les moteurs de recherche, ce qui compte pour une entreprise qui veut être trouvée.'
        ]
      },
      {
        title: 'Un besoin similaire ?',
        paragraphs: [
          'Vous recevez vos demandes par e-mail ou par téléphone et perdez du temps à les compléter ? Un [site vitrine avec formulaire de demande](/services/creation-site-vitrine) règle ce problème. Et si vous voulez gérer ces demandes jusqu\'au bout, c\'est une [application métier sur mesure](/services/application-metier-sur-mesure).'
        ]
      }
    ],
    kind: 'client',
    sector: 'Logistique',
    summary: 'Un site pour présenter ses services et recevoir les demandes de transport en ligne.',
    context: 'Freight Workshop accompagne ses clients dans l\'expédition de marchandises par voie maritime, routière et ferroviaire.',
    need: 'Présenter les trois modes de transport simplement et permettre aux clients de demander un transport en quelques clics.',
    delivered: [
      'Site vitrine présentant les services maritime, routier et ferroviaire',
      'Formulaire de demande de transport',
      'Espace client avec connexion',
      'Tableau de bord des demandes reçues, alimenté par la base de données',
      'Pages légales : CGV, mentions légales, confidentialité'
    ],
    stack: ['Next.js', 'React'],
    url: 'https://freightworkshop.re',
    captures: [
      { src: 'captures/freightworkshop-1', alt: 'Page d\'accueil de freightworkshop.re avec l\'appel à demander un transport' },
      { src: 'captures/freightworkshop-2', alt: 'Section des services maritime, routier et ferroviaire de freightworkshop.re' },
      { src: 'captures/freightworkshop-3', alt: 'Formulaire de demande de transport de marchandises de freightworkshop.re' }
    ]
  },
  {
    slug: 'club1',
    name: 'club1',
    kind: 'client',
    sector: 'Club sportif',
    summary: 'Un site vitrine et une caisse sur mesure pour un club de tennis de l\'île.',
    context: 'Un club de tennis de l\'île avait besoin d\'une présence en ligne et d\'un outil pour tenir sa caisse au quotidien.',
    need: 'Présenter le club et ses activités, puis encaisser, suivre les stocks et préparer les documents comptables du bilan.',
    delivered: [
      'Site vitrine du club',
      'Caisse : encaissements espèces, chèque et carte, sessions de caisse',
      'Gestion des stocks et des approvisionnements, avec alertes',
      'Comptes adhérents à crédit et débit',
      'Rapports pour le bilan comptable',
      'Rôles et permissions par utilisateur'
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Express', 'MySQL'],
    captures: [
      { src: 'captures/club1-1', alt: 'Page d\'accueil du site vitrine du club de tennis' },
      { src: 'captures/club1-2', alt: 'Écran d\'encaissement de la caisse du club, avec données de démonstration' },
      { src: 'captures/club1-3', alt: 'Tableau de bord des stocks de la caisse du club, avec données de démonstration' },
      { src: 'captures/club1-4', alt: 'Agenda des événements du club, filtrable par thème' },
      { src: 'captures/club1-5', alt: 'Page du challenge jeunes du club, avec ses règles de points et ses badges' }
    ]
  },
  {
    slug: 'madoc',
    name: 'MaDoc',
    kind: 'produit',
    sector: 'Présentations',
    summary: 'Une plateforme pour publier et diffuser ses présentations en direct, sur tous les écrans.',
    context: 'Produit conçu et développé de bout en bout, de l\'idée à la mise en ligne, paiement compris.',
    need: 'Mettre des présentations HTML et PowerPoint à disposition d\'un public, les diffuser en direct et les consulter sur ordinateur, tablette ou téléphone.',
    delivered: [
      'Import et lecture de présentations HTML et PowerPoint',
      'Diffusion en direct avec mode présentateur',
      'Communautés, rôles et invitations',
      'Abonnement et paiement en ligne avec Stripe',
      'Administration et statistiques'
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Express', 'MySQL', 'Stripe', 'WebSocket'],
    url: 'https://madoc.vjdev.tech',
    captures: [
      { src: 'captures/madoc-1', alt: 'Page d\'accueil de MaDoc' },
      { src: 'captures/madoc-2', alt: 'Démonstration d\'une présentation dans MaDoc' },
      { src: 'captures/madoc-3', alt: 'Fonctionnalités clés de MaDoc : diffusion multi-écrans, interaction en direct, QR code' },
      { src: 'captures/madoc-4', alt: 'Grille des offres et tarifs de MaDoc' }
    ]
  },
  {
    slug: 'plateforme-reunion',
    name: 'Plateforme Réunion',
    kind: 'produit',
    sector: 'Restauration',
    summary: 'La commande en ligne et le retrait sur place pour les petits restaurateurs réunionnais.',
    context: 'Produit conçu et développé pour les petits restaurants de l\'île.',
    need: 'Permettre à un restaurant de prendre des commandes à emporter avec sa propre boutique en ligne, et de les suivre depuis un espace simple.',
    delivered: [
      'Boutique en ligne par restaurant',
      'Click & collect : commande puis retrait sur place',
      'Espace commerçant pour gérer la carte et les commandes',
      'Console opérateur multi-restaurants'
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Express', 'Drizzle', 'MySQL'],
    url: 'https://reunion.vjdev.tech',
    captures: [
      { src: 'captures/plateforme-reunion-1', alt: 'Boutique en ligne d\'un restaurant de démonstration sur Plateforme Réunion' },
      { src: 'captures/plateforme-reunion-2', alt: 'Choix des options d\'un plat avant l\'ajout au panier' },
      { src: 'captures/plateforme-reunion-3', alt: 'Finalisation de la commande avec choix du créneau de retrait' }
    ]
  }
]

export function findProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
