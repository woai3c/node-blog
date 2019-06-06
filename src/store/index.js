import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        articlesNum: 0,
        year: '年份',
        month: '月份',
        tag: '标签',
        keyword: '',
        years: ['年份', 2019],
        months: ['月份', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        tags: [],
        articlesData: [],
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },

        setArticlesData(state, data) {
            state.articlesData = data
        },

        setArticlesNum(state, num) {
            state.articlesNum = num
        },

        setTags(state, data) {
            state.tags = data
        },

        setTag(state, tag) {
            state.tag = tag
        },

        setMonth(state, m) {
            state.month = m
        },

        setYear(state, y) {
            state.year = y
        },

        setKeyword(state, str) {
            state.keyword = str
        }
    }
})