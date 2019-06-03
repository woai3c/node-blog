import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        currentTag: '',
        articleContent: '',
        articleTitle: '',
        totalArticle: 0,
    },
    mutations: {
        setTagsData(state, data) {
            state.tagsData = data
        },

        setCurrentTag(state, name) {
            state.currentTag = name
        },

        setArticleInfo(state, obj) {
            state.articleContent = obj.content
            state.articleTitle = obj.title
        },

        setToken(state, token) {
            state.token = token
        }
    }
})