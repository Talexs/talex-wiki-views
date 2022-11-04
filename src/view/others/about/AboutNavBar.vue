<template>
  <div class="AboutNavBar-Wrapper LayoutCenter-Frame">
    <div class="AboutNavBar-Container">
      <TFSelector router-mode vertical>
        <TFSelectorItem to="/about/protocol" vertical title="关于政策"></TFSelectorItem>
        <TFSelectorItem to="/about/open_source" vertical title="开源协议"></TFSelectorItem>
        <TFSelectorItem to="/about/quote" vertical title="引用信息"></TFSelectorItem>
      </TFSelector>
    </div>
    <div class="NavBar-Main">
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script setup>
import TFSelector from '@components/common/selector/TFSelector.vue'
import TFSelectorItem from '@components/common/selector/TFSelectorItem.vue'
import { useStore } from '~/plugins/store/index.ts'

const store = useStore()

</script>

<script>
export default {
  name: "AboutNavBar"
}
</script>

<style lang="scss">
.AboutNavBar-Wrapper .LayoutSub-Frame {
  border-radius: 2px;
}
</style>

<style lang="scss" scoped>
.AboutNavBar-Wrapper {
  position: relative;
  //padding-bottom: 20px;
  display: flex;

  //margin: 20px 0 10px 0;

  height: 100%;
  //height: calc(100% - 50px);

  //background: var(--el-bg-color);
  background-color: unset;
  //overflow: hidden;
}

.NavBar-Main {
  width: 80%;
  min-height: 100%;
  flex: 1;
  flex-shrink: 0;
}

.AboutNavBar-Container {
  position: sticky;
  margin-right: 30px;
  padding: 10px 15px;

  top: 80px;

  width: 180px;
  height: 150px;

  //flex-shrink: 0;
  border-radius: 2px;
  background: var(--el-bg-color);
}

</style>
