import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
    const name = to.name
    if (name == 'login') {
        // 如果有用户信息 直接转到首页
        if (store.state.token) {
            next({name: 'index'})
        } else {
            next()
        }
    } else if (name == 'editor' || name == 'manage') {
        // 如果有用户信息 则跳转 否则跳转到登陆页
        if (store.state.token) {
            next()
        } else {
            next({name: 'login'})
        }
    } else {
        next()
    }
})