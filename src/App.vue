<template>
  <div class="AppContainer">
    <div class="App-Header-Main">
      <Header />
    </div>
    <div class="App-Main-Main">
      <router-view></router-view>
    </div>
    <div class="App-Footer-Main">

      <FlatInput v-model="content" pass>
        <template #suffix>
          <el-icon><Hide /></el-icon>
        </template>
      </FlatInput>

      <FlatInput v-model="content">
        <template #suffix>
          <el-icon><Hide /></el-icon>
        </template>
      </FlatInput>

      <FlatInput v-model="content">
      </FlatInput>

      <ViewEye />


    </div>
  </div>

</template>

<script setup lang="ts">
import { Hide } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'

import FlatInput from './components/common/input/FlatInput.vue'
import Header from './components/common/layout/Header.vue'
import Loading from './components/common/icon/LoadingIcon.vue'
import ViewEye from './components/common/icon/ViewEye.vue'
import { ref } from 'vue'

const content = ref('')

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
