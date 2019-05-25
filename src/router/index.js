import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/index'},
        {
            path: '/index',
            component: () => import('../view/Index/Index.vue'),
            children: [
                {
                    path: '/',
                    name: 'tags',
                    component: () => import('../view/Index/Tags.vue')
                },
                {
                    path: '/about',
                    name: 'about',
                    component: () => import('../view/Index/About.vue')
                },
                {
                    path: '/content',
                    name: 'content',
                    component: () => import('../view/Index/Content.vue')
                },
            ]
        }
    ]
})