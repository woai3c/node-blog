import router from './router'

router.beforeEach((to, from, next) => {
    const name = to.name
    if (localStorage.getItem('token')) {
        if (name == 'login') {
            next({name: 'index'})
        } else {
            next()
        }
    } else {
        if (name == 'editor' || name == 'manage') {
            next({name: 'login'})
        } else {
            next()
        }
    }
})