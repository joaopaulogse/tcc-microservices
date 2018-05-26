import 'babel-polyfill'
import Vue from "vue";

import Vuetify from "vuetify";


import App from "./app.vue";
import store from './store'

import '../node_modules/vuetify/dist/vuetify.min.css'
import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

new Vue({
    store,
    el:'#app',
    render: h => h(App)
})