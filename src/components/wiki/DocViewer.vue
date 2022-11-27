<template>
  <div class="DocEditor-Container">
<!--    <div class="DocEditor-inner" ref="inner">-->
    <el-scrollbar ref="scrollbarRef" @scroll="scroller">
      <VueEditor :editor="editor" />
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

import '@material-design-icons/font'
import { defaultValueCtx, Editor, editorViewCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { VueEditor, useEditor } from '@milkdown/vue'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { commonmark } from '@milkdown/preset-commonmark'
import { block } from '@milkdown/plugin-block'
import { gfm } from '@milkdown/preset-gfm'

import { useModelWrapper } from '~/plugins/Common.ts'
import { outline, replaceAll } from '@milkdown/utils'
import DocOutline from '@components/wiki/addon/DocOutline.vue'
import { iframePlugin } from '@plugins/milkdown/plugins/PowerPlugin.ts'
import { useImageClickAgent } from '@plugins/addon/hooks.ts'

const props = defineProps({ content: String, updateTime: Number })
const emits = defineEmits(['update:modelValue'])

const docOutline = ref()
const scrollbarRef = ref()

provide('getScrollBar', () => scrollbarRef.value)

watch(() => props.content, () => {
  const editorIns = editor.getInstance()

  editorIns.action((ctx) => {

    const getOutline = editorIns.action(outline)

    replaceAll(props.content + "\n#Power\{text=\"TalexWiki\"}")(ctx)
    docOutline.value = getOutline(ctx)

    useImageClickAgent(scrollbarRef.value.wrap$)

  })

})

function scroller(e) {
  if( scrollListener ) scrollListener(e)
}

let scrollListener
const func = (_listener) => {
  scrollListener = _listener
}

// const inner = ref(null)
const editor = useEditor((root) => Editor.make()
    .config(async (ctx) => {
      ctx.set(rootCtx, root)

      // const ctx = editor.getInstance().ctx

      // const doc = await DocumentModel.viewDocument(props.id)

      // console.log(doc)

      ctx.set(editorViewOptionsCtx, {
        editable: () => false
      })
      ctx.set(defaultValueCtx, props.content + "\n#Power{text=\"TalexWiki\"}")
      ctx.get(listenerCtx).markdownUpdated((_ctx, markdown) => {

        modelValue.value = markdown

      })

      function init() {
        const editorIns = editor.getInstance()
        if( !editorIns ) return setTimeout(init, 100)

        const getOutline = editorIns.action(outline)

        // console.log("@Outline", getOutline(ctx))

        docOutline.value = getOutline(ctx)
        // emits('outline', getOutline(ctx))

        // inject image agent

        useImageClickAgent(scrollbarRef.value.wrap$)

      }

      init()

    })
    .use(nord)
    .use(iframePlugin)
    .use(commonmark)
    .use(block)
    .use(gfm)
    // .use(slash)
    .use(listener)
)

const modelValue = useModelWrapper(props, emits)

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
