import axios from 'axios'
import { host, port } from '../../env'

const service = axios.create({
    baseURL: `http://${host}:${port}`,
    timeout: 30000,
})

service.interceptors.request.use(config => {
    return config
}, (error) => Promise.reject(error))

service.interceptors.response.use(response => {
    const res = response.data
    if (res.code != 0 && res.msg) {
        return Promise.reject()
    }

    return res
}, (error) => {
    return Promise.reject(error)
})

export default service
