import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-sand border-t border-line py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-extrabold text-ink text-lg mb-3">
              біль<span className="text-clay">.net</span>
            </div>
            <p className="text-muted-ink text-sm leading-relaxed">
              Зрозуміло про біль: чому він не минає і як жити без нього. Освіта, не
              заміна лікаря.
            </p>
          </div>

          <div>
            <div className="font-semibold text-ink mb-3">Матеріали</div>
            <ul className="space-y-2 text-sm text-muted-ink">
              <li><Link href="/test" className="hover:text-clay transition-colors">Перевірка болю</Link></li>
              <li><Link href="/course" className="hover:text-clay transition-colors">Відеокурс про біль</Link></li>
              <li><Link href="/my" className="hover:text-clay transition-colors">Мої матеріали</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-ink mb-3">Інформація</div>
            <ul className="space-y-2 text-sm text-muted-ink">
              <li><Link href="/privacy" className="hover:text-clay transition-colors">Політика конфіденційності</Link></li>
              <li><Link href="/terms" className="hover:text-clay transition-colors">Публічна оферта</Link></li>
              <li><Link href="/disclaimer" className="hover:text-clay transition-colors">Медичне застереження</Link></li>
              <li><Link href="/contacts" className="hover:text-clay transition-colors">Контакти</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line pt-8 text-sm text-muted-ink">
          <p>© {new Date().getFullYear()} біль.net. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  )
}
