//site assets

let cacheName = 'myCache1';
 // Images
 let siteImage = [
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

// Site Pages
let siteUrl = [
    'index.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/index.js',
    '/js/restaurant_info.js'
];


//Call Install Event

self.addEventListener('install',event => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(siteImage);
                cache.addAll(siteUrl);
            })
            .then( () => self.skipWaiting())
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
    event.respondWith(
      fetch(event.request).catch(()=> {
        return caches.match(event.request);
      })
    );
  });


