self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        let responseClone = response.clone();
        caches.open('cache_v1').then(function(cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }).catch(function(err) {
      return err;
    })
  );
});