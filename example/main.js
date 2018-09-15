import Vue from 'vue'
import Teste from './Teste.vue'

import VueCoeImage from 'vue-coe-image'

Vue.use(VueCoeImage)

Vue.config.productionTip = false

new Vue({
  render: h => h(Teste)
}).$mount('#app')
