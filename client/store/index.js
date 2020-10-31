import Vue from 'vue'
import Vuex from 'vuex'
import { timestampToDate} from '@/utils'
import { fetchTagsArtilesData, fetchArticles, fetchVisits, fetchTagsData, fetchArticleDetail, fetchYears } from '@/api/server'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            isShowLoading: false,
            visits: 0,
            totalArticles: 0,
            sidebarData: [],
            articlesData: [],
            tags: [],
            articleData: {},
            years: [],
        },
        mutations: {
            setLoading(state, isShowLoading) {
                state.isShowLoading = isShowLoading
            },

            setVisits(state, data) {
                state.visits = data
            },

            setTagsArtilesData(state, data) {
                const keys = Object.keys(data)
                state.sidebarData = keys.map(key => ({
                    tag: key,
                    nums: data[key]
                }))
            },

            setArticles(state, res) {
                const data = res.data
                data.forEach(item => {
                    item.date = timestampToDate(item.date)
                })

                state.articlesData = data
                state.totalArticles = res.total
            },

            setTagsData(state, data) {
                state.tags = data
            },

            setArticleDetail(state, data) {
                state.articleData = data
                state.articleData.date = timestampToDate(state.articleData.date)
                data.comments.forEach(item => {
                    item.time = timestampToDate(item.time)
                })
            },

            setYears(state, data) {
                state.years = ['年份', ...data]
            }
        },
        actions: {
            getVisits({ commit }) {
                return fetchVisits().then(res => {
                    commit('setVisits', res.data)
                })
            },

            getTagsArtilesData({ commit }) {
                return fetchTagsArtilesData().then(res => {
                    commit('setTagsArtilesData', res.data)
                })
            },

            getArticles({ commit }, options) {
                return fetchArticles(options).then(res => {
                    commit('setArticles', res)
                })
            },

            getTagsData({ commit }) {
                return fetchTagsData().then(res => {
                    commit('setTagsData', ['标签', ...res.data])
                })
            },
            
            getArticleDetail({ commit }, id) {
                return fetchArticleDetail(id).then(res => {
                    commit('setArticleDetail', res.data)
                })
            },
            
            getYears({ commit }) {
                return fetchYears().then(res => {
                    commit('setYears', res.data)
                })
            },
        }
    })
}