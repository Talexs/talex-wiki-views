<template>
  <div class="Document-Container">

<!--    List -->
    <div class="Document-List">

    </div>

<!--    Content -->
    <div class="Document-Main">
      Hello~
      1 + 1 = 2
    </div>

<!--    Outline -->
    <div class="Document-Aside">


    </div>

  </div>
</template>

<script setup>

</script>

<script>
export default {
  name: "DocumentView"
}
</script>

<style lang="scss" scoped>
.Document-Container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--el-bg-color-page);

  .Document-List {
    position: relative;

    width: 300px;
    height: 400px;

    background-color: red;
  }
  .Document-Main {
    position: relative;
    flex: 1;
    background-color: green;
  }
  .Document-Aside {
    position: relative;

    width: 300px;
    height: 400px;

    background-color: pink;
  }
}

</style>
