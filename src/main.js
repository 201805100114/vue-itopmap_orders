import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import VueAxiosPlugin from 'vue-axios-plugin';
Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
});
// 使用
// this.$http.get(url, data, options).then((response) => {
//   console.log(response)
// });
// this.$http.post(url, data, options).then((response) => {
//   console.log(response)
// });
// this.$axios.get(url, data, options).then((response) => {
//   console.log(response)
// });
// this.$axios.post(url, data, options).then((response) => {
//   console.log(response)
// });

Vue.config.productionTip = false
// Vue.prototype.$store = store
Vue.prototype.$http = axios;

sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
