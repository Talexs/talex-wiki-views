<template>
  <el-container class="WikiEditor-Container LayoutSub-Frame">
    <el-aside class="WikiEditor-Aside" width="240px">
      <div class="WikiEditor-AsideWrapper">
        <div class="WikiEditor-Box box-wiki-info">
          <div class="box-wiki-header">
            <p class="box-title">
              信息栏
            </p>
            <el-button @click="$router.push('/user/wikis')" text class="rounder-btn" :icon="Back" />
          </div>
          <BookDesc :book="book" />
        </div>
        <div class="WikiEditor-Box box-wiki-tree">
          <div class="box-wiki-header">
            <p class="box-title">文档集</p>
            <TalexDropdown>
              <TalexDropItem @click="addDialogVisible = true">
                <template #label>
                  新建维基章节
                </template>
                <template #icon>
                  <el-icon><Folder /></el-icon>
                </template>
              </TalexDropItem>
              <TalexDropItem @click="addWikiDoc">
                <template #label>
                  新建维基文档
                </template>
                <template #icon>
                  <el-icon><Document /></el-icon>
                </template>
              </TalexDropItem>
              <TalexDropItem>
                <template #label>
                  分享当前文档
                </template>
                <template #icon>
                  <el-icon><Share /></el-icon>
                </template>
              </TalexDropItem>
              <TalexDropItem divider />
              <TalexDropItem danger>
                <template #label>
                  删除当前文档
                </template>
                <template #icon>
                  <el-icon><Delete /></el-icon>
                </template>
              </TalexDropItem>
            </TalexDropdown>
          </div>
          <el-scrollbar>
            <ChapterTree :func="true" @drag-drop="handleDragDrop" v-if="tree" @del-current="delCurrent" :currentSelect="wikiID" @add-doc="addDoc" @select-doc="changeCurrentDoc" :tree="tree" />
          </el-scrollbar>
        </div>
        <div class="WikiEditor-Box box-wiki-status transition-cubic">
          <div class="box-wiki-header">
            <p class="box-title">状态栏</p>
            <TalexDropdown :icon="Setting">
              <TalexDropItem @click="shareThisDoc">
                <template #label>
                  分享维基
                </template>
                <template #icon>
                  <el-icon><Share /></el-icon>
                </template>
              </TalexDropItem>
              <TalexDropItem divider />
              <TalexDropItem @click="statusList = []" danger>
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
    <el-main class="WikiViewer-Main">
      <div class="editor-header">
        <el-input @blur="updateDoc" v-if="wikiID && currentDoc" v-model="currentDoc.title" :disable="!wikiID" placeholder="标题"></el-input>
      </div>
      <div class="editor-content">
        <DocEditor :t-vid="`${book.id}-${wikiID}`" v-if="wikiID && currentDoc" v-model="currentDoc.content" ref="editorRef">

        </DocEditor>
        <el-empty v-else description="暂未选中任何文档." />
      </div>
    </el-main>
  </el-container>

  <el-dialog custom-class="WikiEditor-AddDialog" v-model="addDialogVisible" :show-close="false">
    <template #header>
      <div class="wiki-editor-header">
        <p>添加子页</p>
        <el-button @click="addDialogVisible = false" text :icon="CloseBold">
        </el-button>
      </div>
    </template>
    <Chapter @done="handleChapterAddDone" v-if="book?.id" :bookID="book?.id" />
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive, provide, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { forMentionTip, forWikiTip, TipType } from '~/plugins/Common.ts'
import Wiki from '~/plugins/model/wiki'
import WikiDocument from '~/plugins/model/document'
import WikiChapter from '~/plugins/model/chapter'
import ChapterTree from '~/components/wiki/BookDocTree.vue'
import BookDesc from '~/components/wiki/BookDesc.vue'
import TalexDropdown from '~/components/common/dropdown/talex-dropdown.vue'
import TalexDropItem from '~/components/common/dropdown/talex-drop-item.vue'
import { Back, Setting, Folder, Document, Share, Delete, CloseBold } from '@element-plus/icons-vue'
import DocEditor from '~/components/wiki/DocEditor.vue'
import WikiStatus from '~/components/wiki/WikiStatus.vue'
import Chapter from './chapter/chapter.vue'
import { useStore } from '~/plugins/store/index.ts'
import { MentionTip } from '~/plugins/addon/MentionerManager.ts'

