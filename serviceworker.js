const cacheName = 'v1';

const cacheAssets = [
                '/',
                '/index.html',
                '/restaurant.html',
                '/restaurant.html?id=1',
                '/restaurant.html?id=2',
                '/restaurant.html?id=3',
                '/restaurant.html?id=4',
                '/restaurant.html?id=5',
                '/restaurant.html?id=6',
                '/restaurant.html?id=7',
                '/restaurant.html?id=8',
                '/restaurant.html?id=9',
                '/restaurant.html?id=10',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg'
            ];

//install event
self.addEventListener('install', e => {
	console.log('service worker installed');

	e.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('service worker caching files');
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
	);
});

//activate event
self.addEventListener('activate', e => {
	console.log('service worker activated');
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if(cache !== cacheName ) {
						return caches.delete(cache)
					}
				})
				)
		})
	);
});

//fetch event
self.addEventListener('fetch', e => {
	console.log('service worker fetching');
	e.respondWith(
		fetch(e.request).catch(() => caches.match(e.request))
	)
})
