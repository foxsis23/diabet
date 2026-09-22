import { Product } from '@/types'
import { COURSE_PRODUCT_ID } from './courseVideos'

// Запасний каталог, якщо бекенд недоступний. Справжня ціна — в адмінці.
export const PRODUCTS: Record<string, Product> = {
  [COURSE_PRODUCT_ID]: {
    id: COURSE_PRODUCT_ID,
    name: 'Відеокурс: життя з діабетом без страху',
    description:
      'Відеоуроки лікаря-ендокринолога: харчування, цукор, інсулін, ускладнення — просто і по суті.',
    price: 249,
  },
}
