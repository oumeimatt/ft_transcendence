import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import "../Container.sass"

const app = createApp(App).use(router)
app.mount('#app')

