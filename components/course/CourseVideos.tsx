'use client'

import { useEffect, useState } from 'react'
import { Play, Lock, Clock } from 'lucide-react'
import ProtectedPlayer from './ProtectedPlayer'

interface Lesson {
  title: string
  url: string | null
}

interface Props {
  token: string
}

export default function CourseVideos({ token }: Props) {
  const [lessons, setLessons] = useState<Lesson[] | null>(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  // Плеєр вантажиться лише після кліку
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/course-videos?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Не вдалося завантажити уроки')
        return json as { videos: Lesson[]; email?: string }
      })
      .then((json) => {
        if (cancelled) return
        setLessons(json.videos)
        setEmail(json.email ?? '')
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message)
      })
    return () => {
      cancelled = true
    }
  }, [token])

  if (error) {
    return (
      <div className="flex items-start gap-3 bg-honey/15 border border-honey/30 rounded-2xl p-4">
        <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-amber-800 text-sm">{error}</p>
      </div>
    )
  }

  if (!lessons) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-clay border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!lessons.length) {
    return <p className="text-muted-ink text-sm">Уроки скоро з’являться.</p>
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson, i) => (
        <div key={lesson.title} className="rounded-2xl overflow-hidden border border-line bg-white">
          {openIndex === i && lesson.url ? (
            <ProtectedPlayer url={lesson.url} title={lesson.title} email={email} autoplay />
          ) : (
            <button
              type="button"
              disabled={!lesson.url}
              onClick={() => setOpenIndex(i)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-sand/50 disabled:hover:bg-transparent disabled:cursor-default transition-colors cursor-pointer"
            >
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  lesson.url ? 'bg-clay' : 'bg-line'
                }`}
              >
                {lesson.url ? (
                  <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                ) : (
                  <Clock className="w-4 h-4 text-muted-ink" />
                )}
              </span>
              <span>
                <span className="block text-xs text-muted-ink mb-0.5">
                  Урок {i + 1}
                  {!lesson.url && ' · скоро'}
                </span>
                <span className="block text-ink font-semibold">{lesson.title}</span>
              </span>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
