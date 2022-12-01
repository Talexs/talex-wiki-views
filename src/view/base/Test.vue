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
    <FlatButton @click="mention1">提示</FlatButton>
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
import { forTip, forWikiTip, sleep, TipType } from '~/plugins/Common.ts'

const mode = ref('loading')

function mention1() {

  // forWikiTip("Hello!")
  // forWikiTip("Hello!")
  // forWikiTip("签到成功!", -1, TipType.SUCCESS)

  forTip("签到中...", {
    stay: -1,
    loading: async(func) => {

      await sleep(2000)

      const close = func("签到成功！", TipType.SUCCESS)

      await sleep(2000)

      close()

    }
  })

  forTip("签到中...", {
    stay: -1,
    loading: async(func) => {

      await sleep(1000)

      const close = func("签到失败！", TipType.ERROR)

      await sleep(2000)

      close()

    }
  })

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
