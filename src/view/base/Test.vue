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
  <div class="TestContainer">
    <FlatButton @click="mention1">测试签到</FlatButton>
    <FlatButton @click="mention2">测试TOAST</FlatButton>
    <FlatButton @click="mention3">测试TOAST(ICON)</FlatButton>
<!--    <Mention :mode="mode"></Mention>-->
<!--    <el-radio-group v-model="mode">-->
<!--      <el-radio-button :label="`loading`">加载</el-radio-button>-->
<!--      <el-radio-button :label="`success`">成功</el-radio-button>-->
<!--      <el-radio-button :label="`error`">失败</el-radio-button>-->
<!--      <el-radio-button :label="`warning`">警告</el-radio-button>-->
<!--    </el-radio-group>-->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FlatButton from '~/components/common/btn/FlatButton.vue'
import { sleep } from '~/plugins/Common.ts'
import { TipType } from '~/plugins/addon/Tipper.ts'
import { MentionTip } from '~/plugins/addon/MentionerManager'

const mode = ref('loading')

function mention1() {

  // forWikiTip("Hello!")
  // forWikiTip("Hello!")
  // forWikiTip("Hello!")
  // forWikiTip("Hello!")
  // forWikiTip("Hello!")
  // forWikiTip("签到成功!", -1, TipType.SUCCESS)



  window.$tipper.tip("签到中...", {
    stay: -1,
    loading: async(func) => {

      await sleep(2000)

      const close = func("签到成功！", TipType.SUCCESS)

      await sleep(2000)

      func("签到积分 +2！", TipType.INFO)

      await sleep(2000)

      close()

    }
  })

}

function mention2() {

  window.$tipper.mention(new MentionTip("这是一个测试TOAST") )

}

function mention3() {

  window.$tipper.mention(new MentionTip("这是一个测试TOAST", {
    time: 3000,
    type: TipType.SUCCESS,
    emphasis: true
  }) )

}
</script>

<script>


export default {
  name: "Test",
}
</script>

<style lang="scss" scoped>
.TestContainer {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

}
</style>
