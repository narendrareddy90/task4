// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(reg => console.log("Service Worker registered", reg))
    .catch(err => console.log("Service Worker error", err));
}

// Push Notification Request
if ("Notification" in window && "serviceWorker" in navigator) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification("Welcome to My E-Commerce PWA 🛒", {
          body: "Enjoy shopping offline and get updates instantly!",
          icon: "icon.png"
        });
      });
    }
  });
}
{
  "nameMy E-Commerce PWA",
  "short_name E-Shop",
  "start_url ./index.html",
  "display standalone",
  "background_color#ffffff"
  "theme_color#ff6600"
  "icons" [
    {
      "src": "icon.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
const CACHE_NAME = "ecommerce-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/icon.png"
];

// Install SW and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch from cache when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate and clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});