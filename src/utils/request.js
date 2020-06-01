import axios from 'axios'
import { Message } from 'iview'
import router from '@/router'
import { showLoading, closeLoading } from '@/utils/loading'

const service = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 60000,
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
    if (res.code == 2) {
        localStorage.setItem('token', '')
        router.push('login')
        return Promise.reject()
    } if (res.code != 0 && res.msg) {
        Message({
            message: res.msg,
            type: 'error',
            duration: 5000,
        })

        return Promise.reject()
    }

    return res
}, (error) => {
    closeLoading()
    if (error.name == 'Error') {
        Message({
            message: error.message,
            type: 'error',
            duration: 5000,
        })
    } else {
        Message({
            message: error.response.data.data || error.message,
            type: 'error',
            duration: 5000,
        })
    }

    return Promise.reject(error)
})

export default service
