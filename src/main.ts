import Vue from 'vue'

//Components and .vue
import App from './App.vue'

//Library styles
// import 'ui-kit-bundler/dist/ui-kit-bundler.css'

//Styles
import './styles/app.scss'

const app: Vue = new Vue({
  render: h => h(App)
})

app.$mount('#app')