import axios from 'axios'
import { Message } from 'view-design'
import { router } from '@/entry-client'
import { showLoading, closeLoading } from '@/utils/loading'

const service = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 30000,
})

service.interceptors.request.use(config => {
    showLoading()
    if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token')
    }

    return config
}, (error) => Promise.reject(error))

service.interceptors.response.use(response => {
    closeLoading()
    const res = response.data
    if (res.code != 0 && res.msg) {
        Message.error({
            content: res.msg,
        })

        if (res.code == 2) {
            localStorage.setItem('token', '')
            router.push('login')
        }

        return Promise.reject()
    }

    return res
}, (error) => {
    closeLoading()
    if (error.name == 'Error') {
        Message.error({
            content: res.msg,
        })
    } else {
        Message.error({
            content: error.response.data.data || error.message,
        })
    }

    return Promise.reject(error)
})

export default service
