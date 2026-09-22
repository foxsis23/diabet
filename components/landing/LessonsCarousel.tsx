'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Play, Lock, ChevronLeft, ChevronRight } from 'lucide-react'
import { LESSON_PREVIEWS, COURSE_PRODUCT_ID } from '@/data/courseVideos'
import { useSessionStore, isSessionValid } from '@/lib/sessionStore'
import ProtectedPlayer from '@/components/course/ProtectedPlayer'
import { trackEvent } from '@/lib/analytics'

const N = LESSON_PREVIEWS.length

// Позиція картки відносно активної з урахуванням кільця:
// ліворуч від першої стоїть остання, тому порожнечі не буває.
function relative(index: number, active: number) {
  let d = index - active
  if (d > N / 2) d -= N
  if (d < -N / 2) d += N
  return d
}

export default function LessonsCarousel() {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const [playingUrl, setPlayingUrl] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const sessionToken = useSessionStore((s) => s.sessionToken)
  const sessionExpiresAt = useSessionStore((s) => s.sessionExpiresAt)
  const purchased = useSessionStore((s) => s.purchasedProductIds)

  const hasCourse =
    isSessionValid(sessionToken, sessionExpiresAt) && purchased.includes(COURSE_PRODUCT_ID)

  const go = (next: number) => {
    setActive((next + N) % N)
    setPlayingUrl(null) // перегорнули — зупиняємо попереднє відео
  }

  const handlePlay = async (index: number) => {
    if (!hasCourse) {
      trackEvent('click_locked_lesson', { lesson: index + 1 })
      router.push('/course')
      return
    }
    // Посилання підписує сервер і лише після перевірки оплати
    setLoading(true)
    try {
      const res = await fetch(`/api/course-videos?token=${encodeURIComponent(sessionToken!)}`, {
        cache: 'no-store',
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      const url = json.videos?.[index]?.url
      if (url) {
        setPlayingUrl(url)
        setEmail(json.email ?? '')
        trackEvent('play_lesson', { lesson: index + 1 })
      }
    } catch {
      router.push('/course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="videos" className="py-20 bg-cream overflow-hidden">
      <div className="px-4 text-center mb-12">
        <h2 className="text-3xl font-extrabold text-ink mb-4">Відеокурс: {N} уроків</h2>
        <p className="text-muted-ink text-lg max-w-2xl mx-auto">
          {hasCourse
            ? 'Ваш курс — дивіться прямо тут'
            : 'Перегляд уроків відкривається після оплати курсу'}
        </p>
      </div>

      <div className="relative">
        <div className="vg vg-mask relative w-full">
          {LESSON_PREVIEWS.map((lesson, i) => {
            const r = relative(i, active)
            const isActive = r === 0
            const isNeighbour = Math.abs(r) === 1
            return (
              <div
                key={lesson.title}
                className={`vg-item absolute left-1/2 top-0 transition-all duration-500 ease-out ${
                  isActive ? 'z-20' : 'z-10'
                } ${isNeighbour ? 'opacity-40 blur-[3px]' : isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ '--r': r, '--s': isActive ? 1 : 0.7 } as React.CSSProperties}
                aria-hidden={!isActive && !isNeighbour}
              >
                <div
                  className={`relative aspect-video rounded-3xl overflow-hidden border bg-sand ${
                    isActive ? 'border-clay/30 shadow-2xl shadow-ink/15' : 'border-line'
                  }`}
                >
                  {isActive && playingUrl ? (
                    <ProtectedPlayer url={playingUrl} title={lesson.title} email={email} autoplay />
                  ) : (
                    <button
                      type="button"
                      onClick={() => (isActive ? handlePlay(i) : go(i))}
                      aria-label={
                        isActive
                          ? hasCourse
                            ? `Дивитись: ${lesson.title}`
                            : `Купити курс, щоб подивитись: ${lesson.title}`
                          : `Перейти до: ${lesson.title}`
                      }
                      className="group absolute inset-0 w-full h-full cursor-pointer"
                    >
                      {lesson.poster ? (
                        <Image
                          src={lesson.poster}
                          alt={lesson.title}
                          fill
                          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 66vw, 820px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="absolute inset-0 bg-gradient-to-br from-honey/40 via-sand to-sage/40 flex items-end p-6 sm:p-10">
                          <span className="text-left">
                            <span className="block text-clay-dark font-bold text-sm mb-1">Урок {i + 1}</span>
                            <span className="block text-ink font-extrabold text-xl sm:text-3xl leading-tight max-w-lg">
                              {lesson.title}
                            </span>
                          </span>
                        </span>
                      )}
                      <span
                        className={`absolute inset-0 transition-colors ${
                          isActive ? 'bg-ink/10 group-hover:bg-ink/0' : 'bg-cream/60'
                        }`}
                      />
                      {isActive && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-16 h-16 rounded-full bg-clay/95 group-hover:bg-clay-dark flex items-center justify-center transition-colors shadow-lg shadow-ink/25">
                            {loading ? (
                              <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : hasCourse ? (
                              <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                            ) : (
                              <Lock className="w-6 h-6 text-white" />
                            )}
                          </span>
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Попередній урок"
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 border border-line hover:border-clay/50 backdrop-blur-sm flex items-center justify-center text-ink transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Наступний урок"
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 border border-line hover:border-clay/50 backdrop-blur-sm flex items-center justify-center text-ink transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4">
        <p className="text-center text-ink font-semibold text-lg mt-10 mb-2">
          <span className="text-muted-ink text-sm block mb-1">Урок {active + 1} з {N}</span>
          {LESSON_PREVIEWS[active].title}
        </p>

        {!hasCourse && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => router.push('/course')}
              className="bg-clay hover:bg-clay-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-clay/25 cursor-pointer"
            >
              Відкрити всі {N} уроків →
            </button>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-8">
          {LESSON_PREVIEWS.map((lesson, i) => (
            <button
              key={lesson.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Урок ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === active ? 'w-8 bg-clay' : 'w-2 bg-line hover:bg-muted-ink/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
