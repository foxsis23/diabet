'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { createGratiaCheckout } from '@/lib/api'
import { trackEvent } from '@/lib/analytics'

interface Props {
  productId: string
  price: number
  label?: string
}

/**
 * Пошту збираємо тут, на сайті. Бот працює як платіжний термінал: людина
 * переходить за посиланням, бачить рахунок і оплачує — більше нічого.
 */
export default function BuyInTelegram({ productId, price, label }: Props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    trackEvent('gratia_buy_click', { product_id: productId })

    try {
      const { checkoutUrl } = await createGratiaCheckout(productId, email.trim())
      window.location.href = checkoutUrl
    } catch {
      setError('Не вдалося створити замовлення. Спробуйте ще раз.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full border border-line bg-white rounded-2xl px-4 py-3 text-sm mb-1 text-ink placeholder:text-muted-ink focus:outline-none focus:ring-2 focus:ring-clay/40"
      />
      <p className="text-xs text-muted-ink mb-4">
        На цю пошту прив&apos;яжемо доступ — за нею відкриєте матеріали тут, на сайті.
      </p>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full bg-clay hover:bg-clay-dark disabled:opacity-60 text-white font-semibold py-4 rounded-2xl transition-colors text-lg"
      >
        <Send className="w-5 h-5" strokeWidth={2} />
        {loading ? 'Відкриваємо…' : (label ?? `Придбати — ${price} грн`)}
      </button>

      <p className="text-center text-xs text-muted-ink mt-3">
        Оплата проходить у Telegram. Доступ відкриється одразу — і там, і тут.
      </p>
    </form>
  )
}
