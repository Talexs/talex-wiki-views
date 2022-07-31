import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import axios from './plugins/axios'
import router from './plugins/router'
import VWave from 'v-wave'

import './styles/animation/main.scss'
import './styles/element/index.scss'

// &
// demo

// interface animal {
//
//     name: String
//     age: Number
//
// }
//
// interface animal2 {
//
//     gender: Boolean
//     birth: String
//
// }
//
// const Animal: animal | animal2 = {
//
// }

// const test: any = 123
//
// const variable: unknown = 123
//
// const test2: Object = test
//
// console.log( typeof test2 )

const app = createApp(App)

app.use(router).use(VWave)

app.provide('$axios', axios)

router.isReady().then(() => app.mount('#app'))
