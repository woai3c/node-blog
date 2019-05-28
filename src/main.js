import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import './permission'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.prototype.$axios = axios
Vue.prototype.$ = document.querySelector.bind(document)

new Vue({
    el: '#app',
    router,
    store,
	template: '<App/>',
    components: { App }
})