import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import './permission'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$axios = axios
Vue.prototype.$ = document.querySelector.bind(document)

new Vue({
    el: '#app',
    router,
    store,
	template: '<App/>',
    components: { App }
})