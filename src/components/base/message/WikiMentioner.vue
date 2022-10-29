<template>
  <teleport to="body">
    <div ref="dom" class="WikiMentioner-Wrapper"
      :class="{ 'info-tip': nowStatus === 'info',
        'warn-tip': nowStatus === 'warn',
        'error-tip': nowStatus === 'error',
        'success-tip': nowStatus === 'success' }"
    >
<!--      <div class="WikiMentioner-Container">-->

<!--      </div>-->
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'

const { sleep } = window

const props = defineProps({
  list: Object, close: Function
})
const dom = ref(null)
const nowStatus = ref('')

onMounted(async () => {
  while (props.list[0]) {
    // eslint-disable-next-line no-await-in-loop,vue/no-mutating-props
    await mention(props.list.pop())
  }

  props.close()
})

async function mention(tip) {
  nowStatus.value = tip.type

  const el = dom.value
  const { style } = el

  await sleep(250)

  style.transform = 'translate(-50%, 0)'

  await sleep(400)

  style.setProperty('--radius', '4px')

  await sleep(350)

  for (const c of [...tip.content]) {
    el.innerText += c

    // eslint-disable-next-line no-await-in-loop
    await sleep(50)
  }

  await sleep(350)

  if (tip?.emphase) {
    style.boxShadow = '0 0 4px 2px var(--theme-color)'

    await sleep(350)
  }

  await sleep(tip.time)

  style.boxShadow = ''

  await sleep(150)

  while (el.innerText) {
    el.innerText = el.innerText.substring(0, el.innerText.length - 1)

    // eslint-disable-next-line no-await-in-loop
    await sleep(50)
  }

  await sleep(250)

  style.setProperty('--radius', '50%')

  await sleep(400)

  style.transform = 'translate(-50%, 0) translateY(100px) scale(0)'

  await sleep(500)
}

</script>

<script>
export default {
  name: 'WikiMentioner'
}
</script>

<style lang="scss" scoped>
.WikiMentioner-Wrapper {
  &:before {
    content: "";
    position: absolute;

    left: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    opacity: .45;
    filter: invert(5%);
    border-radius: var(--radius);
    background-color: var(--theme-color, var(--el-text-color-regular));
    box-shadow: 0 0 1px 2px var(--theme-color, var(--el-text-color-regular)) inset;
    transition: .3s cubic-bezier(.25,.8,.25,1);
  }
  position: absolute;
  padding: 4px 8px;
  display: flex;

  left: 50%;
  bottom: 80px;

  width: max-content;
  min-width: 24px;
  height: 32px;
  line-height: 34px;

  color: var(--theme-color, var(--el-text-color-regular));
  --radius: 50%;
  border-radius: var(--radius);
  backdrop-filter: saturate(200%) blur(10px);
  transform: translate(-50%, 0) translateY(100px) scale(0);
  transition: .3s cubic-bezier(.25,.8,.25,1);
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
</style>
