<template>
  <div class="AppContainer">
    <div class="App-Header-Main">
      <Header />
    </div>
    <div class="App-Main-Main">
      <router-view></router-view>
    </div>
    <div class="App-Footer-Main">
      <Loading />
    </div>
  </div>

</template>

<script setup lang="ts">
import Header from './components/common/layout/Header.vue'
import Loading from './components/common/icon/LoadingIcon.vue'
import {forWikiDialogTip, sleep, TipType} from './plugins/Common'

forWikiDialogTip("访问限制","您没有浏览此文档的权限，请联系作者授权！\n\n是否发送请求？", [
    {
        content: "确定",
        type: TipType.INFO,
        onClick: () => {
            return true
        }
    },
    {
        content: "取消",
        type: TipType.ERROR,
        onClick: () => {
            return true
        }
    }
])

</script>

<style lang="scss" scoped>
.AppContainer {
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background-color: var(--el-bg-color-page);
  .App-Footer-Main {
    position: relative;
    margin-top: 120px;

    height: 120px;

    background-color: blue;
  }
  .App-Main-Main {
    position: relative;
    flex: 1;

  }
  .App-Header-Main {
    z-index: 100;
    position: sticky;
    margin-bottom: 20px;

    top: 0;
    left: 0;

    width: 100%;
    height: 50px;


  }

  //background-color: var(--el-color-primary-dark-2);

}
</style>
