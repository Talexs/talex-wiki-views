<!--
  - Copyright (c) 2022. TalexDreamSoul
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
  <div class="About-Container LayoutSub-Frame">
    <h3 style="text-align: center">TalexWiki 引用信息</h3>
    <blockquote>
      本项目中引用了如下 开源项目 的代码，遵循其协议：
    </blockquote>
    <el-table stripe :data="projectsRequire">
      <el-table-column type="index" label="-" />
      <el-table-column prop="name" label="项目名称">
        <template #default="scope">
          <a target="_blank" :href="scope.row.url">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="agreement" label="项目协议">
        <template #default="scope">
          <a target="_blank" :href="scope.row.agreement.url">{{ scope.row.agreement.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="desc" width="400" label="项目介绍"></el-table-column>
      <el-table-column prop="update_time" label="更新日期">
        <template #default="scope">
          {{ formatDateDistance(scope.row.time) }}
        </template>
      </el-table-column>
    </el-table>
    <br />
    <blockquote class="force">
     <ul>
       <li> 引用项目指示仅限于开源项目。</li>
       <li>引用项目描述来自于项目官网，如果官网描述过长，将会进行截取、提炼。</li>
     </ul>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: "AboutQuote"
}
</script>

<script setup>
import { ref } from 'vue'
import { formatDateDistance } from '../../../plugins/addon/utils.ts'

const projectsRequire = ref([
  {
    name: "Vue.js 3.0",
    url: "https://cn.vuejs.org/",
    desc: "渐进式 JavaScript 框架",
    agreement: {
      name: "MIT license",
      url: "https://github.com/vuejs/core/blob/main/LICENSE"
    },
    time: 1662516511000
  },
  {
    name: "vue-axios ^3.4.1",
    url: "https://cn.vuejs.org/",
    desc: "A small wrapper for integrating axios to Vuejs",
    agreement: {
      name: "MIT license",
      url: "https://github.com/imcvampire/vue-axios/blob/master/LICENSE"
    },
    time: 1662516511000
  },
  {
    "desc": "🍡 An interactive and responsive charting library",
    "url": "https://github.com/antvis/G2plot",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/antvis/G2Plot/blob/master/LICENSE"
    },
    "time": 1662521430311,
    "name": "@antv/g2plot"
  },
  {
    "desc": "Main package for storing Element Plus icon resources.",
    "url": "https://github.com/element-plus/element-plus-icons",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/element-plus/element-plus-icons/blob/main/LICENSE"
    },
    "time": 1662521432204,
    "name": "@element-plus/icons-vue"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/axios/axios",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/axios/axios/blob/v1.x/LICENSE"
    },
    "time": 1662521434376,
    "name": "axios"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/highlightjs/highlight.js",
    "agreement": {
      "name": "BSD-3-Clause license",
      "url": "https://github.com/highlightjs/highlight.js/blob/main/LICENSE"
    },
    "time": 1662521442257,
    "name": "element-plus"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/lodash/lodash",
    "agreement": {
      "name": "View license",
      "url": "https://github.com/lodash/lodash/blob/master/LICENSE"
    },
    "time": 1662521444396,
    "name": "highlight.js"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/airbnb/lottie-web",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/airbnb/lottie-web/blob/master/LICENSE.md"
    },
    "time": 1662521446653,
    "name": "lodash"
  },
  {
    "desc": "a JavaScript function for hashing messages with MD5",
    "url": "https://github.com/pvorb/node-md5",
    "agreement": {
      "name": "BSD-3-Clause license",
      "url": "https://github.com/pvorb/node-md5/blob/master/LICENSE"
    },
    "time": 1662521448305,
    "name": "lottie-web"
  },
  {
    "desc": "Parse, validate, manipulate, and display dates in javascript.",
    "url": "https://github.com/moment/moment",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/moment/moment/blob/develop/LICENSE"
    },
    "time": 1662521450368,
    "name": "md5"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/rstacruz/nprogress",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/rstacruz/nprogress/blob/master/License.md"
    },
    "time": 1662521454270,
    "name": "node"
  },
  {
    "desc": "🍍 Intuitive, type safe, light and flexible Store for Vue using the composition api with DevTools support",
    "url": "https://github.com/vuejs/pinia",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/vuejs/pinia/blob/v2/LICENSE"
    },
    "time": 1662521458397,
    "name": "path"
  },
  {
    "desc": "Persist pinia state data in sessionStorage or other storages.",
    "url": "https://github.com/Seb-L/pinia-plugin-persist",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/Seb-L/pinia-plugin-persist/blob/main/LICENSE"
    },
    "time": 1662521460328,
    "name": "pinia"
  },
  {
    "desc": "The reference implementation of Sass, written in Dart.",
    "url": "https://github.com/sass/dart-sass",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/sass/dart-sass/blob/main/LICENSE"
    },
    "time": 1662521462799,
    "name": "pinia-plugin-persist"
  },
  {
    "desc": "JavaScript 3D Library.",
    "url": "https://github.com/mrdoob/three.js",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/mrdoob/three.js/blob/dev/LICENSE"
    },
    "time": 1662521464317,
    "name": "sass"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/justintaddei/v-wave",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/justintaddei/v-wave/blob/master/LICENSE.md"
    },
    "time": 1662521468328,
    "name": "ts-md5"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/Vanessa219/vditor",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/Vanessa219/vditor/blob/master/LICENSE"
    },
    "time": 1662521470482,
    "name": "v-wave"
  },
  {
    "desc": "Cannot get",
    "url": "https://github.com/vuejs/core",
    "agreement": {
      "name": "MIT license",
      "url": "https://github.com/vuejs/core/blob/main/LICENSE"
    },
    "time": 1662521472293,
    "name": "vditor"
  }
])
</script>

<style lang="scss" scoped>
blockquote {
  position: relative;
  display: inline-block;
  padding: 15px 12px;

  width: calc(100% - 40px);
}

</style>
