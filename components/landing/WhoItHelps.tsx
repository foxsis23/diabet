import { Stethoscope, Users, ShieldCheck, Activity, type LucideIcon } from 'lucide-react'

const cards: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Stethoscope,
    title: 'Щойно поставили діагноз',
    description: 'Розберетесь, що відбувається в організмі, і перестанете боятися — крок за кроком.',
  },
  {
    Icon: Activity,
    title: 'Цукор «скаче»',
    description: 'Зрозумієте, чому глюкоза коливається і чому це не привід для паніки.',
  },
  {
    Icon: ShieldCheck,
    title: 'Переддіабет або ризик',
    description: 'Дізнаєтесь, що зробити зараз, щоб діабет так і не розвинувся.',
  },
  {
    Icon: Users,
    title: 'Турбуєтесь про близьку людину',
    description: 'Знатимете, як підтримати маму, тата чи дитину — і не помилитися з їжею й ліками.',
  },
]

export default function WhoItHelps() {
  return (
    <section className="py-20 px-4 bg-sand/60">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-ink mb-4">Кому допоможе курс</h2>
          <p className="text-muted-ink text-lg max-w-2xl mx-auto">
            Для тих, хто живе з діабетом 2 типу, має переддіабет або доглядає за рідними
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map(({ Icon, title, description }) => (
            <div key={title} className="flex gap-4 p-6 bg-white rounded-3xl border border-line">
              <div className="w-12 h-12 bg-clay/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-clay" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-bold text-ink mb-1">{title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
