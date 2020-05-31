import axios from 'axios'
import { objToUrlParam } from '../utils'

export function fetchAllArticles(obj) {
    return axios.get('/fetchAllArticles' + objToUrlParam(obj))
}

export function fetchArticleDetail(id) {
    return axios.get(`/fetchArticleDetail?id=${id}`)
}

export function addArticle(obj) {
    return axios.post('/addArticle', obj)
}

export function deleteArticle(obj) {
    return axios.post('/deleteArticle', obj)
}

export function fetchAppointArticles(obj) {
    return axios.get('/fetchAppointArticles' + objToUrlParam(obj))
}

export function fetchTagsData() {
    return axios.get('/fetchTagsData')
}

export function fetchTagsArtilesData() {
    return axios.get('/fetchTagsArtilesData')
}

export function login(data) {
    return axios.post('/login', data)
}

export function addComment(data) {
    return axios.post('/comment', data)
}

export function fetchVisits() {
    return axios.get('/fetchVisits')
}