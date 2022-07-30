<template>
  <teleport to="body">
    <div class="SliderCaptcha-Wrapper" :class="realOpen ? 'slider-open' : ''">

      <div class="SliderCaptcha-Container">

        <ProgressBar></ProgressBar>

        <div class="SliderCaptcha-Major">
          <p class="mention">请拖动滑块完成拼图</p>
          <div class="content">

            <div class="bg-img-div" :ref="captchaRefs.bgImg">
              <img id="bg-img" :src="captchaOptions.backgroundImage" alt/>
            </div>

            <div class="slider-img-div" :ref="captchaRefs.sliderImg">
              <img id="slider-img" :src="captchaOptions.sliderImage" alt/>
            </div>

<!--            <div class="slider-mentioner" :ref="captchaRefs.mentioner">-->
<!--              {{ mentionTip }}-->
<!--            </div>-->

          </div>

          <div class="slider-move">
            <div class="slider-move-track">
              拖动滑块完成拼图
            </div>
            <div class="slider-move-btn" :ref="captchaRefs.sliderBtn" />
          </div>

        </div>

      </div>

    </div>
  </teleport>
</template>

<script setup>
import ProgressBar from './../bar/ProgressBar.vue'
import { watch, watchEffect, onMounted, reactive, ref, toRefs } from 'vue'

import { genCaptcha, validateCaptcha } from './../../../plugins/api/captchaReq.ts'

const emits = defineEmits(['onSuccess', 'onFailed', 'tryClose'])
const props = defineProps({
  open: {
    type: Boolean,
    required: true
  }
})

const realOpen = ref(false)

watchEffect(async () => {

  realOpen.value = props.open

  // if( props.open && realOpen.value ) refreshCaptcha.value()

})

const captchaOptions = reactive({
  currentCaptchaId: '',
  backgroundImage: '',
  sliderImage: '',
  isMouseDown: false,
  originX: 0,
  originY: 0,
  startSlidingTime: -1,
  entSlidingTime: -1,
  trackList: [],
  bgImageWidth: 0,
  bgImageHeight: 0,
  sliderImageWidth: 0,
  sliderImageHeight: 0,
})

const captchaRefs = toRefs({
  MajorRef: ref(null),
  bgImg: ref(null),
  sliderImg: ref(null),
  sliderBtn: ref(null),
  mentioner: ref(null)
})

onMounted(async () => {

  await refreshCaptcha.value()

})

const refreshCaptcha = ref(async () => {

  const { data: res } = await genCaptcha()

  captchaOptions.currentCaptchaId = res.id

  captchaOptions.backgroundImage = res.info.backgroundImage
  captchaOptions.sliderImage = res.info.sliderImage

  console.log( res )

})

</script>

<script>
export default {
  name: "SliderCaptcha",
}
</script>

<style lang="scss" scoped>

.SliderCaptcha-Container {
  .mention {

    color: #000;
    text-align: center;

  }
  z-index: 999;
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%) translateY(-80%) scaleY(0) rotateY(180deg);
  width: 278px;
  height: 345px;

  box-sizing: border-box;
  padding: 9px;
  border-radius: 0 0 4px 4px;
  background-color: rgba(255, 255, 255, 0.9);

  overflow: hidden;
  transition: all .25s;
}

.SliderCaptcha-Wrapper {
  &:after {
    content: "";
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: #212121;
    opacity: .65;
  }
  z-index: 100;
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transition: all .5s;
  opacity: 1;

  pointer-events: none;
}

.slider-open {

  .SliderCaptcha-Container {

    transform: translate(-50%, -50%) translateY(0) scaleY(1);

  }

  pointer-events: all;
  opacity: 1;

}

.bg-img-div {
  position: absolute;
  width: 100%;
  height: 100%;

  transform: translate(0px, 0px);
}

.slider-img-div {
  position: absolute;
  height: 100%;

  transform: translate(0px, 0px);
}

.bg-img-div img {
  width: 100%;
}

.slider-img-div img {
  height: 100%;
}

.SliderCaptcha-Container .slider-move {
  height: 60px;
  width: 100%;
  margin: 21px 0;
  position: relative;
}

.SliderCaptcha-Container .bottom {
  height: 19px;
  width: 100%;
}

.refresh-btn, .close-btn, .slider-move-track, .slider-move-btn {
  background: url(https://static.geetest.com/static/ant/sprite.1.2.4.png) no-repeat;
}

.refresh-btn, .close-btn {
  display: inline-block;
}

.slider-move .slider-move-track {
  line-height: 38px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  color: #88949d;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.SliderCaptcha-Container {
  user-select: none;
}

.slider-move .slider-move-btn {
  transform: translate(0px, 0px);
  background-position: -5px 11.79625%;
  position: absolute;
  top: -12px;
  left: 0;
  width: 66px;
  height: 66px;
}

.slider-move-btn:hover, .close-btn:hover, .refresh-btn:hover {
  cursor: pointer
}

.bottom .close-btn {
  width: 20px;
  height: 20px;
  background-position: 0 44.86874%;
}

.bottom .refresh-btn {
  width: 20px;
  height: 20px;
  background-position: 0 81.38425%;
}

</style>
