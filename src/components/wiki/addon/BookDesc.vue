<template>
  <div class="BookDesc-Container transition-cubic" ref="dom">
    <div class="BookDesc-Header">
      <el-image :src="thisBook?.image" />
      <AutoZoomText>{{ thisBook?.title }}</AutoZoomText>
    </div>
    <span :title="thisBook?.desc">{{ thisBook?.desc }}</span>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import AutoZoomText from '@components/common/display/AutoZoomText.vue'
import { sleep } from '@plugins/Common.ts'

const props = defineProps({
  book: Object
})

const dom = ref()
const thisBook = ref()

let timer

watch(() => props.book, () => {

  clearTimeout(timer)

  timer = setTimeout(() => {
    nextTick(render)
  }, 400)

})

async function render() {

  const el = dom.value.style

  el.opacity = '0'
  el.transform = 'translateX(50px) scaleX(1.2)'

  await sleep(300)

  thisBook.value = props.book
  el.transform = 'translateX(-50px) scaleX(1.2)'

  await sleep(300)

  el.opacity = '1'
  el.transform = 'translateX(0)'

  await sleep(300)

}

</script>

<script>
export default {
  name: 'BookDesc',
}
</script>

<style lang="scss" scoped>
.BookDesc-Container {
  position: relative;
  padding: 10px 15px;

  top: 0;

  width: calc(100% - 30px);

  .BookDesc-Header {
    padding-bottom: 10px;
    display: flex;
    align-items: center;

    border-bottom: 1px solid var(--el-border-color);
  }

  span {
    position: absolute;

    left: 20px;
    top: 75px;

    height: 50px;

    //text-overflow: ellipsis;
    overflow: hidden;
    //white-space: nowrap;
    //line-height: 20px;
    opacity: .85;
  }
  .el-image {
    position: relative;

    //right: 5%;
    //top: 5%;

    width: 42px;
    height: 42px;

    //filter: drop-shadow(0 0 1px var(--el-border-color));
  }
  text-align: left;
}
</style>
