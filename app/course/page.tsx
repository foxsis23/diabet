import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GraduationCap, PlayCircle } from 'lucide-react'
import Header from '@/components/shared/Header'
import Footer from '@/components/landing/Footer'
import CoursePurchase from './CoursePurchase'
import { getProduct } from '@/lib/products'
import { COURSE_PRODUCT_ID, COURSE_VIDEOS } from '@/data/courseVideos'
import { DOCTOR } from '@/data/doctor'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Відеокурс про біль — біль.net',
  description: 'Чому біль не минає, як його полегшити без крайнощів і коли потрібен лікар — відеоуроки простою мовою.',
}

export default async function CoursePage() {
  const course = await getProduct(COURSE_PRODUCT_ID)
  if (!course) notFound()

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-screen">
        <section className="bg-gradient-to-b from-sand to-cream py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-sage/15 text-sage-dark text-sm font-semibold px-3 py-1.5 rounded-full mb-6">
              <GraduationCap className="w-4 h-4" /> Відеокурс · {COURSE_VIDEOS.length} уроків
            </div>
            <h1 className="text-4xl font-extrabold text-ink mb-4">{course.name}</h1>
            <p className="text-lg text-ink-soft mb-2">{course.description}</p>
            <p className="text-muted-ink text-sm mb-6">
              Авторка — {DOCTOR.name}
            </p>
            <div className="text-4xl font-extrabold text-clay">{course.price} грн</div>
            <p className="text-muted-ink text-sm mt-1">Разовий платіж · доступ назавжди</p>
          </div>
        </section>

        {/* Блок покупки продубльовано вгорі — щоб не гортати всю програму */}
        <section className="py-8 px-4">
          <CoursePurchase price={course.price} />
        </section>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-ink mb-8 text-center">Програма курсу</h2>
            <div className="space-y-3">
              {COURSE_VIDEOS.map((lesson, i) => (
                <div key={lesson.title} className="bg-white border border-line rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-9 h-9 bg-clay/10 text-clay rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 font-semibold text-ink">{lesson.title}</div>
                  <PlayCircle className="w-5 h-5 text-muted-ink/60 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 px-4 pb-20">
          <CoursePurchase price={course.price} />
        </section>
      </main>
      <Footer />
    </>
  )
}
