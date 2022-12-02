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
  <el-tree @node-drop="dragSync" draggable :allow-drag="allowDrag" :allow-drop="allowDrop" :load="loadNode" lazy ref="treeRef" class="WikiListTree-Container" node-key="vid" @current-change="handleChangeCurrentNode" :data="tree" highlight-current>
    <template #default="{ data }">
        <span :title="data.label" class="custom-tree-node">
          <el-icon>
            <Notebook v-if="data.type === 0"/>
            <Folder v-else-if="data.type === 1" />
            <Document v-else-if="data.type === 2" />
            <Link v-else-if="data.type === 3" />
          </el-icon>
          <span v-if="data.type !== 2" style="user-select: none">{{ data.label }}</span>
          <el-input v-force-focus @blur="data.__save" @keydown.enter="data.__save" v-else-if="data.__edit" v-model="data.origin.title" />
          <span title="双击编辑标题" v-else style="user-select: none" v-loading="data.loading" @click="handleClick($event, data)">{{ data.origin.title }}</span>
          <span v-if="data.type <= 1" class="action-area">
            <TalexDropdown>
              <TalexCoverDialog has-display :activator="false" to="body" class="WikiEditor-AddDialog" v-model="data.addDialogVisible">
              <template #display>
                <TalexDropItem>
                  <template #label>
                    新建章节
                  </template>
                  <template #icon>
                    <el-icon><Folder /></el-icon>
                  </template>
                </TalexDropItem>
              </template>
                 <Chapter style="width: 500px" @done="data.addDialogVisible = false" :book-id="data.id" />
            </TalexCoverDialog>

            <TalexDropItem v-if="data.type === 0 || data.type === 1" @click="addDoc(data)">
              <template #label>
                新建文档
              </template>
              <template #icon>
                <el-icon><Document /></el-icon>
              </template>
            </TalexDropItem>
            <TalexDropItem divider />
            <TalexCoverDialog has-display :activator="false" to="body" class="WikiEditor-AddDialog" v-model="data.shareDialogVisible">
              <template #display>
                <TalexDropItem recommend>
                   <template #label>
                    分享维基
                  </template>
                  <template #icon>
                    <el-icon><Share /></el-icon>
                  </template>
                </TalexDropItem>
              </template>
              <ShareAction :activator="false" @done="data.addDialogVisible = false" :data="data" />
            </TalexCoverDialog>
            <TalexDropItem v-if="data.type === 1" divider />
            <TalexDropItem v-if="data.type === 1" danger @click="delCurrent(data)">
              <template #label>
                删除章节
              </template>
              <template #icon>
                <el-icon><Delete /></el-icon>
              </template>
            </TalexDropItem>
          </TalexDropdown>
          </span>
        </span>
    </template>
  </el-tree>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, reactive, watch, watchEffect, nextTick, inject, markRaw } from 'vue'
import { Notebook, Folder, Document, Link, Delete, Share } from '@element-plus/icons-vue'
import Chapter from '~/view/book/chapter/chapter.vue'
import TalexCoverDialog from '@components/common/dialog/TalexCoverDialog.vue'
import TalexDropdown from '@components/common/dropdown/talex-dropdown.vue'
import TalexDropItem from '@components/common/dropdown/talex-drop-item.vue'
import WikiModel from '@plugins/model/wiki.js'
import ChapterModel from '@plugins/model/chapter.js'
import DocModel from '@plugins/model/document.js'
import { useStore } from '@plugins/store/index.ts'
import { useRoute, useRouter } from 'vue-router'
import { sleep } from '@plugins/Common.ts'
import { MentionTip } from '@plugins/addon/MentionerManager.ts'
import { TipType, forWikiTip, forWikiDialogTip } from '~/plugins/addon/Tipper.ts'
import ShareAction from '@components/wiki/addon/ShareAction.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()
const props = defineProps(['currentSelect'])
const emits = defineEmits(['select-wiki', 'select-doc'])

