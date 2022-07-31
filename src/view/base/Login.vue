<template>
  <div class="Login-Wrapper">
    <div class="Login-Container">
      
      <FlatInput class="Width-80" placeholder="请输入账号" v-model="formModel.username"></FlatInput>
      <FlatInput class="Width-80" placeholder="请输入密码" v-model="formModel.password" pass></FlatInput>
      
      <FlatButton class="Width-80" :loadingFlag="loadingFlag" @click="handleClick">登 录</FlatButton>

    </div>
    <div class="Login-Mentioner">
      
      <LogoNew></LogoNew>
    
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
.Login-Container {
  :deep(.FlatInput-Wrapper) {
    display: block;
    margin: 20px 0;
  } 

  position: absolute;
  display: flex;
  padding: 12px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  top: 50%;
  left: 50%;

  width: 420px;
  height: 480px;

  background-color: var(--el-bg-color-page);

  transform: translate(-50%, -50%);
}

.Login-Wrapper {
  position: absolute;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: var(--el-bg-color);

}
.Width-80{

  width: 80%;

}
</style>
