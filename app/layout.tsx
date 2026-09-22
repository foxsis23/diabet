import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import QueryProvider from './QueryProvider'
import { SITE_URL } from '@/data/site'

const nunito = Nunito({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'тиск.net — Тиск під контролем без страху',
  description:
    'Безкоштовна перевірка тиску за 2 хвилини і відеокурс: що означають цифри на тонометрі, як тримати тиск у нормі й не панікувати.',
  openGraph: {
    title: 'тиск.net — Тиск під контролем без страху',
    description: 'Перевірка тиску за 2 хвилини та відеокурс про життя з гіпертонією без страху.',
    locale: 'uk_UA',
    type: 'website',
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'тиск.net' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