const treeRef = ref()
const tree = ref()

function allowDrag(node) {
  console.log("@Drag", node)
  return node.level !== 1
}

function allowDrop(sourceNode, toNode, pos) {
  // TODO DRAG TO OTHER WIKI
  if( toNode.level === 1 ) return false
  // console.log("@Drop", sourceNode, toNode, pos)
  if( sourceNode.data.wiki.id !== toNode.data.wiki.id ) {
    console.log("@Drop denied", "wiki not match # todo", sourceNode, toNode)
    return false
  }
  if( sourceNode.data.type === 3 || toNode.data.type === 3 ) return false
  return true //sourceNode.data.type === 1 || sourceNode.data.type === 2 || sourceNode.data.type <= toNode.data.type;

}

async function dragSync(sourceNode, toNode, pos) {

  let res = null

  const sourceData = sourceNode.data, toData = toNode.data

  console.log("@Drop", sourceData, toData, pos)

  // inner
  if( pos === 'inner' ) {
    const wikiID = sourceData.origin.wiki_id

    // 如果是将章节移动到另外一个章节内
    if( sourceData.type === 1 && toData.type === 1 ) {

      // 将 source 的 parent 设置为 to 的即可 （并且将priority重置）
      const { id } = toData.origin

      sourceData.origin.parentChapter = id // adapt interface (api)
      sourceData.origin.priority = 0

      res = ChapterModel.editChapter(sourceData.origin.id, {
        wiki: wikiID,
        ...sourceData.origin
      })

    } else
      // 操作
      if( sourceData.type === 2 ) {

        if( !(toData.type > 1) ) {
          // 将 source 的 parent 设置为 to 的即可 （并且将priority重置）
          const { id } = toData.origin

          sourceData.origin.parentChapter = toData.type === 0 ? -1 : id // adapt interface (api) [0 for root]
          sourceData.origin.priority = 0

          res = DocModel.editDocument(sourceData.origin.id, {
            wiki: wikiID,
            ...sourceData.origin
          })
        }

    }

  } else if ( pos === 'before' ) {
    const wikiID = sourceData.wiki.id

    // 移动章节到某个章节之前
    if( sourceData.type === 1 && toData.type === 1 ) {

      // 先统一 parent
      sourceData.origin.parentChapter = toData.origin.parent

      // source优先级
      sourceData.origin.priority = toData.origin.priority + 1

      res = ChapterModel.editChapter(sourceData.origin.id, {
        wiki: wikiID,
        ...sourceData.origin
      })
    }

  } else if ( pos === 'after' ) {
    const wikiID = sourceData.wiki.id

    // 移动章节到某个章节之后
    if( sourceData.type === 1 && toData.type === 1 ) {

      // 先统一 parent
      sourceData.origin.parentChapter = toData.origin.parent

      // source优先级
      sourceData.origin.priority = toData.origin.priority - 1

      res = ChapterModel.editChapter(sourceData.origin.id, {
        wiki: wikiID,
        ...sourceData.origin
      })
    }

  }

  if( !res ) {
    await forWikiTip(`移动失败!`, 2400, TipType.WARNING)
    await sleep(2000)

    return window.location.reload()
  }

  // let res
  // const { origin: data } = sourceNode.data
  // const id = data.id
  //
  // // inner 就是切换 父项 先判断是不是doc
  // if (pos === 'inner') {
  //
  //   if (toNode.type === 1) {
  //     data.parent = id
  //
  //     res = await ChapterModel.editChapter(id, {
  //       wiki: wikiID,
  //       priority: data.priority,
  //       parentChapter: data.parent,
  //       title: data.title
  //     })
  //   } else {
  //     data.chapter = id
  //
  //     res = await DocModel.editDocument(id, {
  //       wiki: wikiID,
  //       ...data
  //     })
  //   }
  //
  //   if( !res )
  //     await forWikiTip(`移动失败!`, 1800, TipType.WARNING)
  // }
  // // 接下来就是切换顺序了 先从 章节入手
  // else {
  //   // 如果是章节之间的移动 直接修改priority即可 (此时还得统一两个node data的parent指向 因为after prev 是并列关系）
  //   if (sourceNode.type === 1) {
  //     data.priority = to.data.origin.priority + (pos === 'after' ? 1 : -1)
  //     data.parent = to.data.origin.parent
  //     res = await ChapterModel.editChapter(id, {
  //       wiki: wikiID,
  //       priority: data.priority,
  //       parent: data.parent,
  //       title: data.title
  //     })
  //   } else {
  //     // 如果是文档之间的移动 分情况
  //     // 第一，文档和文档之间的移动，修改priority即可
  //     // 第二，文档和章节之间的移动，修改文档的chapter | 判断 finalNode有没有 parentChapter 即可判断是否移动到根
  //     // eslint-disable-next-line no-lonely-if
  //     if (toNode.type === 1) {
  //       // 文档移动到章节前后直接修改parentChapter即可，不存在修改priority情况 | 此时将priority重置为0
  //       if (toNode.data.origin.parent) {
  //         // 没有移动到根 那就指向根
  //         data.priority = 0
  //         data.chapter = toNode.data.origin.parent
  //       } else {
  //         data.priority = 0
  //         data.chapter = null
  //       }
  //     } else {
  //       data.priority = toNode.data.origin.priority + (pos === 'after' ? 1 : -1)
  //     }
  //     res = await DocModel.editDocument(id, {
  //       wiki: wikiID,
  //       ...data
  //     })
  //   }
  //
  //   if( !res )
  //     await forWikiTip(`移动失败!`, 1800, TipType.WARNING)
  //
  // }
}

