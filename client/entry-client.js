import Vue from 'vue'
import { createApp } from './app'
const { app, router, store } = createApp()

export { router, store }

Vue.mixin({
    beforeMount() {
        const { asyncData } = this.$options
        if (asyncData) {
            // 将获取数据操作分配给 promise
            // 以便在组件中，我们可以在数据准备就绪后
            // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    },

    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
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
    // router.beforeEach((to, from, next) => {
    //     const name = to.name
    //     if (localStorage.getItem('token')) {
    //         if (name == 'login') {
    //             next('index')
    //         } else {
    //             next()
    //         }
    //     } else {
    //         if (name == 'editor' || name == 'manage') {
    //             next('login')
    //         } else {
    //             next()
    //         }
    //     }
    // })
    // Vue.prototype.$ = document.querySelector.bind(document)
})
