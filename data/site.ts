// Усе, що відрізняє сайт від інших гілок репозиторію (див. README про гілки).

/** Назва сайту для людей. */
export const SITE_NAME = 'тиск.net'
/** Домен у punycode: так його бачить бекенд (x-forwarded-host) і Vercel. */
export const SITE_HOST = process.env.NEXT_PUBLIC_SITE_HOST || 'xn--h1aeuc.net'
export const SITE_URL = `https://${SITE_HOST}`

// Контакти підтримки. TODO: підставити справжні.
export const SUPPORT_EMAIL = `support@${SITE_HOST}`
export const SUPPORT_TELEGRAM = 'tysk_net'
