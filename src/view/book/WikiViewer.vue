<template>
  <el-container class="WikiViewer-Container">
    <el-aside class="WikiViewer-Aside">
      <div class="WikiViewer-Box box-wiki-tree">
        <el-tabs v-model="activeTab" class="flat header-filter">
          <el-tab-pane label="文档集" name="docs-tree">
<!--            <div class="box-wiki-header">-->
<!--              <p class="box-title">文档集</p>-->
<!--            </div>-->
            <el-scrollbar>
              <ChapterTree :func="false" @select-doc="changeCurrentDoc" :currentSelect="wikiID" :tree="tree" />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="页设置" name="history">
            <div class="WikiViewer-Settings">
              <CheckBox title="开启页面切换动画" v-model="closeAnimations"></CheckBox>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-aside>
    <el-main class="WikiViewer-Main transition-cubic" ref="mainRef">
      <template v-if="wikiID && currentDoc">
<!--        <div class="viewer-header">-->
<!--          <span>全文统计: {{ currentDoc.content.length }}</span>-->
<!--          <span>更新时间: {{ getTime(currentDoc.update_time) }}</span>-->
<!--          <span class="viewer-header-title">{{ currentDoc.title }}</span>-->
<!--        </div>-->
        <div class="viewer-content">
          <DocViewer :index="index" :book="book.id" :time="getTime(currentDoc.update_time)" :length="currentDoc.content.length" :t-vid="`${book.id}-${wikiID}`" v-model="currentDoc.content" ref="viewerRef">

          </DocViewer>
        </div>
      </template>
      <el-empty v-else description="暂未选中任何文档." />
    </el-main>
  </el-container>
</template>

