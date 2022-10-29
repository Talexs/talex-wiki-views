<template>
  <div class="DocViewer-Container">
<!--    <div class="Viewer-Progress"></div>-->
    <el-scrollbar class="scrollbar">
<!--      <div class="viewer-header">-->
<!--        <p><span>全文统计:</span>{{ Number(length / 600).toFixed(2) }}分钟</p>-->
<!--        <p><span>最后更新:</span>{{ time }}</p>-->
<!--      </div>-->
      <div class="DocViewer-inner" ref="inner"></div>
    </el-scrollbar>
    <div class="DocViewer-Outline">
      <div class="box-blur-header">
        <p class="box-title">大纲页</p>
      </div>
      <div class="outline-pointer" id="outline-pointer"></div>
      <div class="viewer-outline" ref="outline">

      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, defineProps, defineEmits, onMounted, watch, onBeforeUnmount } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { useModelWrapper } from '~/plugins/Common'
import { useRouter } from 'vue-router'

const props = defineProps({
  index: String,
  book: String,
  tVid: String,
  modelValue: String,
  time: String,
  length: Number
})
const emits = defineEmits(['update:modelValue'])

const inner = ref(null)
const outline = ref(null)

const router = useRouter()
// const viewPercentage = ref(0)
const modelValue = useModelWrapper(props, emits)

let lastCommentDom
const listenerFunc = event => {
  const innerContentEl = inner.value
  const innerP = innerContentEl.parentNode
  const innerPP = innerP.parentNode

  let index = 0; let done = false

  const scrollTop = innerPP.scrollTop || document.documentElement.scrollTop || document.body.scrollTop

  // viewPercentage.value = (scrollTop / innerP.clientHeight) * 125
  // // viewPercentage.value = viewPercentage.value >= 93 ? 100 : viewPercentage.value
  //
  // console.log(scrollTop)
  // console.dir(inner)

  // const scrollBarY = innerPP.parentNode.querySelector('.el-scrollbar__bar.is-vertical')
  //
  // if (scrollBarY) {
  //   const { firstElementChild } = scrollBarY
  //   const transY = firstElementChild.style.transform
  //   const { scrollHeight: clientHeight } = firstElementChild
  //   const num = Number(transY.replace('translateY(', '').replace('%)', ''))
  //
  //   const { clientHeight: totalHeight, clientWidth: totalWidth } = innerPP
  //
  //   const per = totalHeight / num - clientHeight
  //   const transformerPer = (per / 100) * totalWidth
  //
  //   viewPercentage.value = `${transformerPer}%`
  //   console.log(num, per, num / per, transformerPer)
  // }

  innerContentEl?.childNodes.forEach(el => {
    if (done || el.nodeName.indexOf('H') === -1 || el.nodeName === 'HR') return

    index++

    const diff = scrollTop - el.offsetTop

    if ((diff <= 100 && diff >= -400) || diff <= -1000) {
      done = true
    }
  })

  // if (!done) {
  //   // index = innerContentEl?.childNodes?.length + 1
  //
  //   done = true
  // }

  // 采用index设计避免内容完全一致导致失效

  const dom = outline.value
  const pointer = dom.parentNode.querySelector('#outline-pointer')

  if (lastCommentDom) {
    lastCommentDom.className = lastCommentDom.className.replace(/\s*active\s*/, '')
  }

  if (!done) {
    pointer.style.height = '0'
    pointer.style.opacity = '0'

    return
  }

  const nodes = []

  dom.querySelectorAll('ul')[0].childNodes.forEach(el => {
    nodes.push(el)

    const ul = el.querySelector('ul')

    if (ul) {
      ul.querySelectorAll('li').forEach(el => {
        nodes.push(el)
      })
    }
  })

  nodes.forEach((el, i) => {
    if (index === i + 1) {
      // console.dir(el)
      const span = el.querySelector('span')

      lastCommentDom = span

      let top = (el.offsetTop + el.offsetTop + el.parentNode.offsetTop + dom.offsetTop)

      // 循环判断 ul 删除高度
      let parentNode = el
      while (parentNode.parentNode.nodeName === 'UL') {
        top -= parentNode.offsetTop

        parentNode = parentNode.parentNode

        top -= parentNode.offsetTop

        // top += 10
      }

      if (el.lastChild.nodeName !== 'UL' && el?.parentNode?.parentNode?.nodeName !== 'DIV') {
        top += span.offsetHeight
      }

      pointer.style.top = `${top}px`
      pointer.style.height = `${span.offsetHeight}px`
      pointer.style.opacity = '1'

      span.className += ' active'
      router.push(`/wiki/view/${props.book}/${String(props.tVid).replace(`${props.book}-`, '')}/${span.innerText}`)
    }
  })
}

onBeforeUnmount(() => {
  const el = inner.value.parentNode.parentNode
  el.removeEventListener('scroll', listenerFunc)
})

watch(() => modelValue.value, render)
onMounted(render)

const icon = '<i class="el-icon expanded"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M384 192v640l384-320.064z"></path></svg></i>'

