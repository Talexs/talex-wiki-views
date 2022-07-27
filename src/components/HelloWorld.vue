<script setup lang="ts">
import {ref} from 'vue'

import {forWikiTip, TipType} from '../plugins/Common'

defineProps<{ msg: string }>()

const count = ref(0)

const click = ref(() => {

    forWikiTip("这是错误信息!", 3000, TipType.ERROR);
    forWikiTip("这是对你的警告~", 3000, TipType.WARNING);
    forWikiTip("这是提示信息QWQ", 3000, TipType.INFO);
    forWikiTip("保存成功，在个人页面查看即可。", 3000, TipType.SUCCESS);
    forWikiTip("这是默认TIP", 3000, TipType.DEFAULT);

})

</script>

<template>
  <h1>{{ msg }}</h1>

  <div @click="click" class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
