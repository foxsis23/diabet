import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import TestFlow from '@/components/test/TestFlow'

export const metadata: Metadata = {
  title: 'Перевірка тиску — тиск.net',
  description: 'Вкажіть показники тонометра й дізнайтесь категорію тиску за рекомендаціями ESC/ESH та свої фактори ризику.',
}

export default function TestPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-ink mb-2">Перевірка тиску</h1>
            <p className="text-muted-ink text-sm">
              Класифікація ESC/ESH · 10 запитань · ~2 хвилини · Без реєстрації
            </p>
          </div>
          <TestFlow />
        </div>
      </main>
    </>
  )
}
