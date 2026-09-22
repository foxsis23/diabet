import type { Metadata } from 'next'
import Header from '@/components/shared/Header'

export const metadata: Metadata = {
  title: 'Медичне застереження — тиск.net',
}

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-extrabold text-ink mb-8">Медичне застереження</h1>
          <div className="bg-white border border-line rounded-3xl p-8 text-sm leading-relaxed space-y-4 text-ink-soft">
            <p className="font-bold text-base text-ink">Важлива інформація</p>
            <p>
              Усі матеріали на сайті тиск.net мають виключно інформаційний та освітній характер.
              Вони <strong>не є медичною консультацією</strong> і не замінюють діагностику або
              лікування лікарем.
            </p>
            <p>
              Перевірка тиску на сайті визначає категорію за вказаними вами цифрами (класифікація
              ESC/ESH) і не є діагнозом. Діагноз «гіпертонія» встановлює лікар за повторними
              вимірюваннями.
            </p>
            <p>
              <strong>Не змінюйте дозування ліків від тиску</strong> на підставі матеріалів сайту
              без погодження з лікарем.
            </p>
            <p className="font-semibold text-ink">Негайно викликайте швидку (103), якщо:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>тиск 180/110 і вище разом із сильним головним болем, нудотою чи порушенням зору;</li>
              <li>з’явився біль або тиснення в грудях, задишка;</li>
              <li>раптово оніміла половина обличчя чи тіла, порушилась мова;</li>
              <li>з’явилися сплутаність свідомості або сильна слабкість.</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
