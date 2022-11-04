<template >
  <div role="button" v-wave class="FlatButton-Wrapper" :class="{ large, 'plain-btn': plain, 'loading': loadingFlag }" @click="handleClick" @keyup.enter="handleClick">
    <div class="FlatButton-Loading">
      <Loading />
    </div>
    <div class="FlatButton-Text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlatButton"
}
</script>

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

.FlatButton-Loading {
  position: absolute;

  transform: scale(0);
  transition: .3s cubic-bezier(.25,.8,.25,1);
}

.FlatButton-Wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 28px;
  //max-height: 28px;

  margin: 16px 1rem auto;

  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  background-color: var(--el-color-primary);

  transition: .3s cubic-bezier(.25,.8,.25,1);
  user-select: none;
  --bg-color: var(--el-bg-color-page);

  &:hover {
    cursor: pointer;

    opacity: .95;
    transform: scale(1.035, 1.025);
  }
}

.FlatButton-Text {

  display: inline-block;

  transition: .3s cubic-bezier(.25,.8,.25,1);

}

.FlatButton-Wrapper.loading {
  .FlatButton-Loading {

    transform: scale(.5);

  }
  .FlatButton-Text {

    opacity: .45;

  }


}

.plain-btn {

  &:hover {

    border: 2px solid var(--el-color-primary);
    background-color: var(--el-color-primary);

    color: var(--el-bg-color-page);
    --bg-color: var(--el-bg-color-page)

  }

  width: calc(100% - 4px);
  height: calc(100% - 4px);

  --bg-color: var(--el-color-primary-light-3);
  color: var(--el-color-primary-light-3);
  border-radius: var(--border-radius, 2px);
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid var(--el-color-primary-light-3);
}

.FlatButton-Wrapper.large {
  width: 144px;
  min-width: 144px;
  height: 44px;
  min-height: 44px;

  font-size: .825rem;
}

.FlatButton-Wrapper.large.plain-btn {
  width: 140px;
  min-width: 140px;
  height: 40px;
  min-height: 40px;

  &:hover {
    transform: scale(1);
  }
}
</style>
