<template >
  <div class="FlatButton-Wrapper" @click="handleClick" @keyup.enter="handleClick">
  
    <div class="FlatButton-Container">
      <div class="FlatButton-Loading">
        <Loading />
      </div>
      <!-- <div class="FlatButton-Text">
        <slot></slot>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import Loading from '../icon/LoadingIcon.vue';
import { ref, defineEmits } from 'vue'

const emits = defineEmits([ 'click' ])
const props = defineProps({ loadingFlag: Boolean })


const handleClick = ref((e) => {
  setTimeout(() => {

    emits('click', e)

  }, 500)

})
</script>

<style lang="scss" scoped>
.FlatButton-Wrapper {
    
  position: relative;

  width: 200px;
  height: 32px;

  margin: 16px 0;

  font-size: 12px;
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

  .FlatButton-Container {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    .FlatButton-Text {

      display: inline-block;

    }

    .FlatButton-Loading {

      transform: scale(.5);

    }
  }
}
</style>