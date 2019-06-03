import axios from 'axios'

export function fetchAllArticles() {
    return axios.get('/fetchAllArticles')
}

export function fetchArticleContent(id) {
    return axios.get(`/fetchArticleContent?id=${id}`)
}

export function pushArticle(obj) {
    return axios.post('/pushArticle', obj)
}

export function deleteArticle(obj) {
    return axios.post('/deleteArticle', obj)
}