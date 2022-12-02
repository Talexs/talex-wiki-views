<template>
  <el-container class="WikiViewer-Container transition-cubic" :class="{ 'medium-layout': viewerLayout === ViewerLayout.MEDIUM, 'thin-layout': viewerLayout === ViewerLayout.THIN }">
    <AsideAdapter>
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
                布局方式:
                <el-select style="margin-top: 5px" v-model="viewerLayout" :placeholder="viewerLayout.value" size="default">
                  <el-option key="0" label="宽硕布局" :value="ViewerLayout.FULL"/>
                  <el-option key="1" label="复合布局" :value="ViewerLayout.MEDIUM"/>
                  <el-option key="2" label="缩减布局" :value="ViewerLayout.THIN"/>
                </el-select>
                <br />
                <br />
                切换动画:
                <el-select style="margin-top: 5px" v-model="viewerAnimation" :placeholder="viewerAnimation.value" size="default">
                  <el-option key="0" label="拉伸" :value="ViewerAnimation.HORIZON"/>
                  <el-option key="1" label="缩放" :value="ViewerAnimation.SCALE"/>
                  <el-option key="2" label="关闭" :value="ViewerAnimation.CLOSE"/>
                </el-select>
<!--                <CheckBox title="开启页面切换动画" v-model="closeAnimations"></CheckBox>-->
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-aside>
    </AsideAdapter>
    <el-main class="WikiViewer-Main transition-cubic" ref="mainRef">
      <template v-if="wikiID || currentDoc">
<!--        <div class="viewer-header">-->
<!--          <span>全文统计: {{ currentDoc.content.length }}</span>-->
<!--          <span>更新时间: {{ getTime(currentDoc.update_time) }}</span>-->
<!--          <span class="viewer-header-title">{{ currentDoc.title }}</span>-->
<!--        </div>-->
        <div class="viewer-content" v-if="!currentDoc._none">
          <DocViewer :update-time="currentDoc.updatedAt" :content="`${currentDoc.content}`" ref="viewerRef">

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
import { _T_DecodeNumber, _T_EncodeNumber, sleep } from '~/plugins/Common'
import { TipType, forWikiTip } from '~/plugins/addon/Tipper.ts'
import Wiki from '~/plugins/model/wiki'
import WikiDocument from '~/plugins/model/document'
import WikiChapter from '~/plugins/model/chapter'
import ChapterTree from '~/components/wiki/tree/BookDocTree.vue'
import DocViewer from '~/components/wiki/DocViewer.vue'
import CheckBox from '@components/common/checkbox/CheckBox.vue'
import { useStore } from '@plugins/store/index.ts'
import { ViewerLayout, ViewerAnimation } from '~/plugins/addon/enums.ts'
import { formatDateDistance } from '@plugins/addon/utils.ts'
import AsideAdapter from '@components/common/layout/AsideAdapter.vue'

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

const viewerAnimation = ref(store.local.viewer.animation)
const viewerLayout = ref(store.local.viewer.layout)
watch(() => viewerAnimation.value, () => {
  store.local.viewer.animation = viewerAnimation.value
})
watch(() => viewerLayout.value, () => {
  store.local.viewer.layout = viewerLayout.value
})

let animation = false
async function changeCurrentDoc(data) {
  if(viewerAnimation.value === "拉伸") {
    if(animation) return
    animation = true
    const { style } = mainRef.value.$el || mainRef.value
    style.transform = 'scale(.85)'

    await sleep(100)

    style.transform = 'scale(.85) translateX(-100%)'
    style.opacity = '0'

    wikiID.value = data.data.wiki_id

    await sleep(250)

    currentDoc.value = data.data
    currentDoc.value._none = true
    await router.push({
      query: {
        doc: `${_T_EncodeNumber(data.data.id, 18)}`
      }
    })

    style.transform = 'scale(.85) translateX(100%)'
    currentDoc.value._none = false

    await sleep(250)

    style.transform = 'scale(.85)'
    style.opacity = '1'

    await sleep(100)

    style.transform = ''
    animation = false
  } else if(viewerAnimation.value === "缩放") {
    const { style } = mainRef.value.$el || mainRef.value

    style.transform = 'scale(.85)'
    style.opacity = '0'

    await sleep(50)

    wikiID.value = data.data.wiki_id

    currentDoc.value = data.data
    currentDoc.value._none = true
    await router.push({
      query: {
        doc: `${_T_EncodeNumber(data.data.id, 18)}`
      }
    })

    currentDoc.value._none = false

    await sleep(50)

    style.transform = ''
    style.opacity = '1'

  } else {

    wikiID.value = data.data.wiki_id
    currentDoc.value = data.data
    currentDoc.value._none = true

    await router.push({
      query: {
        doc: `${_T_EncodeNumber(data.data.id, 18)}`
      }
    })
    currentDoc.value._none = false

  }

}

