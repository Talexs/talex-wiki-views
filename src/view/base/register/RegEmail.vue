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
  <div class="RegEmail">
    <el-input @keydown.enter="nextStep" v-model="model">
      <template #append>
        <el-button @click="nextStep">下一步</el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "RegEmail"
}
</script>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { userModel } from '~/plugins/model/base/user.ts'
import RegAccount from './RegAccount.vue'

const model = ref('')
const join = inject('join')
const mention = inject('mention')
const getData = inject('getData')
const setData = inject('setData')

const identifier = 'email'

async function nextStep() {

  join(async (func) => {

    // match regx
    const regx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if ( model.value.match(regx) == null ) {
      func(false, "邮箱格式不正确!", {
        color: 'var(--el-color-warning)'
      })
      return
    }

    const res = await userModel.hasIdentifier( model.value )

    if( res ) {

      func(false, "抱歉，此邮箱已存在！", {
        color: 'var(--el-color-error)'
      })

    } else {

      setData(identifier, model.value)

      func(true, "非常好!", {
        color: 'var(--el-color-success)'
      })

    }

  }, RegAccount)



}

onMounted(() => {

  const data = getData()
  if( data[identifier] ) model.value = data[identifier]

  mention('输入一个邮箱，然后点击下一步。')

})
</script>

