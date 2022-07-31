<template>
  <div class="FlatInput-Wrapper">
    <div class="FlatInput-Container">

      <div @click="inputFocus"
           :class="{ 'mode-pass-focus': passFocus, 'mode-pass-view': !passEye }"
           v-if="pass" class="FlatInput-Mode-Pass">
        <div :style="`--delay: all .25s ${i * 10}ms`" v-for="i in Math.min(String(content).length, maxPassDotNum)" class="FlatInput-Mode-Pass__ball">
        </div>
        <div class="FlatInput-Mode-Pass__selector">

        </div>
      </div>

      <div class="FlatInput-Input-Container__inner" :class="{ 'mode-pass-focus': pass && passFocus }">
        <input :placeholder="placeholder" ref="inputRef" @blur="passFocus = false" @focus="passFocus = true" class="FlatInput-Input" type="text" v-model="content" />
      </div>

      <!--    // div: const emits = defineEmits(['click']);-->
      <div class="FlatInput-Icon-Container">
        <div v-if="pass" @click="passEye = !passEye" class="FlatInput-Suffix">
          <ViewEye :visible="passEye" />
        </div>
        <div v-else class="FlatInput-Suffix">
          <slot name="suffix"></slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ViewEye from './../icon/ViewEye.vue'

import { debounceRef, useModelWrapper } from './../../../plugins/Common'

const emits = defineEmits(['update:modelValue', 'click', 'jinitaimei'])
const props = defineProps({ modelValue: String, pass: Boolean, placeholder: String, maxPassDotNum: { type: Number, default: 18 } })

const content = useModelWrapper(props, emits)

const passFocus = ref(false)
const passEye = debounceRef(true, 300)

const inputRef = ref(null)

const inputFocus = ref(() => {

  inputRef.value?.focus()

})

</script>

<script>
export default {
  name: "FlatInput"
}
</script>

<style lang="scss" scoped>
.FlatInput-Mode-Pass {
  z-index: 100;
  .FlatInput-Mode-Pass__ball {
    position: relative;
    //display: inline-block;
    margin-right: 1px;

    left: 1px;
    top: 50%;

    height: 8px;
    width: 8px;

    background-color: #212121;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: var(--delay);
  }
  position: absolute;
  display: flex;
  padding: 2px 4px;

  left: 0;
  top: 0;

  max-width: calc(100% - 32px);
  height: calc(100% - 4px);
  font-size: 15px;
  background-color: var(--input-bg, var(--el-bg-color));
  transition: all .125s;
}

.FlatInput-Icon-Container {
  .FlatInput-Suffix {
    :deep(.el-icon) {
      position: relative;
      margin-left: 8px;

      top: 6px;
      right: 9px;

    }
    :deep(.ViewEye-Container) {

      margin-left: 7px;

      top: 4px;
      right: 7px;

    }
    position: relative;

    height: 100%;

    background-color: var(--input-bg, var(--el-bg-color));

  }
  position: relative;
  cursor: pointer;
}

.FlatInput-Input-Container__inner.mode-pass-focus {
  input::selection {

    color: rgba(0, 0, 0, 0);
    background-color: currentColor;

    opacity: 0;

  }
}

.FlatInput-Input-Container__inner {
  position: relative;

  flex: 1;

  .FlatInput-Input {
    position: relative;
    padding: 2px 4px;

    width: calc(100% - 8px);
    height: calc(100% - 4px);

    font-size: 15px;
    outline: none;
    border: none;
    transition: all .25s;
    &:empty {

      width: calc(100% - 11px);

      left: 3px;

      &:before {
        content: attr(placeholder);
        position: absolute;

        left: 0;
        top: 0;

        width: max-content;

        opacity: .75;

      }

    }
  }
}

@keyframes selectorShave {

  0% {

    transform: rotate(0) scaleY(0.25);

  }

  25%, 100% {

    transform: rotate(180deg) scaleY(1);

  }

}

.FlatInput-Mode-Pass__selector {
  z-index: 100;
  position: relative;

  left: 0px;
  top: 10%;

  width: 1px;
  height: 80%;

  opacity: 0;
  background-color: var(--el-color-primary);
  animation: selectorShave 1s linear infinite;
  transition: all .25s;
}

.FlatInput-Container {
  .mode-pass-focus {
    .FlatInput-Mode-Pass__selector {

      left: 1px;

      opacity: 1;
    }

  }
  .FlatInput-Mode-Pass.mode-pass-view {
    opacity: 0;
    transition: all .25s .3s;
  }
  .mode-pass-view {
    .FlatInput-Mode-Pass__ball {

      transform: translateY(-50%) scale(0);

    }
  }
  position: relative;
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;

}

.FlatInput-Wrapper {
  &:hover, &:active {

    .FlatInput-Container:before {

      opacity: 1;

    }

  }
  .FlatInput-Container:before {
    content: "";
    position: absolute;

    left: -2px;
    top: -2px;

    width: 100%;
    height: 100%;

    opacity: .25;
    border-radius: 4px;
    border: 2px solid var(--el-color-primary);
    transition: all .25s;
  }
  position: relative;
  display: inline-block;

  width: 200px;
  height: 28px;

  background-color: var(--input-bg, var(--el-bg-color));
  transition: all .25s;
}
</style>
