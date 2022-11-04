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
    <CodeInput @done="nextStep" v-model="model" />
  </div>
</template>

<script>
export default {
  name: "RegEmailCode"
}
</script>

<script setup>
import { ref, inject, onMounted } from 'vue'
import CodeInput from '@components/common/input/CodeInput.vue'
import RegSure from './RegSure.vue'
import UserModel from '@plugins/model/base/user.js'
import { useStore } from '@plugins/store/index.ts'

const model = ref('')
const join = inject('join')
const mention = inject('mention')
const getData = inject('getData')
const setData = inject('setData')

const store = useStore()

async function nextStep() {

  join(async (func) => {

    setData('code', model.value)

    func(true, "非常好!", {
      color: 'var(--el-color-success)'
    })

  }, RegSure)

}

onMounted(async () => {

  const data = getData()

  const res = await UserModel.registerCode(data['email'], data['user'], data['password'])

  setData('res', res)

  mention('我们已经向您的邮箱发送了验证码，请输入验证码!', {
   color: 'var(--el-color-warning)',
   fontWeight: '600'
  }, 3000)

})
</script>

