<template >
  <a v-wave class="FlatHrefButton-Wrapper" :class="{ large, 'plain-btn': plain, 'loading': loadingFlag }" @click="handleClick" @keyup.enter="handleClick">
    <div class="FlatHrefButton-Loading">
      <Loading />
    </div>
    <div class="FlatHrefButton-Text">
      <slot></slot>
    </div>
  </a>
</template>

<script setup>
import Loading from '../icon/LoadingIcon.vue';
import { ref, defineEmits } from 'vue'

const emits = defineEmits([ 'click' ])
const props = defineProps({ large: Boolean, loadingFlag: Boolean, plain: Boolean })


const handleClick = ref((e) => {
  setTimeout(() => {

    emits('click', e)

  }, 500)

})
</script>

<style lang="scss" scoped>

.FlatHrefButton-Loading {
  position: absolute;

  transform: scale(0);
  transition: .3s cubic-bezier(.25,.8,.25,1);
}

.FlatHrefButton-Wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 28px;
  max-height: 28px;

  margin: 16px 0;

  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  background-color: var(--el-color-primary);

  text-decoration: none;
  transition: .3s cubic-bezier(.25,.8,.25,1);
  user-select: none;
  --bg-color: var(--el-bg-color-page);

  :deep(.el-icon) {
    position: relative;

    left: -5px;
    top: 2px;

    transition: all .25s;
  }

  &:hover {
    :deep(.el-icon) {
      left: 0px;
    }
    cursor: pointer;

    opacity: .9;
    //transform: scale(1.035, 1.025);
  }
}

.FlatHrefButton-Text {

  display: inline-block;

  transition: .3s cubic-bezier(.25,.8,.25,1);

}

.FlatHrefButton-Wrapper.loading {
  .FlatHrefButton-Loading {

    transform: scale(.5);

  }
  .FlatHrefButton-Text {

    opacity: .45;

  }


}

.plain-btn {

  padding: 2px;

  &:hover {

    border: 2px solid var(--el-color-primary);
    background-color: var(--el-color-primary);

    color: var(--el-bg-color-page);
    --bg-color: var(--el-bg-color-page)

  }

  width: calc(100% - 8px);
  height: calc(100% - 8px);

  --bg-color: var(--el-color-primary-light-3);
  color: var(--el-color-primary-light-3);
  border-radius: var(--border-radius, 8px);
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid var(--el-color-primary-light-3);
}

.FlatHrefButton-Wrapper.large {
  width: 144px;
  min-width: 144px;
  height: 44px;
  min-height: 44px;

  font-size: .825rem;
}
</style>
