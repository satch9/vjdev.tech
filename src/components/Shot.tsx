import type { Capture } from '../data/types'

type Props = {
  capture: Capture
  sizes: string
  eager?: boolean
}

export function Shot({ capture, sizes, eager = false }: Props) {
  return (
    <img
      src={`/${capture.src}-1280.webp`}
      srcSet={`/${capture.src}-640.webp 640w, /${capture.src}-1280.webp 1280w`}
      sizes={sizes}
      width={1280}
      height={800}
      alt={capture.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="block h-auto w-full border border-frame bg-white"
    />
  )
}
