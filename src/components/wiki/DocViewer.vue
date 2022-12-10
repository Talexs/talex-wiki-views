<template>
  <div class="DocEditor-Container">
<!--    <div class="DocEditor-inner" ref="inner">-->
    <el-scrollbar ref="scrollbarRef" @scroll="scroller">
<!--      <VueEditor :editor="editor" />-->
      <talex-editor @outline="getOutline" :model-value="content" :t-vid="`${updateTime}`" :only-view="true"/>
    </el-scrollbar>

    <transition name="el-collapse-transition">
      <DocOutline :update="updateTime" :content="content" :func="func" class="DocEditor-inner" v-if="docOutline" :outline="docOutline" />
    </transition>
<!--    </div>-->
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  watch,
  onBeforeMount,
  reactive,
  nextTick,
  watchEffect,
  provide
} from 'vue'

import { useModelWrapper } from '~/plugins/Common.ts'
import DocOutline from '@components/wiki/addon/DocOutline.vue'
import { useEditorOutline, useImageClickAgent } from '@plugins/addon/hooks.ts'
import TalexEditor from '~/components/common/editor/TalexEditor.vue'

const props = defineProps({ content: String, updateTime: Number })
const emits = defineEmits(['update:modelValue'])

const docOutline = ref()
const scrollbarRef = ref()

provide('getScrollBar', () => scrollbarRef.value)

function scroller(e) {
  console.log(e)
  if( scrollListener ) scrollListener(e)
  editorOutline?.scrolling?.(e)
}

let scrollListener
const func = (_listener) => {
  scrollListener = _listener
}

let editorOutline
const modelValue = useModelWrapper(props, emits)

onMounted(() => {
  nextTick(() => {
    const wrap$ = scrollbarRef.value.wrap$

    useImageClickAgent(wrap$)

    const pm = wrap$.querySelector('.ProseMirror')
    editorOutline = useEditorOutline( scrollbarRef.value, pm )

    editorOutline.mounted()

    watchEffect(editorOutline.updated)
  })
})

function getOutline(outline) {
  const _outline = [ ...outline.content ].filter((item) => item.type === 'heading')

  // function convertToTree(arr) {
  //   let tree = [];
  //   let currentLevel = 0;
  //   let parentNode = null;
  //
  //   for (let i = 0; i < arr.length; i++) {
  //     let item = arr[i];
  //     let node = { label: item.content[0] };
  //
  //     if ( !parentNode ) parentNode = (tree = [ node ])[0]
  //
  //     if (item.attrs.level > currentLevel) {
  //       // 新的子节点
  //       parentNode.children = parentNode.children || [];
  //       parentNode.children.push(node);
  //       currentLevel = item.attrs.level;
  //       parentNode = node;
  //     } else if (item.attrs.level < currentLevel) {
  //       // 向上一级
  //       let diff = currentLevel - item.attrs.level;
  //       for (let j = 0; j < diff; j++) {
  //         parentNode = parentNode.parent;
  //       }
  //       currentLevel = item.attrs.level;
  //       parentNode.children = parentNode.children || [];
  //       parentNode.children.push(node);
  //       parentNode = node;
  //     } else {
  //       // 同一级
  //       parentNode.parent.children = parentNode.parent.children || [];
  //       parentNode.parent.children.push(node);
  //       parentNode = node;
  //     }
  //     node.parent = parentNode;
  //   }
  //
  //   return tree;
  // }

  function convertToTree(data, level) {
    let tree = [];

    data.filter(item => item.attrs.level === level)
        .forEach(item => {
          let children = convertToTree(data, level + 1);
          tree.push({...item, children, content: item.content[0].text});
        });

    return tree;
  }

  function buildOutline() {

    for ( let i = 1;i < 6;++i ) {

      const _tree = convertToTree(_outline, i)
      if ( _tree ) return _tree

    }

    return ["null"]

  }

  // console.log( _outline, buildOutline() )

  docOutline.value = buildOutline()

  // make the flat list to tree followed by the attrs.level

  // docOutline.value = outline

    // let current = []
    // let lastLevel = 0
    // _outline.forEach((item) => {
    //   item.content = item.content[0].text
    //   item.level = item.attrs.level
    //
    //   delete item.attrs
    //   delete item.type
    //
    //   if (item.level === 1) {
    //     current = [item]
    //   } else if (item.level > lastLevel) {
    //     current[current.length - 1].children = [item]
    //     current = current[current.length - 1].children
    //   } else if (item.level === lastLevel) {
    //     current = current.slice(0, -1)
    //     current.push(item)
    //   } else {
    //     current = current.slice(0, -1 * (lastLevel - item.level))
    //     current.push(item)
    //   }
    //
    //   current.push({
    //     level: item.level,
    //     content: item.content[0].text,
    //     children: []
    //   })
    //   lastLevel = item.level
    //
    //   console.log( current )
    // })

  // console.log( "@@@", current )
  // docOutline.value = current

  // docOutline.value = tree
  // const map = new Map();
  // let lastIndexOf = -1
  // _outline.forEach(item => {
  //   const { level } = item.attrs
  //   if ( level > lastIndexOf ) {
  //     map.set(level, item)
  //     lastIndexOf = level
  //   } else {
  //     map.delete(level)
  //     map.set(level, item)
  //   }
  //
  // })

  // docOutline.value = _outline
}

</script>

<script>
export default {
  name: 'DocViewer',
}
</script>

<style lang="scss" scoped>
.DocEditor-Container {
  .DocEditor-inner {
    position: sticky;

    min-width: 260px !important;
    width: 30% !important;
    max-width: 300px;
    height: 100% !important;

    border: 1px solid var(--el-border-color);
  }
   div {
    height: 100%;
  }
  :deep(.el-scrollbar) {
    .el-scrollbar__view {
      height: 100%;
    }
    flex: 1;
  }
  :deep(.el-tree) {
    background-color: transparent !important;
  }
  position: absolute;
  display: flex;

  top: 0;

  width: 100%;
  height: 100%;

  overflow-y: auto;
  //:deep(.vditor-reset) {
  //  p {
  //    font-size: 17px;
  //  }
  //  padding: 2% 4% !important;
  //  caret-color: var(--el-text-color-primary);
  //  cursor: url(https://svgsilh.com/png-1024/1297941.png), help;
  //}
}
</style>
