// Instance temporaire de la caisse sur la base de test (données fictives), servie en local
const caisseLogin = { url: 'http://localhost:8090/login', emailVar: 'CAISSE_DEMO_EMAIL', passwordVar: 'CAISSE_DEMO_PASSWORD' }
const besoinLogin = { url: 'http://localhost:5175/login', emailVar: 'BESOIN_EMAIL', passwordVar: 'BESOIN_PASSWORD' }

export const targets = [
  { name: 'freightworkshop-1', url: 'https://freightworkshop.re/', clickText: 'Tout refuser' },
  { name: 'freightworkshop-2', url: 'https://freightworkshop.re/', scrollY: 800, clickText: 'Tout refuser' },
  { name: 'freightworkshop-3', url: 'https://freightworkshop.re/transport-request', clickText: 'Tout refuser' },
  { name: 'club1-1', urlVar: 'CLUB_HOME_URL', anonymize: true },
  { name: 'club1-2', url: 'http://localhost:8090/caisse', anonymize: true, login: caisseLogin },
  { name: 'club1-3', url: 'http://localhost:8090/stock/dashboard', anonymize: true, login: caisseLogin },
  { name: 'club1-4', urlVar: 'CLUB_EVENTS_URL', anonymize: true },
  { name: 'club1-5', urlVar: 'CLUB_CHALLENGE_URL', anonymize: true },
  { name: 'madoc-1', url: 'https://madoc.vjdev.tech/' },
  { name: 'madoc-2', url: 'https://madoc.vjdev.tech/demo' },
  { name: 'madoc-3', url: 'https://madoc.vjdev.tech/', scrollTo: '#features' },
  { name: 'madoc-4', url: 'https://madoc.vjdev.tech/', scrollTo: '#pricing' },
  { name: 'plateforme-reunion-1', url: 'https://reunion.vjdev.tech/chez-paul' },
  { name: 'plateforme-reunion-2', url: 'https://reunion.vjdev.tech/chez-paul', clickText: 'Ajouter Bol renversé poulet' },
  {
    name: 'plateforme-reunion-3',
    url: 'https://reunion.vjdev.tech/chez-paul',
    clicks: [
      { role: 'button', name: 'Ajouter Bol renversé poulet' },
      { role: 'button', name: 'Ajouter au panier' },
      { role: 'button', name: 'Ajouter Samoussas (x4)' },
      { role: 'button', name: 'Ajouter au panier' },
      { role: 'link', name: 'Commander' }
    ]
  },
  { name: 'methode-1', urlVar: 'BESOIN_BRIEF_URL', login: besoinLogin, hide: ['header'] },
  { name: 'methode-2', urlVar: 'BESOIN_QUESTIONS_URL', login: besoinLogin, hide: ['header'] },
  { name: 'methode-3', urlVar: 'BESOIN_NOTE_URL', login: besoinLogin, hide: ['header'] },
  { name: 'methode-4', urlVar: 'BESOIN_CAHIER_URL', login: besoinLogin, hide: ['header'] }
]
