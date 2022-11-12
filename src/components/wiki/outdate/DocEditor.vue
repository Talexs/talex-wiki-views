<template>
  <div class="DocEditor-Container">
    <div class="DocEditor-inner" ref="inner"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch, onBeforeMount } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { useModelWrapper } from '~/plugins/Common.ts'

const props = defineProps({
  tVid: String,
  modelValue: String
})
const emits = defineEmits(['update:modelValue'])

const inner = ref(null)
const editor = ref()

const modelValue = useModelWrapper(props, emits)

watch(() => modelValue.value, () => {
  if (!editor.value) return

  if (editor.value.getValue() === props.modelValue) {
    console.log('turn down')

    return
  }

  editor.value.setValue(props.modelValue)
})

onMounted(() => {

  editor.value = new Vditor(inner.value, {
    mode: 'wysiwyg',
    placeholder: '在这里输入内容以编辑...',
    tab: '    ',
    counter: {
      enable: true
    },
    toolbarConfig: {
      pin: true
    },
    cache: {
      id: `talex-wiki-doc-editor-${props.tVid}`,
      enable: true
    },
    after: () => {
      editor.value.setValue(props.modelValue)
    },
    input: value => {
      modelValue.value = value
    }
  })
})

</script>

<script>
export default {
  name: 'DocEditor',
}
</script>

<style lang="scss" scoped>
.DocEditor-Container {
  .DocEditor-inner {
    position: absolute;

    width: 100% !important;
    height: calc(100% - 0px) !important;

    border-radius: 0;
  }
  position: absolute;

  top: 0;

  width: 100%;
  height: 100%;


  :deep(.vditor-reset) {
    p {
      font-size: 17px;
    }
    padding: 2% 4% !important;
    caret-color: var(--el-text-color-primary);
    cursor: url(https://svgsilh.com/png-1024/1297941.png), help;
  }
}
</style>
