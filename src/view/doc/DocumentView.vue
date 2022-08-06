<template>
  <div class="Document-Container">
    <!--    List -->
    <div class="Document-List">
      <ListBar />
    </div>

    <!--    Content -->
    <div class="Document-Main">
      <!--      上下两个层级 # 一个是内容 一个是评论之类的-->
      <Doc />
    </div>

    <!--    Outline -->
    <div class="Document-Aside">
      <AsideBar />
    </div>
  </div>
</template>

<script setup>
import ListBar from './../../components/doc/ListBar.vue'
import AsideBar from './../../components/doc/AsideBar.vue'
import Doc from './../../components/doc/Doc.vue'

</script>

<script>
export default {
  name: "DocumentView",
};
</script>

<style lang="scss" scoped>
.Document-Container {
  position: relative;
  display: flex;
  flex-direction: row;

  width: 80%;
  height: 100%;

  left: 10%;

  background-color: var(--el-bg-color-page);

  .Document-List {
    position: relative;

    width: 300px;
    height: 1000px;

    border-radius: 0 4px 4px 0;
    transition: all 0.25s;
  }
  .Document-Main {
    position: relative;
    margin: 0 30px;
    flex: 1;

    border-radius: 4px;
    transition: all 0.25s;
  }
  .Document-Aside {
    position: relative;

    left: 0;

    width: 300px;
    height: 1000px;

    border-radius: 4px 0 0 4px;
    transition: all 0.25s;
  }
}

@media only screen and (max-width: 1280px) {
  .Document-Aside {
    margin-left: calc(-40% - 15px);

    opacity: 0;
    pointer-events: none;
    transform: translateX(50%);
  }
}
@media only screen and (max-width: 960px) {
  .Document-List {
    margin-right: calc(-40% - 15px) !important;

    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%);
  }

  .Document-Container {
    left: 0 !important;

    width: 100% !important;
  }
}
</style>
