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
  <div ref="containerRef" class="TalexEditor-Container">
    <!--    <div class="DocEditor-inner" ref="inner">-->
<!--    <el-scrollbar>-->
      <t-menu-bar v-if="!onlyView" :editor="editor" />
      <floating-menu class="TalexEditor-FloatingMenu" :editor="editor" :tippy-options="{ duration: 100 }" v-if="!onlyView && editor">
        <br/>
        <div class="floating-main">
          <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" class="floating-menu-item heading"
                  :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            H1
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" class="floating-menu-item heading"
                  :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            H2
          </button>
          <button @click="editor.chain().focus().toggleBulletList().run()" class="floating-menu-item heading"
                  :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            H3
          </button>
        </div>
      </floating-menu>
      <editor-content :editor="editor"/>
      <!--      <div class="DocEditor-Editor" ref="editorRef"/>-->
<!--    </el-scrollbar>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import { defineEmits, defineProps, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useModelWrapper } from "~/plugins/Common.ts";
import { EditorContent, useEditor, FloatingMenu } from "@tiptap/vue-3";
import { PluginKey } from 'prosemirror-state'
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import FloatingMenuPlugin from '@tiptap/extension-floating-menu'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CharacterCount from '@tiptap/extension-character-count'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'

// import highlight css
import 'highlight.js/styles/atom-one-dark.css'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// load all highlight.js languages
import { lowlight } from 'lowlight'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import TMenuBar from '~/components/common/editor/menu/TMenuBar.vue'

import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // 展开现有属性,?.是可选链操作符,可以自行百度(懂的大佬当我没说)
      ...this.parent?.(),

      // 添加新的属性
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => ({
          'data-background-color': attributes.backgroundColor,
          style: `background-color: ${attributes.backgroundColor}`
        })
      }
    }
  }
})

lowlight.registerLanguage( 'html', html )
lowlight.registerLanguage( 'css', css )
lowlight.registerLanguage( 'js', js )
lowlight.registerLanguage( 'ts', ts )

const props = defineProps( {
  tVid: String,
  modelValue: String,
  onlyView: false
} );

const containerRef = ref();

const emits = defineEmits( [ "update:modelValue", "outline" ] );
const modelValue = useModelWrapper( props, emits );

const editor = useEditor( {
  content: modelValue.value,
  autofocus: true,
  injectCSS: true,
  editable: !props.onlyView,
  extensions: [
    StarterKit,
    Placeholder.configure( {
      placeholder: ( { node } ) => {
        if ( node.type.name === 'heading' ) {
          return '请输入 头部标题 的内容'
        }

        return '输入当前文档的内容...'
      }
    } ),
    CodeBlockLowlight.configure( {
      lowlight
    } ),
    FloatingMenuPlugin.configure( {
      pluginKey: new PluginKey( "TalexEditor-FloatingMenu" ),
      shouldShow: ( props ) => {
        console.log( props )
      }
    } ),
    Image,
    Highlight.configure({ multicolor: true }),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    CustomTableCell,
    CharacterCount
  ],
  onUpdate( { editor } ) {
    modelValue.value = editor.getHTML();

  },
} )

onMounted( () => {
  nextTick(() => {

    // const content = props.modelValue;

    // function extractOutline(markdown) {
    //   // Split the markdown into individual lines
    //   var lines = markdown.split("\n");
    //
    //   // Initialize an empty tree
    //   var tree = {};
    //
    //   // Iterate over the lines
    //   for (var i = 0; i < lines.length; i++) {
    //     var line = lines[i];
    //
    //     // Check if the line starts with one or more # characters
    //     var match = line.match(/^#+/);
    //     if (match) {
    //       // Determine the item's level in the tree
    //       var level = match[0].length;
    //
    //       // Initialize the parent node
    //       var parent = tree;
    //
    //       // Find the parent node for the current item
    //       for (var j = 1; j < level; j++) {
    //         if (!parent.children) {
    //           parent.children = [];
    //         }
    //         var child = parent.children[parent.children.length - 1];
    //         parent = child;
    //       }
    //
    //       // Add the item to the tree
    //       var item = line.trim();
    //       if (!parent.children) {
    //         parent.children = [];
    //       }
    //       parent.children.push({
    //         content: item,
    //         children: []
    //       });
    //     }
    //   }
    //
    //   return tree;
    // }

    // console.log("@@@", extractOutline(editor.value.getText()), editor.value.g())

    emits('outline', editor.value?.getJSON?.()/*/!*editor.value?.getJSON?.()*!/extractOutline(content)*/)

  })
} )

watch( () => modelValue.value, () => {

  if ( editor.value.getHTML() === props.modelValue )
    return

  editor.value.commands.setContent( props.modelValue )

} )

</script>

<script>
export default {
  name: "TalexEditor",
};
</script>

<style lang="scss" scoped>
.TalexEditor-Container {

  &-header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: .25rem;
    border-bottom: 3px solid #0d0d0d;
  }

  &-content {
    padding: .7rem .5rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}


/* 基本编辑器样式 */
:deep(.ProseMirror) {
  //height: 100% !important;

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  mark {
    background-color: #faf594;
  }

  img {
    max-width: 100%;
    height: auto;
    opacity: .8;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, .1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, .1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: .5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}

.TalexEditor-Container {
  :deep(.el-scrollbar__view) {
    height: 100% !important;
  }

  :deep(.ProseMirror) {
    &:focus-visible {
      outline: none;
    }

    //position: absolute;
    padding: 5px 10px;

    width: 100%;
    min-height: 100%;

    box-sizing: border-box;

    //background-color: var(--el-fill-color-darker);
  }

  //.DocEditor-Editor {
  //
  //
  //  position: relative;
  //
  //  width: 100%;
  //  min-height: 100%;
  //}

  //position: absolute;

  //top: 0;

  //width: 100%;
  //height: 100%;

  //cursor: help;
  //overflow-y: auto;
}
</style>
