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
  <div @mouseenter="hover = true" @mouseleave="hover = false" class="AsideAdapter-Wrapper transition-cubic" :class="{ shrink }">
    <div class="AsideAdapter-Container transition-cubic">
      <slot />
    </div>
    <teleport to="body" :disabled="!shrink">
      <div @click="shrink = !shrink" :class="{ visible: hover, shrink }" class="AsideAdapter-Button transition-cubic">

      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: "AsideAdapter"
}
</script>

<script setup>
import { ref } from'vue'

const hover = ref(false)

const shrink = ref(document.body.clientWidth <= 600)

</script>

<style lang="scss" scoped>
.AsideAdapter-Button {
  &:before {
    z-index: -1;
    content: "";
    position: absolute;

    left: 50%;
    top: 50%;

    width: 40%;
    height: 30%;

    opacity: 0;
    background-color: var(--el-fill-color-lighter);
    transform: translate(-50%, -50%) scale(0);
    border-radius: 20px;
    transition: all .25s ease-in;
  }
  //z-index: 100;
  position: absolute;

  top: 50%;

  width: 5px;
  height: 10%;

  //opacity: 0;
  cursor: pointer;
  border-radius: 2px;
  background-color: var(--el-border-color-darker);

  opacity: .85;
  transform: translateY(-50%) scaleY(1) translateX(305px);

  &.visible {
    opacity: 0;
    transform: translateY(-50%) scaleY(0.8) translateX(295px);
    //opacity: .85;
    //backdrop-filter: saturate(180%) blur(16px);
    //transform: translateY(-50%) scaleY(1) translateX(5px);
  }

  &:hover {
    &:before {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    width: 10px;
    height: 30%;

    left: 0;

    border-radius: 0 3px 3px 0 !important;

    opacity: .65;
    transform: translateY(-50%) scaleY(1) translateX(300px);
  }

  &.shrink {

    opacity: .85;
    //backdrop-filter: saturate(180%) blur(16px);
    transform: translateY(-50%) scaleY(1) translateX(5px);
  }

  &.shrink:hover {
    &:before {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    width: 10px;
    height: 30%;

    border-radius: 0 3px 3px 0 !important;

    opacity: 1;
    transform: translateY(-50%) scaleY(1) translateX(0px);
  }
}

.AsideAdapter-Container {
  //&.shrink {
  //  margin-left: -100%;
  //  left: -100%;
  //}
  //z-index: 10;
  position: relative;

  height: 100%;
}

.AsideAdapter-Wrapper {
  &.shrink {
    margin-left: -300px;
    //left: -100%;

    //transform: translateX(-10%);
  }
  z-index: 100;
  position: relative;

  left: 0;

  //width: 100%;
  height: 100%;
}
</style>
