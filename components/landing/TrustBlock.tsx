import Link from 'next/link'

// IDF Diabetes Atlas (2025) і дослідження Diabetes Prevention Program.
const facts = [
  { value: '1 з 9', label: 'дорослих у світі живе з діабетом' },
  { value: '4 з 10', label: 'не знають про свій діагноз' },
  { value: '−58%', label: 'ризику діабету 2 типу дає зміна харчування й руху' },
  { value: '2 хв', label: 'займає тест ризику FINDRISC' },
]

export default function TrustBlock() {
  return (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {facts.map((f) => (
            <div key={f.value} className="text-center bg-white rounded-3xl border border-line p-6">
              <div className="text-3xl font-extrabold text-clay mb-2">{f.value}</div>
              <div className="text-muted-ink text-sm leading-snug">{f.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] bg-sage/15 border border-sage/30 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-ink mb-2">Не знаєте свій ризик?</h2>
            <p className="text-ink-soft">
              8 запитань фінської шкали FINDRISC — і ви дізнаєтесь імовірність діабету 2 типу на 10
              років уперед.
            </p>
          </div>
          <Link
            href="/test"
            className="shrink-0 bg-sage-dark hover:bg-sage-dark/90 text-white font-bold px-7 py-3.5 rounded-full transition-colors"
          >
            Пройти тест →
          </Link>
        </div>
      </div>
    </section>
  )
}
