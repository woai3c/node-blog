import axios from 'axios'

export function fetchArticleData() {
    return axios.get('/fetchArticleData')
}