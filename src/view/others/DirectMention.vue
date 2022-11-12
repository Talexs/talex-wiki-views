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
  <div class="DirectMention-Container">
    <div class="DirectMention-Logo">
      <Logo />
    </div>
    <div class="DirectMention-Body">
      <p>即将离开 塔莱克斯维基(TalexWiki) ，请注意账号财产安全！</p>
      <span class="url">{{ url }}</span>
    </div>
    <FlatHrefButton ignoreSafeCheck="true" :href="url">
      继续
    </FlatHrefButton>
  </div>
</template>

<script>
export default {
  name: "DirectMention"
}
</script>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Logo from '~/components/common/icon/Logo.vue'
import FlatHrefButton from '@components/common/btn/FlatHrefButton.vue'

const url = ref()
const route = useRoute()

onMounted(() => {
  const { target } = route.query

  url.value = target
})
</script>

<style lang="scss" scoped>
.DirectMention-Container {
  .DirectMention-Logo {
    position: absolute;

    width: 150px;

    left: 0;
    top: -48px;

    border-radius: 8px 8px 0 0;
    background-color: var(--el-bg-color);
  }
  .DirectMention-Body {
    .url {
      opacity: .5;
    }
    position: relative;
    padding: 10px 15px;

    height: 70%;

    border-radius: 8px;
    box-sizing: border-box;
    background-color: var(--el-fill-color-light);
  }
  :deep(.FlatHrefButton-Wrapper) {
    position: absolute;
    margin: 10px 0;

    right: 40px;
    bottom: 5%;

    border-radius: 4px;
  }
  position: absolute;
  padding: 20px 40px;

  left: 50%;
  top: 50%;

  min-height: 220px;
  min-width: 380px;

  height: 22%;
  width: 28%;

  border-radius: 8px;
  box-sizing: border-box;
  background-color: var(--el-bg-color);
  transform: translate(-50%, -70%);
}
</style>
