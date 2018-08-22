'use strict';
const CACHE_NAME = 'v2.1.1';
const urlsToCache = [
  '/',
  'https://fonts.googleapis.com/css?family=Amaranth:700|Raleway',
  './css/bootstrap.min.css',
  './css/font-awesome.min.css',
  './js/main.js'
];
//install event
self.addEventListener('install',(e) => {
  console.log("service-workers install");
  // Perform install steps
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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
      keys.map(key => {
        if(key !== CACHE_NAME)
        {
          return caches.delete(key);
        }
        return key;
      })
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
//message event
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});