const updateDoc = inject('updateDoc')

function handleClick(event, data) {
  // console.log(data)
  if( !data.__save )
    data.__save = async () => {
      data.__save = null

      await sleep(50)

      data.__edit = false

      if( data.__title === data.label ) return

      data.content = data.origin.content
      data.title = data.label
      data.data = data // adapt func of provided

      // {
      // ...data,
      //     __save: undefined,
      //     __title: undefined,
      //     __edit: undefined
      // }

      updateDoc(data)
    }
  data.__title = data.origin.title instanceof Object ? markRaw(data.origin.title) : data.origin.title
  data.__edit = new Date().getTime() - (data.__lastClick || -1) <= 300
  if( data.__edit ) event.stopImmediatePropagation()
  data.__lastClick = new Date().getTime()
}

async function loadNode(node, resolve) {
  // root load
  if( !node.parent ) {
    const list = (await (store.local.admin ? WikiModel.getBooks() : WikiModel.getMyBooks())).rows

    const tree = []

    ;[ ...list ].forEach(obj => {
      tree.push({
        type: 0,
        id: obj.id,
        vid: `wiki-${obj.id}`,
        label: obj.title,
        children: [],
        origin: obj
      })
    })

    resolve(tree)

    return await nextTick( initial )
  }

  const data = node.data
  const type = data.type

  if( type === 3 ) {

    return resolve([])

  }

  if( type === 2 ) {

    function getOutline() {
      const outline = node.store.outline
      // console.log(node.store)
      if( !outline ) return setTimeout(getOutline, 1000)

      const tree = []

      ;[ ...outline ].forEach((obj, index) => {
        tree.push({
          type: 3,
          index,
          id: obj.id,
          vid: `${data.id}#chapter-${obj.id}-*${obj.id}}`,
          label: obj.text,
          wiki: data,
          children: [],
          origin: obj
        })

      })

      resolve(tree)

    }

    return getOutline()

  }

  // load book chapters
  if( type === 0 ) {
    const chapters = await ChapterModel.treeChapter(data.id)

    const tree = []

    ;[ ...chapters ].forEach(obj => {
      tree.push({
        type: 1,
        id: obj.id,
        vid: `${data.id}#chapter-${obj.id}`,
        label: obj.title,
        wiki: data,
        children: [],
        origin: obj
      })
    })

    // LEFT docs
    const docsLeft = await DocModel.getLeftDocs(data.id)
    ;[ ...docsLeft ].forEach(obj => {
      const reactiveObj = reactive({
        type: 2,
        id: obj.id,
        vid: `${data.vid}#doc-${obj.id}`,
        label: obj.title,
        children: [],
        origin: obj,
        wiki: data,
        isLeaf: true,
        leaf: true
      })

      tree.push(reactiveObj)

      watch(() => reactiveObj.origin.title, () => {
        reactiveObj.label = reactiveObj.origin.title
      })
    })

    tree.sort((a, b) => {
      if( a.type - b.type ) return true
      return b.origin.priority - a.origin.priority
      // if( b.origin.priority - a.origin.priority > 0 ) return true
      // return b.label - a.label
    })

    // console.log(tree)

    // console.log(docsLeft)

    // data.children = data.children.concat(tree)

    return resolve(tree)
  }

  // load chapter subchapters
  if( type === 1 ) {

    // const wiki = node.parent

    const tree = []

    // console.log("@Load subchapters", node, data)

    const subChapters = await ChapterModel.treeChapter(data.wiki.origin.id, data.id)

    ;[ ...subChapters ].forEach(obj => {
      tree.push({
        type: 1,
        id: obj.id,
        vid: `${data.id}#chapter-${obj.id}`,
        label: obj.title,
        wiki: node.parent.data.wiki || node.parent.data,
        children: [],
        origin: obj
      })
    })

    const chapter = await ChapterModel.viewChapter(data.id)

    ;[ ...(chapter.docs) ].forEach(obj => {
      const reactiveObj = reactive({
        type: 2,
        id: obj.id,
        vid: `${node.parent.data.vid}#doc-${obj.id}`,
        label: obj.title,
        children: [],
        origin: obj,
        wiki: node.parent.data.wiki || node.parent.data,
        isLeaf: true
      })
      tree.push(reactiveObj)

      watch(() => reactiveObj.origin.title, () => {
        reactiveObj.label = reactiveObj.origin.title
      })
    })

    return resolve(tree)
  }

  // console.log(node)
}

