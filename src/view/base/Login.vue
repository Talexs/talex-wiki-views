<template>
  <div class="Login-Wrapper">
    <div class="Login-Container">

      <div class="Login-Container-Header">

        <h1 style="animation: loadIn .15s .1s backwards">TalexWiki</h1>
        <p style="animation: loadIn .15s .2s backwards">写你所想，享你所写</p>

      </div>

      <div class="Login-Container-Main">

        <FlatInput ref="inputAccountDom" style="animation: loadIn .15s .3s backwards" placeholder="账号 / 邮箱 / UID" v-model="formModel.username">
          <template #suffix>
            <UserAnimate :parent-amo="3" />
          </template>
        </FlatInput>
        <FlatInput style="animation: loadIn .15s .4s backwards" placeholder="请输入密码" v-model="formModel.password" pass :max-pass-dot-num="29"></FlatInput>

        <FlatButton :loading-flag="loadings.btn" @click="tryRegister" plain style="animation: loadIn .15s .5s backwards">登 录</FlatButton>

      </div>

      <div class="Login-Container-Footer">

        <div style="animation: loadIn .15s .6s backwards" class="Login-Footer-Mention">

          <CheckBox title="记住密码" v-model="formModel.remember">

          </CheckBox>

          <span @click="goRegister">立即注册</span>

        </div>

      </div>

    </div>

    <SliderCaptcha  @success="onSuccess"  :open="sliderVisible" />
  </div>
</template>

<script setup>
import UserAnimate from './../../components/common/icon/UserAnimate.vue'
import FlatInput from './../../components/common/input/FlatInput.vue'
import FlatButton from './../../components/common/btn/FlatButton.vue'
import CheckBox from './../../components/common/checkbox/CheckBox.vue'
import SliderCaptcha from './../../components/common/slider/SliderCaptcha.vue'

import { forWikiDialogTip, forMentionTip, TipType, sleep, forWikiTip } from './../../plugins/Common.ts'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { req_tryLogin } from './../../plugins/api/baseReq.ts'

const sliderVisible = ref(false)

const formModel = reactive({
  username: '',
  password: '',
  remember: false
})

const loadings = reactive({
  btn: false
})

const router = useRouter()

const goRegister = ref(() => {

  router.push("/user/register")

})

const onSuccess = ref(async() => {

  loadings.btn = sliderVisible.value = false

  const res = await req_tryLogin({

    // tc_id :id,
    username :formModel.username,
    password :formModel.password

  })

  if ( res.code === "200"){

    await forWikiTip("登录成功!", TipType.SUCCESS);

    await router.push("/")

  } else {

    await forWikiTip("登录失败", TipType.ERROR);

  }

})
// forWikiDialogTip("啊，糟糕", "您没有浏览此页面的权限，是否申请？", [
//   {
//     content: "取消",
//     type: TipType.WARNING,
//     onClick: async () => {
//
//       await forMentionTip({ content: "取消失败！", time: 5000, type: TipType.ERROR, emphase: true })
//
//       return false
//
//     },
//     loading: async(func) => {
//
//       await sleep(3000)
//
//       func()
//
//     }
//   },
//   {
//     content: "确定",
//     type: TipType.INFO,
//     onClick: async () => {
//
//       await forMentionTip({ content: "无浏览权限！", time: 5000, type: TipType.WARNING, emphase: true })
//
//       await forWikiTip("正在申请权限，请稍后...", 5000, TipType.INFO, true)
//
//       await forWikiTip("正在申请权限，请稍后...", 5000, TipType.WARNING, false)
//
//       await forWikiTip("正在申请权限，请稍后...", 5000, TipType.ERROR, true)
//
//       await sleep(5000)
//
//       await forWikiTip("您已获得浏览器权限！", 5000, TipType.SUCCESS)
//
//       await forMentionTip({ content: "权限已批阅！", time: 5000, type: TipType.SUCCESS, emphase: true })
//
//       return true
//
//     }
//   }
// ])

const tryRegister = ref(async () => {

  loadings.btn = true

  await sleep(1200)

  if( !formModel.username || formModel.username.length < 3 || formModel.username.length > 32 ) {

    loadings.btn = false

    return await forMentionTip({ content: "请确保您的账号格式正确(3-32位)!", time: 2600, type: TipType.ERROR })

  }

  if( !formModel.password || formModel.password.length < 3 || formModel.password.length > 32 ) {

    loadings.btn = false

    return await forMentionTip({ content: "请确保您的密码格式正确(3-32位)!", time: 2600, type: TipType.ERROR })

  }

  sliderVisible.value = true

   // await forMentionTip({ content: "确保你是一个自然人!", time: 1800, type: TipType.INFO })

  await onSuccess.value()

})

</script>

<script>
export default {
  name: "Login"
}
</script>

<style lang="scss" scoped>
.Login-Container-Header {
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

.Login-Container-Main {
  position: relative;
  padding-bottom: 20px;
  width: 80%;
}

.Login-Container-Footer {
  .Login-Footer-Mention {
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

.Login-Container {
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
  height: 350px;

  border-radius: 8px;
  backdrop-filter: contrast(120%) saturate(180%) blur(10px);
  transform: translate(-50%, -60%);
  animation: loadIn-Trans .25s;
}

.Login-Wrapper {
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
