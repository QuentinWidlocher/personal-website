const version = "1.0.4";

self.addEventListener("fetch", (event) => {
    let url = new URL(event.request.url);
    let method = event.request.method;

    // any non @ request is ignored
    if (method.toLowerCase() !== "get") return;

    // If the request is for the favicons, fonts, or the built files (which are hashed in the name)
    if (
        url.pathname.startsWith("/assets/") ||
        url.pathname.startsWith("/build/") ||
        url.hostname.includes('fonts.gstatic.com')
    ) {
        event.respondWith(
            // we will open the assets cache
            caches.open(version).then(async (cache) => {
                // if the request is cached we will use the cache
                let cacheResponse = await cache.match(event.request);
                if (cacheResponse) return cacheResponse;

                // if it's not cached we will run the fetch, cache it and return it
                // this way the next time this asset it's needed it will load from the cache
                let fetchResponse = await fetch(event.request);
                cache.put(event.request, fetchResponse.clone());

                return fetchResponse;
            })
        );
    }
});

self.addEventListener("activate", (event) => {
    // Remove old caches
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map((cache) => {
                if (cache !== version) {
                    return caches.delete(cache);
                }
            }))
        })
    )
})