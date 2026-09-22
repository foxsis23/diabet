import Link from 'next/link'

// ВООЗ, Global report on hypertension (2023).
const facts = [
  { value: '1 з 3', label: 'дорослих у світі має підвищений тиск' },
  { value: '~46%', label: 'не знають про свою гіпертонію' },
  { value: '1 з 5', label: 'тримає тиск під контролем' },
  { value: '2 хв', label: 'займає перевірка на сайті' },
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
            <h2 className="text-2xl font-extrabold text-ink mb-2">Що означають ваші цифри?</h2>
            <p className="text-ink-soft">
              Вкажіть останні показники тонометра — і дізнаєтесь категорію тиску за європейськими
              рекомендаціями та свої фактори ризику.
            </p>
          </div>
          <Link
            href="/test"
            className="shrink-0 bg-sage-dark hover:bg-sage-dark/90 text-white font-bold px-7 py-3.5 rounded-full transition-colors"
          >
            Перевірити тиск →
          </Link>
        </div>
      </div>
    </section>
  )
}
