import type { Metadata } from 'next'
import Header from '@/components/shared/Header'

export const metadata: Metadata = {
  title: 'Медичне застереження — діабет.net',
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
              Усі матеріали на сайті діабет.net мають виключно інформаційний та освітній характер.
              Вони <strong>не є медичною консультацією</strong> і не замінюють діагностику або
              лікування лікарем.
            </p>
            <p>
              Тест FINDRISC оцінює ризик діабету 2 типу, але не ставить діагноз. Діагноз
              встановлює лікар за результатами аналізів (глюкоза натще, HbA1c,
              глюкозотолерантний тест).
            </p>
            <p>
              <strong>Не змінюйте дозування ліків чи інсуліну</strong> на підставі матеріалів сайту
              без погодження з лікарем.
            </p>
            <p className="font-semibold text-ink">Негайно зверніться по медичну допомогу, якщо:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>цукор нижче 3,9 ммоль/л і не піднімається після солодкого;</li>
              <li>цукор понад 15 ммоль/л разом зі спрагою, нудотою, запахом ацетону;</li>
              <li>з’явилися сплутаність свідомості, сильна слабкість, утруднене дихання;</li>
              <li>на стопі є рана, що не загоюється, або почорніння шкіри.</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
