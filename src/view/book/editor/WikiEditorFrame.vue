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
  <el-container class="WikiEditor-Container LayoutCenter-Frame">
    <AsideAdapter style="width: 300px">
      <el-aside class="WikiEditor-Aside">
        <div class="WikiEditor-AsideWrapper">
          <div style="animation: leftLoadIn .25s .15s forwards" class="WikiEditor-Box box-wiki-info">
            <div class="box-wiki-header">
              <p class="box-title">
                维基属性
              </p>
              <el-button @click="$router.push('/user/wikis')" text class="rounder-btn" :icon="Back" />
            </div>
            <BookDesc :book="book" />
          </div>
          <div style="animation: leftLoadIn .25s .25s forwards" class="WikiEditor-Box box-wiki-tree">
            <div class="box-wiki-header">
              <p class="box-title">维基列表</p>
            </div>
            <el-scrollbar>
              <WikiListTree @select-wiki="selectWiki" @select-doc="selectDoc" :func="true" @share="shareAction"
                            :currentSelect="route.params.wiki ? `f-${route.params.id}/${route.params.wiki}` : null" />
            </el-scrollbar>
          </div>
          <div style="animation: leftLoadIn .25s .35s forwards" class="WikiEditor-Box box-wiki-status transition-cubic">
            <div class="box-wiki-header">
              <p class="box-title">历史状态</p>
              <TalexDropdown :icon="Setting">
                <TalexDropItem @click="statusList.splice(0, statusList.length)" danger>
                  <template #label>
                    清空所有状态
                  </template>
                  <template #icon>
                    <el-icon><Delete /></el-icon>
                  </template>
                </TalexDropItem>
              </TalexDropdown>
            </div>
            <WikiStatus v-model="statusList" />
          </div>
        </div>
      </el-aside>
    </AsideAdapter>
    <el-main class="WikiEditor-Main LayoutSub-Frame">
      <el-tabs v-if="tabs?.length > 0" v-model="tabValue" type="card" class="flat-linear" closable @edit="handleTabsEdit">
        <el-tab-pane @click="currentTab = item" :ref="tabRefs" v-for="item in tabs" :key="item.id" :name="item.id">
          <template #label="scope">
            <span :title="item.origin_content !== item.content ? '未保存' : '已保存'" class="air-dot" :class="{ 'loading': item.loading }"
                  :style="`--dot-color: var(${item.origin_content !== item.content ? '--el-color-warning' :
                        (tabValue === item.id ? '--el-color-primary' : '--el-color-info')})`">
                  {{ item.title }}
            </span>
          </template>
          <div class="WikiEditor-Content">
            <DocEditor @outline="initOutline($event, item)" :t-vid="item.id" v-model="item.content">
            </DocEditor>
            <div @click="updateDoc(currentTab)" class="edit-mention transition-cubic" :class="{ shrink: item.origin_content === item.content }">
              按下 <span class="premium-normal">Ctrl+S</span> 保存!
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-empty v-else>

      </el-empty>
    </el-main>
  </el-container>

<!--  <el-dialog custom-class="WikiEditor-AddDialog" v-model="addDialogVisible" :show-close="false">-->
<!--    <template #header>-->
<!--      <div class="wiki-editor-header">-->
<!--        <p>添加子页</p>-->
<!--        <el-button @click="addDialogVisible = false" text :icon="CloseBold">-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </template>-->
<!--    <Chapter @done="handleChapterAddDone" v-if="book?.id" :bookID="book?.id" />-->
<!--  </el-dialog>-->
</template>

<script setup>
import {
  onMounted,
  ref,
  reactive,
  provide,
  onBeforeMount,
  watch,
  readonly,
  watchEffect,
  shallowReadonly,
  markRaw, nextTick
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { _T_EncodeNumber, forMentionTip, forWikiTip, sleep, TipType } from '~/plugins/Common.ts'
import Wiki from '~/plugins/model/wiki'
import WikiDocument from '~/plugins/model/document.js'
import WikiListTree from '@components/wiki/tree/WikiListTree.vue'
import DocEditor from '@components/wiki/DocEditor.vue'
import BookDesc from '~/components/wiki/addon/BookDesc.vue'
import TalexDropdown from '~/components/common/dropdown/talex-dropdown.vue'
import TalexDropItem from '~/components/common/dropdown/talex-drop-item.vue'
import { Back, Setting, Folder, Document, Share, Delete, CloseBold } from '@element-plus/icons-vue'
import WikiStatus from '~/components/wiki/addon/WikiStatus.vue'
import { useStore } from '~/plugins/store/index.ts'
import AsideAdapter from '@components/common/layout/AsideAdapter.vue'
import TalexCoverDialog from '@components/common/dialog/TalexCoverDialog.vue'
import { MentionTip } from '@plugins/addon/MentionerManager.ts'

const router = useRouter()
const route = useRoute()

const store = useStore()

const statusList = ref([])
const book = ref()

const wikiID = ref()
const visibles = reactive({
  share: {
    dialog: false,
    data: {}
  }
})

// TODO UNBEFORE LOAD MENTION

// TODO DRAG CHAPTER ORDER

function initOutline(a, b) {
  b.node.store.outline = a
}

onMounted(async () => {

  await renderOptions()

  watch(() => route.params, renderOptions)

  window.addEventListener('keydown', keyListener)

  addStatus('维基编辑器加载完成!')
})

const currentTab = ref()
const tabValue = ref()
const tabRefs = reactive([])
const tabs = ref([])

const handleTabsEdit = (targetName, action) => {
  if (action === 'remove') {
    let activeName = tabValue.value
    if (activeName === targetName) {
      tabs.value.forEach((tab, index) => {
        if (tab.id === targetName) {
          const nextTab = tabs.value[index + 1] || tabs.value[index - 1]
          if (nextTab) {
            activeName = nextTab.id
          }
        }
      })
    }

    tabValue.value = activeName
    tabs.value = tabs.value.filter((tab) => tab.id !== targetName)
  }
}

async function selectWiki(wiki) {
  // console.log(wiki)
  book.value = wiki.origin
  await router.push('/wiki/edit/' + wiki.id)
}
async function selectDoc(doc) {
  // console.log(doc)
  const data = doc.data.origin
  const id = `${data.wiki_id}/${data.id}`

  let match = false
  tabs.value.forEach(tab => {
    if( match ) return
    if( tab.id === id ) match = tab
  })

  if( match ) {

    currentTab.value = match
    return tabValue.value = id

  }

  const obj = reactive({
    id: id,
    title: `${doc.data.wiki.label}/${data.title}`,
    node: doc,
    data: doc.data,
    content: data.content,
    origin_content: data.content,
    loading: false
  })

  // console.log(obj)

  currentTab.value = obj

  watchEffect(() => {
    obj.title = `${doc.data.wiki.label}/${data.title}`
    obj.data.origin.content = obj.content
  })

  tabs.value.push(obj)

  // console.log("---> ", `/wiki/edit/${data.wiki_id}/${data.id}`)
  await router.push(`/wiki/edit/${data.wiki_id}/${data.id}`)
  // await sleep(100)

  tabValue.value = id
}

provide('updateDoc', updateDoc)

async function updateDoc(tabObj) {
  if( !tabObj ) return

  if ( tabObj.origin_content === tabObj.content ) return

  // const backupContent = tabObj.origin_content

  tabObj.loading = true
  // tabObj.origin_content = tabObj.content

  await forWikiTip('正在保存文档...', 1200, TipType.INFO, true)

  // {
  //   wiki: tabObj.data.wiki.id,
  // ...tabObj.data.origin
  // }

  const info = markRaw(tabObj.data.origin)

  info.wiki = info.wiki_id

  // console.log("@", info)

  const res = await WikiDocument.editDocument(tabObj.data.id, info)

  await forWikiTip(`文档保存${res ? '成功' : '失败'}!`, 1800, res ? TipType.SUCCESS : TipType.ERROR)
  addStatus(`文档 ${tabObj.title} 保存${res ? '成功' : '失败'}!`, res ? 'success' : 'danger')

  // failed
  if( res ) {

    tabObj.origin_content = tabObj.content
    // tabObj.origin_content = backupContent

  }

  // tabObj.error = !res
  tabObj.loading = false
}

async function renderOptions() {
  const { id, wiki } = route.params

  // initial tree
  // await nextTick( async () => treeInitial( id, wiki ) )

  if( !id || id === wikiID.value ) return

  wikiID.value = wiki

  book.value = await Wiki.getBook(id)

}

// async function treeInitial(id, doc) {
//
//
//
// }

function addStatus(label, status = 'info') {
  statusList.value.push({ label, time: new Date().getTime(), success: status === 'success', danger: status === 'danger' })
}

onBeforeMount(() => window.removeEventListener('keydown', keyListener))

function keyListener(e) {
  if (e.key === 's' && e.ctrlKey) {
    e.preventDefault()

    console.log('save action', currentTab.value)
    updateDoc(currentTab.value)
  }
}
</script>

<script>
export default {
  name: 'WikiEditorFrame',
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
  opacity: 0;
  transform: translateX(-100%);
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

.WikiEditor-Box.box-wiki-info {
  height: 160px;
}

.WikiEditor-Box.box-wiki-status {
  //max-height: 200px;
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

.WikiEditor-Main {
  position: relative;
  padding: 0;
  margin-top: 1px;

  border-radius: 0;
  :deep(.el-tabs) {
    background-color: var(--el-fill-color-lighter);
    .el-tabs__header {
      margin-bottom: 2px;
      border-bottom: 1px solid var(--el-border-color);
    }
    &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      border-bottom-color: var(--el-fill-color-lighter) !important;
    }
    height: calc(100% - 2px); // 1px belongs to the border of header and margin
    .el-tabs__new-tab {
      margin-right: 20px;
    }
    .el-tabs__content {
      //padding: 0 10px;
      //margin: 0;

      top: -2px;

      height: calc(100% - 43px);
    }
    .el-tab-pane {
      height: 100%;
    }
    .WikiEditor-Content {
      .edit-mention {
        &.shrink {
          transform: translateX(100%);
        }
        .premium-normal {
          top: 1px;
          background-color: var(--el-color-primary);
        }
        &:before {
          z-index: -1;
          content: "";
          position: absolute;

          left: 0;
          top: 0;

          width: 100%;
          height: 100%;

          border-radius: 4px;
          background-color: var(--el-color-warning-light-5);

          animation: wavingSmall 1.75s infinite;
        }
        z-index: 1000;
        position: absolute;
        padding: 4px 16px 4px 8px;

        right: 0;
        top: 1%;

        cursor: pointer;
        font-size: 14px;
        border-radius: 4px;
        user-select: none;
        background-color: var(--el-fill-color-dark);
        animation: shaving 1.75s infinite
        //cubic-bezier(0.88, 1.58, 0.25, 0.5)
      }
      position: relative;

      height: 100%;

    }
  }
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
  overflow: hidden;
}

</style>

<style lang="scss">

.WikiEditor-AddDialog {
  .wiki-editor-header .el-button {
    position: relative;

    width: 36px;
    height: 36px;

    border-radius: 4px;
    transition: .3s cubic-bezier(.25,.8,.25,1);
    &:hover {
      border: none !important;
    }
  }
  .wiki-editor-header {
    display: flex;
    justify-content: space-between;

    p {
      line-height: 36px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  border-radius: 6px;
  user-select: none;
}

</style>
