import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        currentTag: '',
        articleNum: 0,
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
        setCurrentTag(state, name) {
            state.currentTag = name
        },

        setToken(state, token) {
            state.token = token
        },
    }
})