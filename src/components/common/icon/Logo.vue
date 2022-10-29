<template>
  <div class="Logo-Container font-rounded">
   <span>TalexWiki</span>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.Logo-Container {
  span {
    position: absolute;

    line-height: 50px;
    left: 15px;

    font-size: 16px;
    color: var(--el-text-color-regular);
    transition: all .05s;
  }
  &:before, &:after {
    content: "";
    position: absolute;

    left: 0;
    top: 50%;

    width: 15px;
    height: 15px;

    background: #60d0fe;
    border-radius: 22px / 14px;
    transform: translate(-50%, -50%);
    opacity: .8;
    filter: contrast(120%) saturate(180%);
  }
  &:after {
    border-radius: 22px / 19px;
    background: #2d46fe;
    opacity: .68;
    transform: translate(-50%, -50%) translate(-3px, 3px);
  }
  z-index: 99;
  position: relative;
  //padding: 4% 0;
  display: flex;

  top: 0;
  left: 0;

  height: 50px;

  font-size: 22px;
  color: #fffffe;
  //background-color: #3a78f2;
  transition: all .05s linear;

}

</style>
