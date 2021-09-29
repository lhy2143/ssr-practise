console.log('Hello from service-worker.js');
// const urls = ['/', 'js/app.js', 'js/0.js', 'favicon.ico'];
// 安装
// 在该生命周期中，缓存页面的所有内容，使用cache API
self.addEventListener('install', function (event) {
    // console.log('install')
    // 缓存 App Shell 等关键静态资源和 html (保证能缓存的内容能在离线状态跑起来)
    event.waitUntil(
        caches.open('study').then(cache => {
            return cache.addAll(['/', 'js/', 'css/', 'favicon.ico'])
        })
    )
});

// 激活
self.addEventListener('activate', function () {
    // console.log('activate')
    // 激活的状态，这里就做一做老的缓存的清理工作
});

// 缓存请求和返回（这是个简单的缓存优先的例子）
self.addEventListener('fetch', function (event) {
    // console.log(event.request)
    // console.log(event)
    //自定义响应
    // if (event.request.url.endsWith('.png')) {
    //     event.respondWith(
    //         // new Response('hello <p>world</p>', {
    //         //     headers: { foo: 'bar', 'Content-Type': 'text/html' }
    //         // })
    //         fetch('/favicon.ico')
    //     )
    // }

    // event.respondWith(
    //     fetch(event.request).then(response => {
    //         if (response.status === 404) {
    //             // return new Response('404');
    //             return fetch('/favicon.ico')
    //         }
    //         return response;
    //     }).catch(() => {
    //         return new Response('error')
    //     })
    // )
    event.respondWith(
        caches.open('study').then(function (cache) {
            //返回缓存中的请求，断网时页面也会有内容
            return cache.match(event.request).then(function (response) {
                if (response) {
                    console.log(' Found response in cache:', response);

                    return response;
                }
                console.log('Not Found!', event.request);
                return fetch(event.request)
            }).catch(function (error) {

                // 处理match()或fetch()引起的异常。
                console.error('  Error in fetch handler:', error);

                throw error;
            });
        })
    )
});

// service worker 是一个注册在指定源和路径下的Worker
// 因此可以通过 worker.postMessage()发送消息,并使用以下监听消息
self.addEventListener('message', event => {
    console.log(event)
})