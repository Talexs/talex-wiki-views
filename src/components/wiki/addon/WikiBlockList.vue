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
  <div class="WikiBookList-Container">
    <div class="WikiBookList-Background">
      <el-image fit="fill" :src="wiki.image" />
    </div>
    <div class="WikiBookList-Footer">
      <span class="wiki-title" v-text="wiki.title" />
<!--      TODO Click to change permission-->
      <span class="wiki-status air-dot air-dot-right" :style="`--dot-color: ${wiki.permission === 0 ? 'var(--el-color-error)' : 'var(--el-color-success)'}`" v-text="wiki.permission === 0 ? '公开' : '私有'" />
    </div>
    <el-image class="wiki-book-cover" fit="fill" :src="wiki.image" />
    <div class="WikiBookList-Overlay transition-cubic">
      <div class="action-overlay transition-cubic" />
      <div class="action-bar">
        <el-button @click="emits('edit', wiki.id)" size="large" :icon="Edit" circle />
        <el-button @click="emits('setting', wiki.id)" size="large" :icon="Setting" circle />
        <el-button @click="emits('delete', wiki.id)" type="danger" size="large" :icon="Delete" circle />
      </div>
    </div>
<!--    {{ wiki }}-->
  </div>
</template>

<script>
export default {
  name: "WikiBlockList"
}
</script>

<script setup>
import { Edit, Setting, Delete, Share } from '@element-plus/icons-vue'

const props = defineProps(['wiki'])
const emits = defineEmits(['edit', 'setting', 'delete', 'share'])

</script>

<style lang="scss" scoped>
.WikiBookList-Overlay, .action-overlay, .action-bar {
  &:hover .action-overlay, &:hover .action-bar {
    opacity: 1;
  }
  .action-overlay {
    background-color: var(--el-overlay-color-light);
    opacity: 0;
  }
  .action-bar {
    :deep(.el-button) {
      &:hover {
        i {
          transform: scale(2);
        }
        --el-button-size: 55px;
      }
      i {
        transition: .15s;
      }
      border: none;

      opacity: .85;
      backdrop-filter: blur(16px);
      //background-color: var(--el-color-info-light-9);
    }
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    height: 80%;
    opacity: 0;
  }
  position: absolute;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
}

.wiki-book-cover {
  position: absolute;

  top: 40%;
  left: 50%;

  height: 50%;

  border-radius: 8px;
  transform: translate(-50%, -50%);
  transition: .15s;
}

.WikiBookList-Footer {
  &:before {
    z-index: -1;
    content: "";
    position: absolute;

    width: 100%;
    height: 100%;

    left: 0;
    top: 0;

    opacity: .65;
    border-radius: 8px;
    background-color: var(--el-fill-color-lighter);
  }
  .wiki-title {
    width: 60%;
  }
  .wiki-status {
    margin-right: 28px;
    display: flex;
    //flex-direction: row-reverse;
    width: max-content;
  }
  z-index: 10;
  position: absolute;
  display: flex;
  justify-content: space-around;
  padding: 4px 6px;

  width: 96%;
  height: 32px;

  left: 2%;
  bottom: 2%;

  box-sizing: border-box;
  border-radius: 8px;
  backdrop-filter: saturate(180%) blur(16px);
}

.WikiBookList-Background {
  display: flex;
  justify-content: center;

  transform: scale(2);
  filter: saturate(180%) blur(16px);

}

.WikiBookList-Container {
  &:hover {
    .wiki-book-cover {
      opacity: 0;
    }
  }
  position: relative;
  padding: 4px 6px;

  width: 30%;
  aspect-ratio: 1 / 0.45;

  box-sizing: content-box;

  border-radius: 8px;
  background-color: var(--el-fill-color-dark);
  overflow: hidden;
}
</style>

<style>
.dark.WikiBookList-Overlay {
  filter: saturate(180%) blur(16px) brightness(80%);
  opacity: .75;
}
</style>
