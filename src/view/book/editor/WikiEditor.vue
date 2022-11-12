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
<!--  <el-container class="WikiEditor-Container LayoutCenter-Frame">-->
<!--    <div class="editor-header">-->
<!--      <el-input @blur="updateDoc" v-if="wikiID && currentDoc" v-model="currentDoc.title" :disable="!wikiID" placeholder="标题"></el-input>-->
<!--    </div>-->
<!--    <div class="editor-content">-->
      <DocEditor :t-vid="`${book.id}-${wikiID}`" v-if="wikiID && currentDoc" v-model="currentDoc.content" ref="editorRef">

      </DocEditor>
<!--      <el-empty v-else description="暂未选中任何文档." />-->
<!--    </div>-->
<!--  </el-container>-->
</template>

<script setup>
import { onMounted, ref, reactive, provide, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { forMentionTip, forWikiTip, TipType } from '~/plugins/Common.ts'
import Wiki from '~/plugins/model/wiki'
import WikiDocument from '~/plugins/model/document'
import WikiChapter from '~/plugins/model/chapter'
import DocEditor from '~/components/wiki/DocEditor.vue'
import { useStore } from '~/plugins/store/index.ts'
import { MentionTip } from '~/plugins/addon/MentionerManager.ts'

const router = useRouter()
const route = useRoute()

const store = useStore()

const editorRef = ref(null)
const originCurrentDoc = ref(null)
const currentDoc = ref(null)
const wikiID = ref()




//
// async function fetchData(fetch = true) {
//   if (fetch) {
//     const array = await WikiDocument.getDocument(book.value.id)
//
//     array.forEach((item, index) => {
//       // console.log(item)
//       const obj = reactive(item)
//       obj.content = obj.content || ''
//       obj.vid = `doc-${item.id}`
//       obj.chapter = item.chapter_id
//
//       array[index] = obj
//
//       treeMap.set(item.id, obj)
//     })
//
//     // console.log(array, wikiID.value)
//
//     // if (Number(wikiID.value) > 0 && !treeMap.get(wikiID.value)) return router.push(`/wiki/edit/${book.value.id}`)
//
//     // console.log(treeMap, JSON.stringify(treeMap.values()))
//
//     tree.value = flat2Tree(await WikiChapter.getChapters(book.value.id), array)
//     // .forEach(item => {
//     // tree.value.push(reactive(item))
//     // })
//     addStatus('数据已全部更新!', 'success')
//   }
//
//   currentDoc.value = treeMap.get(wikiID.value)
//   originCurrentDoc.value = JSON.stringify(currentDoc.value)
// }

onMounted(async () => {
  const { id, wiki } = route.params

  wikiID.value = wiki

  // window.addEventListener('keydown', keyListener)

  // await fetchData()

  // addStatus('文档已加载完成，修改将自动保存。')
})

// onBeforeMount(() => window.removeEventListener('keydown', keyListener))
//
// function keyListener(e) {
//   if (e.key === 's' && e.ctrlKey) {
//     e.preventDefault()
//
//     updateDoc()
//   }
// }

</script>

<script>
export default {
  name: 'WikiEditor',
}
</script>

<style lang="scss" scoped>
.WikiEditor-Aside {
  .WikiEditor-AsideWrapper {
    position: absolute;
    display: flex;
    flex-direction: column;

    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
  }
  position: relative;

  width: 300px;
  height: 100%;

  border-right: 1px solid var(--el-border-color);
  overflow: hidden;
}

.WikiEditor-Box {
  position: relative;
  padding: 0 0 2% 0;

  width: 100%;
  //height: 100px;

  background: var(--el-fill-color-light);
  overflow: hidden;
  .box-wiki-header {
    .box-title {
      position: relative;
      margin: 0;

      font-size: 14px;
      line-height: 32px;
    }
    position: sticky;
    padding: 2px 10px;
    display: flex;
    justify-content: space-between;
    vertical-align: center;

    width: calc(100% - 20px);
    height: 28px;

    top: 0;

    background-color: var(--el-fill-color);
    filter: invert(2.5%);
  }
}

.WikiEditor-Box.box-wiki-tree {
  //max-height: calc(500px - 360px);
  flex: 1;
  //height: auto;
  //height: calc(100% - 200px - 160px - 20px);
  :deep(.el-scrollbar) {
    height: calc(100% - 30px);
  }
}

.WikiViewer-Main {
  .editor-header {
    margin-bottom: 20px;
    height: 30px;

    background: var(--el-fill-color-lighter);
  }
  .editor-content {
    position: relative;

    width: 100%;
    height: calc(100% - 50px);

    background: var(--el-fill-color-lighter);
    overflow: hidden;
  }
  //:deep(.DocViewer-Container) {
  //  height: calc(100% - 40px)
  //}
  padding: 10px;

  //background-color: var(--el-fill-color-lighter);
}

.WikiEditor-Container {
  position: absolute;
  display: flex;
  justify-content: center;

  margin: 0;
  padding: 0;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: unset;
}

</style>
