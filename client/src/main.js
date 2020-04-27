import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.http.options.root = 'http://localhost:8081/api/questionnaires/';

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