async function delCurrent(data) {
  const tree = treeRef.value
  let res

  // console.log(tree, data)
  // delete chapter
  if( data.type === 1 ) {
    res = await ChapterModel.deleteChapter(data.id)
  } else if( data.type === 2 ) {
    res = await DocModel.deleteDocument(data.id)
  } else {
    console.log("@Del denied", data)
    return await forWikiTip("不允许删除!", 2400, TipType.WARNING)
  }

  if( res ) {

    tree.remove(data.vid)

  } else {

    await forWikiTip( "删除失败!", 2400, TipType.ERROR )

  }
}

async function addDoc(data) {

  const res = await DocModel.createDocument({
    wiki: data.type === 0 ? data.id : data.wiki.id,
    title: '双击编辑标题',
    content: '',
    chapter: data.type === 0 ? undefined : data.id
  })

  const reactiveObj = reactive({
    type: 2,
    id: res.id,
    vid: `${data.vid}#doc-${res.id}`,
    label: res.title,
    children: [],
    origin: res,
    wiki: data.type === 0 ? data.origin : data.wiki,
    isLeaf: true,
    // TODO FIX
    /*__edit: true,
    __title: res.title,
    __save: () => {
      reactiveObj.__edit = undefined
      reactiveObj.__save = undefined
      reactiveObj.__title = undefined

      if( reactiveObj.__title === reactiveObj.label ) reactiveObj.__title = "新建维基文档"

      reactiveObj.content = reactiveObj.origin.content
      reactiveObj.data = {
        ...data,
        __save: undefined,
        __title: undefined,
        __edit: undefined
      }

      updateDoc(reactiveObj)
    }*/
  })

  data.children.push(reactiveObj)

  watch(() => reactiveObj.origin.title, () => {
    reactiveObj.label = reactiveObj.origin.title
  })

  await forWikiTip(`文档添加${res ? '成功' : '失败'}!`, 2600, res ? TipType.SUCCESS : TipType.ERROR)

  treeRef.value.setCurrentKey(reactiveObj.vid, true)

}

