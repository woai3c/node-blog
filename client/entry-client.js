import Vue from 'vue'
import { createApp } from './app'
const { app, router, store } = createApp()

export { router, store }

Vue.prototype.$ = document.querySelector.bind(document)

Vue.mixin({
    beforeMount() {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    },
})

router.beforeEach((to, from, next) => {
    const name = to.name
    if (localStorage.getItem('token')) {
        if (name == 'login') {
            next('index')
        } else {
            next()
        }
    } else {
        if (name == 'editor' || name == 'manage') {
            next('login')
        } else {
            next()
        }
    }
})

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    app.$mount('#app')
})
