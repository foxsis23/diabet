const steps = [
  {
    number: '01',
    title: 'Залиште пошту',
    description: 'На неї прив’яжемо доступ — за нею ж будете входити на сайт.',
  },
  {
    number: '02',
    title: 'Оплатіть у Telegram',
    description: 'Рахунок відкриється в боті, оплата займає хвилину.',
  },
  {
    number: '03',
    title: 'Дивіться уроки',
    description: 'Бот поверне вас на сайт — курс уже відкритий у «Моїх матеріалах».',
  },
  {
    number: '04',
    title: 'Повертайтесь будь-коли',
    description: 'Доступ назавжди: переглядайте уроки, коли потрібно освіжити знання.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-ink mb-4">Як отримати курс</h2>
          <p className="text-muted-ink text-lg">Чотири прості кроки — і уроки ваші</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-3xl p-6 border border-line">
              <div className="text-4xl font-extrabold text-honey/60 mb-4">{step.number}</div>
              <h3 className="font-bold text-ink mb-2">{step.title}</h3>
              <p className="text-muted-ink text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
