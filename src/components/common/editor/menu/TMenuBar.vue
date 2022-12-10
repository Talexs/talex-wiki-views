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
  <div class="TalexEditor-MenuBar">
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
      <menu-item v-else :key="index" :item="item" />
    </template>
<!--    info-->
    <menu-item class="right-fixed" :key="info" :item="info" />
  </div>
</template>

<script setup>
import MenuItem from './TMenuItem.vue'
import { reactive } from 'vue'

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

const items = reactive([
  {
    icon: 'bold',
    title: '加粗',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold')
  },
  {
    icon: 'italic',
    title: '斜体',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic')
  },
  {
    icon: 'strikethrough',
    title: '文本线',
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike')
  },
  {
    icon: 'code-view',
    title: '代码',
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive('code')
  },
  {
    icon: 'mark-pen-line',
    title: '高亮',
    action: () => props.editor.chain().focus().toggleHighlight().run(),
    isActive: () => props.editor.isActive('highlight')
  },
  {
    type: 'divider'
  },
  {
    icon: 'h-1',
    title: '标题1',
    action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 })
  },
  {
    icon: 'h-2',
    title: '标题2',
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 2 })
  },
  {
    icon: 'h-3',
    title: '标题3',
    action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 3 })
  },
  {
    icon: 'h-4',
    title: '标题4',
    action: () => props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 4 })
  },
  {
    icon: 'h-5',
    title: '标题5',
    action: () => props.editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 5 })
  },
  {
    icon: 'h-6',
    title: '标题6',
    action: () => props.editor.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 6 })
  },
  {
    icon: 'paragraph',
    title: '段落',
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph')
  },
  {
    icon: 'list-unordered',
    title: '无须列表',
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList')
  },
  {
    icon: 'list-ordered',
    title: '有须列表',
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList')
  },
  {
    type: 'divider'
  },
  {
    icon: 'double-quotes-l',
    title: '块',
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote')
  },
  {
    icon: 'separator',
    title: '横线',
    action: () => props.editor.chain().focus().setHorizontalRule().run()
  },
  {
    type: 'divider'
  },
  {
    icon: 'format-clear',
    title: '清除样式',
    action: () => props.editor.chain()
        .focus()
        .clearNodes()
        .unsetAllMarks()
        .run()
  },
  {
    type: 'divider'
  },
  {
    icon: 'image-line',
    title: '插入图片',
    action: () => {
      const url = window.prompt('URL')
      if (url) {
        props.editor.chain().focus().setImage({ src: url }).run()
      }
    }
  },
  {
    type: 'divider'
  },
  {
    icon: 'arrow-go-back-line',
    title: '撤销',
    action: () => props.editor.chain().focus().undo().run()
  },
  {
    icon: 'arrow-go-forward-line',
    title: '取消撤销',
    action: () => props.editor.chain().focus().redo().run()
  },
  {
    type: 'divider'
  },
  {
    icon: 'table-2',
    title: '插入表格',
    action: () => props.editor.chain().focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  },
  {
    icon: 'delete-bin-6-line',
    title: '删除表格',
    action: () => props.editor.chain().focus().deleteTable().run()
  },
  {
    icon: 'merge-cells-horizontal',
    title: '合并拆分单元格',
    action: () => props.editor.chain().focus().mergeOrSplit().run()
  },
  {
    icon: 'insert-row-top',
    title: '上面添加一行',
    action: () => props.editor.chain().focus().addRowBefore().run()
  },
  {
    icon: 'insert-row-bottom',
    title: '下面添加一行',
    action: () => props.editor.chain().focus().addRowAfter().run()
  },
  {
    icon: 'delete-row',
    title: '删除行',
    action: () => props.editor.chain().focus().deleteRow().run()
  },
  {
    icon: 'insert-column-left',
    title: '左边添加一列',
    action: () => props.editor.chain().focus().addColumnBefore().run()
  },
  {
    icon: 'insert-column-right',
    title: '右边添加一列',
    action: () => props.editor.chain().focus().addColumnAfter().run()
  },
  {
    icon: 'delete-column',
    title: '删除行',
    action: () => props.editor.chain().focus().deleteColumn().run()
  },
  {
    icon: 'sip-line',
    title: '单元格背景色',
    action: () => props.editor.chain().focus().toggleHeaderCell().run()
  },
  {
    type: 'divider'
  }
])

const info = reactive({
  type: 'menu',
  trigger: 'hover',
  icon: 'information-line',
  title: '信息',
  render: () => {
    return `
       ${props.editor?.storage?.characterCount.characters()}/10000 文字
      <br>
       ${props.editor?.storage?.characterCount.words()} 词
    `
  }
})
</script>

<style lang="scss">
.TalexEditor-MenuBar {
  :deep(& .right-fixed)  {
    position: absolute;

    right: 4px;
  }
  &:before {
    z-index: -1;
    content: "";
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: .5;
    background-color: var(--el-fill-color-lighter);
  }
  z-index: 100;
  position: sticky;
  top: 0;
  //position: relative;
  padding: 2px 3px;
  display: flex;

  width: 100%;
  height: 32px;

  //background-color: var(--el-fill-color-lighter);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--el-fill-color);
  box-sizing: border-box;
}

.divider {
  position: relative;
  width: 2px;
  height: 100%;
  background-color: var(--el-fill-color);
  margin-left: .5rem;
  margin-right: .75rem;
}
</style>
