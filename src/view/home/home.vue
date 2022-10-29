<template>
  <div style="height:100%;">
    <el-container>
      <el-aside :width="sidebarWidth" class="aside" :style="asideStyle">
        <sidebar :isCollapse="isCollapse" :is-phone="isPhone"></sidebar>
      </el-aside>
      <el-container>
        <el-header class="header">
<!--          <div class="left">-->
<!--&lt;!&ndash;            <div class="operate" ref="operate">&ndash;&gt;-->
<!--&lt;!&ndash;              <i class="iconfont icon-fold" :class="{ rotate: foldState }" @click="changeSlidebarState" />&ndash;&gt;-->
<!--&lt;!&ndash;              <nav-bar></nav-bar>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-collapse-transition> <reuse-tab ref="reuse"></reuse-tab> </el-collapse-transition>&ndash;&gt;-->
<!--          </div>-->
          <nav-bar></nav-bar>
        </el-header>
        <el-main ref="main">
          <menu-tab></menu-tab>
          <app-main ref="appMain"></app-main>
        </el-main>
        <back-top :right="50" :bottom="50" :fontSize="34"></back-top>
      </el-container>
      <div class="sidenav-mask" :class="{ show: isPhone && isCollapse }" @click="changeSlidebarState"></div>
    </el-container>
  </div>
</template>

<script>
import { NavBar, Sidebar, AppMain, MenuTab, BackTop } from '@/component/layout'

export default {
  components: {
    NavBar,
    Sidebar,
    AppMain,
    MenuTab,
    BackTop,
  }
}
</script>

<style lang="scss" scoped>
.aside {
  background: #3a78f2;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.gold-main {

  background: #f7f7f7 !important;

}

.header {
  position: relative;
  padding: 1%;
  //background: $header-background;
  //height: $header-height !important;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 6px 0px rgba(190, 204, 216, 0.4);
  border-bottom: 1px solid rgba(190, 204, 216, 0.4);

  .left {
    height: 100%;
    width: 100%;

    .operate {
      display: flex;
      align-items: center;
      background: $header-background;
      padding-left: 20px;
      height: 86px;

      .iconfont {
        font-size: 16px;
        font-weight: 500;
        color: $right-side-font-color;
        cursor: pointer;
        transform: rotate(0deg);
        transition: all 0.3s linear;
        margin-right: 10px;

        &:hover {
          color: #3963bc;
        }
      }

      .rotate {
        transform: rotate(180deg);
        transition: all 0.3s linear;
      }
    }
  }

  .right-info {
    display: flex;
    align-items: center;
  }
}

.el-main {
  overflow-y: auto;
  position: relative;
  padding: 0;
}

.backTop {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  right: 50px;
  bottom: 50px;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
  z-index: 99;
  background: #fff;

  .iconfont {
    font-size: 36px;
  }
}

.sidenav-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: none;
  cursor: pointer;

  &.show {
    display: block;
  }
}
</style>
