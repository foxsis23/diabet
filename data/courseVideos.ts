// Уроки курсу. id — Video ID з Bunny Stream (бібліотека тиск.net → Videos),
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

// TODO: id і назви з бібліотеки Bunny для тиск.net.
export const COURSE_VIDEOS: CourseVideo[] = [
  { id: '', title: 'Що таке тиск і що означають два числа' },
  { id: '', title: 'Як правильно міряти тиск удома' },
  { id: '', title: 'Чому тиск стрибає — і коли це нормально' },
  { id: '', title: 'Сіль, їжа й вода: що справді впливає' },
  { id: '', title: 'Рух, вага й тиск' },
  { id: '', title: 'Стрес, сон і «тиск від нервів»' },
  { id: '', title: 'Ліки від тиску: страхи й факти' },
  { id: '', title: 'Коли потрібен лікар або швидка' },
]

/** Продукт, покупка якого відкриває доступ до уроків (id у бекенді). */
export const COURSE_PRODUCT_ID = 'tysk_course'

/** Вітрина на лендінгу: прев'ю видно всім, відтворення — після оплати. */
export const LESSON_PREVIEWS: LessonPreview[] = COURSE_VIDEOS.map(({ title, poster }) => ({
  title,
  poster,
}))
