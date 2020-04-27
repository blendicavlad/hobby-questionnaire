import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import DataManager from '../components/DataManager.vue'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/data-manager',
        name: 'DataManager',
        component: DataManager
      }
    ]
  })

  export default router