import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './plugins/router'
import VWave from 'v-wave'

import './styles/element/index.scss'

const app = createApp(App)

app.use(router).use(VWave)

router.isReady().then(() => app.mount('#app'))
