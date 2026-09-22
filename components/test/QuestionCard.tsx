import { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  onSelect: (index: number) => void
}

export default function QuestionCard({ question, selectedAnswer, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-line p-6 sm:p-8">
      <h2 className="text-xl font-bold text-ink mb-2 leading-snug">{question.text}</h2>
      {question.hint && <p className="text-muted-ink text-sm mb-6">{question.hint}</p>}

      <div className={`space-y-3 ${question.hint ? '' : 'mt-6'}`}>
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 text-sm leading-relaxed cursor-pointer ${
              selectedAnswer === index
                ? 'border-clay bg-clay/10 text-ink font-semibold'
                : 'border-line hover:border-clay/40 hover:bg-sand/50 text-ink-soft'
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  )
}
