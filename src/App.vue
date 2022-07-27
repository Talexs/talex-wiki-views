<template>
  <div class="AppContainer">
    <div class="App-Header-Main">
      <Header />
    </div>
    <div class="App-Main-Main">
      <Loading />
    </div>
    <div class="App-Footer-Main">

    </div>
  </div>

</template>

<script setup lang="ts">
import Header from './components/common/layout/Header.vue'
import Loading from './components/common/icon/LoadingIcon.vue'
import {forWikiTip, TipType} from './plugins/Common'

forWikiTip("您没有浏览此文档的权限，请联系作者授权！", 60000, TipType.ERROR)

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

    height: 120px;

    background-color: blue;
  }
  .App-Main-Main {
    position: relative;
    flex: 1;



    background-color: red;
  }
  .App-Header-Main {
    position: sticky;

    top: 0;
    left: 0;

    width: 100%;
    height: 50px;


  }

  //background-color: var(--el-color-primary-dark-2);

}
</style>
