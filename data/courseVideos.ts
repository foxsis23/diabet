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

// Бібліотека DIABET (Bunny Stream 759545).
export const COURSE_VIDEOS: CourseVideo[] = [
  { id: 'b759cb6b-6870-4aa8-95c8-aeb16176d0e8', title: 'Що таке діабет і чому це не вирок' },
  { id: '842245cf-3deb-4ccf-bbbd-1c7e272d3e3e', title: 'Інсулін і глюкоза простими словами' },
  { id: '550919fc-ebd2-407f-accf-2d190382269d', title: 'Чому цукор змінюється — і це нормально' },
  { id: 'a7996ae6-4b5e-4650-8638-c0183633cf78', title: 'Чому мозок боїться цифр' },
  { id: 'e0811a77-18fe-4686-80db-71c5f12bf8c2', title: 'Головна помилка' },
  { id: '9c1b475a-757d-41fd-9a83-c65415096d80', title: 'Чому крайнощі погіршують стан' },
  { id: '9f736ec3-4b79-4468-a22e-9895fb0b25fa', title: 'Як формується хронічне напруження при діабеті' },
  { id: '26a4953c-5a39-4961-b4b2-b7514d73f72e', title: 'Що робити в моменті' },
  { id: '327e1a4b-64c4-4d42-83cd-ae4039635491', title: 'Як формується стабільність' },
  { id: '74bd15ee-bbc6-4590-a89e-9a0fcf62c3d2', title: 'Коли потрібен лікар або корекція лікування' },
]

/** Продукт, покупка якого відкриває доступ до уроків (id у бекенді). */
export const COURSE_PRODUCT_ID = 'diabet_course'

/** Вітрина на лендінгу: прев'ю видно всім, відтворення — після оплати. */
export const LESSON_PREVIEWS: LessonPreview[] = COURSE_VIDEOS.map(({ title, poster }) => ({
  title,
  poster,
}))
