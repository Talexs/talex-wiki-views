<template>
  <div id="RegisterDom" class="Register-Wrapper LayoutCenter-Frame">
    <div v-loading="loading" ref="wholeDom" class="Register-Container transition-cubic">
      <div class="Register-Background">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 640 800" opacity="0.84"><defs><filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="84" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter></defs><g filter="url(#bbblurry-filter)"><ellipse rx="257.5" ry="129" cx="521.9990897591658" cy="147.60067989319327" fill="#2979ff"></ellipse><ellipse rx="257.5" ry="129" cx="424.0369865837997" cy="402.1657834991695" fill="#3c75a9"></ellipse><ellipse rx="257.5" ry="129" cx="139.74576502522143" cy="674.6489272230253" fill="#35f7ff"></ellipse></g>
        </svg>
      </div>
      <div ref="mainDom" class="Register-Main transition-cubic">
        <p ref="titleDom" class="title transition-cubic">注册</p>
        <div ref="contentDom" class="Register-Content transition-cubic">
          <component :is="component" />
        </div>
        <div class="Register-Footer transition-cubic">
          <p ref="mentionDom" class="transition-cubic"></p>
        </div>
      </div>
    </div>
  </div>
<!--  <div ref="wholeDom" class="Register-Wrapper">-->
<!--    <div class="Register-Background">-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 640 800" opacity="0.84"><defs><filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">-->
<!--        <feGaussianBlur stdDeviation="84" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter></defs><g filter="url(#bbblurry-filter)"><ellipse rx="257.5" ry="129" cx="521.9990897591658" cy="147.60067989319327" fill="#2979ff"></ellipse><ellipse rx="257.5" ry="129" cx="424.0369865837997" cy="402.1657834991695" fill="#3c75a9"></ellipse><ellipse rx="257.5" ry="129" cx="139.74576502522143" cy="674.6489272230253" fill="#35f7ff"></ellipse></g></svg>-->
<!--    </div>-->
<!--    <div v-loading="loading" class="Register-Container LayoutCenter-Frame">-->
<!--      <component :is="component" />-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import RegEmail from './register/RegEmail.vue'
import { reactive, onMounted, onUpdated, provide, ref } from 'vue'
import { sleep } from '~/plugins/Common'
import { useRouter } from 'vue-router'

const wholeDom = ref()
const mainDom = ref()
const contentDom = ref()
const mentionDom = ref()
const titleDom = ref()

const loading = ref(false)
const component = ref(null)

const router = useRouter()
const data = reactive({})

let init = false
async function initial() {
  if( init ) return
  init = true

  await join( null, RegEmail )
}

provide('mention', mention)
provide('join', join)
provide('getData', () => data)
provide('setData', (key, value) => data[key] = value)

async function mention(text, styles, resetTime) {
  const dom = mentionDom.value.parentNode
  const style = mentionDom.value.style

  if( !text ) {

    await sleep(200)

    style.opacity = '0'
    style.transform = 'translateX(5px)'

    await sleep(100)

    dom.style.transform = 'scale(.65, .85)'

    await sleep(50)

    dom.style.transform = 'scale(.65, .85) translateX(10px)'

    await sleep(50)

    dom.style.opacity = '0'

    await sleep(50)

    dom.style.marginBottom = '-15%'

    return

  }

  await sleep(200)

  dom.style.marginBottom = '0'

  await sleep(50)

  dom.style.opacity = '1'

  await sleep(50)

  dom.style.transform = 'scale(.65, .85) translateX(0)'

  await sleep(100)

  dom.style.transform = 'scale(1) translateX(0)'

  style.opacity = '0'
  style.transform = 'translateX(10px)'

  await sleep(100)

  style.transform = 'translateX(-5px)'
  mentionDom.value.innerHTML = text

  const backupStyles = {}

  styles && Object.keys(styles).forEach(key => {
    backupStyles[key] = style[key]
    style[key] = styles[key]
  })

  await sleep(200)

  style.opacity = '1'
  style.transform = 'translateX(0)'

  function reset() {

    styles && Object.keys(backupStyles).forEach(key => {
      style[key] = backupStyles[key]
    })

  }

  if( resetTime ) {

    setTimeout(reset, resetTime)

  }

  return reset

}

async function join(comp, next) {
  await sleep(200)

  const whole = wholeDom.value.style
  const main = mainDom.value.style
  const title = titleDom.value.style
  const content = contentDom.value.style

  if ( comp ) {

    await mention()

    title.opacity = '0'

    await sleep(50)

    content.opacity = '0'

    await sleep(100)

    const thisComp = component.value

    component.value = null

    await shrink(whole)

    loading.value = true

    await sleep(Math.round(Math.random() * 200))

    comp(async (status, msg, styles) => {

      await sleep(Math.round(Math.random() * 200))

      loading.value = false
      title.opacity = '0'

      await sleep(100)

      if( msg ) {

        title.opacity = '1'

        await sleep(50)

        content.opacity = '1'

        await sleep(100)

        const reset = await mention( msg, styles )

        await sleep(500)

        reset()

        await mention()

        await sleep(100)

        title.opacity = '0'

        await sleep(50)

        content.opacity = '0'

      }

      if ( status && !next ) {

        await sleep(1200)

        return await router.push('/user/dashboard')

      }

      component.value = status ? next : thisComp

      await expand(whole)

      title.opacity = '1'

      await sleep(50)

      content.opacity = '1'

      await sleep(100)

    })

  } else {

    await mention()

    component.value = null
    await shrink(whole)

    title.opacity = content.opacity = '0'

    component.value = next
    await sleep(500)

    title.opacity = content.opacity = '1'

    await expand(whole)
    await sleep(100)

  }

}

async function shrink(style) {
  style.width = '320px'
  style.height = '260px'

  await sleep(200)
}

async function expand(style) {
  style.width = '480px'
  style.height = '320px'
  await sleep(200)
}


onMounted(initial)
onUpdated(initial)
</script>

<script>
export default {
  name: "Register"
}
</script>

<style lang="scss" scoped>

.Register-Main {
  .Register-Content {
    &:before {
      z-index: -1;
      content: "";
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      opacity: .45;
      border-radius: 8px;
      background-color: var(--el-fill-color-lighter);
    }
    position: relative;
    display: flex;

    justify-content: center;
    align-items: center;

    width: 80%;
    height: 100%;

    padding: 4px 8px;
    border-radius: 8px;
  }
  .Register-Footer {
    &:before {
      z-index: -1;
      content: "";
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      opacity: .45;
      border-radius: 8px;
      background-color: var(--el-fill-color-lighter);
    }
    position: relative;
    display: flex;
    margin-top: 25px;

    justify-content: center;
    align-items: center;

    width: 80%;
    height: 32px;

    padding: 4px 8px;
    border-radius: 8px;
    text-indent: 15px;
    font-size: 15px;
    opacity: .75;
  }
}

.Register-Container {
  .Register-Background {
    //z-index: 1;
    position: absolute;

    left: 0;
    top: -50%;

    width: 100%;
    height: 100%;

    //animation: rotate 100s infinite linear;
  }
  .Register-Main {
    .title {
      &:after {
        z-index: -1;
        content: '';
        position: relative;
        padding: 0 2px;
        display: block;

        left: -4px;
        top: -4px;

        width: calc(100% + 4px);
        height: 6px;

        border-radius: 5px;
        backdrop-filter: saturate(90%) blur(5px);
        background: var(--el-color-primary-light-5);
        //opacity: .65;
      }
      font-size: 20px;
      font-weight: 600;
    }
    &:before {
      z-index: -1;
      content: '';
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      opacity: .85;
      backdrop-filter: saturate(180%) blur(50px);
      border-radius: 8px;
      background-color: var(--el-fill-color-light);
    }
    //z-index: 10;
    position: absolute;
    margin: 0;
    padding: 30px 0;
    display: flex;

    flex-direction: column;
    align-items: center;

    left: 0;
    top: 0;

    width: 100%;
    height: calc(100% - 60px);

    backdrop-filter: saturate(180%) blur(50px);
    background-color: unset;
  }
  position: absolute;
  //padding: 40px 30px;

  top: 40%;
  left: 50%;

  width: 420px;
  height: 300px;

  border-radius: 8px;
  transform: translateX(-50%);
  overflow: hidden;
}

.Register-Wrapper {
  &:after {
    z-index: -1;
    content: "";
    position: absolute;

    left: 50%;
    top: 100%;

    width: 480px;
    height: 480px;

    border: 30px solid var(--el-fill-color-lighter);
    opacity: .75;
    border-radius: 50%;
    transform: translate(-50%, -35%);
  }
  position: relative;
  padding: 10px 60px;

  left: 50%;
  top: 5%;

  width: 420px;
  height: 300px;

  transform: translateX(-50%);
  background-color: var(--el-color-primary);
  box-shadow: 0 0 8px 16px var(--el-color-primary-light-8);
  animation: CenterXFrameLoad .3s cubic-bezier(.25,.8,.25,1) forwards;
}
</style>
