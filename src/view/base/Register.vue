<template>
  <div class="Register-Wrapper">
    <div class="Register-Container">

      <div class="Register-Container-Header">

        <h1 style="animation: loadIn .15s .1s backwards">TalexWiki</h1>
        <p style="animation: loadIn .15s .2s backwards">写你所想，享你所写</p>

      </div>

      <div class="Register-Container-Main">

        <FlatInput ref="inputAccountDom" style="animation: loadIn .15s .3s backwards" placeholder="请输入邮箱" v-model="formModel.email">
          <template #suffix>
            <Email open ></Email>
          </template>
        </FlatInput>
        <FlatInput ref="inputAccountDom" style="animation: loadIn .15s .4s backwards" placeholder="请输入昵称" v-model="formModel.username">
          <template #suffix>
            <UserAnimate :parent-amo="3" />
          </template>
        </FlatInput>
        <FlatInput style="animation: loadIn .15s .5s backwards" placeholder="请输入密码" v-model="formModel.password" pass :max-pass-dot-num="29"></FlatInput>

        <FlatButton :loading-flag="loadings.btn" @click="tryRegister" plain style="animation: loadIn .15s .5s backwards">注 册</FlatButton>

      </div>

      <div class="Register-Container-Footer">

        <div class="Register-Footer-Mention" style="animation: loadIn .15s .6s backwards">

          <span @click="goLogin">立即登录</span>

        </div>

      </div>

    </div>

    <SliderCaptcha :open="sliderVisible" />
  </div>
</template>

<script setup>
import Email from './../../components/common/icon/Email.vue'
import UserAnimate from './../../components/common/icon/UserAnimate.vue'
import FlatInput from './../../components/common/input/FlatInput.vue'
import FlatButton from './../../components/common/btn/FlatButton.vue'
import SliderCaptcha from './../../components/common/slider/SliderCaptcha.vue'

import { forMentionTip, TipType, sleep } from './../../plugins/Common.ts'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const sliderVisible = ref(false)

const formModel = reactive({
  email: '',
  username: '',
  password: ''
})

const loadings = reactive({
  btn: false
})

const router = useRouter()

const goLogin = ref(() => {

  router.push("/user/login")

})

const tryRegister = ref(async () => {

  loadings.btn = true

  await sleep(1200)

  if( !formModel.email || formModel.email.length < 5 || formModel.email.length > 32 || formModel.email.indexOf('@') === -1 ) {

    loadings.btn = false

    return await forMentionTip({ content: "请确保您的邮箱格式正确(5-32位)!", time: 2600, type: TipType.ERROR })

  }

  if( !formModel.username || formModel.username.length < 3 || formModel.username.length > 32 ) {

    loadings.btn = false

    return await forMentionTip({ content: "请确保您的账号格式正确(3-32位)!", time: 2600, type: TipType.ERROR })

  }

  if( !formModel.password || formModel.password.length < 3 || formModel.password.length > 32 ) {

    loadings.btn = false

    return await forMentionTip({ content: "请确保您的密码格式正确(3-32位)!", time: 2600, type: TipType.ERROR })

  }

  sliderVisible.value = true

  await forMentionTip({ content: "请完成滑块验证以确保你是一个自然人!", time: 2200, type: TipType.INFO })

})

</script>

<script>
export default {
  name: "Register"
}
</script>

<style lang="scss" scoped>
.Register-Container-Header {
  h1:after {
    content: '';
    position: relative;
    padding: 0 2px;
    display: block;

    left: 0;
    top: -4px;

    width: 100%;
    height: 6px;

    border-radius: 5px;
    background: var(--el-color-primary);
    opacity: .65;
  }
  p {

    opacity: .65;

  }
  position: relative;

}

.Register-Container-Main {
  position: relative;
  padding-bottom: 20px;
  width: 80%;
}

.Register-Container-Footer {
  .Register-Footer-Mention {
    span {
      &:before {
        content: "";
        position: absolute;

        width: 48px;
        height: 1px;

        bottom: 2px;

        background-color: var(--el-text-color-regular);
        transform: translateX(-50px) scaleX(0);
        opacity: 0;
        transition: all .25s;
      }
      &:hover:before {

        transform: translateX(0);
        opacity: 1;

      }
      position: relative;

      width: 100%;
      height: 20px;
      line-height: 20px;

      text-align: right;
      cursor: pointer;
    }
    display: flex;
    padding-right: 2px;

    font-size: 12px;

  }
  position: relative;

  //bottom: -20%;

  width: 80%;
}

.Register-Container {
  z-index: 10;
  &:before {
    content: '';
    position: absolute;

    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    opacity: .75;
    //backdrop-filter: saturate(180%) blur(10px);
    border-radius: 8px;
    background-color: var(--el-bg-color-page);
  }
  position: absolute;
  display: flex;
  padding: 30px 20px;

  flex-direction: column;
  align-items: center;

  top: 50%;
  left: 50%;

  width: 380px;
  height: 400px;

  border-radius: 8px;
  backdrop-filter: contrast(120%) saturate(180%) blur(10px);
  transform: translate(-50%, -60%);
  animation: loadIn-Trans .25s;
}

.Register-Wrapper {
  &:before {
    content: "";
    position: absolute;

    top: 0;
    left: 50%;

    width: 120px;
    height: 100%;

    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    transform: scale(2) skewX(20deg);
  }
  &:after {
    z-index: 0;
    content: "";
    position: absolute;

    top: -10%;
    left: 50%;

    width: 400px;
    height: 100%;

    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    transform: scale(2) skewX(-70deg);
  }
  position: absolute;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: var(--el-bg-color);
  overflow: hidden;
}
</style>
