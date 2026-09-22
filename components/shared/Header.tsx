import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full border-b border-line bg-cream/85 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-ink text-lg tracking-tight">
          тиск<span className="text-clay">.net</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-ink-soft">
          <Link href="/test" className="hover:text-clay transition-colors">Перевірка тиску</Link>
          <Link href="/course" className="hover:text-clay transition-colors">Відеокурс</Link>
          <Link href="/my" className="hover:text-clay transition-colors">Мої матеріали</Link>
          <Link href="/contacts" className="hover:text-clay transition-colors">Контакти</Link>
        </nav>
        <Link
          href="/course"
          className="bg-clay hover:bg-clay-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          Дивитись курс
        </Link>
      </div>
    </header>
  )
}
