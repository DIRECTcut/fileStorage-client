import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import NotFoundPage from './views/NotFound.vue'
import { BootstrapVue, BadgePlugin } from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false

Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(BadgePlugin)

const routes = router.getRoutes().map(r => r.path)

new Vue({
  router,
  store,
  render: function (h) {
    return routes.includes(this.$router.currentRoute.path) ? h(App) : h(NotFoundPage)
  }
}).$mount('#app')
