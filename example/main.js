import Vue from 'vue'
import Teste from './Teste.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Teste)
}).$mount('#app')
