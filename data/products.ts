import { Product } from '@/types'
import { COURSE_PRODUCT_ID } from './courseVideos'

// Запасний каталог, якщо бекенд недоступний. Справжня ціна — в адмінці.
export const PRODUCTS: Record<string, Product> = {
  [COURSE_PRODUCT_ID]: {
    id: COURSE_PRODUCT_ID,
    name: 'Відеокурс: тиск під контролем без страху',
    description:
      'Відеоуроки простою мовою: що означають цифри тиску, чому він стрибає і як тримати його в нормі без крайнощів.',
    price: 249,
  },
}
