import { BP_QUESTIONS, QUESTIONS } from '@/data/questions'
import { BpLevel, BpResult } from '@/types'

const LEVELS: BpLevel[] = ['optimal', 'normal', 'high_normal', 'grade1', 'grade2', 'grade3']

/** Відповіді — індекси обраних варіантів. Ступінь — за гіршим з двох чисел (ESC/ESH). */
export function bpLevel(answers: number[]): BpLevel {
  const grades = answers
    .slice(0, BP_QUESTIONS)
    .map((a, i) => QUESTIONS[i]?.answers[a]?.points ?? -1)
    .filter((p) => p >= 0)
  return grades.length ? LEVELS[Math.max(...grades)] : 'unknown'
}

/** id запитань-факторів ризику, на які відповіли «так». */
export function riskFactors(answers: number[]): number[] {
  return answers.flatMap((a, i) =>
    i >= BP_QUESTIONS && QUESTIONS[i]?.answers[a]?.points === 1 ? [QUESTIONS[i].id] : [],
  )
}

export function parseAnswers(raw: string | undefined): number[] | null {
  if (!raw) return null
  const answers = raw.split(',').map(Number)
  const valid =
    answers.length === QUESTIONS.length &&
    answers.every((a, i) => Number.isInteger(a) && a >= 0 && a < QUESTIONS[i].answers.length)
  return valid ? answers : null
}

const RESULTS: Record<BpLevel, BpResult> = {
  unknown: {
    level: 'unknown',
    title: 'Тиск невідомий',
    text: 'Без цифр оцінити неможливо — а гіпертонія часто роками нічим себе не видає. Почніть з вимірювання.',
    steps: [
      'Виміряйте тиск 2 рази вранці й 2 рази ввечері протягом тижня.',
      'Міряйте сидячи, після 5 хвилин спокою, рука на столі на рівні серця.',
      'Поверніться до перевірки з цифрами — результат буде точним.',
    ],
  },
  optimal: {
    level: 'optimal',
    title: 'Оптимальний тиск',
    text: 'Ваші судини працюють у найкомфортнішому режимі. Завдання — зберегти це.',
    steps: [
      'Міряйте тиск раз на рік, а після 40 — хоча б раз на пів року.',
      'Тримайте рух і помірну кількість солі.',
    ],
  },
  normal: {
    level: 'normal',
    title: 'Нормальний тиск',
    text: 'Тиск у межах норми. Добрий момент, щоб закріпити звички, які втримають його тут.',
    steps: [
      'Міряйте тиск кілька разів на рік.',
      'Зверніть увагу на фактори ризику нижче — їх можна змінити.',
    ],
  },
  high_normal: {
    level: 'high_normal',
    title: 'Високий нормальний тиск',
    text: 'Ще не гіпертонія, але вже межа. Саме зараз зміни способу життя дають найбільший ефект.',
    steps: [
      'Міряйте тиск щотижня й записуйте результати.',
      'Почніть з солі й ходьби — це найпростіші кроки з відчутною користю.',
      'Обговоріть результати із сімейним лікарем під час планового візиту.',
    ],
  },
  grade1: {
    level: 'grade1',
    title: 'Гіпертонія 1 ступеня',
    text: 'Тиск підвищений. Це поширено й добре піддається контролю — головне не відкладати.',
    steps: [
      'Протягом тижня міряйте тиск удома вранці й увечері.',
      'Запишіться до сімейного лікаря з цими записами.',
      'Розберіться, що впливає на ваш тиск, — з цього починається контроль.',
    ],
  },
  grade2: {
    level: 'grade2',
    title: 'Гіпертонія 2 ступеня',
    text: 'Тиск помітно підвищений і навантажує серце та судини. Потрібна консультація лікаря найближчим часом.',
    steps: [
      'Зверніться до лікаря цього тижня.',
      'Не приймайте чужі ліки від тиску без призначення.',
      'Ведіть щоденник тиску — він знадобиться лікарю.',
    ],
  },
  grade3: {
    level: 'grade3',
    title: 'Гіпертонія 3 ступеня',
    text: 'Це високі цифри. Якщо зараз є сильний головний біль, біль у грудях, задишка, порушення мови чи зору — викликайте швидку (103).',
    steps: [
      'Без симптомів — зверніться до лікаря в найближчі дні.',
      'Повторіть вимірювання після 5 хвилин спокою.',
      'Не знижуйте тиск різко самостійно.',
    ],
  },
}

export function bpResult(level: BpLevel): BpResult {
  return RESULTS[level]
}
