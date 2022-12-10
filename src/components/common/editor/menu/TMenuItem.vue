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
  <el-popover v-if="item?.type === 'menu'"
          placement="bottom-start"
          :title="item.title"
          :width="200"
          trigger="hover"
  >
    <template #reference>
      <button
              class="menu-item transition-cubic"
              :class="{ 'is-active': item?.active?.() }"
              @click="item?.action"
              :title="item?.title"
      >
        <svg class="remix">
          <use :xlink:href="`${iconUrl}#ri-${item?.icon}`" />
        </svg>
      </button>
    </template>
    <div v-html="item?.render()" />
  </el-popover>
  <button v-else
          class="menu-item transition-cubic"
          :class="{ 'is-active': item?.active?.() }"
          @click="item?.action"
          :title="item?.title"
  >
    <svg class="remix">
      <use :xlink:href="`${iconUrl}#ri-${item?.icon}`" />
    </svg>
  </button>
</template>

<script setup>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import { ref } from 'vue'

const iconUrl = ref(remixiconUrl)
const props = defineProps({
  item: Object
  /*icon: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  action: {
    type: Function,
    required: true
  },

  active: {
    type: Function,
    required: false,
    default: null
  }*/
})
</script>

<style lang="scss">
.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: var(--el-text-color-primary);
  border: none;
  background-color: transparent;
  border-radius: .4rem;
  padding: .25rem;
  margin-right: .25rem;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active,
  &:hover {
    color: var(--el-text-color-regular);
    background-color: var(--el-fill-color);
  }
}
</style>
