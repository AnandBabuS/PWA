let cacheName = "cacheNutShell7";
let filesToCache = ["/", "workon.js", "images/workOn.jpg", "style.css"];

self.addEventListener("install", e => {
  console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("cache opened");
      console.log(cache);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log("response obtained -- ", response)
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('push', function(e) {
  const data = e.data.json();
  console.log("push received")
  self.registration.showNotification(data.title, {
    body: `${data.assignee} has a new work on ${data.todo}`,
  })
})