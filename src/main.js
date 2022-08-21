import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import './assets/css/reset.css'
import './assets/css/style.scss'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import 'amfe-flexible'
import api from "./api"
import {
  timeFormat,
  weekFormat
} from './utils/timeFormat'
Vue.config.productionTip = false
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.prototype.$api = api;
Vue.prototype.$timeFormat = timeFormat;
Vue.prototype.$weekFormat = weekFormat;
const formatPrice = (val,unit) => {
  console.log(val)
  return val.toString().replace(/\d+/, function (n) {
    return unit + n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  });
}

Vue.prototype.$formatPrice = formatPrice;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
