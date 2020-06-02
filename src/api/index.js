import request from '@/utils/request'
import { objToUrlParam } from '@/utils'

export function fetchArticles(obj) {
    return request.get('/fetchArticles' + objToUrlParam(obj))
}

export function fetchArticleDetail(id) {
    return request.get(`/fetchArticleDetail?id=${id}`)
}

export function addArticle(obj) {
    return request.post('/addArticle', obj)
}

export function updateArticle(obj) {
    return request.put('/updateArticle', obj)
}

// axios 的 delete 方法有坑，详情请看下面的链接
// https://blog.csdn.net/qq383366204/article/details/80268007 
export function deleteArticle(obj) {
    return request.delete('/deleteArticle', { data: obj })
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
    return request.post('/addComment', data)
}

export function fetchVisits() {
    return request.get('/fetchVisits')
}