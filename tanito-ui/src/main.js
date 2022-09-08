import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import TanitoUI from '../packages'
// Vue.use(TanitoUI)
import SsButton from './components/button.vue'
import SsDialog from './components/dialog.vue'
Vue.component(SsButton.name, SsButton)
Vue.component(SsDialog.name, SsDialog)

Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
