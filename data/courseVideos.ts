// Уроки курсу. id — Video ID з Bunny Stream (бібліотека DIABET → Videos),
// рядок виду "a1b2c3d4-1234-5678-90ab-cdef12345678".
// Порядок у масиві = порядок уроків на сторінці.

export interface CourseVideo {
  /** Video ID з Bunny Stream — у браузер не віддаємо, підписуємо на сервері. */
  id: string
  title: string
  /** Кадр-прев'ю в /public/images/lessons. Немає — показуємо теплий градієнт. */
  poster?: string
}

/** Те, що можна показувати всім: назва й прев'ю. Без ідентифікаторів відео. */
export interface LessonPreview {
  title: string
  poster?: string
}

// TODO: підставити реальні id та назви з бібліотеки DIABET.
export const COURSE_VIDEOS: CourseVideo[] = [
  { id: '', title: 'Що таке діабет і чому підвищується цукор' },
  { id: '', title: 'Аналізи: глюкоза, глікований гемоглобін, норми' },
  { id: '', title: 'Харчування без заборон: метод тарілки' },
  { id: '', title: 'Вуглеводи, хлібні одиниці й глікемічний індекс' },
  { id: '', title: 'Рух і фізична активність при діабеті' },
  { id: '', title: 'Ліки та інсулін: як це працює' },
  { id: '', title: 'Гіпоглікемія: як розпізнати й що робити' },
  { id: '', title: 'Ускладнення: очі, нирки, ноги — як уберегтися' },
]

/** Продукт, покупка якого відкриває доступ до уроків (id у бекенді). */
export const COURSE_PRODUCT_ID = 'diabet_course'

/** Вітрина на лендінгу: прев'ю видно всім, відтворення — після оплати. */
export const LESSON_PREVIEWS: LessonPreview[] = COURSE_VIDEOS.map(({ title, poster }) => ({
  title,
  poster,
}))
