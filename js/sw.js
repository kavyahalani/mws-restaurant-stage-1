//ServiceWorker file
let localCache = 'restaurant-review-fend-v2';

//adds files to local cache.
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(localCache).then(cache => {
            return cache.addAll([
                '../',
                '../js/main.js',
                '../js/restaurant_info.js',
                '../css/styles.css',
                '../index.html',
                '../restaurant.html',
                '../img/1.jpg',
                '../img/2.jpg',
                '../img/3.jpg',
                '../img/4.jpg',
                '../img/5.jpg',
                '../img/6.jpg',
                '../img/7.jpg',
                '../img/8.jpg',
                '../img/9.jpg',
                '../img/10.jpg',
                '../data/restaurants.json'
            ])
        })
    )
});

//gives always the updated versions fast to user by activating the newer version and deletes the previous versions of cache.
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-') && 
                    cacheName !== localCache;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//fetches response
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});