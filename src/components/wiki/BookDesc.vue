<template>
  <div class="BookDesc-Container">
    <p>{{ book?.title }}</p>
    <el-image :src="book?.image" />
    <span>{{ book?.desc }}</span>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

const props = defineProps({
  book: Object
})

</script>

<script>
export default {
  name: 'BookDesc',
}
</script>

<style lang="scss" scoped>
.BookDesc-Container {
  position: relative;
  padding: 10px 15px;

  top: 0;

  width: calc(100% - 30px);

  span {
    position: relative;
    top: 15px;

    line-height: 20px;
  }
  p {
    &:before {
      content: "";
      position: absolute;

      left: 0;
      top: 0;

      width: 5px;
      height: 100%;

      background-color: var(--el-color-primary);
    }
    position: relative;
    margin: 0;
    text-indent: 10px;

    font-size: 26px;
    font-weight: 600;
  }
  .el-image {
    position: absolute;

    right: 5%;
    top: 5%;

    width: 36px;
    height: 36px;

    //filter: drop-shadow(0 0 1px var(--el-border-color));
  }
  text-align: left;
}
</style>