const router = useRouter()
const route = useRoute()

const store = useStore()

const statusList = ref([])
const addDialogVisible = ref(false)
const book = ref()
const tree = ref()
const treeMap = new Map()

provide('getTreeMap', () => treeMap)

const editorRef = ref(null)
const originCurrentDoc = ref(null)
const currentDoc = ref(null)
const wikiID = ref()

function shareThisDoc() {
  navigator.clipboard.writeText(`
  [TalexWiki] 塔莱克斯 | 全新一代分发型维基系统
  诚邀您查阅维基: ${window.location.origin}/wiki/view/${book.value.id}/${wikiID.value}

  —— 来自 ${store.local.user.username} 的分享!
  `);

  forMentionTip(new MentionTip("复制成功，粘贴以分享！", 3200, TipType.SUCCESS, true))
}

const addWikiDoc = async ({ chapter }) => {
  const res = await WikiDocument.createDocument({
    wiki: book.value.id,
    title: '新建我的维基文档',
    content: '',
    chapter: chapter === -1 ? undefined : chapter
  })

  await fetchData()

  await forWikiTip(`文档添加${res ? '成功' : '失败'}!`, 2600, res ? 'success' : 'danger', false, true)
}

async function handleDragDrop(draggedNode, finalNode, pos, event) {

  let res
  const { data } = draggedNode

  // inner 就是切换 父项 先判断是不是doc
  if (pos === 'inner') {
    const id = finalNode.data.value

    if (data.doChapter) {
      data.parentChapter = id

      res = await WikiChapter.editChapter(data.value, {
        wiki: book.value.id,
        priority: data.priority,
        parentChapter: data.parentChapter,
        title: data.title
      })
    } else {
      data.chapter = id

      res = await WikiDocument.editDocument(data.id, data)
    }

    await forWikiTip(res.message, 1800, res.code < window.MAX_SUCCESS_CODE ? 'success' : 'error')
  }
  // 接下来就是切换顺序了 先从 章节入手
  else {
    // 如果是章节之间的移动 直接修改priority即可 (此时还得统一两个node data的parent指向 因为after prev 是并列关系）
    if (data.doChapter) {
      data.priority = finalNode.data.priority + (pos === 'after' ? 1 : -1)
      data.parentChapter = finalNode.data.parentChapter
      res = await WikiChapter.editChapter(data.value, {
        wiki: book.value.id,
        priority: data.priority,
        parentChapter: data.parentChapter,
        title: data.title
      })
    } else {
      // 如果是文档之间的移动 分情况
      // 第一，文档和文档之间的移动，修改priority即可
      // 第二，文档和章节之间的移动，修改文档的chapter | 判断 finalNode有没有 parentChapter 即可判断是否移动到根
      // eslint-disable-next-line no-lonely-if
      if (finalNode.data.doChapter) {
        // 文档移动到章节前后直接修改parentChapter即可，不存在修改priority情况 | 此时将priority重置为0
        if (finalNode.data.parentChapter) {
          // 没有移动到根 那就指向根
          data.priority = 0
          data.chapter = finalNode.data.parentChapter
        } else {
          data.priority = 0
          data.chapter = null
        }
      } else {
        data.priority = finalNode.data.priority + (pos === 'after' ? 1 : -1)
      }
      res = await WikiDocument.editDocument(data.id, data)
    }

    await forWikiTip(res.message, 1800, res.code < window.MAX_SUCCESS_CODE ? TipType.SUCCESS : TipType.ER
    )
  }
}

async function handleChapterAddDone(res) {
  addDialogVisible.value = false

  await forWikiTip(`章节添加${res ? '成功' : '失败'}!`, 2600, res ? TipType.SUCCESS : TipType.ERROR, false, true)

  await fetchData()

  addStatus(`章节添加${res ? '成功' : '失败'}!`, res ? 'success' : 'danger')
}

function addDoc(data) {
  addWikiDoc(data.doChapter ? { chapter: data.value } : null)
}

