/* eslint-disable no-restricted-globals */

const CACHE_NAME = "pro-power-mx-cache-v1";
const urlsToCache = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
/* eslint-enable no-restricted-globals */
/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from "workbox-precaching";

// Make sure `self.__WB_MANIFEST` is available
precacheAndRoute(self.__WB_MANIFEST || []);

/* eslint-enable no-restricted-globals */
