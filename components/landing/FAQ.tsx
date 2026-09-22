import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Курс замінює лікаря?',
    a: 'Ні. Курс допомагає зрозуміти свою хворобу й краще виконувати призначення, але не змінює їх. Дозування ліків та інсуліну завжди погоджуйте зі своїм лікарем.',
  },
  {
    q: 'Для якого типу діабету курс?',
    a: 'Основна частина — про діабет 2 типу і переддіабет. Уроки про харчування, фізичну активність, самоконтроль і ускладнення корисні й людям з діабетом 1 типу.',
  },
  {
    q: 'Як я отримаю доступ?',
    a: 'Вводите пошту, оплачуєте в Telegram — і бот повертає вас на сайт, де курс уже відкритий. Пізніше входите в «Мої матеріали» за цією ж поштою через код із листа.',
  },
  {
    q: 'Скільки часу діє доступ?',
    a: 'Назавжди. Уроки можна переглядати скільки завгодно разів з будь-якого пристрою.',
  },
  {
    q: 'Чи можна завантажити відео?',
    a: 'Ні, уроки доступні лише для перегляду на сайті. Так ми захищаємо працю лікаря і тримаємо ціну доступною.',
  },
  {
    q: 'Куди писати, якщо щось не працює?',
    a: 'Напишіть нам на пошту або в Telegram зі сторінки «Контакти» — відповімо протягом доби.',
  },
]

export default function FAQ() {
  return (
    <section className="py-20 px-4 bg-sand/60">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-ink mb-4">Часті запитання</h2>
        </div>

        <Accordion multiple={false} className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white border border-line rounded-2xl px-6"
            >
              <AccordionTrigger className="text-left text-ink font-semibold hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-ink-soft leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
