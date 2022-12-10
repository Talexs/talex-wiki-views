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
  <div ref="containerRef" class="DocEditor-Container">
    <!--    <div class="DocEditor-inner" ref="inner">-->
    <el-scrollbar>
      <floating-menu class="TalexEditor-FloatingMenu" :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
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
    </el-scrollbar>
    <!--    </div>-->
  </div>
</template>

<script setup>
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useModelWrapper } from "~/plugins/Common.ts";
import { EditorContent, useEditor, FloatingMenu } from "@tiptap/vue-3";
import { PluginKey } from 'prosemirror-state'
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder'
import FloatingMenuPlugin from '@tiptap/extension-floating-menu'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// load all highlight.js languages
import { lowlight } from 'lowlight'
import BubbleMenu from '@tiptap/extension-bubble-menu'

lowlight.registerLanguage( 'html', html )
lowlight.registerLanguage( 'css', css )
lowlight.registerLanguage( 'js', js )
lowlight.registerLanguage( 'ts', ts )

const props = defineProps( {
  tVid: String,
  modelValue: String,
} );

const containerRef = ref();

const emits = defineEmits( [ "update:modelValue", "outline" ] );
const modelValue = useModelWrapper( props, emits );

const editor = useEditor( {
  content: modelValue.value,
  autofocus: true,
  injectCSS: true,
  extensions: [
    StarterKit.configure( {
      codeBlock: {
        HTMLAttributes: {
          class: 'code-block',
        },
      },
      code: {
        HTMLAttributes: {
          class: 'code',
        },
      },
    } ),
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
    } )
  ],
  onUpdate( { editor } ) {
    modelValue.value = editor.getHTML();
  },
} )

watch( () => modelValue.value, () => {

  if ( editor.value.getHTML() === props.modelValue )
    return

  editor.value.commands.setContent( props.modelValue )

} )

</script>

<script>
export default {
  name: "DocEditor",
};
</script>

<style lang="scss" scoped>
.DocEditor-Container {
  :deep(.el-scrollbar__view) {
    height: 100% !important;
  }

  :deep(.ProseMirror) {
    &:focus-visible {
      outline: none;
    }

    position: absolute;
    padding: 1% 2%;

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

  position: absolute;

  top: 0;

  width: 100%;
  height: 100%;

  cursor: help;
  overflow-y: auto;
}
</style>
