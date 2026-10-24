import { contact, telHref, mailHref, whatsappHref } from '../data/contact'

const rows = [
  { label: 'Téléphone', value: contact.phoneDisplay, href: telHref },
  { label: 'WhatsApp', value: contact.phoneDisplay, href: whatsappHref },
  { label: 'E-mail', value: contact.email, href: mailHref }
]

export function Contact() {
  return (
    <section id="contact" className="bg-ink text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-14 sm:px-8">
        <h2 className="text-3xl font-bold">Parlons de votre projet</h2>
        <p className="max-w-[55ch] text-lg text-white/90">Un appel, un message WhatsApp ou un e-mail : je vous réponds rapidement.</p>
        <dl className="grid gap-4 sm:grid-cols-3">
          {rows.map((row) => (
            <div key={row.label} className="flex min-w-0 flex-col gap-1 border-t border-lagon pt-3">
              <dt className="font-mono text-xs uppercase tracking-wide text-lagon">{row.label}</dt>
              <dd className="select-all break-words text-lg">
                <a href={row.href} target={row.href.startsWith('https') ? '_blank' : undefined} rel={row.href.startsWith('https') ? 'noopener noreferrer' : undefined} data-umami-event="contact" data-umami-event-canal={row.label} className="hover:text-lagon focus-visible:outline-white">
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
