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
  <el-tree v-if="tree" :allow-drop="doAllowDrop" draggable default-expand-all @node-drop="handleDrop" ref="treeRef" class="BookDocTree-Container" :current-node-key="`doc-${currentSelect}`" node-key="vid" @current-change="handleChangeCurrentNode" :data="tree" highlight-current>
    <template #default="{ data }">
        <span class="custom-tree-node">
          <el-icon>
            <Folder v-if="data?.doChapter" />
            <Document v-else />
          </el-icon>
          <span>{{ data.title }}</span>
        </span>
    </template>
  </el-tree>
  <el-skeleton v-else :throttle="500" animated style="position: relative;margin-top: 5%;width: 94%;left: 3%;">
    <template #template>
      <el-skeleton-item variant="h1" style="height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="h1" style="height: 36px" />
      <el-skeleton-item variant="h1" style="height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="h1" style="height: 36px" />
      <el-skeleton-item variant="h1" style="height: 36px" />
      <el-skeleton-item variant="h1" style="height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="p" style="width: 80%;height: 36px" />
      <el-skeleton-item variant="h1" style="height: 36px" />
    </template>
  </el-skeleton>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, inject } from 'vue'
import { Folder, Document } from '@element-plus/icons-vue'

const props = defineProps(['tree', 'currentSelect'])
const emits = defineEmits(['select-doc', 'add-doc', 'del-current', 'drag-drop'])
const treeRef = ref()

function handleChangeCurrentNode(data) {
  if (data.doChapter) return
  emits('select-doc', data)
}
const getTreeMap = inject('getTreeMap')
onMounted(() => {
  if (!props.currentSelect) return

  const map = getTreeMap()
  const vid = String(props.currentSelect)
  const id = Number(vid.replace('doc-', ''))
  const node = map.get(id)

  treeRef.value.setCurrentNode(node)

  emits('select-doc', treeRef.value.getCurrentNode())
})

function handleDrop(draggedNode, finalNode, pos, event) {
  emits('drag-drop', draggedNode, finalNode, pos, event)
}

function doAllowDrop(draggingNode, dropNode, type) {
  return !(type === 'inner' && !dropNode.data.doChapter)
}

function delCurrent(data) {
  emits('del-current', data)
}

function addWikiDoc(data) {
  emits('add-doc', data)
}
</script>

<script>
export default {
  name: 'ChapterTree',
}
</script>

<style lang="scss" scoped>
.BookDocTree-Container {
  position: relative;

  min-height: 100%;

  background-color: var(--el-fill-color-lighter);
}

:deep(.el-tree-node) {

  .custom-tree-node {

    .el-icon {
      position: relative;
      margin-right: 5px;

      left: 0;
      top: 2px;

    }

  }

  border-radius: 6px;
  transition: .3s cubic-bezier(.25,.8,.25,1);

  .el-tree-node__content:hover {
    background-color: var(--el-fill-color-light);
    //color: var(--el-color-primary);
    //filter: invert(1%);
  }
}

:deep(.is-focusable.is-current) {

  & > .el-tree-node__content {

    color: var(--el-color-primary);

    font-weight: 600;

    border-radius: 6px;

  }

  //background-color: var(--el-color-primary-light-6);

}

:deep(.is-focusable) {

  margin: 5px 0;

  &:hover {
    .action-area {

      opacity: 1 !important;
    }
  }

  .el-tree-node__content {
    .action-area {
      position: absolute;

      top: 5px;
      right: 6px;

      opacity: 0;
      transition: .3s cubic-bezier(.25,.8,.25,1);
      .el-icon {
        position: relative;

        left: 0;
        top: 0;

      }
    }
    position: relative;
    height: 36px;

    background-color: unset;
  }

  background-color: var(--el-fill-color-lighter);
  //background: var(--el-fill-color-lighter);

}
</style>
