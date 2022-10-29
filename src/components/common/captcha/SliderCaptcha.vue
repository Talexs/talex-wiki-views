<!--<template>-->
<!--  <teleport to="body">-->
<!--    <div class="SliderCaptcha-Wrapper" :class="realOpen ? 'slider-open' : ''">-->

<!--      <div class="SliderCaptcha-Container">-->

<!--        <ProgressBar :success="status === states.SUCCESS" :error="status === states.ERROR" :warn="status === states.WARN" :loading="status === states.LOADING" style="transform: scaleY(1.5)"></ProgressBar>-->

<!--        <div :class="{ 'slider-shaver': status !== states.SUCCESS && status !== states.LOADING && status !== states.NORMAL }" class="SliderCaptcha-Major" :ref="captchaRefs.MajorRef">-->
<!--          <p class="mention">请拖动滑块完成拼图</p>-->
<!--          <div class="content">-->

<!--            <div :class="{ 'slider-success' : status === states.SUCCESS }" class="bg-img-div" :ref="captchaRefs.bgImg">-->
<!--              <img id="bg-img" :src="captchaOptions.backgroundImage" alt/>-->
<!--            </div>-->

<!--            <div class="slider-img-div" :ref="captchaRefs.sliderImg">-->
<!--              <img id="slider-img" :src="captchaOptions.sliderImage" alt/>-->
<!--            </div>-->

<!--            <div class="slider-mentioner" :ref="captchaRefs.mentioner">-->
<!--              {{ mentionTip }}-->
<!--            </div>-->

<!--          </div>-->

<!--          <div class="slider-move">-->
<!--            <div class="slider-move-track">-->
<!--              拖动滑块完成拼图-->
<!--            </div>-->
<!--            <div class="slider-move-btn" :ref="captchaRefs.sliderBtn" />-->
<!--          </div>-->

<!--        </div>-->

<!--      </div>-->

<!--    </div>-->
<!--  </teleport>-->
<!--</template>-->

<!--<script setup>-->
<!--import ProgressBar from './../bar/ProgressBar.vue'-->
<!--import { watch, watchEffect, onMounted, reactive, ref, toRefs } from 'vue'-->

<!--import { genCaptcha, validateCaptcha } from './../../../plugins/api/captchaReq.ts'-->
<!--import { sleep } from '../../../plugins/Common.ts'-->

<!--const emits = defineEmits(['success', 'onFailed', 'tryClose'])-->
<!--const props = defineProps({-->
<!--  open: {-->
<!--    type: Boolean,-->
<!--    required: true-->
<!--  }-->
<!--})-->

<!--const mentionTip = ref("")-->
<!--const realOpen = ref(false)-->

<!--const captchaRefs = toRefs({-->
<!--  MajorRef: ref(null),-->
<!--  bgImg: ref(null),-->
<!--  sliderImg: ref(null),-->
<!--  sliderBtn: ref(null),-->
<!--  mentioner: ref(null)-->
<!--})-->

<!--onMounted(async () => {-->

<!--  window.addEventListener('touchstart', handleDragStart)-->
<!--  window.addEventListener('touchmove', handleDragMove)-->
<!--  window.addEventListener('touchend', handleDragEnd)-->

<!--  window.addEventListener('mousedown', handleDragStart)-->
<!--  window.addEventListener('mousemove', handleDragMove)-->
<!--  window.addEventListener('mouseup', handleDragEnd)-->

<!--})-->

<!--const refreshCaptcha = ref(async () => {-->

<!--  status.value = states.LOADING-->

<!--  const el = captchaRefs.MajorRef.value;-->

<!--  if( !el ) return-->

<!--  el.style.transform = 'scale(.8)'-->

<!--  await sleep(250)-->

<!--  el.style.transform = 'scale(.8) translateX(-150%)'-->
<!--  el.style.opacity = '0'-->

<!--  await sleep(250)-->

<!--  el.style.transform = 'scale(.8) translateX(150%)'-->
<!--  el.style.opacity = '0'-->

<!--  await sleep(1250)-->

<!--  resetOptions()-->

<!--  const res = await genCaptcha()-->

<!--  if( !res ) {-->

<!--    await mentioner( `${res?.data || "未知错误!"}}`, states.ERROR )-->

<!--    await sleep(200)-->

<!--    realOpen.value = false-->

<!--    await sleep(250)-->

<!--    // do server error -> arg for true-->
<!--    emits("onFailed", true)-->

<!--    return;-->

<!--  }-->

<!--  let { data } = res;-->

<!--  captchaOptions.currentCaptchaId = data.id;-->

<!--  if( !data.info?.backgroundImage ) {-->

<!--    return refreshCaptcha.value()-->

<!--  }-->

<!--  captchaOptions.backgroundImage = data.info.backgroundImage;-->
<!--  captchaOptions.sliderImage = data.info.sliderImage-->
<!--  captchaRefs.sliderImg.value && (captchaRefs.sliderImg.value.style.transform = 'translate(0px, 0px)')-->
<!--  captchaRefs.sliderBtn && (captchaRefs.sliderBtn.value.style.transform = 'translate(0px, 0px)')-->

<!--  // 计算滑块 的大小 - 简单的比例-->

<!--  const { clientWidth, clientHeight } = captchaRefs.bgImg.value-->

<!--  // 比例计算-->
<!--  const scaleX = clientWidth / data.info.bgImageWidth-->
<!--  const scaleY = clientHeight / data.info.bgImageHeight-->

<!--  const style = captchaRefs.sliderImg.value.style-->

<!--  style.width = `${data.info.sliderImageWidth * scaleX}px`-->
<!--  style.height = `${data.info.sliderImageHeight * scaleY}px`-->

<!--  // done-->

<!--  el.style.transform = 'scale(.8) translateX(0%)'-->
<!--  el.style.opacity = '1'-->

<!--  await sleep(250)-->

<!--  el.style.transform = ''-->
<!--  status.value = states.NORMAL-->

<!--})-->