function initOutlineClicker() {
  outline.value.querySelectorAll('span').forEach(el => el.addEventListener('click', e => (id => {
    document.querySelector(`#${id}`)?.scrollIntoView()
    id && router.push(`/wiki/view/${props.book}/${String(props.tVid).replace(`${props.book}-`, '')}/${id}`)
  })(el?.dataset?.targetId)))
}

async function render() {
  const el = inner.value.parentNode.parentNode
  el.removeEventListener('scroll', listenerFunc)
  await nextTick(async () => {
    await Vditor.preview(inner.value, props.modelValue)
    Vditor.outlineRender(inner.value, outline.value)

    outline.value.querySelectorAll('.vditor-outline__action').forEach(el => {
      const span = el.parentNode.querySelector('span').innerHTML

      el.parentNode.innerHTML = `${icon }<span>&nbsp;${ span }</span>`
    })

    props.index && ((id) => {
      id && router.push(`/wiki/view/${props.book}/${String(props.tVid).replace(`${props.book}-`, '')}/${id}`)
      document.querySelector(`#${id}`)?.scrollIntoView()
    })(props.index)

    initOutlineClicker()

    el.addEventListener('scroll', listenerFunc)
    console.log('vditor rendered')
  })
}
</script>

<script>
export default {
  name: 'DocViewer',
}
</script>

<style lang="scss">
.outline-pointer {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 0;

  border-radius: 5px;
  //box-shadow: 5px 0 25px 5px var(--el-color-primary-light-3);
  background-color: var(--el-color-primary-light-9);
  opacity: 0;
  transition: all .3s cubic-bezier(.25,.8,.25,1);
  //transition: all .25s
}
</style>

<style lang="scss" scoped>
.DocViewer-Outline {
  .box-blur-header {
    .box-title {
      position: relative;
      top: -10px;

      font-size: 14px;
      line-height: 32px;
    }
    position: sticky;
    padding: 0 3%;
    //padding-top: 2%;
    display: flex;
    justify-content: space-between;
    vertical-align: center;

    width: 96%;
    height: 35px;

    top: 0;

    //background-color: var(--el-fill-color);
    //backdrop-filter: saturate(180%) brightness(98%) blur(50px);
  }
  .viewer-outline {
    position: relative;
    padding: 4px 3%;
    display: block;
    :deep(ul) {
      .el-icon.expanded {
        cursor: pointer;
        color: var(--el-text-color-placeholder);
        font-size: 12px;
        transform: rotate(90deg);
      }
      padding: 0;
      li {
        height: 36px;
        &:hover > span {
          color: var(--el-color-primary) !important;
        }
      }
      li > span {
        //margin: 5px 0;
        padding: 0 4px 0 0;

        height: 36px;
        line-height: 36px;

        color: var(--el-text-color-regular);
        text-align: left;
        transition: all .15s;
      }
      li > ul {
        position: relative;

        left: 18px;
      }
      span.active {
        color: var(--el-color-primary-light-3);
        opacity: 0.9;
        font-weight: 600;
      }
    }

    height: 100%;
    width: 94%;

    left: 0;
    top: 0;
    overflow: hidden;
    transition: .3s cubic-bezier(.25,.8,.25,1);
  }
  position: relative;
  display: flex;
  flex-direction: column;

  min-width: 180px;
  width: 15%;

  border-left: 1px solid var(--el-border-color);
  transition: .3s cubic-bezier(.25,.8,.25,1);
  transition: translate 0s;
}

.GoodDetailView-Outline.shrink {

  margin-left: -30px;

  width: 0;
  min-width: 0;

  color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);

  transform: translateX(5px) scale(.85);

  .outline-pointer {

    transform: translateX(-5px) scale(0);
    opacity: 0;

  }

  .GoodDetailView-Outline-Func {

    opacity: 0;

    transform: translateY(15px);

    transition: all .1s;

  }

  .GoodDetailView-Outline-Inner {

    opacity: 0;

  }

  .outline-btn {
    top: 0;
    right: 32px;

    width: 36px;
    height: 36px;

    transform: rotate(0);
  }

}

.DocViewer-Container {
  .viewer-header {
    p {
      span {
        position: relative;
        margin-right: 5px;

        font-weight: 600;
      }
      position: relative;
      padding: 0 6px;

      top: 50%;
      height: 28px;

      line-height: 28px;
      background-color: var(--el-bg-color-page);

      border-radius: 6px;
      transform: translateY(-50%) scale(.85);
      filter: invert(5%);
    }
    z-index: 1000;
    position: sticky;
    display: flex;

    justify-content: space-between;

    top: 0;

    height: 35px;
    //flex: 1;
    //width: 100%;

    font-size: 12px;
    line-height: 35px;

    backdrop-filter: saturate(180%) brightness(98%) blur(50px);
  }
  .Viewer-Progress {
    z-index: 0;
    content: "";
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    //border-radius: 0 0 8px 8px;
    background-color: var(--el-color-primary);
  }
  .scrollbar {
    z-index: 1;
    position: relative;
    flex: 1;
    height: 100%;
  }
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;

  background: var(--el-fill-color-lighter);

  :deep(.vditor-reset) {
    p {
      font-size: 17px;
    }
    //margin-bottom: 50px;
    padding: 2% 4% !important;
   }
}
</style>