// async function handleDragDrop(draggedNode, finalNode, pos, event) {
//
//   let res
//   const { data } = draggedNode
//
//   // inner 就是切换 父项 先判断是不是doc
//   if (pos === 'inner') {
//     const id = finalNode.data.value
//
//     if (data.doChapter) {
//       data.parentChapter = id
//
//       res = await WikiChapter.editChapter(data.value, {
//         wiki: book.value.id,
//         priority: data.priority,
//         parentChapter: data.parentChapter,
//         title: data.title
//       })
//     } else {
//       data.chapter = id
//
//       res = await WikiDocument.editDocument(data.id, data)
//     }
//
//     await forWikiTip(res.message, 1800, res.code < window.MAX_SUCCESS_CODE ? 'success' : 'error')
//   }
//   // 接下来就是切换顺序了 先从 章节入手
//   else {
//     // 如果是章节之间的移动 直接修改priority即可 (此时还得统一两个node data的parent指向 因为after prev 是并列关系）
//     if (data.doChapter) {
//       data.priority = finalNode.data.priority + (pos === 'after' ? 1 : -1)
//       data.parentChapter = finalNode.data.parentChapter
//       res = await WikiChapter.editChapter(data.value, {
//         wiki: book.value.id,
//         priority: data.priority,
//         parentChapter: data.parentChapter,
//         title: data.title
//       })
//     } else {
//       // 如果是文档之间的移动 分情况
//       // 第一，文档和文档之间的移动，修改priority即可
//       // 第二，文档和章节之间的移动，修改文档的chapter | 判断 finalNode有没有 parentChapter 即可判断是否移动到根
//       // eslint-disable-next-line no-lonely-if
//       if (finalNode.data.doChapter) {
//         // 文档移动到章节前后直接修改parentChapter即可，不存在修改priority情况 | 此时将priority重置为0
//         if (finalNode.data.parentChapter) {
//           // 没有移动到根 那就指向根
//           data.priority = 0
//           data.chapter = finalNode.data.parentChapter
//         } else {
//           data.priority = 0
//           data.chapter = null
//         }
//       } else {
//         data.priority = finalNode.data.priority + (pos === 'after' ? 1 : -1)
//       }
//       res = await WikiDocument.editDocument(data.id, data)
//     }
//
//     await forWikiTip(res.message, 1800, res.code < window.MAX_SUCCESS_CODE ? TipType.SUCCESS : TipType.ER
//     )
//   }
// }

function handleChangeCurrentNode(data) {
  if (data.data.type === 3) return
  const wiki = data.data.wiki || data.data
  emits('select-wiki', wiki)
  if (data.data.type !== 2) return
  emits('select-doc', data)
}

