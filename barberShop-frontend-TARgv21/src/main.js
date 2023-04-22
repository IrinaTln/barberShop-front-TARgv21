import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Dropdown from 'vue-simple-search-dropdown'

import './assets/main.css'

const app = createApp(App)
app.use(Dropdown)
app.use(router)

app.mount("#app")