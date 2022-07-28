<template>
  <div class="Header-Container">

  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
.Header-Container {
  position: relative;

  width: 100%;
  height: calc(100% - 1px);

  background-image: radial-gradient(transparent 1px,var(--el-bg-color) 1px);
  background-size: 4px 4px;
  //background-color: rgba(var(--el-bg-color), .75);
  backdrop-filter: saturate(50%) contrast(200%) blur(4px);
  border-bottom: 1px solid var(--el-border-color);

}
</style>
