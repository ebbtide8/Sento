const CACHE_NAME = 'sento-nav-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  // APIへのリクエスト（GAS）はキャッシュせず、常に最新を取得させる
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});