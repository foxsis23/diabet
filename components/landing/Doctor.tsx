import Image from 'next/image'
import { Check } from 'lucide-react'
import { DOCTOR } from '@/data/doctor'

export default function Doctor() {
  return (
    <section className="py-20 px-4 bg-sand/60">
      <div className="max-w-4xl mx-auto grid md:grid-cols-[18rem_1fr] gap-10 items-center">
        <div className="relative aspect-square w-64 md:w-72 mx-auto rounded-full overflow-hidden border-8 border-white shadow-lg shadow-ink/10 bg-sand">
          <Image src={DOCTOR.photo} alt={DOCTOR.name} fill sizes="288px" className="object-cover" />
        </div>
        <div>
          <p className="text-sage-dark font-semibold mb-2">Автор курсу</p>
          <h2 className="text-3xl font-extrabold text-ink mb-1">{DOCTOR.name}</h2>
          <p className="text-muted-ink mb-6">{DOCTOR.role}</p>
          <ul className="space-y-3">
            {DOCTOR.bio.map((line) => (
              <li key={line} className="flex gap-3 text-ink-soft">
                <Check className="w-5 h-5 text-sage-dark shrink-0 mt-0.5" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
