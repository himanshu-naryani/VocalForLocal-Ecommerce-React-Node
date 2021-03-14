const swDev = () => {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    function determineAppServerKey() {
        const vapidPublicKey = 'BOwiAFmo9hNHgrCpxILaWHqR_0N9Oxtj1JY7FAO3d3wqjuvGyfqVR64eILTnHG2bI6uKLrA8pZt_EMYKVzSxk9c';
        return urlBase64ToUint8Array(vapidPublicKey);
    }
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    navigator.serviceWorker.register(swUrl).then((response) => {
        console.warn("response", response)
        return response.pushManager.getSubscription()
            .then((subscription) => {
                return response.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: determineAppServerKey()
                });
            })

    })

}
export default swDev;