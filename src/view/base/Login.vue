<template>
  <div class="Login-Wrapper">
    <div class="Login-Container">

      <div class="Login-Container-Header">

        <h1 style="animation: loadIn .15s .1s backwards">TalexWiki</h1>
        <p style="animation: loadIn .15s .2s backwards">写你所想，享你所写</p>

      </div>

      <div class="Login-Container-Main">

        <FlatInput style="animation: loadIn .15s .3s backwards" placeholder="请输入账号" v-model="formModel.username"></FlatInput>
        <FlatInput style="animation: loadIn .15s .4s backwards" placeholder="请输入密码" v-model="formModel.password" pass :max-pass-dot-num="32"></FlatInput>

        <FlatButton plain style="animation: loadIn .15s .5s backwards">登录</FlatButton>

      </div>

      <div class="Login-Container-Footer">

        <div class="Login-Footer-Mention">

<!--          TODO 做一个选择框-->

        </div>

        <span>忘记密码 / 立即注册</span>

      </div>

    </div>
  </div>
</template>

<script setup>
import LogoNew from './../../components/common/icon/LogoNew.vue'
import FlatInput from './../../components/common/input/FlatInput.vue'
import FlatButton from './../../components/common/btn/FlatButton.vue'
import { forWikiDialogTip } from './../../plugins/Common.ts'
import { ref, reactive } from 'vue'

const formModel = reactive({
  username: '',
  password: ''
})
const loadingFlag = ref(true)

const handleClick = ref((e) => {
  loadingFlag.value = true
  setTimeout(() => {

    loadingFlag.value = false

  }, 3000)
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

  top: 10%;

}

.Login-Container-Main {
  position: relative;

  top: 10%;

  width: 80%;
}

.Login-Container-Footer {
  position: relative;

  bottom: -35%;

  opacity: .55;
}

.Login-Container {
  z-index: 10;
  :deep(.FlatInput-Wrapper) {
    display: block;
    margin: 30px 0;

    width: 100%;
  }
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
  padding: 12px;

  flex-direction: column;
  //justify-content: center;
  align-items: center;

  top: 50%;
  left: 50%;

  width: 405px;
  height: 480px;

  backdrop-filter: saturate(180%) blur(10px);
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
