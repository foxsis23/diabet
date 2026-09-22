import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import Hero from '@/components/landing/Hero'
import WhoItHelps from '@/components/landing/WhoItHelps'
import HowItWorks from '@/components/landing/HowItWorks'
import LessonsCarousel from '@/components/landing/LessonsCarousel'
import Doctor from '@/components/landing/Doctor'
import TrustBlock from '@/components/landing/TrustBlock'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'діабет.net — Тест ризику та відеокурс лікаря',
  description:
    'Перевірте ризик діабету 2 типу за 2 хвилини та дізнайтесь, як тримати цукор у нормі, з відеокурсу лікаря-ендокринолога.',
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhoItHelps />
        <LessonsCarousel />
        <HowItWorks />
        <Doctor />
        <TrustBlock />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
