import { PRODUCTS } from '@/data/products'
import { Product } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apimedsys.com.ua'
const SITE_HOST = process.env.NEXT_PUBLIC_SITE_HOST || 'xn--80achg9d0f.net'

interface ApiProductRaw {
  id: string
  title: string
  description: string
  price: string
  isActive: boolean
  order: number
}

async function fetchApiProducts(): Promise<ApiProductRaw[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      headers: { 'x-forwarded-host': SITE_HOST },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = (await res.json()) as
      | { success: boolean; data?: ApiProductRaw[] }
      | ApiProductRaw[]
    if (Array.isArray(json)) return json
    return json.success && Array.isArray(json.data) ? json.data : null
  } catch {
    return null
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const api = await fetchApiProducts()
  const p = api?.find((x) => x.id === id && x.isActive)
  if (!p) return PRODUCTS[id] ?? null
  return { id: p.id, name: p.title, description: p.description, price: Number(p.price) }
}
