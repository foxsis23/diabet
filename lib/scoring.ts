import { QUESTIONS, Q_DURATION, Q_INTENSITY, Q_RED_FLAGS } from '@/data/questions'
import { PainLevel, PainResult } from '@/types'

const LEVELS: PainLevel[] = ['mild', 'moderate', 'severe']

const points = (answers: number[], q: number) => QUESTIONS[q]?.answers[answers[q]]?.points ?? 0

export function painLevel(answers: number[]): PainLevel {
  return LEVELS[points(answers, Q_INTENSITY)]
}

/** 0 — гострий, 1 — підгострий, 2 — хронічний (понад 3 місяці). */
export function painDuration(answers: number[]): number {
  return points(answers, Q_DURATION)
}

export function hasRedFlags(answers: number[]): boolean {
  return points(answers, Q_RED_FLAGS) === 1
}

/** id запитань-факторів, на які відповіли «так». */
export function riskFactors(answers: number[]): number[] {
  return answers.flatMap((a, i) =>
    i > Q_RED_FLAGS && QUESTIONS[i]?.answers[a]?.points === 1 ? [QUESTIONS[i].id] : [],
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

export const DURATION_NOTE = [
  'Біль триває менше 6 тижнів — у більшості випадків такий біль минає сам, особливо якщо не припиняти рухатися.',
  'Біль триває вже понад 6 тижнів. Саме зараз важливо не дати йому стати хронічним.',
  'Біль триває понад 3 місяці — це вже хронічний біль. Він рідко означає, що «щось зламано», і добре відповідає на поєднання руху, сну й роботи зі стресом.',
]

const RESULTS: Record<PainLevel, PainResult> = {
  mild: {
    level: 'mild',
    title: 'Легкий біль',
    text: 'Біль відчутний, але поки не керує вашим днем. Найкращий момент, щоб він так і не розрісся.',
    steps: [
      'Продовжуйте звичні справи й рух — спокій біль рідко лікує.',
      'Зверніть увагу на фактори нижче: вони можуть поступово підсилювати біль.',
    ],
  },
  moderate: {
    level: 'moderate',
    title: 'Помірний біль',
    text: 'Біль уже заважає жити звично. Це поширено, і з ним можна працювати — без героїзму й без повного спокою.',
    steps: [
      'Дозуйте навантаження: краще частіше й менше, ніж «через силу» один раз.',
      'Якщо біль не слабшає 2–3 тижні — покажіться сімейному лікарю.',
      'Розберіться, що саме підтримує ваш біль, — з цього починається полегшення.',
    ],
  },
  severe: {
    level: 'severe',
    title: 'Сильний біль',
    text: 'Такий біль виснажує і заслуговує на увагу лікаря. Ви не мусите терпіти його сам(а).',
    steps: [
      'Зверніться до лікаря найближчим часом.',
      'Не збільшуйте дозу знеболювальних самостійно.',
      'Поки чекаєте на візит — м’який рух у межах комфорту краще за постільний режим.',
    ],
  },
}

export function painResult(level: PainLevel): PainResult {
  return RESULTS[level]
}
