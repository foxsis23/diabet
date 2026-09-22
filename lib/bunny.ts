import { createHash } from 'crypto'

// Bunny Stream: підписане посилання на плеєр.
// token = SHA256(ключ + videoId + строк дії), строк — unix-час.
// Ключ живе тільки на сервері й у браузер не потрапляє.
// Решта захисту — у налаштуваннях бібліотеки (див. README): Token Authentication,
// дозволені домени, блок прямого доступу до файлів, MediaCage DRM.

const LIBRARY_ID = process.env.BUNNY_LIBRARY_ID
const TOKEN_KEY = process.env.BUNNY_TOKEN_KEY

/** Скільки живе посилання: вистачає на урок, але переслати його марно. */
const TTL_SECONDS = 2 * 60 * 60

export function isBunnyConfigured(): boolean {
  return Boolean(LIBRARY_ID && TOKEN_KEY)
}

export function signedEmbedUrl(videoId: string, ttl: number = TTL_SECONDS): string | null {
  if (!LIBRARY_ID || !TOKEN_KEY) return null

  const expires = Math.floor(Date.now() / 1000) + ttl
  const token = createHash('sha256')
    .update(TOKEN_KEY + videoId + expires)
    .digest('hex')

  return `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}?token=${token}&expires=${expires}&preload=false`
}
