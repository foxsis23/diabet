import { Product } from '@/types'
import { COURSE_PRODUCT_ID } from './courseVideos'

// Запасний каталог, якщо бекенд недоступний. Справжня ціна — в адмінці.
export const PRODUCTS: Record<string, Product> = {
  [COURSE_PRODUCT_ID]: {
    id: COURSE_PRODUCT_ID,
    name: 'Відеокурс: життя без постійного болю',
    description:
      'Відеоуроки простою мовою: чому біль не минає, що його підсилює і як полегшити стан без крайнощів.',
    price: 249,
  },
}
