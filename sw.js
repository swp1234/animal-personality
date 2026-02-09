/**
 * Service Worker for Animal Personality Test PWA
 * 오프라인 기능과 캐싱을 담당합니다
 */

const CACHE_NAME = 'animal-personality-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/i18n.js',
  '/js/quiz-data.js',
  '/js/locales/ko.json',
  '/js/locales/en.json',
  '/js/locales/zh.json',
  '/js/locales/hi.json',
  '/js/locales/ru.json',
  '/js/locales/ja.json',
  '/js/locales/es.json',
  '/js/locales/pt.json',
  '/js/locales/id.json',
  '/js/locales/tr.json',
  '/js/locales/de.json',
  '/js/locales/fr.json',
  '/icon-192.svg',
  '/icon-512.svg',
  '/manifest.json'
];

// Install event - 캐시에 파일 추가
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Fetch event - 캐시에서 파일 가져오기
self.addEventListener('fetch', event => {
  // GET 요청만 처리
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // 캐시에 있으면 반환
      if (response) {
        return response;
      }

      // 캐시에 없으면 네트워크에서 가져오기
      return fetch(event.request).then(response => {
        // 유효한 응답인지 확인
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // 응답을 캐시에 저장
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // 네트워크 오류 시 오프라인 페이지 반환
        return caches.match('/index.html');
      });
    })
  );
});

// Activate event - 이전 캐시 제거
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
