<template>
  <div ref="containerRef" class="DocEditor-Container">
<!--    <div class="DocEditor-inner" ref="inner">-->
     <el-scrollbar>
       <VueEditor :editor="editor" />
     </el-scrollbar>
<!--    </div>-->
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch, onBeforeMount, reactive, nextTick } from 'vue'

import '@material-design-icons/font'
import { VueEditor, useEditor } from '@milkdown/vue'
import 'katex/dist/katex.min.css'

// import { shiki } from 'milkdown-plugin-shiki'

import { iframePlugin } from '@plugins/milkdown/plugins/PowerPlugin.ts'

import { useModelWrapper } from '~/plugins/Common.ts'
import { outline } from '@milkdown/utils'
import { generateEditor } from '@plugins/milkdown/generator.ts'

const props = defineProps({
  tVid: String,
  modelValue: String
})
const emits = defineEmits(['update:modelValue', 'outline'])

// const inner = ref(null)
const editor = generateEditor(props.modelValue, (ctx, editorIns) => {

  const getOutline = editorIns.action(outline)

  emits('outline', getOutline(ctx))

}, (_ctx, markdown) => {
  modelValue.value = markdown
})()

const modelValue = useModelWrapper(props, emits)

const containerRef = ref()

// watch(() => modelValue.value, () => {
//
//   // if (editor.value.getValue() === props.modelValue) {
//   //   console.log('turn down')
//   //
//   //   return
//   // }
//
// })

// onMounted(() => {
//
//   // editor.value = new Vditor(inner.value, {
//   //   mode: 'wysiwyg',
//   //   placeholder: '在这里输入内容以编辑...',
//   //   tab: '    ',
//   //   counter: {
//   //     enable: true
//   //   },
//   //   toolbarConfig: {
//   //     pin: true
//   //   },
//   //   cache: {
//   //     id: `talex-wiki-doc-editor-${props.tVid}`,
//   //     enable: true
//   //   },
//   //   after: () => {
//   //     editor.value.setValue(props.modelValue)
//   //   },
//   //   input: value => {
//   //     modelValue.value = value
//   //   }
//   // })
// })

</script>

<script>
export default {
  name: 'DocEditor',
}
</script>

<style lang="scss" scoped>
.DocEditor-Container {
  :deep(.el-scrollbar__view) {
    height: 100% !important;
  }
  //.DocEditor-inner {
  //  position: absolute;
  //
  //  width: 100% !important;
  //  height: calc(100% - 0px) !important;
  //
  //  border-radius: 0;
  //}
   div {
    height: 100%;
  }
  position: absolute;

  top: 0;

  width: 100%;
  height: 100%;

  cursor: help;
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