async function fetchData(fetch = true) {
  if (fetch) {
    // TODO 让文档加载了就先出来吧
    window.$tipper.tip("正在加载维基...", {
      loading: async(func) => {
        const array = await WikiDocument.getDocument(book.value.id)

        array.forEach((item, index) => {
          const obj = reactive(item)
          obj.content = obj.content || ''
          obj.vid = `doc-${item.id}`
          obj.chapter = item.chapter_id

          array[index] = obj

          treeMap.set(item.id, obj)
        })

        // if (Number(wikiID.value) > 0 && !treeMap.get(wikiID.value)) return router.push(`/wiki/view/${book.value.id}`)

        tree.value = flat2Tree(await WikiChapter.getChapters(book.value.id), array)

        // await forWikiTip('维基加载完成!', 2200, TipType.SUCCESS)
        const close = func("维基加载完成！", TipType.SUCCESS)

        sleep(2200).then(close)
      }
    })
  }

  currentDoc.value = treeMap.get(Number(wikiID.value))
  if (currentDoc.value) { document.title = currentDoc.value.title } else document.title = book.value.title
}

function flat2Tree(array, docs) {
  const map = new Map()

  map.set(-1, { children: [] })

  array.forEach(item => map.set(item.id, { vid: `chapter-${item.id}`, priority: item.priority, doChapter: true, parentChapter: item.parent, value: item.id, title: item.title, children: [] }))

  array.forEach(item => {
    const parent = item.parent || -1
    const obj = map.get(parent)

    // 如果没有找到父元素 说明很可能是被删掉了 那就别管
    if( !obj ) return

    obj.children.push(map.get(item.id))
  })

  docs.forEach(item => {
    const parent = item.chapter || -1
    const obj = map.get(parent)

    // 如果没有找到父元素 说明很可能是被删掉了 那就别管
    if( !obj ) return

    obj.children.push(item)
  })

  return map.get(-1).children
}

onMounted(render)
onUpdated(render)

async function render() {
  if (wikiID.value) return

  // for(let i = 0; i < 100; ++i) {
  //
  //   const encode = _T_EncodeNumber(i, 0)
  //   const decode = _T_DecodeNumber(encode, 0)
  //
  //   if( i !== decode ) {
  //
  //     console.warn(i + " has problem", encode, decode)
  //
  //   }
  //
  //   const i_encode = _T_EncodeNumber(i, 233)
  //   const i_decode = _T_DecodeNumber(i_encode, 233)
  //
  //   if( i !== i_decode ) {
  //
  //     console.warn(i + " has i_problem", i_encode, i_decode)
  //
  //   }
  //
  // }

  // const tIndex = index
  await nextTick(async () => {
    const { doc } = route.query
    const { id } = route.params

    // tIndex.value = index
    if( doc )
      wikiID.value = _T_DecodeNumber(doc, 18)

    // book.value = { id }

    book.value = await Wiki.getBook(_T_DecodeNumber(id, 9)) // TODO 浏览页面无需详情

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
  height: calc(100% - 1px);

  border-left: 1px solid transparent;
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
    .el-tree {
      position: absolute;

      width: 100%;
    }
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

  border-right: 1px solid transparent;
  //background-color: var(--el-fill-color-lighter);
  overflow: hidden;
}

.WikiViewer-Container {
  position: absolute;
  display: flex;
  justify-content: center;

  left: 0;
  //top: 20px;

  width: 100%;
  height: 100%;
  overflow: hidden;
}

.WikiViewer-Container.thin-layout {
  .WikiViewer-Aside {
    border-left: 1px solid var(--el-border-color);
  }
  .WikiViewer-Main {
    border-right: 1px solid var(--el-border-color);
  }
  left: 50%;

  width: 70%;

  min-width: 960px;
  max-width: 1980px;

  transform: translateX(-50%);
}

.WikiViewer-Container.medium-layout {
  .WikiViewer-Aside {
    margin-right: 20px;
    border-right: 1px solid transparent;
  }
  :deep(.DocViewer-Outline) {
    margin-left: 20px;
    right: -20px;
    border-left: 1px solid transparent;
  }
  left: 50%;

  width: calc(70% - 20px);

  min-width: 960px;
  max-width: 1980px;

  transform: translateX(-50%);
}

</style>
