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
  { id: '', title: 'Що таке тиск і що означають два числа', poster: '/images/lessons/1.webp' },
  { id: '', title: 'Як правильно міряти тиск удома', poster: '/images/lessons/2.webp' },
  { id: '', title: 'Чому тиск стрибає — і коли це нормально', poster: '/images/lessons/3.webp' },
  { id: '', title: 'Сіль, їжа й вода: що справді впливає', poster: '/images/lessons/4.webp' },
  { id: '', title: 'Рух, вага й тиск', poster: '/images/lessons/5.webp' },
  { id: '', title: 'Сон і відновлення', poster: '/images/lessons/6.webp' },
  { id: '', title: 'Стрес, дихання і «тиск від нервів»', poster: '/images/lessons/7.webp' },
  { id: '', title: 'Щоденні звички, що тримають тиск', poster: '/images/lessons/8.webp' },
  { id: '', title: 'Як прийти до стабільності', poster: '/images/lessons/9.webp' },
  { id: '', title: 'Коли потрібен лікар або швидка' },
]

/** Продукт, покупка якого відкриває доступ до уроків (id у бекенді). */
export const COURSE_PRODUCT_ID = 'tysk_course'

/** Вітрина на лендінгу: прев'ю видно всім, відтворення — після оплати. */
export const LESSON_PREVIEWS: LessonPreview[] = COURSE_VIDEOS.map(({ title, poster }) => ({
  title,
  poster,
}))
