// router.js
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue';
const isServer = typeof window === 'undefined'

const history = isServer ? createMemoryHistory() : createWebHistory()

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/main',
        component: Main,
    },
    {
        path: '/doc',
        component: () => import("../views/Doc.vue"),
    }
]

export default function () {
    return createRouter({ routes, history })
}