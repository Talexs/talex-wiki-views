import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

import axios from './plugins/api/axios'
import router from './plugins/router'
import VWave from 'v-wave'
import pinia, { useStore } from './plugins/store/index'

import './styles/animation/main.scss'
import './styles/element/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

import Loading from '~/plugins/directives/Loading'
import store from './plugins/store/index'

app.use(pinia).use(router).use(VWave).directive('loading', Loading)

app.provide('$axios', axios)

router.isReady().then(() => app.mount('#app'))

// import ws from '~/plugins/channel/connection'
// import '~/plugins/channel/room-channel'
// if( useStore().local.loggedIn ) {
//     ws.connect()
// }
