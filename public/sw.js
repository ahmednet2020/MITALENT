'use strict';

var CACHE_NAME = 'v22.1.1';
var urlsToCache = ['/index.html', 'https://fonts.googleapis.com/css?family=Amaranth:700|Raleway', './css/bootstrap.min.css', './css/font-awesome.min.css', './css/index.css', './js/jquery.min.js', './js/main.js'];
//install event
self.addEventListener('install', function (e) {
  console.log("service-workers install");
  // Perform install steps
  e.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(urlsToCache);
  }).then(function (cache) {
    return self.skipWaiting();
  }).catch(function (err) {
    console.log('open cashes erro: ' + err);
  }));
});
// active event
self.addEventListener('activate', function (e) {
  // delete any old caches
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (key) {
      return key === CACHE_NAME ? key : caches.delete(key);
    })).then(function () {
      console.log('remove the old cashe done');
    }).catch(function () {
      console.log('remove old caches faild');
    });
  }));
});
// fetch event
self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request).then(function (response) {
    if (response && response.status === 200) {
      var resToCache = response.clone();
      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(e.request, resToCache);
      });
      return response;
    }
    return response;
  }).catch(function (err) {
    return caches.match(e.request).then(function (response) {
      if (response) return response;
      return new Response("ops you need network to load this page", {
        headers: { 'content-type': 'text/plain' }
      });
    });
  }));
});
self.addEventListener('message', function (event) {
  console.log("skipWaiting");
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
