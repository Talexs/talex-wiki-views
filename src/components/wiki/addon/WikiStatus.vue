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
  <div class="WikiStatus-Container transition-cubic" :class="{ shrink }">
   <el-scrollbar>
     <div :class="{ success: item.success, danger: item.danger, 'expand': index < 2, 'first': index === 0, 'hover': item.hover }"
          :style="`z-index: ${index};--index: ${(list.length - index) * 0.2 + .35}s`" @mouseenter="item.hover = true" @mouseleave="item.hover = false"
          v-for="(item, index) in reversedList" :key="item.time" class="WikiStatus-Line">
      <span class="status-icon">
        <el-icon>
          <Close v-if="item.danger" />
          <Select v-else />
        </el-icon>
      </span>
       <span class="status-title">
        {{ item.label }}
      </span>
       <span class="status-time">
         {{ item.timeText }}
       </span>
     </div>
   </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, onBeforeMount } from 'vue'
import { Select, Close } from '@element-plus/icons-vue'
import { useModelWrapper } from '~/plugins/Common.ts'
import { formatDateDistance } from '../../../plugins/addon/utils.ts'

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const list = useModelWrapper(props, emits)

const reversedList = computed(() => (() => lastUpdate = new Date().getTime())() && (list.value ? [...list.value.reverse()] : []))

let timer, lastUpdate = new Date().getTime()

let shrink = ref(false)

function updateTimeText() {
  shrink.value = new Date().getTime() - lastUpdate > 120 * 1000
  list.value.forEach(item => item.timeText = formatDateDistance(item.time))
}

onMounted(() => {
  timer = setInterval(updateTimeText, 5000)
  updateTimeText()
})

onBeforeMount(() => clearInterval(timer))

</script>

<script>
export default {
  name: 'WikiStatus',
}
</script>

<style lang="scss" scoped>
.WikiStatus-Line {
  .status-icon {
    position: relative;

    top: 4px;
    left: 5px;

  }
  .status-title {
    position: relative;

    left: 8px;

    font-size: 14px;
  }
  .status-time {
    position: absolute;

    right: 10px;
    bottom: 0;

    //color: var();

    font-size: 10px;
    opacity: 0;
    transform: translateY(5px);
    transition: .3s cubic-bezier(.25,.8,.25,1);
  }
  &.hover, &:hover {
    .status-time {
      opacity: .75;
      transform: translateY(0);
    }
    padding-bottom: 20px;
    background-color: var(--el-fill-color);
  }
  position: relative;
  padding: 2px 8px 10px 2px;
  margin: -20px 10px 2px 0;

  left: 4px;

  height: 32px;
  width: calc(100% - 24px);

  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  box-shadow: 0 -1px 4px 2px var(--el-fill-color);
  background-color: var(--el-fill-color-light);
  transform: rotate3d(.1, 1, 0, 10deg);
  perspective: 1px;
  transition: .3s cubic-bezier(.25, .8, .25, 1);
  animation: leftLoadIn .25s var(--index) backwards;

  span {
    line-height: 32px;
  }
}

.WikiStatus-Line.success {
  color: var(--el-color-success);
}

.WikiStatus-Line.danger {
  color: var(--el-color-danger);
}

.WikiStatus-Container {
  &.shrink {
    height: 60px;
  }
  &:hover {
    height: 140px;
  }
  &:hover .WikiStatus-Line {
    margin: 5px 10px 2px 0 !important;
  }
  position: relative;
  padding: 0 2%;

  margin-top: 5px;

  width: 96%;
  height: 140px;

  perspective: 1px;

  overflow: hidden;
}

.WikiStatus-Container.first {
  .status-time {
    opacity: .75;
    transform: translateY(0);
  }
}

.WikiStatus-Line.expand {
  .status-time {
    opacity: .75;
    transform: translateY(0);
  }
  padding-bottom: 20px;
  margin: 5px 10px 0 0;
}

:deep(.el-scrollbar__wrap) {
  z-index: 10;
}

:deep(.el-scrollbar__bar) {
  z-index: 20;
}

</style>
