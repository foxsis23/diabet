'use client'

interface Props {
  url: string
  title: string
  /** Пошта покупця — водяним знаком поверх відео. */
  email?: string
  autoplay?: boolean
}

/**
 * Плеєр Bunny з поштою покупця поверх картинки. Файл і так не завантажити
 * (підписане посилання + DRM у бібліотеці), а знак робить запис екрана
 * відстежуваним.
 */
export default function ProtectedPlayer({ url, title, email, autoplay }: Props) {
  return (
    <div
      className="relative w-full aspect-video bg-black select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <iframe
        src={autoplay ? `${url}&autoplay=true` : url}
        title={title}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 w-full h-full"
      />
      {email && (
        <span
          aria-hidden
          className="wm-drift pointer-events-none absolute z-10 text-white/35 text-xs sm:text-sm font-semibold whitespace-nowrap drop-shadow"
        >
          {email} · діабет.net
        </span>
      )}
    </div>
  )
}
