import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import {
  Icon
} from 'leaflet'
import ChartJs from 'chart.js'
import VueChartJs from 'vue-chartjs'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueChartJs)

import 'leaflet/dist/leaflet.css'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

import App from './App.vue'
import Router from './routes.js'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router: Router,
  render: h => h(App),
})
