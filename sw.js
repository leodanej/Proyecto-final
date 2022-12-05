self.addEventListener('install', e=>{
    caches.open('cache-v1')
    .then(cache =>{
        cache.addAll([
            './',
            '/index.html',
            '/css/estilos.css',
            '/app.js',
            '/images/fire_emblem.jpg',
            '/images/Mario.jpg',
            'images/metroid.jpg',
            'images/Nintendo.png',
            'images/facebook.png',
            'images/instagram.png',
            'images/twiter.png',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
            'videos/chronicles.mp4',
            'videos/emblem.mp4',
            'videos/zelda.mp4',
        ])
    });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});