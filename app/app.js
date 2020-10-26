import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

export function createApp() {
    const router = createRouter()
    const store = createStore()

    // 将 router 挂载到 store 中，可以通过 store.state.route 访问
    sync(store, router)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store }
}