<!--const captchaOptions = reactive({-->
<!--  currentCaptchaId: '',-->
<!--  backgroundImage: '',-->
<!--  sliderImage: '',-->
<!--  isMouseDown: false,-->
<!--  originX: 0,-->
<!--  originY: 0,-->
<!--  startSlidingTime: -1,-->
<!--  entSlidingTime: -1,-->
<!--  trackList: [],-->
<!--  bgImageWidth: 0,-->
<!--  bgImageHeight: 0,-->
<!--  sliderImageWidth: 0,-->
<!--  sliderImageHeight: 0,-->
<!--})-->

<!--watchEffect(async () => {-->

<!--  realOpen.value = props.open-->

<!--  if( props.open && realOpen.value ) refreshCaptcha.value()-->

<!--})-->

<!--const validate = ref(async () => {-->

<!--  let data = {-->

<!--    bgImageWidth: captchaRefs.bgImg.value?.clientWidth,-->
<!--    bgImageHeight: captchaRefs.bgImg.value.clientHeight,-->
<!--    sliderImageWidth: captchaRefs.sliderImg.value.clientWidth,-->
<!--    sliderImageHeight: captchaRefs.sliderImg.value.clientHeight,-->
<!--    startSlidingTime: captchaOptions.startSlidingTime,-->
<!--    endSlidingTime: captchaOptions.endSlidingTime,-->
<!--    trackList: captchaOptions.trackList,-->

<!--  }-->

<!--  validateCaptcha(captchaOptions.currentCaptchaId, data).then(async res => {-->

<!--    if( res.status === 200 ) {-->

<!--      const time = data.endSlidingTime - data.startSlidingTime-->

<!--      await mentioner( `${ ( time / 1000 ).toFixed( 1 ) } 秒的速度超 ${ ( Math.random() * 100 ).toFixed( 1 ) } % 的用户`, states.SUCCESS )-->

<!--      emits("success", captchaOptions.currentCaptchaId)-->

<!--    } else {-->

<!--      await mentioner( `请正确拼合图像!`, states.WARN )-->

<!--      refreshCaptcha.value();-->

<!--    }-->

<!--  })-->

<!--})-->

<!--function resetOptions() {-->

<!--  captchaOptions.currentCaptchaId = ''-->
<!--  captchaOptions.backgroundImage = ''-->
<!--  captchaOptions.sliderImage = ''-->
<!--  captchaOptions.isMouseDown = false-->
<!--  captchaOptions.originX = 0-->
<!--  captchaOptions.originY = 0-->
<!--  captchaOptions.startSlidingTime = null-->
<!--  captchaOptions.entSlidingTime = null-->
<!--  captchaOptions.trackList = []-->
<!--  captchaOptions.bgImageWidth = 0-->
<!--  captchaOptions.bgImageHeight = 0-->
<!--  captchaOptions.sliderImageWidth = 0-->
<!--  captchaOptions.sliderImageHeight = 0-->

<!--}-->

<!--function handleDragStart(e) {-->

<!--  captchaOptions.startSlidingTime = new Date().getTime()-->

<!--  captchaOptions.originX = e.clientX || e.touches[0].clientX-->
<!--  captchaOptions.originY = e.clientY || e.touches[0].clientY-->

<!--  captchaOptions.isMouseDown = true;-->

<!--}-->

