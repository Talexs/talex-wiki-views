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
    <RotateCaptcha teleport="#RegisterDom" :before-validation="validate" @success="nextStep">
      <FlatButton :loading-flag="loading" plain style="width: 240px;height: 32px;border-radius: 8px;margin: 0 0 auto;">验 证</FlatButton>
    </RotateCaptcha>
  </div>
</template>

<script>
export default {
  name: "RegSure"
}
</script>

<script setup>
import { ref, inject, onMounted } from 'vue'
import RotateCaptcha from '@components/common/captcha/RotateCaptcha.vue'
import FlatButton from '@components/common/btn/FlatButton.vue'
import UserModel from '@plugins/model/base/user.js'
import { useStore } from '@plugins/store/index.ts'

const join = inject('join')
const mention = inject('mention')
const getData = inject('getData')

const loading = ref(false)

const store = useStore()

function validate(func) {

  loading.value = true

  func()

}

async function nextStep(token) {

  // return

  join(async (func) => {

    const data = getData()

    const res = await UserModel.register(token, Number(data['code']), data['res'])

    loading.value = false

    if( !res ) {

      return func(false, "注册失败!", {
        color: 'var(--el-color-error)',
        fontWeight: '600'
      })

    }

    store.local.user = res.user
    store.local.permissions = res.eller.permissions
    store.local.loggedIn = true

    func(true, "注册成功!", {
      color: 'var(--el-color-success)'
    })

  }, null)

}

onMounted(async () => {

  mention('请确认你是一个自然人!', {
   color: 'var(--el-color-warning)',
   fontWeight: '600'
  }, 3000)

})
</script>

<style lang="scss">
#RegisterDom .RotateCaptcha-Wrapper {
  top: 260px !important;
}

</style>

