<template>
  <div class="FlatInput-Container">

    <div class="FlatInput-Input-Container__inner">
      <input class="FlatInput-Input" type="text" v-model="content" />
    </div>

    <div class="FlatInput-Icon-Container">
      <div class="FlatInput-Icon">

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useModelWrapper } from './../../../plugins/Common'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({ value: String })

const content = useModelWrapper(props, emits)

</script>

<script>
export default {
  name: "FlatInput"
}
</script>

<style lang="scss" scoped>
.FlatInput-Input-Container__inner {
  .FlatInput-Input {
    position: absolute;
    padding: 2px 4px;

    width: calc(100% - 8px);
    height: calc(100% - 4px);

    font-size: 15px;
    outline: none;
    border: none;

  }
}

.FlatInput-Container {
  &:hover, &:active {

    opacity: 1;
    border: 2px solid var(--el-color-primary);

  }
  position: relative;
  display: inline-block;

  left: 50%;

  width: 200px;
  height: 28px;

  opacity: .25;
  border: 2px solid var(--el-color-primary);
  border-radius: 4px;
  background-color: green;
  transition: all .25s;
  overflow: hidden;
}
</style>
