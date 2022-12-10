/*
 * Copyright (c) 2022. TalexDreamSoul
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

import axios from './plugins/api/axios'
import router from './plugins/router'
import VWave from 'v-wave'
import pinia, { useStore } from './plugins/store/index'

import './styles/prosemirror/main.scss'
import './styles/animation/main.scss'
import './styles/element/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

import Loading from '~/plugins/directives/Loading'
import ForceFocus from '~/plugins/directives/ForceFocus.js'
import store from './plugins/store/index'

app.use(pinia).use(router).use(VWave)
    .directive('loading', Loading)
    .directive('force-focus', ForceFocus)

app.provide('$axios', axios)

router.isReady().then(() => app.mount('#app'))

// import ws from '~/plugins/channel/connection'
// import '~/plugins/channel/room-channel'
// if( useStore().local.loggedIn ) {
//     ws.connect()
// }
