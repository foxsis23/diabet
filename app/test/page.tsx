import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import TestFlow from '@/components/test/TestFlow'

export const metadata: Metadata = {
  title: 'Тест ризику діабету 2 типу (FINDRISC) — діабет.net',
  description: '8 запитань фінської шкали FINDRISC: дізнайтесь свій ризик діабету 2 типу на 10 років.',
}

export default function TestPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-ink mb-2">Тест ризику діабету 2 типу</h1>
            <p className="text-muted-ink text-sm">
              Шкала FINDRISC · 8 запитань · ~2 хвилини · Без реєстрації
            </p>
          </div>
          <TestFlow />
        </div>
      </main>
    </>
  )
}
