import { useRef } from 'react'
import type { Capture } from '../data/types'
import { Shot } from './Shot'

type Props = {
  capture: Capture
  sizes: string
  eager?: boolean
}

export function ZoomableShot({ capture, sizes, eager = false }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Agrandir : ${capture.alt}`}
        className="block w-full cursor-zoom-in"
      >
        <Shot capture={capture} sizes={sizes} eager={eager} />
      </button>
      <dialog
        ref={dialogRef}
        aria-label={capture.alt}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}
        className="max-h-none max-w-none bg-transparent p-4 backdrop:bg-night/80"
      >
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded bg-paper px-3 py-1 font-mono text-sm text-night"
          >
            Fermer
          </button>
          <img
            src={`/${capture.src}-1280.webp`}
            width={1280}
            height={800}
            alt={capture.alt}
            loading="lazy"
            className="block h-auto max-h-[85vh] w-auto max-w-[min(1280px,calc(100vw-2rem))] border border-frame bg-white"
          />
        </div>
      </dialog>
    </>
  )
}
