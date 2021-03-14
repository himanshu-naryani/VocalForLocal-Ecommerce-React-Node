
const staticCacheName = 'vocal-for-local-cache-1';
const assets = [
  '/',
  '/cart',
  '/eb89364fdfda5ed0b43d.hot-update.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/main.eb89364fdfda5ed0b43d.hot-update.js',
  '/manifest.json',
  '/static/css/**/*.css',
  '/static/css/*.css',
  '/static/js/**/*.js',
  '/static/js/*.js',
  '/static/js/0.chunk.js',
  '/static/js/0.chunk.js.map',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/main.chunk.js.map',
  '/static/media/**/*.jpg',
  '/static/media/*.jpg',
  '/static/media/car1.4a83c440.jpg',
  '/static/media/car2.0ce081ec.jpg',
  '/static/media/car4.cc4f5470.jpg',
  '/static/media/img1.3ceb2393.jpg',
  '/static/media/img4.0e4bd982.jpg',
  '/static/media/img5.518c7ff1.jpg',
  '/static/media/img7.4d64590e.jpg',
  '/static/media/img8.c34f0775.jpg',
  '/static/media/man-homepage.7bb49a32.jpg',
  '/static/media/woman-homepage.809d70b7.jpg',
  '/s/lato/v17/S6u8w4BMUTPHjxsAUi-qJCY.woff2',
  '/s/lato/v17/S6u8w4BMUTPHjxsAXC-q.woff2',
  '/s/lato/v17/S6u9w4BMUTPHh6UVSwaPGR_p.woff2',
  '/s/lato/v17/S6u9w4BMUTPHh6UVSwiPGQ.woff2',
  '/s/lato/v17/S6uyw4BMUTPHjx4wXg.woff2',
  '/s/lato/v17/S6uyw4BMUTPHjxAwXjeu.woff2',
  '/s/pacifico/v17/FwZY7-Qmy14u9lezJ-6H6Mk.woff2',
  '/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
  '/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
  '/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2',
  '/bootstrap/4.0.0-beta.2/css/bootstrap.min.css',
  '/releases/v5.7.2/css/all.css',
  '/releases/v5.7.2/webfonts/fa-brands-400.woff2',
  '/releases/v5.7.2/webfonts/fa-solid-900.woff2',
  '/getAllProductNames',
  '/product/39d31650-2dcd-40cd-8522-bccf98082f23',
  '/topLatestProducts',

  '/static/js/2.8d70b471.chunk.js',
  '/static/js/main.4310478f.chunk.js',
  '/static/css/2.20aa2d7b.chunk.css',
  '/static/css/main.cfc7d7b4.chunk.css',
  '/static/js/3.4f81c4e2.chunk.js',
  '/static/js/runtime-main.30057245.js'


];
// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching ');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
let count = 1;
self.addEventListener('fetch', evt => {
  // if(!navigator.onLine)
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request.clone());
    })

  );

  // if (!navigator.onLine && count>0) {
  //   count--

  // if (!navigator.onLine) {
  // if (!navigator.onLine) {

  //   evt.waitUntil(
  //     this.registration.showNotification("Imp!", {
  //       body: "Check Internet Connection ",
  //     })
  //   );
  // }
});





// self.addEventListener("fetch", event => {
//   // Cache-First Strategy
//   event.respondWith(
//     caches
//       .match(event.request) // check if the request has already been cached
//       .then(cached => cached || fetch(event.request)) // otherwise request network
//       .then(
//         response =>
//           cache(event.request, response) // put response in cache
//             .then(() => response) // resolve promise with the network response
//       )
//   );
// });



// self.addEventListener("fetch", event => {
//   if (event.request.url.includes("herokuapp.com/")) {
//     // response to API requests, Cache Update Refresh strategy
//    console.log("This is the api")
//     event.respondWith(caches.match(event.request));
//     event.waitUntil(update(event.request).then(refresh)); //TODO: refresh
//   } 

//   else {
//     console.log("I shoulnot see u i napi call")
//     if(!navigator.onLine)
//     event.respondWith(
//       caches
//         .match(event.request) // check if the request has already been cached
//         .then(cached => cached || fetch(event.request)) // otherwise request network
//         .then(
//           response =>
//             cache(event.request, response) // put response in cache
//               .then(() => response) // resolve promise with the network response
//         )
//     );

//     else 
//     event.respondWith(
//       caches
//         .match(event.request) // check if the request has already been cached
//         .then(cached => fetch(event.request)) // otherwise request network
//         .then(
//           response =>
//             cache(event.request, response) // put response in cache
//               .then(() => response) // resolve promise with the network response
//         )
//     );

//   }


// });






// function cache(request, response) {
//   if (response.type === "error" || response.type === "opaque") {
//     return Promise.resolve(); // do not put in cache network errors
//   }

//   return caches
//     .open(staticCacheName)
//     .then(cache => cache.put(request, response.clone()));
// }



// function refresh(response) {
//   return response
//     .json() // read and parse JSON response
//     .then(jsonResponse => {
//       self.clients.matchAll().then(clients => {
//         clients.forEach(client => {
//           // report and send new data to client
//           client.postMessage(
//             JSON.stringify({
//               type: response.url,
//               data: jsonResponse.data
//             })
//           );
//         });
//       });
//       return jsonResponse.data; // resolve promise with new data
//     });
// }


// function update(request) {
//   return fetch(request.url).then(
//     response =>
//       cache(request, response) // we can put response in cache
//         .then(() => response) // resolve promise with the Response object
//   );
// }





// '/static/js/main.chunk.js',
// '/static/css/*.css',
// '/static/css/**/*.css',
// '/static/js/*.js',
// '/static/js/**/*.js',
// '/static/media/**/*.jpg',
// '/static/media/*.jpg',
// '/static/js/bundle.js',
// '/static/js/0.chunk.js',
// '/favicon.ico',
// '/manifest.json',
// '/static/media/img5.518c7ff1.jpg',
// '/static/media/img7.4d64590e.jpg',
// '/static/media/img4.0e4bd982.jpg',
// '/static/media/woman-homepage.809d70b7.jpg',





///after build
// 606.38 KB  build\static\js\2.e5aa089a.chunk.js
// 44.62 KB   build\static\js\main.60feed14.chunk.js
// 22.53 KB   build\static\css\2.20aa2d7b.chunk.css
// 6.13 KB    build\static\css\main.a8984026.chunk.css
// 1.39 KB    build\static\js\3.b9046c88.chunk.js
// 1.17 KB    build\static\js\runtime-main.b61e106b.js


// "/static/css/2.1a02f21c.chunk.css",
//                 "/static/css/main.248a7789.chunk.css",
//                 "static/js/2.6b979827.chunk.js",
//                 "/static/js/main.fe3af3b8.chunk.js",
//                 "/users",
//                 "/favicon.ico",
//                 "/manifest.json",
//                 "/logo192.png",
//                 "/index.html",
//                 "/",
//   if (!navigator.onLine) {
//     evt.waitUntil(
//       this.registration.showNotification("Imp!", {
//         body: "Check Internet Connection ",
//       })
//     );
//   }
// });
