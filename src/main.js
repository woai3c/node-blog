import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import axios from 'axios'
import '@/permission'
import 'iview/dist/styles/iview.css'
import { Button, Input, Tag, Modal, Page, Dropdown, DropdownMenu, DropdownItem, Spin, Message, Icon } from 'iview'
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('Tag', Tag)
Vue.component('Modal', Modal)
Vue.component('Page', Page)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Spin', Spin)
Vue.component('Icon', Icon)

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$Message = Message
Vue.prototype.$axios = axios
Vue.prototype.$ = document.querySelector.bind(document)

new Vue({
    el: '#app',
    router,
    store,
	template: '<App/>',
    components: { App }
})