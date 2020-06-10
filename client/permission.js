import router from './router'

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