import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, AlertCircle, TriangleAlert } from 'lucide-react'
import Header from '@/components/shared/Header'
import Footer from '@/components/landing/Footer'
import MedicalDisclaimer from '@/components/shared/MedicalDisclaimer'
import {
  DURATION_NOTE,
  hasRedFlags,
  painDuration,
  painLevel,
  painResult,
  parseAnswers,
  riskFactors,
} from '@/lib/scoring'
import { FACTOR_TIPS } from '@/data/questions'
import { PainLevel } from '@/types'

export const metadata: Metadata = {
  title: 'Ваш результат — біль.net',
  robots: { index: false },
}

const SCALE: { level: PainLevel; label: string; color: string }[] = [
  { level: 'mild', label: '1–3', color: 'bg-honey' },
  { level: 'moderate', label: '4–6', color: 'bg-clay' },
  { level: 'severe', label: '7–10', color: 'bg-clay-dark' },
]

interface PageProps {
  searchParams: Promise<{ a?: string }>
}

export default async function ResultPage({ searchParams }: PageProps) {
  const answers = parseAnswers((await searchParams).a)
  if (!answers) redirect('/test')

  const level = painLevel(answers)
  const result = painResult(level)
  const factors = riskFactors(answers)

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
          {hasRedFlags(answers) && (
            <div className="flex gap-3 rounded-3xl bg-red-50 border border-red-200 p-6 text-red-900">
              <TriangleAlert className="w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">Покажіться лікарю найближчими днями</p>
                <p className="text-sm leading-relaxed">
                  Ви відмітили ознаки, які варто перевірити, перш ніж займатися болем самостійно.
                  Якщо різко з’явилась слабкість у ногах, оніміння в ділянці промежини або
                  порушилось сечовипускання — викликайте швидку (103).
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-line p-8 text-center">
            <p className="text-muted-ink text-sm mb-4">Ваш результат</p>
            <div className="grid grid-cols-3 gap-1 mb-6">
              {SCALE.map((s) => (
                <div key={s.level}>
                  <div
                    className={`h-3 rounded-full ${s.color} ${s.level === level ? '' : 'opacity-25'}`}
                  />
                  <div
                    className={`text-xs mt-1 ${
                      s.level === level ? 'text-ink font-bold' : 'text-muted-ink'
                    }`}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <h1 className="text-2xl font-extrabold text-ink mb-3">{result.title}</h1>
            <p className="text-ink-soft leading-relaxed mb-3">{result.text}</p>
            <p className="text-muted-ink text-sm leading-relaxed">
              {DURATION_NOTE[painDuration(answers)]}
            </p>
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
            <h2 className="font-bold text-ink text-lg mb-1">Що підтримує ваш біль</h2>
            {factors.length ? (
              <>
                <p className="text-muted-ink text-sm mb-4">
                  Знайдено {factors.length} — і на кожен можна вплинути.
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
              <p className="text-ink-soft">Помітних підсилювачів болю не знайдено — так тримати.</p>
            )}
          </div>

          <div className="rounded-3xl bg-clay/10 border border-clay/20 p-8 text-center">
            <h2 className="text-xl font-extrabold text-ink mb-2">Розберіться, як працює біль</h2>
            <p className="text-ink-soft mb-6">
              Відеокурс простою мовою: чому біль не минає, що його підсилює і як повернутися до руху.
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
