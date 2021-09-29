import createApp from './app'

if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
    //获取控制此页面的service worker
    navigator.serviceWorker.controller;
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
        // reg.unregister();
        // reg.update();
        // const sw = reg.installing;
        // 'installing'|'installed'|'activating'|'activated'|'redundant'
        // console.log(sw.state);
        // sw.addEventListener('statechange', () => {

        // })
        // reg.waiting;
        // reg.active;
        // reg.addEventListener('updatefound', () => {

        // })

        console.log('SW registered: ', reg);
    }).catch(regError => {
        console.log('SW registration failed: ', regError);
    });
    // });
}

const { app, router } = createApp({
    // here we can pass additional arguments to app factory
})
router.isReady().then(() => {
    app.mount('#app')
})