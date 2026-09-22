import type { Metadata } from 'next'
import Header from '@/components/shared/Header'

export const metadata: Metadata = {
  title: 'Медичне застереження — біль.net',
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
              Усі матеріали на сайті біль.net мають виключно інформаційний та освітній характер.
              Вони <strong>не є медичною консультацією</strong> і не замінюють діагностику або
              лікування лікарем.
            </p>
            <p>
              Перевірка болю на сайті допомагає оцінити силу болю та фактори, що його підтримують,
              але не є діагнозом. Причину болю встановлює лікар.
            </p>
            <p>
              <strong>Не змінюйте дозування знеболювальних та інших ліків</strong> на підставі
              матеріалів сайту без погодження з лікарем.
            </p>
            <p className="font-semibold text-ink">Негайно викликайте швидку (103), якщо:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>раптово з’явилась слабкість або оніміння в ногах, у ділянці промежини;</li>
              <li>порушилось сечовипускання чи контроль кишечника;</li>
              <li>біль у грудях, задишка, раптовий найсильніший у житті головний біль;</li>
              <li>біль виник після серйозної травми або супроводжується високою температурою.</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
