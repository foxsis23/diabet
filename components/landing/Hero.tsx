import Image from 'next/image'
import Link from 'next/link'
import { HeartPulse, Leaf, Clock } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-clay/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-24 w-[26rem] h-[26rem] rounded-full bg-sage/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-sage/15 text-sage-dark text-sm font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-sage rounded-full" />
            Авторський курс Єлизавети Скидиненко
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-ink mb-6 leading-tight">
            Високий тиск — не вирок.{' '}
            <span className="text-clay">Його можна тримати під контролем</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-soft mb-10 leading-relaxed">
            Відеоуроки простою мовою: що означають цифри на тонометрі, чому тиск стрибає, як
            знижувати його без крайнощів і коли час до лікаря. Без страшилок і складних термінів.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/course"
              className="text-center bg-clay hover:bg-clay-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-clay/25"
            >
              Дивитись курс →
            </Link>
            <Link
              href="/test"
              className="text-center border-2 border-line hover:border-clay text-ink font-semibold px-6 py-3.5 rounded-full transition-colors"
            >
              Перевірити свій тиск безкоштовно
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-ink">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-clay" />
              <span>Доказова медицина</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-sage-dark" />
              <span>Практичні поради</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-honey" />
              <span>Доступ назавжди</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/5] max-w-md w-full mx-auto">
          <div className="absolute inset-0 rounded-[3rem] bg-sand rotate-3" />
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-xl shadow-ink/10 bg-sand">
            <Image
              src="/images/hero.webp"
              alt="Спокійна усміхнена жінка вдома в затишному світлі"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 448px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
