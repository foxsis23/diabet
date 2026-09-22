'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/data/questions'
import { painLevel } from '@/lib/scoring'
import { trackAnalyticsEvent } from '@/lib/api'
import { trackEvent } from '@/lib/analytics'
import QuestionCard from './QuestionCard'
import ProgressBar from './ProgressBar'

export default function TestFlow() {
  const router = useRouter()
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const currentIndex = answers.length
  const currentQuestion = QUESTIONS[currentIndex]
  const isLast = currentIndex === QUESTIONS.length - 1

  function handleNext() {
    if (selectedAnswer === null) return
    const next = [...answers, selectedAnswer]

    if (isLast) {
      const level = painLevel(next)
      trackEvent('test_completed', { level })
      trackAnalyticsEvent('complete_test', { level, answers: next }).catch(() => {})
      router.push(`/result?a=${next.join(',')}`)
      return
    }
    setAnswers(next)
    setSelectedAnswer(null)
  }

  function handleBack() {
    setSelectedAnswer(answers[answers.length - 1] ?? null)
    setAnswers(answers.slice(0, -1))
  }

  return (
    <div>
      <div className="mb-8">
        <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelect={setSelectedAnswer}
      />

      <div className="mt-6 flex justify-between items-center">
        {currentIndex > 0 ? (
          <button onClick={handleBack} className="text-muted-ink hover:text-ink text-sm cursor-pointer">
            ← Назад
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="bg-clay hover:bg-clay-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-full transition-colors cursor-pointer"
        >
          {isLast ? 'Дізнатись результат' : 'Далі →'}
        </button>
      </div>
    </div>
  )
}
