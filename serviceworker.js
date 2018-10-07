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
	let cacheRequest = e.request;
	let cacheUrlObj = new URL(e.request.url);
	if (e.request.url.indexOf('restaurant.html')> -1) {
		const cacheURL = 'restaurant.html';
		cacheRequest = new Request(cacheURL);
	}
	if (cacheUrlObj.hostname !== 'localhost') {
		e.request.mode = 'no-cors';
	}

	e.respondWith(
		caches.match(cacheRequest).then(response => {
			return (
				response ||
				fetch(e.request)
					.then(fetchResponse => {
						return caches.open(cacheName).then(cache => {
							cache.put(e.request, fetchResponse.clone());
							return fetchResponse;
						});
					})
					.catch(error => {
						if (e.request.url.indexOf('.jpg') > -1) {
							return caches.match('/img/na.png');
						}
						return new Response('Application is not connected to the Internet', {
							status: 404,
							statusText: "Application is not connected to the Internet"
						});
					})
			);
		})
	);
});
