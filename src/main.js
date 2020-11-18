import './workers/register'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import App from './App.vue'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import store from './store'
import i18n from "@/i18n"

import '@/components/functional'
import environment from "@/utils/environment";

import './injections'
import initUtils from "@/utils/initUtils";

if (!window.Intl) require("intl-collator")

Vue.config.productionTip = false

Vue.config.performance = environment.debug.performance
Vue.config.devtools = environment.debug.devtools

initUtils.initData();

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');