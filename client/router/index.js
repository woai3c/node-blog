import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/editor',
                name: 'editor',
                component: () => import('@/views/editor/Editor.vue'),
            },
            {
                path: '/index',
                component: () => import('@/views/index/Index.vue'),
                children: [
                    {
                        path: '',
                        name: '',
                        component: () => import('@/views/index/Tags.vue')
                    },
                    {
                        path: '/about',
                        name: 'about',
                        component: () => import('@/views/index/About.vue')
                    },
                    {
                        path: '/content',
                        name: 'content',
                        component: () => import('@/views/index/Content.vue')
                    },
                ]
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login/Login.vue'),
            },
            {
                path: '/manage',
                name: 'manage',
                component: () => import('@/views/manage/Manage.vue'),
            },
            { path: '*', redirect: '/index' },
        ]
    })
}