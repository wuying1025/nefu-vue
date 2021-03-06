// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import JsonExcel from 'vue-json-excel'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import Axios from 'axios'

var VueCookie = require('vue-cookie')
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.component('downloadExcel', JsonExcel)
// Vue.prototype.Axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
