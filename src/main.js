import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import axios from 'axios'
import $ from 'jquery'
import store from  './store/store'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$jq=$
Vue.use(ElementUI)

new Vue({
  router,
  store,//记得需要挂载才可以用，把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的    
  render: h => h(App)
}).$mount('#app')
