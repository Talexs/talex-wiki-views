<template>
  <div class="Doc-Container">

    <div class="Doc-Box-Container Doc-Content-Header">

    </div>

    <div class="Doc-Box-Container Doc-Content-Main">


    </div>

  </div>
</template>

<script>
export default {
  name: "Doc"
}
</script>

<style lang="scss" scoped>
.Doc-Container {
  .Doc-Box-Container {
    position: relative;
    margin-bottom: 20px;

    width: 100%;
    min-height: 90px;
    height: auto;

    border-radius: 3px;
    background-color: var(--el-bg-color);
  }
  position: relative;

  width: 100%;
  min-height: 100%;
  height: auto;
}
</style>
