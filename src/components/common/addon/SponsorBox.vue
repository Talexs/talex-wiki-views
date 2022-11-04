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
  <div class="SponsorBox-Container transition-cubic" :class="{ gold }">
    <div class="icon transition-cubic">
      <slot name="icon">

      </slot>
    </div>
    <div class="text transition-cubic">
      <slot name="title">

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SponsorBox"
}
</script>

<script setup>
const props = defineProps(['gold'])
</script>

<style lang="scss" scoped>
.SponsorBox-Container {
  .icon, .text {
    position: relative;
    left: 0;
    filter: grayscale(100%);
  }
  &:hover {
    //justify-content: center;
    background-color: var(--el-fill-color);
    .icon {
      filter: grayscale(0);
      //left: 50%;
      transform: rotate3d(0, 1, 0, .2deg) translateX(1px);
    }
    .text {
      filter: grayscale(0);
      color: var(--el-color-warning);
      transform: rotate3d(0, 1, 0, -.1deg) translateX(-1px);
      //opacity: 0;
      //margin-left: -100%;
    }
  }
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 1rem;

  font-size: 1.5rem;

  border-radius: 2px;
  background-color: var(--el-fill-color-light);

  width: 276px;
  height: 114px;

  perspective: 1px;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.SponsorBox-Container.gold {
  background-color: var(--el-color-warning-light-9);
  &:hover {
    background-color: var(--el-color-warning-light-8);
  }
}
</style>