async function initial() {

  if (!props.currentSelect) return

  await sleep(500)

  const ins = treeRef.value
  const { id, wiki } = route.params

  const wikiNode = ins.getNode(`wiki-${id}`)
  if( !wikiNode ) {

    await forWikiDialogTip("无法找到目标维基", "抱歉，您可能没有权限浏览目标维基，无法自动定位维基列表！", [
      {
        content: "了解",
        type: TipType.INFO,
        async onClick() {

          await router.push( '/wiki/edit/' )

          return true

        }
      }
    ])

    return

  }

  wikiNode.expanded = true
  // ins.setCurrentKey(wikiNode.data.vid)

  // load wiki data
  const loadData = wikiNode.store.load
  await loadData(wikiNode, (array) => {
    wikiNode.data.children = array
  })

  // find target document (first: left)
  const chapters = []
  const children = wikiNode.data.children
  for( const node of children ) {
    if( node.type !== 2 ) {

      chapters.push(node)
      continue;

    }

    const childNode = ins.getNode(node.vid)
    // childNode.isLeaf = true

    // caught it
    if( node.id === Number(wiki) ) {

      ins.setCurrentKey(node.vid)

      await sleep(200)

      ins.setCurrentKey(node.vid)

      await sleep(200)

      ins.setCurrentKey(node.vid)

      await router.push(`/wiki/edit/${id}/${wiki}`)

      return

    }

  }

  // continue to find (for chapters)
  for( const chapter of chapters ) {
    const chapterNode = ins.getNode(chapter.vid)

    // load wiki data
    await loadData(chapterNode, (array) => {
      chapterNode.data.children = array
    })

    // ins.setCurrentKey(chapter.vid, true)
    // await sleep(3000)
    chapterNode.expanded = true


    const kids = chapterNode.data.children
    // console.log("for chapter kids:", kids)
    for( const kid of kids ) {
      if( kid.type !== 2 ) {

        chapters.push(kid)
        continue;

      }

      const node = ins.getNode(kid.vid)
      // node.isLeaf = true

      // caught it
      if( kid.id === Number(wiki) ) {

        // node.isCurrent = true

        ins.setCurrentKey(node.data.vid)

        await sleep(200)

        ins.setCurrentKey(node.data.vid)

        await sleep(200)

        ins.setCurrentKey(node.data.vid)

        await router.push(`/wiki/edit/${id}/${wiki}`)

        // ins.setChecked(kid, true)

        // setTimeout(() => {
        //
        //   console.log("now", ins.getCurrentNode())
        //
        //   ins.setCurrentKey(kid.vid, true)
        //
        // }, 3000)

        return

      }

    }
  }

  await forWikiDialogTip("无法找到目标维基", "抱歉，您的路径可能存在问题，无法自动定位维基列表！", [
    {
      content: "了解",
      type: TipType.INFO,
      async onClick() {

        await router.push( '/wiki/edit/' )

        return true

      }
    }
  ])
  // const vid = String(props.currentSelect)
  // const id = Number(vid.replace('doc-', ''))
  // const node = map.get(id)
  //
  // treeRef.value.setCurrentNode(node)
  //
  // emits('select-doc', treeRef.value.getCurrentNode())

}
</script>

<script>
export default {
  name: 'WikiListTree',
}
</script>

<style lang="scss" scoped>
.WikiListTree-Container {
  position: relative;

  min-height: 100%;

  background-color: var(--el-fill-color-light);
}

:deep(.el-tree-node) {

  .custom-tree-node {

    .el-icon {
      position: relative;
      margin-right: 5px;

      left: 0;
      top: 2px;

    }

  }

  border-radius: 6px;
  //transition: .3s cubic-bezier(.25,.8,.25,1);

  .el-tree-node__content:hover {
    background-color: var(--el-fill-color-lighter);
    //color: var(--el-color-primary);
    //filter: invert(1%);
  }
}

:deep(.is-focusable.is-current) {

  & > .el-tree-node__content {

    color: var(--el-color-primary);

    font-weight: 600;

    //border-radius: 6px;

  }

  //background-color: var(--el-color-primary-light-6);

}

:deep(.is-focusable) {

  margin: 5px 0;

  &:hover {
    .action-area {

      opacity: 1 !important;
    }
  }

  .el-tree-node__content {
    .action-area {
      position: absolute;

      top: 5px;
      right: 6px;

      opacity: 0;
      transition: .3s cubic-bezier(.25,.8,.25,1);
      .el-icon {
        position: relative;

        left: 0;
        top: 0;

      }
    }
    position: relative;
    height: 36px;

    background-color: unset;
  }

  background-color: var(--el-fill-color-light);
  //background: var(--el-fill-color-lighter);

}
</style>
