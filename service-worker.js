const CACHE_NAME = "card-auto-cache-v1";

const ASSETS = [
    "/",
    "/index.html",
    "/public/css/style.css",
    "/public/js/main.js",
    "/public/img/logo.png",
    "/manifest.json"
];

// Install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return (
                cached ||
                fetch(event.request).catch(() =>
                    caches.match("/index.html")
                )
            );
        })
    );
});
