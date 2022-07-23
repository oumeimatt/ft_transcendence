import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import "../Container.sass"
import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSimpleAlert from "vue3-simple-alert"

const app = createApp(App).use(router)
app.use(VueAxios, axios, VueSimpleAlert)

app.mount('#app')

