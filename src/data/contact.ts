export const contact = {
  name: 'Vincent',
  role: 'Développeur web',
  city: 'Saint-André',
  region: 'La Réunion',
  email: 'viny1976@gmail.com',
  phoneDisplay: '0692 18 31 23',
  phoneIntl: '+262692183123',
  sameAs: [
    'https://www.google.com/search?kgmid=/g/11zybfg47g',
    'https://www.linkedin.com/in/vincent-jue-0b076b14'
  ]
}

export const telHref = `tel:${contact.phoneIntl}`
export const mailHref = `mailto:${contact.email}`
export const whatsappHref = `https://wa.me/${contact.phoneIntl.slice(1)}`
