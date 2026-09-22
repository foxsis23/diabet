import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import { SUPPORT_EMAIL, SUPPORT_TELEGRAM } from '@/data/site'

export const metadata: Metadata = {
  title: 'Контакти — діабет.net',
}

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-ink mb-8">Контакти</h1>
          <div className="bg-white rounded-2xl border border-line p-8 space-y-6">
            <div>
              <h2 className="font-semibold text-ink mb-2">Підтримка</h2>
              <p className="text-ink-soft text-sm">
                Для запитів щодо продуктів, технічних проблем або повернення коштів:
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-clay-dark hover:text-clay-dark text-sm font-medium mt-1 block"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div>
              <h2 className="font-semibold text-ink mb-2">Telegram</h2>
              <p className="text-ink-soft text-sm mb-1">Швидка підтримка:</p>
              <a
                href={`https://t.me/${SUPPORT_TELEGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay-dark hover:text-clay-dark text-sm font-medium"
              >
                @{SUPPORT_TELEGRAM}
              </a>
            </div>

            <div>
              <h2 className="font-semibold text-ink mb-2">Реквізити</h2>
              <div className="text-ink-soft text-sm space-y-1">
                <p>ТОВ «ФІНАНС-СЕРВІС»</p>
                <p>ЄДРПОУ: 35380629</p>
                <p>02100, м. Київ, вул. Георгія Тороповского, 14</p>
                <p>Тел.: (095) 825-45-08</p>
                <p>
                  Пошта для юридичних питань:{' '}
                  <a href="mailto:info@fins.com.ua" className="text-clay-dark hover:text-clay-dark">
                    info@fins.com.ua
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 text-sm text-muted-ink">
              Відповідаємо протягом 24 годин у робочі дні.
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