<!--function handleDragMove(e) {-->

<!--  if( !captchaOptions.isMouseDown ) return-->

<!--  const w = 206;-->

<!--  const currentX = e.clientX || e.touches[0].clientX-->
<!--  const currentY = e.clientY || e.touches[0].clientY-->

<!--  let { moveX, moveY } = { moveX: currentX - captchaOptions.originX, moveY: currentY - captchaOptions.originY }-->

<!--  captchaOptions.trackList.push({x: moveX, y: moveY, t: (new Date() - captchaOptions.startSlidingTime)})-->

<!--  moveX = Math.max(0, moveX) // if( moveX < 0 ) moveX = 0 // 限制左移-->
<!--  moveX = Math.min(w, moveX) // if( moveX > w ) moveX = w // 限制右移-->

<!--  const value = captchaRefs.sliderImg.value-->

<!--  if( !value ) return-->

<!--  value.style.transform = 'translate(' + moveX + 'px, 0px)';-->
<!--  captchaRefs.sliderBtn.value.style.transform = 'translate(' + moveX + 'px, 0px)';-->

<!--}-->

<!--function handleDragEnd(e) {-->

<!--  if( !captchaOptions.isMouseDown ) return-->

<!--  captchaOptions.isMouseDown = false;-->

<!--  const currentX = e.clientX || e.changedTouches[0].clientX-->

<!--  if( currentX === captchaOptions.originX ) return false-->

<!--  captchaOptions.endSlidingTime = new Date().getTime()-->

<!--  validate.value()-->

<!--}-->

<!--const statusColor = {-->
<!--  "SUCCESS": "var(&#45;&#45;el-color-success)",-->
<!--  "ERROR": "var(&#45;&#45;el-color-error)",-->
<!--  "WARN": "var(&#45;&#45;el-color-warning)"-->
<!--}-->
<!--const states = { NORMAL: "NORMAL", SUCCESS: "SUCCESS", ERROR: "ERROR", WARN: "WARN", LOADING: "LOADING" }-->
<!--const status = ref(states.NORMAL)-->

<!--async function mentioner(text, tStatus) {-->

<!--  const el = captchaRefs.mentioner.value-->

<!--  mentionTip.value = text-->

<!--  el.style.background = statusColor[tStatus];-->

<!--  await sleep(250)-->

<!--  el.style.transform = 'scaleX(.8) translateY(0) scaleY(1)'-->
<!--  status.value = tStatus-->

<!--  await sleep(50)-->

<!--  el.style.transform = 'scaleX(1) translateY(0) scaleY(1)'-->

<!--  await sleep(2250)-->

<!--  el.style.transform = 'scaleX(.8) translateY(0) scaleY(1)'-->

<!--  await sleep(50)-->

<!--  el.style.transform = 'scaleX(0) translateY(50%) scaleY(0)'-->

<!--  await sleep(250)-->

<!--}-->

<!--const tryClose = ref(() => {-->

<!--  emits("tryClose")-->

<!--})-->

<!--</script>-->

