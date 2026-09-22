import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Header from '@/components/shared/Header'
import Footer from '@/components/landing/Footer'
import MedicalDisclaimer from '@/components/shared/MedicalDisclaimer'
import { bpLevel, bpResult, parseAnswers, riskFactors } from '@/lib/scoring'
import { FACTOR_TIPS } from '@/data/questions'
import { BpLevel } from '@/types'

export const metadata: Metadata = {
  title: 'Ваш тиск — тиск.net',
  robots: { index: false },
}

// Шкала від оптимального до 3 ступеня: колір і позиція маркера.
const SCALE: { level: BpLevel; label: string; color: string }[] = [
  { level: 'optimal', label: '<120/80', color: 'bg-sage' },
  { level: 'normal', label: '120–129', color: 'bg-sage' },
  { level: 'high_normal', label: '130–139', color: 'bg-honey' },
  { level: 'grade1', label: '140–159', color: 'bg-honey' },
  { level: 'grade2', label: '160–179', color: 'bg-clay' },
  { level: 'grade3', label: '180+', color: 'bg-red-500' },
]

interface PageProps {
  searchParams: Promise<{ a?: string }>
}

export default async function ResultPage({ searchParams }: PageProps) {
  const answers = parseAnswers((await searchParams).a)
  if (!answers) redirect('/test')

  const level = bpLevel(answers)
  const result = bpResult(level)
  const factors = riskFactors(answers)

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
          <div className="bg-white rounded-3xl border border-line p-8 text-center">
            <p className="text-muted-ink text-sm mb-4">Ваш результат</p>

            {level !== 'unknown' && (
              <div className="grid grid-cols-6 gap-1 mb-6">
                {SCALE.map((s) => (
                  <div key={s.level}>
                    <div
                      className={`h-3 rounded-full ${s.color} ${s.level === level ? '' : 'opacity-25'}`}
                    />
                    <div
                      className={`text-[10px] sm:text-xs mt-1 ${
                        s.level === level ? 'text-ink font-bold' : 'text-muted-ink'
                      }`}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h1 className="text-2xl font-extrabold text-ink mb-3">{result.title}</h1>
            <p className="text-ink-soft leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white rounded-3xl border border-line p-8">
            <h2 className="font-bold text-ink text-lg mb-4">Що зробити зараз</h2>
            <ul className="space-y-3">
              {result.steps.map((step) => (
                <li key={step} className="flex gap-3 text-ink-soft">
                  <CheckCircle2 className="w-5 h-5 text-sage-dark shrink-0 mt-0.5" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-line p-8">
            <h2 className="font-bold text-ink text-lg mb-1">Ваші фактори ризику</h2>
            {factors.length ? (
              <>
                <p className="text-muted-ink text-sm mb-4">
                  Знайдено {factors.length} — і більшість із них можна змінити.
                </p>
                <ul className="space-y-3">
                  {factors.map((id) => (
                    <li key={id} className="flex gap-3 text-ink-soft">
                      <AlertCircle className="w-5 h-5 text-honey shrink-0 mt-0.5" />
                      {FACTOR_TIPS[id]}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-ink-soft">Суттєвих факторів ризику не знайдено — так тримати.</p>
            )}
          </div>

          <div className="rounded-3xl bg-clay/10 border border-clay/20 p-8 text-center">
            <h2 className="text-xl font-extrabold text-ink mb-2">Розберіться в тиску спокійно</h2>
            <p className="text-ink-soft mb-6">
              Відеокурс простою мовою: що означають цифри, чому тиск стрибає і як тримати його в нормі.
            </p>
            <Link
              href="/course"
              className="inline-block bg-clay hover:bg-clay-dark text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              Дивитись програму курсу →
            </Link>
          </div>

          <MedicalDisclaimer />

          <p className="text-center">
            <Link href="/test" className="text-muted-ink hover:text-ink text-sm underline">
              Пройти перевірку ще раз
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
