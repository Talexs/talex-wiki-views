<template>
  <div class="test">
    你好，{{ name }}
    <button @click="func">
      你点了我 {{ number }} 次
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref("世界！")

const number = ref(0)

const func = ref(() => {

  number.value ++;

  console.log( number )

})

</script>

<script>
export default {
  name: "GuideRef"
}
</script>

<style scoped>

</style>
