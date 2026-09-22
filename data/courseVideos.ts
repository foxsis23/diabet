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

// Бібліотека TISK (Bunny Stream 759814), файли N_1.mp4 → урок N.
// TODO: назви уроків — тимчасові, замінити справжніми.
export const COURSE_VIDEOS: CourseVideo[] = [
  { id: '2cae3cd3-3096-4461-9592-80e65c06746e', title: 'Що таке тиск і що означають два числа', poster: '/images/lessons/1.webp' },
  { id: '356b9f72-fbab-45e3-b3cd-5c2f384b296d', title: 'Як правильно міряти тиск удома', poster: '/images/lessons/2.webp' },
  { id: 'dfc4f108-ef5b-414d-a50e-c9f8b2419fbb', title: 'Чому тиск стрибає — і коли це нормально', poster: '/images/lessons/3.webp' },
  { id: '698397d8-c587-42cd-be8f-0b0f4ccdf558', title: 'Сіль, їжа й вода: що справді впливає', poster: '/images/lessons/4.webp' },
  { id: '3465964d-a483-42da-a47e-d39ad759580c', title: 'Рух, вага й тиск', poster: '/images/lessons/5.webp' },
  { id: '2b116813-88df-434a-ae93-f8e65e0f6fc1', title: 'Сон і відновлення', poster: '/images/lessons/6.webp' },
  { id: '68baaa4b-4b80-43e2-82aa-717bcf9f6f6e', title: 'Стрес, дихання і «тиск від нервів»', poster: '/images/lessons/7.webp' },
  { id: 'f18deb81-17fc-4c3e-9d5b-c75a01403434', title: 'Щоденні звички, що тримають тиск', poster: '/images/lessons/8.webp' },
  { id: 'cfe22137-ec2d-4d99-bbec-be8665b748e9', title: 'Як прийти до стабільності', poster: '/images/lessons/9.webp' },
  { id: 'd13da276-a1f4-4854-b479-d5c0c2619d0d', title: 'Коли потрібен лікар або швидка' },
]

/** Продукт, покупка якого відкриває доступ до уроків (id у бекенді). */
export const COURSE_PRODUCT_ID = 'tysk_course'

/** Вітрина на лендінгу: прев'ю видно всім, відтворення — після оплати. */
export const LESSON_PREVIEWS: LessonPreview[] = COURSE_VIDEOS.map(({ title, poster }) => ({
  title,
  poster,
}))
