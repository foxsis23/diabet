import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import Header from '@/components/shared/Header'
import Footer from '@/components/landing/Footer'
import MedicalDisclaimer from '@/components/shared/MedicalDisclaimer'
import { MAX_SCORE, riskFor } from '@/lib/scoring'
import { RiskLevel } from '@/types'

export const metadata: Metadata = {
  title: 'Ваш ризик діабету — діабет.net',
  robots: { index: false },
}

const LEVEL_COLOR: Record<RiskLevel, string> = {
  low: 'bg-sage',
  slight: 'bg-honey',
  moderate: 'bg-honey',
  high: 'bg-clay',
  very_high: 'bg-clay-dark',
}

interface PageProps {
  searchParams: Promise<{ score?: string }>
}

export default async function ResultPage({ searchParams }: PageProps) {
  const score = Number((await searchParams).score)
  if (!Number.isInteger(score) || score < 0 || score > MAX_SCORE) redirect('/test')

  const risk = riskFor(score)

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
          <div className="bg-white rounded-3xl border border-line p-8 text-center">
            <p className="text-muted-ink text-sm mb-2">Ваш результат</p>
            <div className="text-6xl font-extrabold text-ink mb-1">{score}</div>
            <p className="text-muted-ink text-sm mb-6">балів із {MAX_SCORE}</p>

            <div className="w-full bg-line rounded-full h-3 mb-6 overflow-hidden">
              <div
                className={`h-3 rounded-full ${LEVEL_COLOR[risk.level]}`}
                style={{ width: `${Math.max(4, (score / MAX_SCORE) * 100)}%` }}
              />
            </div>

            <h1 className="text-2xl font-extrabold text-ink mb-2">{risk.title}</h1>
            <p className="text-ink-soft mb-1">
              Імовірність діабету 2 типу протягом 10 років — <b>{risk.odds}</b>.
            </p>
            <p className="text-ink-soft leading-relaxed mt-4">{risk.text}</p>
          </div>

          <div className="bg-white rounded-3xl border border-line p-8">
            <h2 className="font-bold text-ink text-lg mb-4">Що зробити зараз</h2>
            <ul className="space-y-3">
              {risk.steps.map((step) => (
                <li key={step} className="flex gap-3 text-ink-soft">
                  <CheckCircle2 className="w-5 h-5 text-sage-dark shrink-0 mt-0.5" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-clay/10 border border-clay/20 p-8 text-center">
            <h2 className="text-xl font-extrabold text-ink mb-2">Розберіться в діабеті спокійно</h2>
            <p className="text-ink-soft mb-6">
              Відеокурс простою мовою: як працюють цукор та інсулін і як жити з діабетом спокійно.
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
              Пройти тест ще раз
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
