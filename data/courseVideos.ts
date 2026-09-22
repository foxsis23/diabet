// Уроки курсу. id — Video ID з Bunny Stream (бібліотека біль.net → Videos),
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

// Бібліотека біль.net (Bunny Stream 759829).
// TODO: id і назви уроків — з бібліотеки, коли відео обробляться.
export const COURSE_VIDEOS: CourseVideo[] = [
  { id: '', title: 'Що таке біль і навіщо він потрібен' },
  { id: '', title: 'Чому біль стає хронічним' },
  { id: '', title: 'Спина й шия: що справді допомагає' },
  { id: '', title: 'Рух без страху: з чого почати' },
  { id: '', title: 'Сон і біль: замкнене коло' },
  { id: '', title: 'Стрес, напруга й біль' },
  { id: '', title: 'Знеболювальні: користь і пастки' },
  { id: '', title: 'Головний біль: що його підсилює' },
  { id: '', title: 'Щоденні звички для полегшення' },
  { id: '', title: 'Коли потрібен лікар' },
]

/** Продукт, покупка якого відкриває доступ до уроків (id у бекенді). */
export const COURSE_PRODUCT_ID = 'bil_course'

/** Вітрина на лендінгу: прев'ю видно всім, відтворення — після оплати. */
export const LESSON_PREVIEWS: LessonPreview[] = COURSE_VIDEOS.map(({ title, poster }) => ({
  title,
  poster,
}))
