<template>
  <div class="app-sidebar">
    <logo :elMenuCollapse="elMenuCollapse" />
    <div style="margin-bottom:50px">
<!--      <search></search>-->
      <el-menu
        ref="menu"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        :collapse="elMenuCollapse"
        background-color="#3a78f2"
        text-color="rgba(196,201,210,1)"
        active-text-color="#141a29"
      >
        <menu-tree v-for="item in sidebarList" :key="item.path" :item="item"></menu-tree>
      </el-menu>
    </div>

    <BottomTip />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Logo from './logo'
import MenuTree from './menu-tree'
import BottomTip from './bottom-tip'

export default {
  components: { MenuTree, Logo, BottomTip },
  props: {
    isPhone: {
      type: Boolean,
      default: false,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    elMenuCollapse() {
      if (this.isPhone) {
        return false
      }
      return this.isCollapse
    },
    /**
     * 根据当前路由设置激活侧边栏
     */
    defaultActive() {
      const route = this.$route
      return route.path
    },
    ...mapGetters(['sidebarList']),
  },
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.app-sidebar {
  position: relative;

  height: 100%;

  background: #3a78f2;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>
