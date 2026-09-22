import Link from 'next/link'

// IASP, Global Burden of Disease, настанови ВООЗ щодо болю в спині (2023).
const facts = [
  { value: '1 з 5', label: 'дорослих живе з хронічним болем' },
  { value: '№1', label: 'причина втрати працездатності у світі — біль у спині' },
  { value: '3 міс', label: 'після них біль уже вважають хронічним' },
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
            <h2 className="text-2xl font-extrabold text-ink mb-2">Що підсилює ваш біль?</h2>
            <p className="text-ink-soft">
              Кілька запитань — і ви дізнаєтесь, наскільки біль впливає на життя, чи є тривожні
              ознаки та що саме його підтримує.
            </p>
          </div>
          <Link
            href="/test"
            className="shrink-0 bg-sage-dark hover:bg-sage-dark/90 text-white font-bold px-7 py-3.5 rounded-full transition-colors"
          >
            Перевірити біль →
          </Link>
        </div>
      </div>
    </section>
  )
}
