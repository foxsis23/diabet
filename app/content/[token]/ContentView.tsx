'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/shared/Header'
import { fetchMe } from '@/lib/api'
import { useProducts } from '@/lib/queries'
import CourseVideos from '@/components/course/CourseVideos'
import { COURSE_PRODUCT_ID } from '@/data/courseVideos'

interface Props {
  token: string
  productId: string | null
}

export default function ContentView({ token, productId }: Props) {
  const { data: products = [], isLoading: productsLoading } = useProducts()
  const [allowed, setAllowed] = useState<string[]>([])
  const [meLoading, setMeLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchMe(token)
      .then((ids) => {
        if (!cancelled) setAllowed(ids)
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message || 'Помилка доступу')
      })
      .finally(() => {
        if (!cancelled) setMeLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [token])

  const loading = productsLoading || meLoading

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-clay border-t-transparent rounded-full animate-spin" />
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream">
          <div className="max-w-2xl mx-auto px-4 py-10">
            <p className="text-red-500 text-sm">{error}</p>
            <Link href="/my" className="text-clay-dark text-sm underline">
              ← До моїх матеріалів
            </Link>
          </div>
        </main>
      </>
    )
  }

  const visibleIds = allowed.filter(
    (id) => !productId || id === productId,
  )
  const visibleProducts = products.filter((p) => visibleIds.includes(p.id))

  if (visibleProducts.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream">
          <div className="max-w-2xl mx-auto px-4 py-10">
            <p className="text-muted-ink text-sm mb-4">
              Доступних матеріалів не знайдено.
            </p>
            <Link href="/my" className="text-clay-dark text-sm underline">
              ← Всі матеріали
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <Link
            href="/my"
            className="inline-flex items-center gap-1.5 text-sm text-muted-ink hover:text-ink mb-6 transition-colors"
          >
            ← Всі матеріали
          </Link>

          {visibleProducts.map((p) => (
            <article key={p.id} className="bg-white rounded-2xl border border-line p-8 mb-6">
              <h1 className="text-2xl font-bold text-ink mb-2">{p.title}</h1>
              <p className="text-muted-ink text-sm mb-6">{p.description}</p>
              {p.id === COURSE_PRODUCT_ID ? (
                <CourseVideos token={token} />
              ) : (
                <p className="text-muted-ink text-sm">Матеріал готується.</p>
              )}
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
