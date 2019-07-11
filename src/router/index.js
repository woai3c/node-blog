import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '*', redirect: '/index'},
        {path: '/', redirect: '/index'},
        {
            path: '/editor',
            name: 'editor',
            component: () => import('../view/editor/Editor.vue'),
            meta: {isPublish: true}
        },
        {
            path: '/index',
            component: () => import('../view/index/index.vue'),
            children: [
                {
                    path: '/',
                    name: 'index',
                    component: () => import('../view/index/Tags.vue')
                },
                {
                    path: '/about',
                    name: 'about',
                    component: () => import('../view/index/About.vue')
                },
                {
                    path: '/content',
                    name: 'content',
                    component: () => import('../view/index/Content.vue')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../view/login/Login.vue'),
        },
        {
            path: '/manage',
            name: 'manage',
            component: () => import('../view/manage/Manage.vue'),
        },
    ]
})