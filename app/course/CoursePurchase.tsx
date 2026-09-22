import BuyInTelegram from '@/components/shared/BuyInTelegram'
import { COURSE_PRODUCT_ID } from '@/data/courseVideos'

interface Props {
  price: number
}

export default function CoursePurchase({ price }: Props) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl border border-line p-8 shadow-sm">
      <h3 className="font-extrabold text-ink text-xl mb-2 text-center">Отримати курс</h3>
      <p className="text-muted-ink text-sm text-center mb-6">Доступ до всіх уроків назавжди.</p>
      <BuyInTelegram
        productId={COURSE_PRODUCT_ID}
        price={price}
        label={`Придбати курс — ${price} грн`}
      />
    </div>
  )
}