<script setup>
import { onMounted, ref, reactive, provide, nextTick, onUpdated, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { forWikiTip, sleep } from '~/plugins/Common'
import Wiki from '~/plugins/model/wiki'
import WikiDocument from '~/plugins/model/document'
import WikiChapter from '~/plugins/model/chapter'
import ChapterTree from '~/components/wiki/BookDocTree.vue'
import DocViewer from '~/components/wiki/DocViewer.vue'
import moment from 'moment/moment'
import CheckBox from '@components/common/checkbox/CheckBox.vue'
import { useStore } from '@plugins/store/index.ts'

const store = useStore()
const router = useRouter()
const route = useRoute()

const book = ref()
const tree = ref(null)
const treeMap = new Map()

provide('getTreeMap', () => treeMap)

const viewerRef = ref(null)
const currentDoc = ref(null)
const wikiID = ref()

const mainRef = ref(null)
const index = ref() // 文档 h pin
const activeTab = ref('docs-tree')

const closeAnimations = ref(store.local.viewer.animation)
watch(() => closeAnimations.value, () => {
  store.local.viewer.animation = closeAnimations.value
})

function getTime(ts) {
  return moment(ts, null, 'zh-cn').fromNow()
}

let animation = false
async function changeCurrentDoc(data) {
  if(closeAnimations.value) {
    if(animation) return
    animation = true
    const { style } = mainRef.value.$el || mainRef.value
    style.transform = 'scale(.85)'

    await sleep(100)

    style.transform = 'scale(.85) translateX(-100%)'
    style.opacity = '0'

    wikiID.value = data.id

    await sleep(250)

    await fetchData(false)
    await router.push(`/wiki/view/${ book.value.id }/${data.id}/`)

    style.transform = 'scale(.85) translateX(100%)'

    await sleep(250)

    style.transform = 'scale(.85)'
    style.opacity = '1'

    await sleep(100)

    style.transform = ''
    animation = false
  } else {

    wikiID.value = data.id

    await fetchData(false)

    await router.push(`/wiki/view/${ book.value.id }/${data.id}`)

  }

}

async function fetchData(fetch = true) {
  if (fetch) {
    // TODO 让文档加载了就先出来吧
    const array = await WikiDocument.getDocument(book.value.id)

    array.forEach((item, index) => {
      const obj = reactive(item)
      obj.content = obj.content || ''
      obj.vid = `doc-${item.id}`

      array[index] = obj

      treeMap.set(item.id, obj)
    })

    // if (Number(wikiID.value) > 0 && !treeMap.get(wikiID.value)) return router.push(`/wiki/view/${book.value.id}`)

    tree.value = flat2Tree(await WikiChapter.getChapters(book.value.id), array)

    await forWikiTip('维基加载完成!', 2200, 'success')
  }

  currentDoc.value = treeMap.get(Number(wikiID.value))
  if (currentDoc.value) { document.title = currentDoc.value.title } else document.title = book.value.title
}

function flat2Tree(array, docs) {
  const map = new Map()

  map.set('root', { children: [] })

  array.forEach(item => map.set(item.id, { vid: `chapter-${item.id}`, priority: item.priority, doChapter: true, parentChapter: item.parentChapter, value: item.id, title: item.title, children: [] }))

  array.forEach(item => {
    const parent = item.parentChapter || 'root'
    const obj = map.get(parent)

    obj.children.push(map.get(item.id))
  })

  docs.forEach(item => {
    const parent = item.chapter || 'root'
    const obj = map.get(parent)

    obj.children.push(item)
  })

  return map.get('root').children
}

onMounted(render)
onUpdated(render)

async function render() {
  if (wikiID.value) return
  const tIndex = index
  await nextTick(async () => {
    const { id, wiki, index } = route.params

    tIndex.value = index
    wikiID.value = wiki

    book.value = await Wiki.getBook(id) // TODO 浏览页面无需详情

    await fetchData()
  })
}
</script>

<script>
export default {
  name: 'WikiViewer',
}
</script>

<style lang="scss" scoped>
.WikiViewer-Aside {
  :deep(.WikiViewer-Settings) {
    position: relative;
    padding: 10px 20px;
  }
  z-index: 100;
  position: relative;

  top: 1px;

  width: 300px;
  height: 100%;

  border-right: 1px solid var(--el-border-color);
  background-color: var(--el-fill-color-lighter);
  //backdrop-filter: saturate(180%) brightness(99%) blur(10px) contrast(120%);
  overflow: hidden;
}

.WikiViewer-Box {
  :deep(.el-tabs) {
    .el-tabs__nav {
      padding: 0 5px;
    }
    .el-tabs__content, .el-tab-pane, .el-scrollbar__view {
      position: relative;

      height: 100%;
    }
    position: relative;

    height: 100%;
  }
  position: relative;
  padding: 0 0 2% 0;
  margin-bottom: 15px;

  width: 100%;
  height: auto;

  //background: var(--el-fill-color-lighter);
  //overflow: hidden;
  .box-wiki-header {
    .box-title {
      position: relative;
      top: -3px;

      font-size: 14px;
      line-height: 32px;
    }
    position: sticky;
    padding: 0 3%;
    padding-top: 2%;
    display: flex;
    justify-content: space-between;
    vertical-align: center;

    width: 96%;
    height: 32px;

    top: 0;

    //background-color: var(--el-fill-color);
    backdrop-filter: saturate(180%) brightness(98%) blur(50px);
  }
}

.WikiViewer-Box.box-wiki-tree {
  top: -5px;
  height: calc(100% + 5px);
  :deep(.el-scrollbar) {
    height: calc(100% - 30px);
  }
}

.WikiViewer-Main {
  position: relative;
  padding: 0;

  height: 100%;
  .viewer-header {
    span {
      height: 40px;
      line-height: 40px;
      color: var(--el-text-color-regular);
    }
    z-index: 10;
    position: sticky;
    height: 40px;

    backdrop-filter: saturate(180%) brightness(98%) blur(50px);
  }
  .viewer-content {
    position: relative;

    //margin-top: -30px;
    height: 100%;
    //height: calc(100% - 20px);

    //background: var(--el-fill-color-lighter);
  }

  //background-color: var(--el-fill-color-lighter);
  overflow: hidden;
}

.WikiViewer-Container {
  position: absolute;
  display: flex;
  justify-content: center;

  left: 0;
  top: 20px;

  width: 100%;
  height: 100%;
}

</style>
