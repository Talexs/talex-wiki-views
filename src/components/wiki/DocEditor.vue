<template>
  <div class="DocEditor-Container">
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
import { defaultValueCtx, Editor, editorViewCtx, rootCtx } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { VueEditor, useEditor } from '@milkdown/vue'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { commonmark, codeFence } from '@milkdown/preset-commonmark'
import { slash, slashPlugin, defaultActions, createDropdownItem } from '@milkdown/plugin-slash'
import { cursor } from '@milkdown/plugin-cursor'
import { block } from '@milkdown/plugin-block'
import { math } from '@milkdown/plugin-math'
import 'katex/dist/katex.min.css'
import { gfm } from '@milkdown/preset-gfm'

import { useModelWrapper } from '~/plugins/Common.ts'
import { outline } from '@milkdown/utils'

const props = defineProps({
  tVid: String,
  modelValue: String
})
const emits = defineEmits(['update:modelValue', 'outline'])

// const inner = ref(null)
const editor = useEditor((root) => Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)

      // const ctx = editor.getInstance().ctx

      ctx.set(defaultValueCtx, props.modelValue)
      ctx.get(listenerCtx).markdownUpdated((_ctx, markdown) => {

        modelValue.value = markdown

      })

      function init() {
        const editorIns = editor.getInstance()
        if( !editorIns ) return setTimeout(init, 100)

        const getOutline = editorIns.action(outline)

        // console.log("@Outline", getOutline(ctx))

        emits('outline', getOutline(ctx))

      }

      init()

    })
    .use(nord)
    .use(commonmark
        .configure(codeFence, {
          languageList: [ 'JavaScript', "TypeScript", "Bash", "SQL", "JSON", "YAML",
            'HTML', "CSS", "C", "CPP", "JAVA", "Ruby", "Python", "Go", "Rust", "FileTree", "Terminal" ,
              "Body"
          ]
        })
    )
    .use(slash.configure(slashPlugin, {
      config: (ctx) => {
        // Get default slash plugin items
        const actions = defaultActions(ctx);

        // Define a status builder
        return ({ isTopLevel, content, parentNode }) => {
          // You can only show something at root level
          if (!isTopLevel) return null;

          // Empty content ? Set your custom empty placeholder !
          if (!content) {
            return { placeholder: '输入 \'/\' 来打开提示窗口。' };
          }

          // Define the placeholder & actions (dropdown items) you want to display depending on content
          if (content.startsWith('/')) {
            // Add some actions depending on your content's parent node
            if (parentNode.type.name === 'customNode') {
              actions.push({
                id: 'custom',
                dom: createDropdownItem(ctx.get(themeManagerCtx), 'Custom', 'h1'),
                command: () => ctx.get(commandsCtx).call(/* Add custom command here */),
                keyword: ['custom'],
                typeName: 'heading',
              });
            }

            return content === '/'
                ? {
                  placeholder: '输入内容以匹配',
                  actions,
                }
                : {
                  actions: actions.filter(({ keyword }) =>
                      keyword.some((key) => key.includes(content.slice(1).toLocaleLowerCase())),
                  ),
                };
          }
        };
      }
    }))
    .use(cursor)
    .use(block)
    .use(math)
    .use(gfm)
    .use(listener)
)

const modelValue = useModelWrapper(props, emits)

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
