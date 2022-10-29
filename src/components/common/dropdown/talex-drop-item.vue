<template>
  <div v-wave class="Talex-DropItem" :class="{ divider, danger, multi, disabled, recommend, beta }" v-if="!multi">
    <div class="dropitem-icon" v-if="!divider">
      <slot name="icon"></slot>
    </div>
    <div class="dropitem-label" v-if="!divider">
      <slot name="label"></slot>
    </div>
  </div>
  <div class="Talex-DropItem" :class="{ divider, danger, multi }" v-else>
    <div class="dropitem-icon" v-if="!divider">
      <slot name="icon"></slot>
      <el-icon v-if="multi">
        <ArrowRight />
      </el-icon>
    </div>
    <div class="dropitem-label" v-if="!divider">
      <slot name="label"></slot>
    </div>
    <div class="dropitem-multiple transition-cubic" :class="{ left: multi === 'left' }">
      <slot name="multiple"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, nextTick, onMounted } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  divider: Boolean,
  danger: Boolean,
  recommend: Boolean,
  beta: Boolean,
  multi: {
    type: String,
    default: null
  },
  disabled: Boolean
})

</script>

<script>
export default {
  name: 'talex-drop-item',
}
</script>

<style lang="scss" scoped>
.Talex-DropItem {
  .dropitem-multiple {
    position: absolute;
    padding: 6px 4px;

    width: 100%;
    top: 0;

    min-height: 24px;
    height: auto;

    left: 100%;

    --border: 0 4px 4px 4px;
    //background-color: var(--el-fill-color-lighter);
    //opacity: .5;
    box-shadow: 0 0 1px rgba(0,0,0,.3),0 4px 14px rgba(0,0,0,.1);
    backdrop-filter: saturate(180%) contrast(200%) brightness(98%) blur(5px);
    border-radius: var(--border);
    transform: translate(-100px, -50%) scale(0);
  }
  .dropitem-multiple.left {
    left: calc(-100% - 12px);
    --border: 4px 0 4px 4px;
    transform: translate(100px, -50%) scale(0);
  }

  &:hover {
    color: var(--el-color-primary);
    & > .dropitem-multiple {
      transform: translateX(0) scale(1);
    }
  }
  .dropitem-label {
    line-height: 28px;
    font-size: 15px;
  }
  .dropitem-icon {
    position: relative;
    margin-right: 10px;

    top: 5px;

    :deep(span) {
      font-size: 13px;
    }
  }
  position: relative;
  padding: 2% 6%;
  display: flex;
  //justify-content: space-between;

  //width: calc(88% - 3px);
  height: 28px;

  color: var(--el-text-color-regular);
  backdrop-filter: saturate(180%) contrast(200%) brightness(98%) blur(5px);
  //background-color: rgba(249, 250, 251, 0.85);
  cursor: pointer;
  user-select: none;
  transition: .3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    opacity: .85;
    background-color: var(--el-fill-color);
    //filter: invert(5%);
  }
}

.Talex-DropItem.multi {
  justify-content: space-between;
  flex-direction: row-reverse;
  & > .dropitem-icon {
    margin-right: 0;
    opacity: .75;
  }
}

.Talex-DropItem.divider {
  padding: 0;
  margin: 3px 0;
  height: 1px;

  width: 100%;

  background-color: var(--el-fill-color);
  filter: invert(60%);
  opacity: .15;
  cursor: none;
}

.Talex-DropItem.danger {
  color: var(--el-color-danger);
}

.Talex-DropItem.recommend {
  color: var(--el-color-success);
}

.Talex-DropItem.beta {
  &:hover {
    &:before {
      transform: rotate(45deg) scale(1) translate(-1px, -5px);
    }
  }
  &:before {
    content: "Beta";
    position: absolute;

    left: calc(100% - 45px);
    top: 0px;

    width: 65px;
    height: 22px;

    color: var(--el-text-color-regular);
    font-weight: 600;
    text-indent: 5px;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    background-color: var(--el-color-warning);
    transform: rotate(45deg) scale(.9) translate(-1px, -5px);
    transition: all .25s;
  }
  opacity: .75;

  overflow: hidden;
}

.Talex-DropItem.disabled {
  opacity: .45;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
