import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isShowLoading: false,
    },
    mutations: {
        setLoading(state, isShowLoading) {
            state.isShowLoading = isShowLoading
        }
    }
})