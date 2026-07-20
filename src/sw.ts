import { clientsClaim } from 'workbox-core'
import { precache, matchPrecache } from 'workbox-precaching'
import { setDefaultHandler, registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

declare const self: ServiceWorkerGlobalScope & {
  skipWaiting?: () => Promise<void>
}

self.skipWaiting?.()
clientsClaim()

precache(self.__WB_MANIFEST.filter((e: any) => {
  const u = typeof e === 'string' ? e : e.url
  return u.replace(/^\//, '') !== '404'
}))

setDefaultHandler(async ({ url, event }) => {
  const normalized = url.pathname.replace(/\/$/, '') || '/'

  const cached = await matchPrecache(normalized)
  if (cached) return cached

  try {
    return await fetch(event.request)
  } catch {
    const offline = await matchPrecache('/offline')
    if (offline) return offline
    return new Response('Sin conexión', { status: 503 })
  }
})

registerRoute(
  /^https:\/\/images\.unsplash\.com\/.*/i,
  new CacheFirst({
    cacheName: 'unsplash-images',
    plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })],
  }),
  'GET',
)
