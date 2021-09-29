import { createSSRApp } from 'vue'
import App from './App.vue'
import createRouter from './router'
import * as echarts from 'echarts';
echarts;
// export a factory function for creating a root component
export default function (args) {
    args;
    const app = createSSRApp(App)
    const router = createRouter()
    app.use(router)
    return {
        app,
        router
    }
}