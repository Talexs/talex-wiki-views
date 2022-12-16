<template>
<!--  <div class="Login-Wrapper">-->
    <div class="Login-Container">

      <div class="Login-Container-Header">

        <h1 style="animation: loadIn .15s .1s backwards">TalexWiki</h1>
        <p style="animation: loadIn .15s .2s backwards">写你所想，享你所写</p>

      </div>

      <div class="Login-Container-Main">

        <el-form>
          <el-form-item>
            <FlatInput ref="inputAccountDom" style="animation: loadIn .15s .3s backwards" placeholder="账号" v-model="formModel.username">
              <template #suffix>
                <UserAnimate :parent-amo="3" />
              </template>
            </FlatInput>
          </el-form-item>
          <el-form-item>
            <FlatInput style="animation: loadIn .15s .4s backwards" placeholder="密码" v-model="formModel.password" pass :max-pass-dot-num="29"></FlatInput>
          </el-form-item>

          <el-form-item>
            <RotateCaptcha :before-validation="tryLogin" @success="_login">
              <FlatButton :loading-flag="loadings.btn" plain style="border-radius: 8px;margin: 0 0 auto;animation: loadIn .15s .5s backwards">登 录</FlatButton>
            </RotateCaptcha>
          </el-form-item>

        </el-form>

      </div>

      <div class="Login-Container-Footer">

        <div style="animation: loadIn .15s .6s backwards" class="Login-Footer-Mention">

          <router-link @click="emits('close')" to="/user/register">立即注册</router-link>

        </div>

      </div>

    </div>

<!--  </div>-->
</template>

<script setup>
import UserAnimate from './../../components/common/icon/UserAnimate.vue'
import FlatInput from './../../components/common/input/FlatInput.vue'
import FlatButton from './../../components/common/btn/FlatButton.vue'

import { sleep } from '~/plugins/Common.ts'
import { reactive, defineEmits } from 'vue'
import { userModel } from '~/plugins/model/base/user.ts'
import { useStore } from '~/plugins/store/index.ts'
import { MentionTip } from '~/plugins/addon/MentionerManager.ts'
import RotateCaptcha from '~/components/common/captcha/RotateCaptcha.vue'
import { useRouter } from 'vue-router'
import { TipType } from '~/plugins/addon/Tipper.ts'

const router = useRouter()
const emits = defineEmits(['success', 'close'])
const store = useStore()

const formModel = reactive({
  username: '',
  password: ''
})

const loadings = reactive({
  btn: false
})

async function goRegister() {

  // await forWikiDialogTip("注册暂未开放", "抱歉，由于维基系统正处于内测状态，暂不开放注册权限。", [
  //   {
  //     content: "申请",
  //     type: TipType.WARNING,
  //     async onClick() {
  //
  //       await sleep(5000)
  //
  //       await window.$tipper.mention(new MentionTip("抱歉，现在无法申请!", 3200, TipType.ERROR, true))
  //
  //       return false
  //
  //     },
  //     loading(stop) {
  //
  //       setTimeout(() => {
  //
  //         stop()
  //
  //       }, 4000)
  //
  //     }
  //   },
  //   {
  //     content: "了解",
  //     type: TipType.INFO,
  //     async onClick() { return true }
  //   }
  // ])

  await router.push( '/register' )

}

async function _login(token) {

  try {

    const res = await userModel.getToken(token, formModel.username, formModel.password)

    store.local.user = res.user
    store.local.permissions = res.eller.permissions
    store.local.loggedIn = true

    loadings.btn = false

    await window.$tipper.mention(new MentionTip("登录成功!", {
      type: TipType.SUCCESS
    }))

    await sleep(1300)

    emits('success')

  } catch (e) {

    loadings.btn = false

  }

}

async function tryLogin(func) {

  loadings.btn = true

  await sleep(1200)

  if( !formModel.username || formModel.username.length < 3 || formModel.username.length > 32 ) {

    loadings.btn = false

    return await window.$tipper.mention({ content: "请确保您的账号格式正确(3-32位)!", time: 2600, type: TipType.ERROR })

  }

  if( !formModel.password || formModel.password.length < 3 || formModel.password.length > 32 ) {

    loadings.btn = false

    return await window.$tipper.mention({ content: "请确保您的密码格式正确(3-32位)!", time: 2600, type: TipType.ERROR })

  }

  // await window.$tipper.mention({ content: "确保你是一个自然人!", time: 1800, type: TipType.INFO })

  // await onSuccess.value()
  // await _login(token)

  func()

}

</script>

<script>
export default {
  name: "Login"
}
</script>

<style lang="scss" scoped>
.Login-Container-Header {
  h1 {
    margin-top: 10px;
  }
  h1:after {
    z-index: -1;
    content: '';
    position: relative;
    padding: 0 2px;
    display: block;

    left: 0;
    top: -4px;

    width: 100%;
    height: 6px;

    border-radius: 5px;
    backdrop-filter: saturate(90%) blur(5px);
    background: var(--el-color-primary-light-5);
    //opacity: .65;
  }
  p {

    opacity: .65;

  }
  position: relative;
  text-align: center;
}

.Login-Container-Main {
  position: relative;
  width: 80%;
}

.Login-Container-Footer {
  .Login-Footer-Mention {
    a {
      &:before {
        content: "";
        position: absolute;

        width: 48px;
        height: 1px;

        bottom: -50%;

        background-color: var(--el-text-color-regular);
        transform: translateX(-30px) scaleX(0);
        opacity: 0;
        transition: .3s cubic-bezier(.25,.8,.25,1);
      }
      &:hover:before {

        transform: translateX(0);
        opacity: 1;

      }
      position: relative;

      width: 100%;
      height: 20px;
      line-height: 40px;

      color: var(--el-text-color-primary);
      text-decoration: none;
      text-align: right;
      cursor: pointer;
    }
    display: flex;
    padding-right: 2px;

    font-size: 12px;

  }
  position: relative;

  bottom: 5%;

  width: 80%;
}

.Login-Container {
  z-index: 10;
  //&:before {
  //  content: '';
  //  position: absolute;
  //
  //  left: 0;
  //  top: 0;
  //
  //  width: 100%;
  //  height: 100%;
  //
  //  opacity: .75;
  //  //backdrop-filter: saturate(180%) blur(10px);
  //  border-radius: 8px;
  //  background-color: var(--el-bg-color-page);
  //}
  position: relative;
  display: flex;
  padding: 30px 20px;

  flex-direction: column;
  align-items: center;

  //top: 50%;
  //left: 50%;

  width: 380px;
  height: 350px;

  border-radius: 8px;
  //backdrop-filter: saturate(180%) blur(50px);
  //transform: translate(-50%, -50%);
  animation: loadIn .25s;
}

//.Login-Wrapper {
//  &:before {
//    content: "";
//    position: absolute;
//
//    top: 0;
//    left: 50%;
//
//    width: 120px;
//    height: 100%;
//
//    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
//    transform: scale(2) skewX(20deg);
//  }
//  &:after {
//    z-index: 0;
//    content: "";
//    position: absolute;
//
//    top: -10%;
//    left: 50%;
//
//    width: 400px;
//    height: 100%;
//
//    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
//    transform: scale(2) skewX(-70deg);
//  }
//  position: absolute;
//  //padding: 5%;
//
//  left: 0;
//  top: 0;
//
//  width: 100%;
//  height: 100%;
//
//  background-color: var(--el-bg-color);
//  overflow: hidden;
//}
</style>
