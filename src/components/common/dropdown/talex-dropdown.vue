<template>
  <div class="TalexDropdown-Wrapper" @mouseenter="hoverTrigger && hoverTriggerIn()" @mouseleave="hoverTrigger && hoverTriggerOut()">
    <div class="TalexDropdown-Displayer" ref="displayRef" @click.stop.prevent="openMenu">
      <slot name="display">
        <el-button class="rounder-btn" text :icon="icon"></el-button>
      </slot>
    </div>
    <teleport to="body">
      <div ref="containerRef" class="TalexDropdown-Container"  @mouseenter="hoverTrigger && hoverTriggerIn()" @mouseleave="hoverTrigger && hoverTriggerOut()">
        <slot />
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { defineProps, onBeforeMount, onMounted, ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { debounceRef, sleep, throttleRef } from '~/plugins/Common.ts'

const props = defineProps({
  icon: {
    type: Object,
    default: Plus
  },
  hoverTrigger: {
    type: Boolean,
    default: false
  }
})

const isOpen = debounceRef(false, 100)

watch(() => isOpen.value, async () => {
  if( !isOpen.value ) await closeMenu()
  else {

    const el = displayRef.value

    let pE = el.offsetParent, left = el.offsetLeft + pE.offsetLeft + + pE.offsetParent.offsetLeft, top = el.offsetTop - 5
    // while( pE.offsetParent && pE.offsetParent !== document.getElementById('app') ) {
    //
    //   left += pE.offsetLeft
    //   top += pE.offsetTop
    //
    //   pE = pE.parentNode
    //
    //   console.log(pE, left, pE.offsetLeft)
    //
    // }

    const containerEl = containerRef.value

    left += el.clientWidth
    top += el.clientHeight + 10

    if( left + containerEl.clientWidth + 20 >= window.innerWidth ) {

      // left -= containerEl.clientWidth / 2

      left -= containerEl.clientWidth / 2

    }

    if( top + containerEl.clientHeight + 20 >= window.innerHeight ) {

      top -= containerEl.clientHeight
      top -= containerEl.clientHeight

    }

    const { style } = containerEl

    style.transform = 'translateY(-30px)'
    style.left = `${left}px`
    style.top = `${top}px`

    await sleep(100)

    style.pointerEvents = ''
    style.opacity = '1'

    await sleep(10)

    style.transform = 'translateY(0)'
  }
})

async function hoverTriggerIn() {
  isOpen.value = true
}

async function hoverTriggerOut() {
  isOpen.value = false
}

const displayRef = ref(null)
const containerRef = ref(null)

function listener(e) {
  let caught = false

  // eslint-disable-next-line no-return-assign
  e.path.forEach(path => caught = caught || ['Talex-Dropdown-Wrapper'/* , 'TalexDropdown-Container' */].includes(path.className))

  if (!caught) closeMenu()
}

async function closeMenu() {
  const style = containerRef?.value?.style
  if (!style) return

  style.transform = 'translateY(-30px)'
  style.opacity = '0'

  await sleep(100)

  style.transform = 'translateY(-30px)'
  style.pointerEvents = 'none'
}

onMounted(() => !props.hoverTrigger && document.body.addEventListener('click', listener))
onBeforeMount(() => !props.hoverTrigger && document.body.removeEventListener('click', listener))

const openMenu = ref(async e => {
  e.preventDefault()
  if( props.hoverTrigger ) return
  await closeMenu()
  const { style } = containerRef.value
  const { clientWidth, offsetLeft } = containerRef.value
  const { innerWidth } = window

  const totalLeft = clientWidth + offsetLeft

  let { x, y } = e

  x += 10
  y += 5

  if (totalLeft + 200 + (x - totalLeft) >= innerWidth) {
    x -= clientWidth
    style.transformOrigin = `${e.offsetX + 10}px ${e.offset + 5}px`
  } else {
    style.transformOrigin = `${e.offsetX - 10}px ${e.offset - 5}px`
  }

  style.transform = 'scale(0)'
  style.left = `${x}px`
  style.top = `${y}px`

  await sleep(100)

  style.pointerEvents = ''
  style.opacity = '1'
  style.transform = 'scale(1)'
})
</script>

<script>
export default {
  name: 'talex-dropdown',
}
</script>

<style lang="scss" scoped>
.TalexDropdown-Container {
  &:before {
    z-index: -1;
    content: "";
    position: absolute;

    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    border-radius: 4px;
    //background-color: var(--el-fill-color-lighter);
    box-shadow: 0 0 1px rgba(0,0,0,.3),0 4px 14px rgba(0,0,0,.1);
    //backdrop-filter: saturate(180%) contrast(200%) brightness(150%) blur(10px);
    //background-image: radial-gradient(transparent 1px,var(--el-fill-color) 1px);
    //background-size: 4px 4px;
  }
  z-index: 99999;
  position: absolute;
  padding: 6px 4px;

  justify-content: center;
  align-items: center;
  vertical-align: center;

  left: 0;
  top: 0;

  min-width: 145px;
  width: auto;
  height: auto;
  min-height: 10px;

  backdrop-filter: saturate(180%) brightness(98%) blur(30px);
  border-radius: 4px;
  transform: scale(0);
  opacity: 0;
  //background-color: rgba(10, 31, 53, 0.03);
  transition: .2s cubic-bezier(.25,.8,.25,1);
}

.TalexDropdown-Displayer {
  position: relative;
}

.TalexDialog-Wrapper {
  position: relative;
}
</style>
