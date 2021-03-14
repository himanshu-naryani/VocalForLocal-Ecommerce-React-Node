importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
      messaging.useServiceWorker(registration);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

firebase.initializeApp({
  messagingSenderId: "684911721296",
})

const initMessaging = firebase.messaging()