import Vue from 'vue'
import App from './App'
// import SsButton from './components/button.vue'
import TanitoUI from '../packages'
Vue.config.productionTip = false
Vue.use(TanitoUI)

// Vue.component(SsButton.name, SsButton)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
