import request from '@/utils/request'
import { objToUrlParam } from '@/utils'

export function fetchAllArticles(obj) {
    return request.get('/fetchAllArticles' + objToUrlParam(obj))
}

export function fetchArticleDetail(id) {
    return request.get(`/fetchArticleDetail?id=${id}`)
}

export function addArticle(obj) {
    return request.post('/addArticle', obj)
}

export function deleteArticle(obj) {
    return request.post('/deleteArticle', obj)
}

export function fetchAppointArticles(obj) {
    return request.get('/fetchAppointArticles' + objToUrlParam(obj))
}

export function fetchTagsData() {
    return request.get('/fetchTagsData')
}

export function fetchTagsArtilesData() {
    return request.get('/fetchTagsArtilesData')
}

export function login(data) {
    return request.post('/login', data)
}

export function addComment(data) {
    return request.post('/comment', data)
}

export function fetchVisits() {
    return request.get('/fetchVisits')
}