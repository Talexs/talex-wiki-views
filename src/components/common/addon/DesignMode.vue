<template>
  <div @click="changeMode" v-loading="loading" :class="{ select }" class="DesignMode-Container transition-cubic" :title="`选择外观 ${title}`">
    <span class="header">
      <span class="header-item" v-for="i in 3" :key="i" />
    </span>
    <div class="gold-main">
      <p class="main-item"></p>
      <div class="main-box">
        <p class="main-title">
        </p>
      </div>
      <div class="main-aside-btns">
        <p class="main-aside-btn" v-for="i in 2" :key="i"></p>
      </div>
      <div class="main-aside">

      </div>
    </div>
    <span class="footer">
     <span class="mode-name">
       <span v-if="select" class="mode-select"></span>
       {{ title }}
     </span>
     <span v-if='vip' class="premium-normal">PRO</span>
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { forMentionTip, sleep, TipType } from '@plugins/Common.ts'
import { MentionTip } from '@plugins/addon/MentionerManager.ts'

const props = defineProps({
  theme: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  select: {
    type: Boolean,
    default: false
  },
  vip: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['click'])

const loading = ref(false)

async function changeMode() {
  if( props.select ) return

  loading.value = true

  if( props.vip ) {

    await sleep(2600)

    return await forMentionTip(new MentionTip("抱歉，此主题仅对 PRO 用户开放!", 3400, TipType.ERROR, true))

  }

  await sleep(300)

  emits('click')

  loading.value = false

}
</script>

<script>
export default {
  name: "DesignMode"
}
</script>

<style lang="scss" scoped>
$theme-color: v-bind(theme);

.DesignMode-Container {
  .main-aside {
    position: absolute;
    padding: 1px 0;

    right: 10px;
    top: 35px;

    height: 40%;
    width: 40px;

    border-radius: 4px;
    background-color: $theme-color;
    opacity: .3;
  }
  .main-aside-btns {
    .main-aside-btn {
      &:last-child {
        background-color: var(--danger, var(--el-color-danger));
      }
      position: relative;
      margin: 0;
      margin-left: 2px;

      top: 0;
      left: 0;

      width: 22px;
      height: 22px;
      opacity: .75;
      border-radius: 4px;
    }
    & > p {
      background-color: var(--success, var(--el-color-success));
    }
    position: absolute;
    display: flex;

    right: 10px;
    top: 10px;

    height: 22px;
    width: 44px;

  }
  .gold-main {
    position: absolute;
    display: block;

    left: 0;
    top: 28px;

    width: 100%;
    height: calc(100% - 60px);
    .main-box {
      .main-title {
        margin: 0;

        height: 20px;
        width: 100%;

        background-color: $theme-color;
        filter: invert(20%);
      }
      margin: 10px 20px;

      width: 60%;
      height: 40%;

      background: $theme-color;
      filter: invert(2%);
      opacity: .45;
      border-radius: 4px;
    }

    .main-item {
      position: relative;
      margin: 5px 20px;

      width: 40%;
      height: 22px;

      top: 4px;

      background: $theme-color;
      filter: invert(2%);
      opacity: .65;
      border-radius: 4px;
    }
  }
  .header {
    .header-item {
      position: relative;
      margin: 0 5px;

      width: 20%;
      height: 20px;

      top: 4px;

      background: $theme-color;
      filter: invert(10%);
      border-radius: 4px;
    }
    position: relative;
    display: flex;
    padding: 0 10px;

    top: 0;

    height: 28px;
    width: calc(100% - 20px);
    background: $theme-color;
    opacity: .85;
    border-radius: 8px 8px 0 0;
  }
  .footer {
    .mode-select {
      &:before {
        content: "";
        position: absolute;

        left: -5px;
        top: -5px;

        width: calc(100% + 6px);
        height: calc(100% + 6px);

        border: 2px solid var(--el-text-color-regular);
        border-radius: 50%;
      }
      position: absolute;

      left: 15px;
      top: 15px;

      width: 8px;
      height: 8px;

      background-color: var(--el-text-color-regular);
      border-radius: 50%;
      filter: invert(10%);
    }
    span {
      z-index: 1;
    }
    &:before {
      content: "";
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      opacity: .95;
      background-color: var(--el-fill-color);
      border-radius: 0 0 8px 8px;
    }
    position: absolute;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;

    height: 36px;
    line-height: 36px;
    width: calc(100% - 20px);

    color: $theme-color;

    bottom: 0;
  }
  position: relative;
  display: inline-flex;
  margin: 5px;

  width: 230px;
  height: 160px;

  border: 1px dashed var(--el-border-color);
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    border: 1px dashed $theme-color;//var(--el-color-primary-light-3);
  }
  user-select: none;
}

.DesignMode-Container.select {
  .footer {
    color: var(--el-text-color-regular);
    font-weight: 600;
    .mode-name {
      text-indent: 24px;
    }
  }
  border: 1px solid $theme-color;//var(--el-color-primary-light-3);
  cursor: not-allowed;
}
</style>
