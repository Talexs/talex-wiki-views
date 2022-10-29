<template>
  <el-config-provider :locale="locale">
    <div class="AppContainer" :class="{ 'height-unlimited': route?.meta?.heightUnlimited }">
      <div class="App-Header-Main transition-cubic" ref="headerDom">
        <HeadBar />
      </div>
      <div class="App-Main-Main">
        <router-view></router-view>
      </div>
      <div class="App-Footer-Main">

      </div>
    </div>

    <el-backtop :right="50" :bottom="50" />
  </el-config-provider>
</template>

<script setup>
import HeadBar from './components/common/layout/HeadBar.vue'
import { ref, onMounted, watch, onBeforeMount, computed, watchEffect } from 'vue'
import ws from '~/plugins/channel/connection'
import { useStore } from '~/plugins/store'
import { useRoute } from 'vue-router'
import router from '~/plugins/router'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = ref(zhCn)

const route = useRoute()
const store = useStore()

const headerDom = ref()
const content = ref('')

let lastY = -1

function scrollUp(e) {
    if( !headerDom.value?.style ) return
    const y = window.scrollY

    if( y - lastY < 0 ) {

        headerDom.value.style.transform = ``

    } else {

        if( y >= 50 ) {

            headerDom.value.style.transform = `translateY(-100%)`

        } else {

            headerDom.value.style.transform = ``

        }

    }

    lastY = y
    //
    // headerDom.value.style.transform = `translateY(-${y}px)`
}

onMounted(() => {
    const loader = document.getElementById('loader')
    if(loader) loader.style.display = 'none'

    window.addEventListener('scroll', scrollUp)

})

onBeforeMount(() => {
    window.removeEventListener('scroll', scrollUp)
})

watchEffect(() => {
    let access = false
    Array(store.local.permissions)?.flat().forEach(per => {
        if( access ) return
        access = per.name === "*"
    })

    store.local.admin = access
})

watch(() => store.local.loggedIn, () => {
    if( !store.local.loggedIn ) {
        store.local.admin = false
        router.push('/index')
    }
    // console.log("login status changed", store.local.loggedIn)
    // if( !store.local.loggedIn ) ws.disconnect()
    // else ws.connect()
})

</script>

<style lang="scss" scoped>
.AppContainer {
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100%;

  .App-Footer-Main {
    position: relative;

    //height: 120px;
    //background-color: var(--el-color-primary);

  }
  .App-Main-Main {
    position: absolute;
    padding: 0 8px;
    flex: 1;

    left: 0;
    top: 30px;

    width: 100%;
    height: calc(100% - 30px);

    background-color: var(--el-fill-color-lighter);
    //overflow: hidden;
  }
  .App-Header-Main {
    z-index: 100;
    position: sticky;

    top: 0;
    left: 0;

    width: 100%;
    height: 50px;

  }
}

.AppContainer.height-unlimited {
  .App-Main-Main {
    position: relative !important;
    margin-top: -10px !important;

    top: 0;

  }

}
</style>
