<template >
  <div class="FlatButton-Wrapper" @click="handleClick" @keyup.enter="handleClick">
  
    <div class="FlatButton-Container" :class="{'loading-tip': loadingFlag}">
      <div class="FlatButton-Loading">
        <Loading />
      </div>
      <div class="FlatButton-Text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '../icon/LoadingIcon.vue';
import { ref, defineEmits, defineProps } from 'vue'

const emits = defineEmits([ 'click' ])
const props = defineProps({ loadingFlag: Boolean })


const handleClick = ref((e) => {
  emits('click', e)
})
</script>

<style lang="scss" scoped>
.FlatButton-Wrapper {
    
  position: relative;

  width: 200px;
  height: 32px;

  margin: 16px 0;

  font-size: 14px;
  color: #fff;
  border-radius: 2px;
  background-color: var(--el-color-primary);

  transition: all .25s;
  user-select: none;

  &:hover {
    cursor: pointer;

    opacity: .95;
    transform: scale(1.1, 1.05);
  }

  
}
.FlatButton-Container {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    .FlatButton-Text {

        display: inline-block;
        
    }

    .FlatButton-Loading {
        position: relative;
        display: inline-block;
        margin: -8px;

        top: -10px;
        left: 50%;

        width: 16px;
        height: 16px;
        
        transform: scale(0) translateX(-50%);
        opacity: 0;
        --bg-color: var(--theme-color);
        transition: all .25s;

    }
  }
.loading-tip {

  .FlatButton-Loading {

    opacity: 1;

    transform: scale(.5) translateX(-50%);

  }

  .FlatButton-Text {

    opacity: .25;

    transform: scale(.9);

  }

  pointer-events: none;

}
</style>