import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
	template: '<App/>',
    components: { App }
})