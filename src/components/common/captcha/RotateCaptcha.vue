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
  <div class="RotateCaptcha-Container">
    <div ref="wrapperDom" class="RotateCaptcha-Wrapper transition-cubic">
<!--      <div ref="bgDom" class="RotateCaptcha-Background transition-cubic">-->
      <h1>安全验证</h1>
      <div :class="{ loading }" style="transition-duration: 1.25s" class="RotateCaptcha-HoverWrapper transition-cubic">
        <div ref="hoverDom" class="RotateCaptcha-HoverBlock transition-cubic">

        </div>
      </div>
      <div class="RotateCaptcha-Controller">
        <el-slider :disabled="loading" @change="verifyAngle" :min="90" :max="270" v-model="angle" :show-tooltip="false" />
        <p>拖动滑块以使图片为正</p>
      </div>
<!--      </div>-->
    </div>

    <div @click="handleClick" class="RotateCaptcha-Displayer">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "RotateCaptcha"
}
</script>

<script setup>
import _axios, { get } from '~/plugins/api/axios.ts'
import { computed, onMounted, ref } from 'vue'
import { sleep } from '~/plugins/Common.ts'

const emits = defineEmits(['success'])
const props = defineProps(['beforeValidation'])

const wrapperDom = ref()
// const bgDom = ref()
const hoverDom = ref()

const captcha = ref()
const bgImg = ref()
const hoverImg = ref()

const loading = ref(false)
const angle = ref(0)
const angleRotate = computed(() => `${angle.value}deg`)

async function verifyAngle() {
  loading.value = true

  const res = await _axios.post( 'file/captcha/valid', {
    captcha: 360 - angle.value //+ 90
  }, {
    headers: {
      captcha: captcha.value.id
    }
  } )

  await sleep(400)

  loading.value = false

  await sleep(600)

  if( !res ) {

    const hoverEl = hoverDom.value
    const wrapperEl = hoverEl.parentNode

    const hoverStyle = hoverEl.style

    hoverStyle.boxShadow = '0 0 16px 4px var(--el-color-error-light-3)'

    await sleep(2600 - (angle.value * 10))

    while( angle.value > 90 ) {

      angle.value -= 5

      await sleep(10)

    }

    await sleep(200)

    hoverStyle.boxShadow = ''

    const style = wrapperEl.style

    style.transform = 'scale(0)'

    await render()

    style.transform = 'scale(1)'

    return

  }

  await sleep(200)

  await success()

  await sleep(200)

  emits('success', res)

}

async function handleClick() {
  props.beforeValidation(async () => {
    const style = wrapperDom.value.style

    style.transform = 'translate(-50%, -60%) scale(1)'

    await sleep(100)

    style.transform = 'translate(-50%, -60%) scale(1) translateY(-13.5%)'

    await render()
  })
}

async function success() {
  const hoverStyle = hoverDom.value.style

  hoverStyle.boxShadow = '0 0 16px 4px var(--el-color-primary-light-3)'

  await sleep(1200)

  hoverStyle.borderRadius = '8px'

  const hoverWrapperStyle = hoverDom.value.parentNode.style

  // await sleep(100)

  hoverWrapperStyle.transform = 'scale(.75)'

  await sleep(1200)

  const rotate = Math.abs(angle.value - 90) + +angleRotate.value.replace('deg', '')

  // debugger

  hoverWrapperStyle.transform = 'scale(.75) rotate(' + rotate + 'deg) scale(0)'

  await sleep(600)

  const style = wrapperDom.value.style

  style.transform = 'translate(-50%, -60%) scale(0)'

  // await sleep(100)

  // style.transform = 'translate(-50%, -60%) scale(0)'

  // await sleep(2200)

  // bgStyle.border = '1px solid transparent'

}

async function render() {

  const res = await get('/file/captcha/gen')

  captcha.value = res

  bgImg.value = `url('${buffer2Img(res.bg.data)}')`
  hoverImg.value = `url('${buffer2Img(res.image.data)}')`

}

function buffer2Img(buffer) {
  const bytes = new Uint8Array(buffer);
  let data = ""
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    data += String.fromCharCode(bytes[i]);
  }
  return "data:image/png;base64," + window.btoa(data);
}
</script>

<style lang="scss" scoped>
.RotateCaptcha-Wrapper {
  h1 {
    opacity: .85;
    text-align: center;
  }
  &:before {
    z-index: -1;
    content: "";
    position: absolute;

    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    opacity: .75;
    border-radius: 8px;
    background-color: var(--el-bg-color);
  }
  z-index: 2;
  position: absolute;

  left: 50%;

  width: 400px;
  height: 400px;

  //background-color: var(--el-bg-color);
  border-radius: 8px;
  backdrop-filter: saturate(180%) blur(16px);
  transform: translate(-50%, -60%) scale(0);
  transform-origin: bottom;
  //transition: all .25s;
}

.RotateCaptcha-Controller {
  p {
    margin: 5px;
    text-align: center;
    opacity: .75;
  }
  :deep(.el-slider) {
    --el-slider-main-bg-color: var(--el-color-primary);
    --el-slider-runway-bg-color: var(--el-border-color-light);
    --el-slider-stop-bg-color: var(--el-color-white);
    --el-slider-disabled-color: var(--el-text-color-placeholder);
    --el-slider-border-radius: 8px;
    --el-slider-height: 36px;
    --el-slider-button-size: 36px;
    --el-slider-button-wrapper-size: -18px;
    --el-slider-button-wrapper-offset: 0px;
  }
  position: relative;

  left: 14%;
  top: 60%;

  width: 72%;
}
.RotateCaptcha-HoverWrapper {
  &.loading {
    .RotateCaptcha-HoverBlock {
      animation: breathing 2.25s infinite;
    }
    animation: breathingScale 2.25s infinite;
  }
  position: absolute;

  left: 0;
  top: -5%;

  width: 100%;
  height: 100%;
}
@keyframes breathingScale {
  0%, 100% {
    transform: scale(1)
  }
  40%, 60% {
    transform: scale(.95)
  }
}
@keyframes breathing {
  0%, 100% {
    box-shadow: 0 0 12px 2px var(--el-color-primary-light-8);
  }
  40%, 60% {
    box-shadow: 0 0 16px 4px var(--el-color-primary-light-3);
  }
}
.RotateCaptcha-Displayer {
  z-index: 1;
}
.RotateCaptcha-Container {
  .RotateCaptcha-Background {
    position: absolute;

    left: 0;
    top: 0;

    width: 512px;
    height: 512px;

    //opacity: 0;
    border-radius: 8px;
    background-image: v-bind(bgImg);
    transform: scale(.8);
    transition-duration: 1.25s !important;
  }
  .RotateCaptcha-HoverBlock {
    position: relative;

    top: 50%;
    left: 50%;

    //width: 276px;
    //height: 276px;

    width: 182px;
    height: 182px;

    //transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0 0 12px 2px rgba(38, 38, 38, 0.1);
    filter: brightness(105%);
    //background-size: cover;
    background-position: center;
    transform: translate(-50%, -50%) /*scale(.6)*/ rotate(v-bind(angleRotate));
    //transition-duration: .5s !important;
    background-image: v-bind(hoverImg);
  }
  z-index: 100;
  position: relative;

  flex: 1;

  //background-color: blue;
}
</style>