async function delCurrent(data) {
  if (data.doChapter) {
    await WikiChapter.deleteChapter( data.id )
  } else await WikiDocument.deleteDocument( data.id )

  await fetchData()
}

async function updateDoc() {
  if (!originCurrentDoc.value || (JSON.stringify(currentDoc.value) === originCurrentDoc.value)) {
    return
  }
  const doc = currentDoc.value

  if (!doc?.id) return

  originCurrentDoc.value = JSON.stringify(currentDoc.value)

  await forWikiTip('正在保存文档...', 1200, TipType.INFO, true)

  doc.wiki = doc.wiki_id

  const res = await WikiDocument.editDocument(doc.id, doc)

  await forWikiTip(`文档保存${res ? '成功' : '失败'}!`, 1800, res ? TipType.SUCCESS : TipType.ERROR)
  addStatus(`文档保存${res ? '成功' : '失败'}!`, res ? 'success' : 'danger')
}

function changeCurrentDoc(data) {
  // console.log(data)
  if( data.data?.doChapter ) return
  updateDoc()

  router.push(`/wiki/edit/${ book.value.id }/${data.id}`)

  wikiID.value = data.id

  fetchData(false)
}

async function fetchData(fetch = true) {
  if (fetch) {
    const array = await WikiDocument.getDocument(book.value.id)

    array.forEach((item, index) => {
      // console.log(item)
      const obj = reactive(item)
      obj.content = obj.content || ''
      obj.vid = `doc-${item.id}`
      obj.chapter = item.chapter_id

      array[index] = obj

      treeMap.set(item.id, obj)
    })

    // console.log(array, wikiID.value)

    // if (Number(wikiID.value) > 0 && !treeMap.get(wikiID.value)) return router.push(`/wiki/edit/${book.value.id}`)

    // console.log(treeMap, JSON.stringify(treeMap.values()))

    tree.value = flat2Tree(await WikiChapter.getChapters(book.value.id), array)
    // .forEach(item => {
    // tree.value.push(reactive(item))
    // })
    addStatus('数据已全部更新!', 'success')
  }

  currentDoc.value = treeMap.get(wikiID.value)
  originCurrentDoc.value = JSON.stringify(currentDoc.value)
}

function flat2Tree(array, docs) {
  const map = new Map()

  map.set(-1, { children: [] })

  array.forEach(item => map.set(item.id, { vid: `chapter-${item.id}`, priority: item.priority, doChapter: true, parentChapter: item.parent, value: item.id, title: item.title, children: [] }))

  array.forEach(item => {
    // console.log(array, item, map)
    const parent = item.parent || -1
    const obj = map.get(parent)

    obj.children.push(map.get(item.id))
  })

  docs.forEach(item => {
    const parent = item.chapter || -1
    const obj = map.get(parent)

    obj.children.push(item)
  })

  return map.get(-1).children
}

onMounted(async () => {
  const { id, wiki } = route.params

  wikiID.value = wiki

  book.value = await Wiki.getBook(id)

  window.addEventListener('keydown', keyListener)

  await fetchData()

  addStatus('文档已加载完成，修改将自动保存。')
})

function addStatus(label, status = 'info') {
  statusList.value.push({ label, time: new Date().getTime(), success: status === 'success', danger: status === 'danger' })
}

onBeforeMount(() => window.removeEventListener('keydown', keyListener))

function keyListener(e) {
  if (e.key === 's' && e.ctrlKey) {
    e.preventDefault()

    updateDoc()
  }
}

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

  margin-right: 30px;

  width: 300px;
  height: 100%;

  overflow: hidden;
}

.WikiEditor-Box {
  position: relative;
  padding: 0 0 2% 0;
  margin-bottom: 15px;

  width: 96%;
  //height: 100px;

  border-radius: 8px;
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

.WikiEditor-Box.box-wiki-info {
  height: 160px;
}

.WikiEditor-Box.box-wiki-status {
  max-height: 200px;
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

  background-color: var(--el-fill-color-lighter);
}

.WikiEditor-Container {
  position: absolute;
  display: flex;
  justify-content: center;

  left: 5%;
  top: 20px;

  width: 90%;
  height: 100%;

  background-color: unset;
  //height: calc(100% - 40px);
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
