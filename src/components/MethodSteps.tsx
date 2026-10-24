import { methodSteps, followUp } from '../data/method'
import { ZoomableShot } from './ZoomableShot'

export function MethodSteps() {
  return (
    <section id="methode" className="bg-blueprint">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 sm:px-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Ma méthode</h2>
          <p className="max-w-[60ch] text-slate">Un projet réussi se joue avant la première ligne de code. Voici comment je travaille, illustré avec le projet fictif d'une boulangerie.</p>
        </div>
        <ol className="flex flex-col gap-10 border-t-2 border-night">
          {methodSteps.map((step, index) => (
            <li key={step.title} className="grid gap-4 pt-5 md:grid-cols-[1fr_1.4fr]">
              <div className="flex flex-col gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lagon font-mono text-sm font-medium text-night">{index + 1}</span>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-slate">{step.text}</p>
              </div>
              {step.captures.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {step.captures.map((capture) => (
                    <ZoomableShot key={capture.src} capture={capture} sizes="(min-width: 768px) 300px, 100vw" />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
        <p className="font-mono text-sm text-ink">+ {followUp}</p>
      </div>
    </section>
  )
}
