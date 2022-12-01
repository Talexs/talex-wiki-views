<template>
  <div :message="msg" class="TalexTip-Container"
       :class="{ 'info-tip': _type === TipType.INFO, left,
        'warn-tip': _type === TipType.WARNING,
        'error-tip': _type === TipType.ERROR,
        'success-tip': _type === TipType.SUCCESS,
        'loading-tip': loading || _type === 'loading' }">
    {{ msg }}
    <div class="TalexTip-Icon-Wrapper">
      <Mention :mode="_type" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, toRef } from 'vue'
import Loading from '../icon/LoadingIcon.vue'
import { sleep, TipType } from '~/plugins/Common.ts'
import Mention from '~/components/common/icon/Mention.vue'

const props = defineProps({
  message: String | Object,
  stay: Number,
  close: Function,
  type: TipType,
  loading: Boolean,
  left: Boolean
})

// const mode = toRef(props, 'type')

const msg = computed(() => props.message.value || props.message)
const _type = computed(() => props.type.value || props.type)

onMounted(async () => {
  if (props.stay <= 0) return

  await sleep(props.stay)

  props.close()
})

</script>

<script>
export default {
  name: 'TalexTip'
}
</script>

<style lang="scss" scoped>

.TalexTip-Container {

  .TalexTip-Icon-Wrapper {
    position: relative;
    display: inline-block;

    top: -5px;
    left: -10px;

    width: 16px;
    height: 16px;

    transform: scale(.5);
    --bg-color: var(--theme-color);
  }
  &:before {
    z-index: 0;
    content: "";
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    border-radius: 8px;
    //background-color: var(--el-bg-color);
    filter: invert(5%);
    box-shadow: var(--el-box-shadow-light);
    backdrop-filter: contrast(200%) saturate(180%) blur(10px);
  }
  &:after {
    z-index: 10;
    content: attr(message);
    position: absolute;

    width: 100%;
    //height: 100%;

    top: 50%;
    left: 0;

    text-align: center;
    font-size: 18px;
    //color: var(--el-text-color-primary);
    transform: translate(-20px, -50%);
  }

  padding: 8px 20px 8px 6px;

  width: max-content;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  text-indent: 10px;

  color: var(--theme-color, var(--el-text-color-primary));
  transition: .5s

}

.TalexTip-Container.left {
  padding: 8px 6px 8px 20px;
  .TalexTip-Icon-Wrapper {
    left: calc(-100% + 10px);

    width: 16px;
    height: 16px;

    transform: scale(.5);
    --bg-color: var(--theme-color);
  }
  &:after {
    transform: translate(15px, -50%);
  }
}

.success-tip {

  --theme-color: #629168;

}

.info-tip {

  --theme-color: #284f90;

}

.warn-tip {

  --theme-color: #f0a732;

}

.error-tip {

  --theme-color: #d0493c;

}

.loading-tip {

  box-shadow: 0 0 4px 1px var(--theme-color) inset,
  0 0 8px 2px var(--theme-color);

}

</style>
