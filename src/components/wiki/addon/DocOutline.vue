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
  <div @scroll="scrollListener" class="DocOutline-Container">
    <div class="DocOutline-Pointer transition-cubic" ref="pointerRef"/>
    <div class="DocOutline-Info">
      <p><span>全文统计: </span>{{ Number(content.length / 600).toFixed(2) }}分钟</p>
      <p><span>最后更新: </span>{{ time }}</p>
    </div>
    <h5>本页目录</h5>
    <el-tree @node-click="fixSelect" ref="treeRef" default-expand-all :expand-on-click-node="false" highlight-current :data="treeData" node-key="id" :props="{ label: 'text' }">

    </el-tree>
  </div>
</template>

<script>
export default {
  name: "DocOutline"
}
</script>

<script setup>
import { formatDateDistance } from '~/plugins/addon/utils'
import { computed, inject, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const time = computed(() => formatDateDistance(new Date(props.update)))

const pointerRef = ref()
const treeRef = ref()
const props = defineProps(['outline', 'func', 'content', 'update'])

let rootEl
const treeData = computed(() => {
  const outlineData = props.outline
  const list = []

  // const cubic = (items, id = 1) => items
  //     .filter(item => item['level'] -1 === id)
  //     .map(item => ({
  //       ...item,
  //       children: cubic(items, item.level)
  //     }))

  let lastRoot = -1
  outlineData.forEach(outline => {
    if( lastRoot !== -1 && outline.level > lastRoot ) {
      let index = list.length - 1

      while ( list[index].level !== lastRoot ) index--

      return list[index].children.push(outline)
    }
    if( lastRoot !== -1 && outline.level < lastRoot ) {
      const thisList = [ ...list ]

      list.splice(0, list.length)

      lastRoot = outline.level
      list.push({
        ...outline,
        children: thisList
      })

      return

    }

    lastRoot = outline.level
    list.push({
      ...outline,
      children: []
    })
  })

  return list
})

onMounted(() => {

  rootEl = pointerRef.value.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[4].childNodes[0]

  const indexId = route.query.index

  if( indexId ) {

    treeRef.value.setCurrentKey(indexId)

    fixSelect( treeRef.value.getCurrentNode(indexId) )

  }

  let timer

  props.func((e) => {

    clearTimeout(timer)

    timer = setTimeout(() => scrollListener(e), 10)
    // scrollListener

  })

})

async function scrollListener(e) {
  const tree = treeRef.value

  let index = 0
  for( const node of rootEl.childNodes ) {
    if( node.nodeName.indexOf('H') === -1 || node.nodeName === 'HR' ) continue;
    index += 1

    if( node.offsetTop - e.scrollTop > 500 || node.offsetTop - e.scrollTop < 20 ) continue;

    const outlineData = props.outline[index - 1]

    tree.setCurrentKey(outlineData.id, true)

    await router.push( {
      query: {
        ...route.query,
        index: outlineData.id
      }
    } )

    // await sleep(17) // frame

    const currentNode = tree.$el.querySelector('.el-tree-node.is-current')

    await posFixer( currentNode )

    return

  }

}

async function posFixer(targetNode) {

  const pointer = pointerRef.value

  if( !targetNode ) return pointer.style.opacity = '0'

  let top = targetNode.offsetTop, el = targetNode

  while( el.parentNode && el !== pointer.parentNode ) {

    if( el.className.indexOf('el-tree-node') === -1 )
      top += el.offsetTop

    el = el.parentNode

  }

  pointer.style.top = `${top}px`
  pointer.style.height = `${targetNode.clientHeight}px`
  pointer.style.opacity = '1'

}

const route = useRoute()
const router = useRouter()
const getScrollBar = inject('getScrollBar')

async function fixSelect(data) {
  const hNode = rootEl.querySelector('#' + data.id)

  getScrollBar().setScrollTop(hNode.offsetTop - 20)
  await router.push( {
    query: {
      ...route.query,
      index: data.id
    }
  } )

  setTimeout(() => posFixer( treeRef.value.$el.querySelector('.is-current') ) , 100)
}
</script>

<style lang="scss" scoped>
.DocOutline-Container {
  .DocOutline-Info {
    span {
      color: var(--el-text-color-secondary)
    }
    p {
      color: var(--el-text-color-primary);
    }
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 10px;

    height: 32px;

    font-size: 12px;
    border-bottom: 1px solid var(--el-border-color);
    overflow: hidden;
  }
  .DocOutline-Pointer {
    position: absolute;

    left: 3px;
    top: 10px;

    width: 5px;
    height: 40px;

    opacity: 0;
    border-radius: 5px;
    box-shadow: 0 0 3px 0 var(--el-color-primary);
    background-color: var(--el-color-primary);
  }
  //padding: 0 10px 15px 10px;
  padding-right: 0;
  box-sizing: border-box;
  h5 {
    margin: 0;
    padding: 0 10px;

    font-weight: 600;
  }
  :deep(.el-tree) {
    padding: 0 10px;
    .el-icon.el-tree-node__expand-icon {
      display: none !important;
      //opacity: 0;
      //pointer-events: none;
    }

    &.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      border-radius: 0 4px 4px 0;
    }

  }

}

@media only screen and (max-width: 600px) {
  .DocOutline-Container {
    display: none !important;
  }
}
</style>
