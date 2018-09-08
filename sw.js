//site assets

const cacheName = 'myCache';

const filesToCache = [
    //images
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',

    //site pages
    '/',
    'index.html',
    'restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/js/main.js'
];


//Call Install Event

self.addEventListener('install',event => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(filesToCache);
            })
    );
}); //end of add eventListener

//Call Activate Event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    //clean up cache storage
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                //try using filter
                cacheNames.map(cache => {
                    if(cache != cacheName){
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});


//Call Fetch Event

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => response ? response : fetch(event.request))
        .catch(error => {console.log(error) })
    ); // end of respondWith
    
  }); //end of addEventListener 

