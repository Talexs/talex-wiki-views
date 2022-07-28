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
  flex-direction: row;

  width: 80%;
  height: 100%;

  left: 10%;

  background-color: var(--el-bg-color-page);

  .Document-List {
    position: relative;

    left: -30px;

    width: 300px;
    height: 1000px;

    border-radius: 0 4px 4px 0;
    background-color: red;
  }
  .Document-Main {
    position: relative;
    flex: 1;

    border-radius: 4px;
    background-color: green;
  }
  .Document-Aside {
    position: relative;

    right: -30px;

    width: 300px;
    height: 1000px;

    border-radius: 4px 0 0 4px;
    background-color: pink;
  }
}

</style>
