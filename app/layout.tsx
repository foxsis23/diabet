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
  title: 'біль.net — Жити без постійного болю',
  description:
    'Безкоштовна перевірка болю за 2 хвилини і відеокурс: чому біль стає хронічним, як його полегшити й повернутися до руху.',
  openGraph: {
    title: 'біль.net — Жити без постійного болю',
    description: 'Перевірка болю за 2 хвилини та відеокурс про життя без постійного болю.',
    locale: 'uk_UA',
    type: 'website',
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'біль.net' }],
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
