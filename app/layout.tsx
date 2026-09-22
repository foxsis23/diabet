import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import QueryProvider from './QueryProvider'

const nunito = Nunito({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://xn--80achg9d0f.net'),
  title: 'діабет.net — Жити з діабетом спокійно',
  description:
    'Безкоштовний тест ризику діабету 2 типу (FINDRISC) і відеокурс лікаря: харчування, цукор, інсулін, ускладнення — просто і по суті.',
  openGraph: {
    title: 'діабет.net — Жити з діабетом спокійно',
    description: 'Тест ризику за 2 хвилини та відеокурс лікаря-ендокринолога.',
    locale: 'uk_UA',
    type: 'website',
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'діабет.net' }],
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