<!--<script>-->
<!--export default {-->
<!--  name: "SliderCaptcha",-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.slider-success::after {-->
<!--  content: "";-->
<!--  position: absolute;-->

<!--  left: -100px;-->
<!--  top: 0;-->

<!--  width: 30px;-->
<!--  height: 100%;-->

<!--  background: linear-gradient(to right bottom, rgba(200, 200, 200, .25), rgba(200, 200, 200, .75), rgba(200, 200, 200, .25));-->

<!--  transform: skewX(10deg);-->
<!--  animation: sliderScan .95s linear;-->

<!--}-->
<!--@keyframes sliderScan {-->
<!--  0% {-->
<!--    left: 300px;-->
<!--  }-->
<!--  100% {-->
<!--    left: -100px;-->
<!--  }-->
<!--}-->

<!--.slider-shaver {-->
<!--  animation: shaver .125s 3 .25s;-->
<!--}-->
<!--@keyframes shaver {-->

<!--  0% {-->
<!--    transform: translateX(0);-->
<!--  }-->

<!--  25% {-->
<!--    transform: translateX(-5px);-->
<!--  }-->

<!--  50% {-->
<!--    transform: translateX(0);-->
<!--  }-->

<!--  75% {-->
<!--    transform: translateX(5px);-->
<!--  }-->

<!--  100% {-->
<!--    transform: translateX(0);-->
<!--  }-->
<!--}-->

<!--.slider-mentioner {-->
<!--  position: absolute;-->

<!--  width: 100%;-->
<!--  height: 25px;-->

<!--  bottom: -1px;-->

<!--  line-height: 25px;-->
<!--  font-size: 13px;-->
<!--  text-align: center;-->

<!--  color: #fff;-->
<!--  transform: scaleX(0) translateY(50%) scaleY(0);-->
<!--  transition: .3s cubic-bezier(.25,.8,.25,1);-->
<!--}-->

<!--.SliderCaptcha-Major {-->
<!--  position: relative;-->

<!--  height: 100%;-->
<!--  transition: .3s cubic-bezier(.25,.8,.25,1);-->
<!--}-->

<!--.SliderCaptcha-Container .content {-->
<!--  position: relative;-->

<!--  margin-top: 10px;-->

<!--  width: 100%;-->
<!--  height: 159px;-->
<!--}-->

<!--.SliderCaptcha-Container {-->
<!--  .mention {-->

<!--    color: #000;-->
<!--    text-align: center;-->

<!--  }-->
<!--  z-index: 999;-->
<!--  position: absolute;-->

<!--  left: 50%;-->
<!--  top: 50%;-->

<!--  width: 278px;-->
<!--  height: 305px;-->

<!--  box-sizing: border-box;-->
<!--  padding: 9px;-->
<!--  border-radius: 0 0 4px 4px;-->
<!--  background-color: rgba(255, 255, 255, 0.9);-->

<!--  overflow: hidden;-->
<!--  transform: translate(-50%, -50%) translateY(-80%) scaleY(0) rotateY(180deg);-->
<!--  transition: .3s cubic-bezier(.25,.8,.25,1);-->
<!--}-->

<!--.SliderCaptcha-Wrapper {-->
<!--  &:after {-->
<!--    content: "";-->
<!--    position: absolute;-->

<!--    top: 0;-->
<!--    left: 0;-->

<!--    width: 100%;-->
<!--    height: 100%;-->

<!--    background-color: #212121;-->
<!--    opacity: .65;-->
<!--  }-->
<!--  z-index: 100;-->
<!--  position: absolute;-->

<!--  top: 0;-->
<!--  left: 0;-->

<!--  width: 100%;-->
<!--  height: 100%;-->

<!--  transition: all .5s;-->
<!--  opacity: 0;-->

<!--  pointer-events: none;-->
<!--}-->

<!--.slider-open {-->

<!--  .SliderCaptcha-Container {-->

<!--    transform: translate(-50%, -50%) translateY(0) scaleY(1) scale(2);-->

<!--  }-->

<!--  pointer-events: all;-->
<!--  opacity: 1;-->

<!--}-->

<!--.bg-img-div {-->
<!--  position: absolute;-->
<!--  width: 100%;-->
<!--  height: 100%;-->

<!--  transform: translate(0px, 0px);-->
<!--  overflow: hidden;-->
<!--}-->

<!--.slider-img-div {-->
<!--  position: absolute;-->
<!--  height: 100%;-->

<!--  transform: translate(0px, 0px);-->
<!--}-->

<!--.bg-img-div img {-->
<!--  width: 100%;-->
<!--}-->

<!--.slider-img-div img {-->
<!--  height: 100%;-->
<!--}-->

<!--.SliderCaptcha-Container .slider-move {-->
<!--  position: relative;-->
<!--  margin: 21px 0;-->

<!--  height: 60px;-->

<!--  width: 100%;-->

<!--}-->

<!--.SliderCaptcha-Container .bottom {-->
<!--  height: 19px;-->
<!--  width: 100%;-->
<!--}-->

<!--.refresh-btn, .close-btn, .slider-move-track, .slider-move-btn {-->
<!--  background: url(https://static.geetest.com/static/ant/sprite.1.2.4.png) no-repeat;-->
<!--}-->

<!--.refresh-btn, .close-btn {-->
<!--  display: inline-block;-->
<!--}-->

<!--.slider-move .slider-move-track {-->
<!--  line-height: 38px;-->
<!--  font-size: 14px;-->
<!--  text-align: center;-->
<!--  white-space: nowrap;-->
<!--  color: #88949d;-->
<!--  -moz-user-select: none;-->
<!--  -webkit-user-select: none;-->
<!--  user-select: none;-->
<!--}-->

<!--.SliderCaptcha-Container {-->
<!--  user-select: none;-->
<!--}-->

<!--.slider-move .slider-move-btn {-->
<!--  transform: translate(0px, 0px);-->
<!--  background-position: -5px 11.79625%;-->
<!--  position: absolute;-->
<!--  top: -12px;-->
<!--  left: 0;-->
<!--  width: 66px;-->
<!--  height: 66px;-->
<!--}-->

<!--.slider-move-btn:hover, .close-btn:hover, .refresh-btn:hover {-->
<!--  cursor: pointer-->
<!--}-->

<!--.bottom .close-btn {-->
<!--  width: 20px;-->
<!--  height: 20px;-->
<!--  background-position: 0 44.86874%;-->
<!--}-->

<!--.bottom .refresh-btn {-->
<!--  width: 20px;-->
<!--  height: 20px;-->
<!--  background-position: 0 81.38425%;-->
<!--}-->

<!--</style>-->
