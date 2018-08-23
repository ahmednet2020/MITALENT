'use strict';
const CACHE_NAME = 'v7.5.1';
const urlsToCache = [
  '/',
  'https://fonts.googleapis.com/css?family=Amaranth:700|Raleway',
  './css/bootstrap.min.css',
  './css/font-awesome.min.css',
  './css/index.css',
  './js/jquery.min.js',
  './js/main.js'
];
//install event
self.addEventListener('install',(e) => {
  console.log("service-workers install");
  // Perform install steps
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }).then((cache) => {
        return self.skipWaiting();
      }).catch((err)=> {
      	console.log(`open cashes erro: ${err}`)
      })
  );
});
// active event
self.addEventListener('activate', e => {
  // delete any old caches
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
        keys.map( key => (key === CACHE_NAME ? key:caches.delete(key)) )
      ).then(() => {
        console.log('remove the old cashe done');
      }).catch(() => {
        console.log('remove old caches faild');
      })
  ));
});
// fetch event
self.addEventListener('fetch', e => {
   e.respondWith(
      fetch(e.request).then(response => {
        if(response && response.status === 200)
        {
           var resToCache = response.clone();
           caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request,resToCache)
           });
          return response;
        }
        return response;
      }).catch(err => {
        return caches.match(e.request).then(response =>{
          if(response) return response;
          return new Response("ops you need network to load this page", {
                      headers:{'content-type':'text/plain'}
                  })
        })
      })
    )
});
self.addEventListener('message', function(event) {
  console.log("skipWaiting");
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});