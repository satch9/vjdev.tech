import type { Service } from './types'

export const services: Service[] = [
  {
    slug: 'creation-site-vitrine',
    title: 'Sites vitrines',
    text: 'Un site clair, rapide et lisible sur téléphone, pour être trouvé et contacté.',
    seoTitle: 'Création de site vitrine à La Réunion · VJDev',
    metaDescription: 'Un site vitrine clair, rapide et lisible sur téléphone pour votre entreprise ou association à La Réunion. Cadrage, développement et mise en ligne.',
    h1: 'Création de site vitrine à La Réunion',
    intro: 'Un site clair, rapide et lisible sur téléphone, pour qu\'on vous trouve et qu\'on vous contacte. Je pars de ce que vous faites et de ce que vos clients cherchent, puis je le mets en ligne.',
    sections: [
      {
        title: 'Un site qui reçoit aussi vos demandes',
        paragraphs: [
          'Un site vitrine peut faire plus que présenter votre activité : il peut recueillir des demandes complètes, prêtes à traiter. C\'est ce que j\'ai mis en place pour une entreprise de transport, avec un formulaire guidé et un tableau de bord des demandes. Voir l\'exemple du [site de demandes de transport freightworkshop.re](/projets/freightworkshop).',
          'Si vous devez gérer des données au quotidien (commandes, adhérents, stocks), il vous faut plutôt une [application métier sur mesure](/services/application-metier-sur-mesure).'
        ]
      }
    ],
    audience: [
      'Artisans et indépendants qui veulent être trouvés sur Google',
      'Commerces et restaurants qui veulent montrer leur offre et leurs horaires',
      'Associations et clubs qui veulent présenter leurs activités et recevoir des inscriptions',
      'TPE qui veulent remplacer un site daté ou une simple page Facebook'
    ],
    deliverablesTitle: 'Ce que vous obtenez',
    deliverables: [
      'Un site pensé d\'abord pour le téléphone, puis pour l\'ordinateur',
      'Des pages qui présentent vos services, avec des textes cadrés ensemble',
      'Un formulaire de contact ou de demande adapté à votre activité',
      'Les bases du référencement : titres, descriptions, adresse et zone d\'intervention',
      'Les pages légales : mentions légales et confidentialité',
      'La mise en ligne sur un hébergement sécurisé'
    ],
    process: 'Vous racontez votre projet, je prépare des questions ciblées, on valide une note de cadrage, puis je développe et je mets en ligne.',
    relatedProjects: ['freightworkshop', 'club1'],
    relatedOtherProjects: [],
    faq: [
      {
        question: 'Combien de temps faut-il pour créer un site vitrine ?',
        answer: 'Cela dépend du nombre de pages et de la rapidité à rassembler les textes et les photos. Le délai est fixé dans la note de cadrage, avant le début du développement.'
      },
      {
        question: 'Combien coûte un site vitrine ?',
        answer: 'Le prix dépend du nombre de pages et des fonctions nécessaires (formulaire, demande de devis, espace client…). Après notre premier échange, je vous envoie une proposition chiffrée basée sur le cadrage.'
      },
      {
        question: 'Je n\'ai pas encore de textes ni de photos, est-ce un problème ?',
        answer: 'Non. On définit ensemble le contenu de chaque page pendant le cadrage, et je vous aide à structurer vos textes.'
      },
      {
        question: 'Pourrai-je modifier mon site moi-même ?',
        answer: 'Les petites modifications et les évolutions passent par moi. Si vous avez besoin de mettre à jour régulièrement une partie du site (actualités, carte, horaires), on le prévoit dès le cadrage.'
      },
      {
        question: 'Vous occupez-vous du nom de domaine et de l\'hébergement ?',
        answer: 'Oui, je m\'occupe de la mise en ligne et je peux gérer pour vous le nom de domaine et l\'hébergement.'
      },
      {
        question: 'Mon site sera-t-il visible sur Google ?',
        answer: 'Il sera construit pour être bien compris par les moteurs de recherche : pages rapides, titres et descriptions travaillés, informations locales. Le positionnement dépend aussi de la concurrence et de votre fiche Google Business Profile, que je vous aide à configurer.'
      }
    ]
  },
  {
    slug: 'application-metier-sur-mesure',
    title: 'Applications métier sur mesure',
    text: 'Caisse, réservations, commandes, suivi client : un outil taillé pour votre façon de travailler.',
    seoTitle: 'Application métier sur mesure à La Réunion · VJDev',
    metaDescription: 'Caisse, réservations, commandes en ligne, suivi client : une application conçue pour votre façon de travailler. Développeur web à Saint-André, La Réunion.',
    h1: 'Application métier sur mesure à La Réunion',
    intro: 'Quand un tableur devient ingérable ou qu\'un logiciel du marché vous oblige à contourner ses limites, je conçois un outil taillé pour votre façon de travailler : caisse, réservations, commandes, suivi client. Pour les clubs, commerces, restaurants et entreprises de l\'île.',
    sections: [
      {
        title: 'Les signes qu\'un outil sur mesure vous ferait gagner du temps',
        items: [
          'Vous ressaisissez les mêmes informations dans deux ou trois fichiers.',
          'Votre caisse, vos stocks et vos adhérents vivent dans des outils qui ne se parlent pas.',
          'Un logiciel par abonnement vous facture des fonctions que vous n\'utilisez pas, et pas celle dont vous avez besoin.',
          'Une seule personne sait comment « marche » le fichier Excel, et tout s\'arrête quand elle est absente.',
          'Vos chiffres de fin de mois demandent une journée de compilation.'
        ]
      },
      {
        title: 'Exemple : une caisse pour un club de tennis de l\'île',
        paragraphs: [
          'Un club de tennis avait besoin de tenir sa caisse au quotidien et de préparer son bilan comptable. J\'ai développé une caisse web qui gère les encaissements en espèces, chèque et carte par sessions de caisse, les stocks avec alertes de réapprovisionnement, les comptes adhérents à crédit et débit, et les rapports pour le bilan. Chaque utilisateur a un rôle et des droits adaptés.',
          'Le détail est dans l\'[étude de cas de la caisse du club de tennis](/projets/club1).'
        ]
      },
      {
        title: 'Sous le capot',
        paragraphs: [
          'J\'utilise des technologies standards et répandues : React et TypeScript pour l\'interface, Node.js et Express pour le serveur, MySQL pour les données. L\'application fonctionne dans le navigateur, sans installation, et un autre développeur peut la reprendre.',
          'Besoin d\'automatiser une tâche précise plutôt que de créer une application complète ? Voir les [outils internes et l\'automatisation](/services/outils-internes-automatisation).'
        ]
      }
    ],
    audience: [
      'Clubs et associations qui gèrent adhérents, encaissements et stocks',
      'Restaurants et commerces qui veulent prendre des commandes en ligne',
      'Entreprises dont l\'activité repose sur des tableurs devenus ingérables',
      'Porteurs de projet qui veulent lancer une plateforme en ligne'
    ],
    deliverablesTitle: 'Ce que vous obtenez',
    deliverables: [
      'Une application web accessible sur ordinateur, tablette et téléphone, sans installation',
      'Des comptes utilisateurs avec rôles et permissions',
      'Les écrans de votre métier : caisse, commandes, stocks, réservations, suivi',
      'Des rapports et des exports pour votre comptabilité ou votre bilan',
      'Le paiement en ligne si votre activité en a besoin',
      'La mise en ligne sur un hébergement sécurisé, puis le suivi des évolutions'
    ],
    process: 'On cadre d\'abord ce qui sera fait, ce qui ne le sera pas, et dans quel ordre. Le cahier des charges sert de référence commune. Vous testez au fil du développement.',
    relatedProjects: ['club1', 'plateforme-reunion', 'madoc'],
    relatedOtherProjects: [],
    faq: [
      {
        question: 'Pourquoi du sur mesure plutôt qu\'un logiciel existant ?',
        answer: 'Un logiciel du marché vous oblige à adapter votre fonctionnement au sien. Le sur-mesure a du sens quand votre façon de travailler est particulière, ou quand vous payez plusieurs outils qui ne communiquent pas entre eux.'
      },
      {
        question: 'Combien coûte une application métier ?',
        answer: 'Le coût dépend du périmètre. Le cadrage sert justement à définir une première version utile, puis à prévoir les évolutions par étapes. Vous recevez une proposition chiffrée avant tout développement.'
      },
      {
        question: 'Puis-je commencer petit ?',
        answer: 'Oui, c\'est même conseillé. On démarre avec les fonctions indispensables, vous l\'utilisez, puis on ajoute ce dont vous avez vraiment besoin.'
      },
      {
        question: 'Mes données sont-elles en sécurité ?',
        answer: 'L\'application est hébergée sur un serveur sécurisé, avec des accès par compte et par rôle. Les données sont sauvegardées régulièrement.'
      },
      {
        question: 'Combien de temps faut-il pour une première version ?',
        answer: 'Cela dépend de la complexité du projet. À titre d\'exemple, la première version d\'un outil de gestion récent m\'a demandé deux semaines. Le délai précis est fixé dans la note de cadrage, avant le développement.'
      },
      {
        question: 'Qui s\'occupe de l\'application après la mise en ligne ?',
        answer: 'Je reste votre interlocuteur pour les corrections et les évolutions.'
      }
    ]
  },
  {
    slug: 'outils-internes-automatisation',
    title: 'Outils internes et automatisation',
    text: 'Moins de ressaisie et de tableurs : vos tâches répétitives prises en charge par un outil simple.',
    seoTitle: 'Outils internes et automatisation à La Réunion · VJDev',
    metaDescription: 'Moins de ressaisie, moins de tableurs : des outils simples pour automatiser les tâches répétitives de votre entreprise ou association à La Réunion.',
    h1: 'Outils internes et automatisation à La Réunion',
    intro: 'Copier des chiffres d\'un fichier à l\'autre, relancer les cotisations une par une, refaire le même récapitulatif chaque lundi : je conçois des outils simples qui prennent en charge ces tâches répétitives, pour les entreprises et associations de La Réunion.',
    sections: [
      {
        title: 'Outil interne ou application métier ?',
        paragraphs: [
          'Une [application métier sur mesure](/services/application-metier-sur-mesure) gère toute une activité : caisse, commandes, adhérents. Un outil interne règle une seule tâche qui revient souvent. Il se livre plus vite, coûte moins cher, et c\'est souvent le bon point de départ.'
        ]
      },
      {
        title: 'Exemple : une liste de courses qui se remplit à partir des tickets de caisse',
        paragraphs: [
          'J\'ai développé une liste de courses partagée qui se remplit à partir des tickets de caisse, et se met à jour en direct sur deux téléphones. Le même principe s\'applique à une entreprise : lire des factures fournisseurs, des bons de livraison ou des notes de frais pour éviter de les ressaisir.'
        ]
      },
      {
        title: 'Combien de temps allez-vous gagner ?',
        paragraphs: [
          'Avant de développer, on chiffre ensemble : combien de fois la tâche revient, combien de minutes elle prend, qui la fait. Une saisie de 20 minutes par jour représente environ 75 heures par an. Si l\'outil coûte moins que ces heures, il est rentable ; sinon, je vous le dis.'
        ]
      }
    ],
    audience: [
      'Les équipes qui ressaisissent les mêmes informations dans plusieurs fichiers',
      'Les gérants qui passent leurs soirées sur des tableurs',
      'Les associations qui gèrent inscriptions, cotisations et relances à la main',
      'Toute structure qui veut un tableau de bord clair au lieu de chiffres éparpillés'
    ],
    deliverablesTitle: 'Exemples de ce que je peux automatiser',
    deliverables: [
      'Lire un document (ticket, facture, bon de commande) et en extraire les informations',
      'Centraliser des fichiers éparpillés dans un outil unique, accessible à toute l\'équipe',
      'Générer automatiquement des documents : récapitulatifs, exports, rapports',
      'Envoyer des rappels et des relances au bon moment',
      'Afficher vos indicateurs dans un tableau de bord à jour'
    ],
    process: 'On part d\'une tâche précise qui vous fait perdre du temps, je vous propose un outil qui la règle, puis on étend si c\'est utile.',
    relatedProjects: ['plateforme-reunion'],
    relatedOtherProjects: ['Liste de courses partagée'],
    faq: [
      {
        question: 'Ma tâche est petite, est-ce que ça vaut le coup ?',
        answer: 'Si elle revient chaque semaine, souvent oui. On estime ensemble le temps gagné avant de se lancer.'
      },
      {
        question: 'Faut-il remplacer les outils que j\'utilise déjà ?',
        answer: 'Pas forcément. L\'outil peut partir de vos fichiers existants (exports, tableurs) pour éviter la ressaisie.'
      },
      {
        question: 'Mon équipe n\'est pas à l\'aise avec l\'informatique.',
        answer: 'L\'outil est conçu pour faire une chose simplement, avec le moins d\'écrans possible. Il s\'utilise depuis un navigateur ou un téléphone.'
      },
      {
        question: 'Mes données restent-elles privées ?',
        answer: 'Oui. L\'outil est hébergé sur un serveur sécurisé et n\'est accessible qu\'avec vos comptes.'
      },
      {
        question: 'Et si le format de mes fichiers change ?',
        answer: 'L\'outil est ajusté dans le cadre du suivi après la mise en ligne.'
      },
      {
        question: 'Combien ça coûte ?',
        answer: 'C\'est souvent le format le plus léger : un outil ciblé sur une tâche. Vous recevez une proposition chiffrée après le cadrage.'
      }
    ]
  }
]

export function findService(slug: string) {
  return services.find((s) => s.slug === slug)
}

export function servicesForProject(projectSlug: string) {
  return services.filter((s) => s.relatedProjects.includes(projectSlug))
}
