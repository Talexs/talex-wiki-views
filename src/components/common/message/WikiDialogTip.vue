<template>
  <div :message="message" class="WikiDialogTip-Container"
       :class="{ 'info-tip': type === TipType.INFO,
        'warn-tip': type === TipType.WARNING,
        'error-tip': type === TipType.ERROR,
        'success-tip': type === TipType.SUCCESS, 'loading-tip': loading }">
    <h1>{{ title }}</h1>
    <div class="WikiDialogTip-Loading-Wrapper">
      <Loading v-if="loading" />
    </div>
    <div class="WikiDialogTip-Btn">
      <span>确定</span>
    </div>
  </div>
</template>

<script setup>
import Loading from './../icon/LoadingIcon.vue'
import { defineProps, onMounted } from 'vue'
import { sleep, TipType } from './../../../plugins/Common.ts'

const props = defineProps({
  message: String, stay: Number, close: Function,
  type: TipType, loading: Boolean, title: String
})

onMounted(async () => {

  if( props.stay <= 0 ) return

  await sleep(props.stay)

  props.close()

})

</script>

<script>
export default {
  name: "WikiDialogTip"
}
</script>

<style lang="scss" scoped>

.WikiDialogTip-Container {

  .WikiDialogTip-Loading-Wrapper {
    position: relative;
    display: inline-block;

    top: -2px;
    left: 10px;

    width: 16px;
    height: 16px;

    transform: scale(.5);
    --bg-color: var(--theme-color);
  }
  h1 {
    position: absolute;
    margin: 0;

    left: 50%;
    top: 30px;

    width: max-content;
    height: 32px;
    line-height: 32px;

    font-size: 18px;
    font-weight: bold;
    transform: translate(-50%, 0);

  }
  .WikiDialogTip-Btn {
    position: absolute;
    padding: 8px 0;
    display: inline-block;

    bottom: 0;
    left: 5%;

    width: 90%;
    height: 28px;

    color: #284f90;

    border-top: 1px solid #e1dfdf;
    font-weight: 400;
    text-align: center;

  }
  &:before {
    z-index: 0;
    content: "";
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    border-radius: 4px;
    filter: invert(5%);
    backdrop-filter: contrast(200%) saturate(180%) blur(10px);
  }

  &:after {
    z-index: 10;
    content: attr(message);
    position: absolute;

    width: 60%;
    height: auto;

    top: 50%;
    left: 20%;

    line-height: 24px;
    text-align: center;

    transform: translate(0, -50%) translateY(-10px);

  }

  position: absolute;
  padding: 4px 40px 4px 6px;

  left: 50%;
  top: 50%;

  width: 320px;
  height: 180px;
  line-height: 30px;

  color: var(--theme-color, var(--el-text-color-primary));

  transform: translate(-50%, -50%);
  animation: enter .2s ease-in-out;

}

@keyframes enter {

  0% {
    transform: translate(-50%, -50%) scale(.35);
  }

  70% {
    transform: translate(-50%, -50%) scale(1.15);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
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

  //box-shadow: 0 0 4px 1px var(--theme-color) inset,
  //           0 0 8px 2px var(--theme-color);

}

</style>
