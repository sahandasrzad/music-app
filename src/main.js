import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation'
import App from './App.vue'
import i18n from './includes/i18n'
import router from './router'
import './assets/main.css'
import './assets/base.css'
import { auth } from './includes/firebase'
import Icon from './directives/icon'
import { registerSW } from 'virtual:pwa-register'
import GlobalComponents from './includes/_globals'
import progressBar from './includes/progress-bar'
import 'nprogress/nprogress.css'
progressBar(router)
registerSW({ immediate: true })
let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(i18n)

    app.use(GlobalComponents)
    app.use(VeeValidatePlugin)
    app.directive('icon', Icon)
    app.mount('#app')
  }
})
