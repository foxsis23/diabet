import { NextResponse } from 'next/server'
import { COURSE_VIDEOS, COURSE_PRODUCT_ID } from '@/data/courseVideos'
import { isBunnyConfigured, signedEmbedUrl } from '@/lib/bunny'
import { SITE_HOST } from '@/data/site'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apimedsys.com.ua'

/** Перевіряємо оплату на сервері — клієнту не можна довіряти в цьому питанні. */
async function me(token: string): Promise<{ productIds: string[]; email: string }> {
  const res = await fetch(new URL('auth/me', API_BASE_URL + '/'), {
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-host': SITE_HOST,
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) return { productIds: [], email: '' }
  type Me = { product_ids?: string[]; email?: string }
  const json = (await res.json()) as { success: boolean; data?: Me } | Me
  const payload = 'data' in json && json.data ? json.data : (json as Me)
  return {
    productIds: Array.isArray(payload.product_ids) ? payload.product_ids : [],
    email: payload.email ?? '',
  }
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Потрібен токен доступу' }, { status: 400 })
  }
  if (!isBunnyConfigured()) {
    return NextResponse.json({ error: 'Відеосховище не налаштоване' }, { status: 503 })
  }

  const { productIds, email } = await me(token)
  if (!productIds.includes(COURSE_PRODUCT_ID)) {
    return NextResponse.json({ error: 'Курс не оплачено' }, { status: 403 })
  }

  // Підписуємо лише після підтвердженої оплати. Порядок збігається з вітриною,
  // тож урок без id (ще не завантажений) іде з url: null, а не випадає зі списку.
  const videos = COURSE_VIDEOS.map((v) => ({
    title: v.title,
    url: v.id ? signedEmbedUrl(v.id) : null,
  }))

  // email — для водяного знака поверх плеєра.
  return NextResponse.json({ videos, email }, { headers: { 'Cache-Control': 'no-store' } })
}
