/* eslint-disable no-useless-escape */
const path = require('path')
const express = require('express')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')
const manifest = require('./dist/server/ssr-manifest.json')

const server = express()

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.use('/img', express.static(path.join(__dirname, './dist/client')))
server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, './dist/client', 'css')))
// server.use(
//     '/sw.js',
//     express.static(path.join(__dirname, './dist/client', 'sw.js'))
// )
server.use(
    '/service-worker.js',
    express.static(path.join(__dirname, './dist/client', 'service-worker.js'))
)
server.use(
    '/workbox-53dfa3d6.js',
    express.static(path.join(__dirname, './dist/client', 'workbox-53dfa3d6.js'))
)
server.use(
    '/favicon.ico',
    express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
)
// server.use(
//     '/test.png',
//     express.static(path.join(__dirname, './dist/client', 'test.png'))
// )


server.get('*', async (req, res) => {
    console.log(5555555555);

    const { app, router } = createApp()
    // console.log(333, req.url, router)

    router.push(req.url)
    console.log('url', req.url)
    router.currentRoute.value.matched.flatMap(record =>
        Object.values(record.components)
    )
    await router.isReady()

    // console.log(5555, router.currentRoute.value.matched)

    const appContent = await renderToString(app)
    console.log('appContent', appContent);

    fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
        if (err) {
            throw err
        }

        html = html
            .toString()
            .replace('<div id="app">', `<div id="app">${appContent}`)
        res.setHeader('Content-Type', 'text/html')
        res.send(html)
    })
})

console.log('You can navigate to http://localhost:8085')

server.listen(8085)