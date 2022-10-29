<template>
  <teleport to="body">
    <div class="DeviceMentioner">
      您的页面过小，暂不支持完整PC端操作。
    </div>
  </teleport>
  <div class="NavBar-Wrapper LayoutCenter-Frame" :class="{ 'height-fixed': !$route.meta?.heightUnlimited, 'width-larger': $route.meta?.largerWidth }">
    <div class="NavBar-Container">
      <TFSelector router-mode vertical>
        <TFSelectorItem to="/user/dashboard" vertical title="数据看板"></TFSelectorItem>
        <TFSelectorItem to="/user/wikis" vertical title="维基"></TFSelectorItem>
        <TFSelectorItem v-if="store.local.admin" to="/cms/users" vertical title="用户管理"></TFSelectorItem>
        <TFSelectorItem v-if="store.local.admin" to="/cms/eller" vertical title="权限管理"></TFSelectorItem>
<!--        <TFSelectorItem disabled to="/user/templates" vertical title="云模板"></TFSelectorItem>-->
        <TFSelectorItem to="/user/plans" vertical>
          <router-link to="/user/plans" class="label">
            <span class="premium-end">升级计划</span>
          </router-link>
        </TFSelectorItem>
<!--        <TFSelectorItem disabled to="/user/dashboard" vertical title="星标"></TFSelectorItem>-->
<!--        <TFSelectorItem disabled to="/user/messages" vertical title="提醒"></TFSelectorItem>-->
        <TFSelectorItem to="/user/design" vertical title="外观设计"></TFSelectorItem>
        <TFSelectorItem to="/user/security" vertical title="安全分析"></TFSelectorItem>
        <TFSelectorItem v-if="store.local.admin" to="/cms/logs" vertical title="操作日志"></TFSelectorItem>
        <TFSelectorItem to="/user/personal" vertical title="账户设置"></TFSelectorItem>
<!--        <TFSelectorItem disabled to="/user/ignores" vertical title="开发者设置"></TFSelectorItem>-->
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
import { useStore } from '../../../plugins/store/index.ts'
import { computed } from 'vue'

const store = useStore()

</script>

<script>
export default {
  name: "NavBar"
}
</script>

<style lang="scss" scoped>
.NavBar-Wrapper {
  &.height-fixed {
    height: calc(100% - 50px);
  }
  position: relative;
  //padding-bottom: 20px;
  display: flex;

  margin: 20px 0 10px 0;

  min-height: calc(100% - 50px);

  //background: var(--el-bg-color);
  background-color: unset;
  overflow: hidden;
}

.NavBar-Main {
  width: 80%;
  min-height: 100%;
  //flex: 1;
  flex-shrink: 0;
}

.NavBar-Container {
  margin-right: 30px;
  padding: 10px 15px;
  min-width: 180px;

  flex-shrink: 0;
  border-radius: 8px;
  background: var(--el-bg-color);
}

.NavBar-Wrapper.width-larger {
  .NavBar-Main {
    width: calc(80% + 50px);
    min-height: 100%;
    //flex: 1;
    flex-shrink: 0;
  }
  left: 5% !important;
  width: 90% !important;
}

.DeviceMentioner {
  z-index: 1000;
  position: absolute;
  display: flex;

  width: 100%;
  height: 100%;

  left: 0;
  top: 0;

  opacity: 0;
  pointer-events: none;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-regular);
  background-color: var(--el-fill-color-lighter);
  backdrop-filter: blur(5px);
  transition: all .25s;
}

@media (max-width: 900px) {
  .DeviceMentioner {

    opacity: .75;
    pointer-events: all;

  }
}
</style>
