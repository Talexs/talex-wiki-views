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
  <div class="RegRPassword">
    <el-input type="password" @keydown.enter="nextStep" v-model="model">
      <template #append>
        <el-button @click="nextStep">下一步</el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "RegRPassword"
}
</script>

<script setup>
import { ref, inject, onMounted } from 'vue'
import UserModel from '~/plugins/model/base/user.ts'
import RegEmailCode from './RegEmailCode.vue'

const model = ref('')
const join = inject('join')
const mention = inject('mention')
const getData = inject('getData')
const setData = inject('setData')

const identifier = 'password'

async function nextStep() {

  join(async (func) => {

    const data = getData()

    if( data[identifier] !== model.value ) {

      func(false, "两次密码不一致!", {
        color: 'var(--el-color-error)',
        fontWeight: '600'
      })

    } else {

      setData(identifier, model.value)

      func(true, "非常好!", {
        color: 'var(--el-color-success)'
      })

    }

  }, RegEmailCode)

}

onMounted(() => {

  // const data = getData()
  // if( data[identifier] ) model.value = data[identifier]

  mention('请再次输入密码!', {
   color: 'var(--el-color-warning)',
   fontWeight: '600'
  }, 3000)

})
</script>

