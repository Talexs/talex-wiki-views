<template>
  <el-config-provider :locale="zhCn">
    <el-container class="AppContainer" :class="{ 'height-unlimited': route?.meta?.heightUnlimited }">
      <el-header class="App-Header-Main transition-cubic" ref="headerDom">
        <HeadBar />
      </el-header>
      <el-main id="AppMainLayer" class="App-Main-Main">
        <router-view></router-view>
        <div v-if="route?.meta?.showFooter" class="App-Footer-Main">
          <div v-wave class="footer-github">
            <img src="https://github.com/favicon.ico" alt="github" />
            <span>
              GitHub
            </span>
          </div>
          <div class="footer-logo">
            <Logo only-logo />
          </div>
          <div class="footer-record">
            <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备15031610号-16</a>
          </div>
        </div>
      </el-main>
    </el-container>

    <el-backtop :right="50" :bottom="50" />
  </el-config-provider>
</template>

<script setup>
import HeadBar from './components/common/layout/HeadBar.vue'
import { ref, onMounted, watch, onBeforeMount, watchEffect, onUpdated } from 'vue'
import ws from '~/plugins/channel/connection'
import { useStore } from '~/plugins/store'
import { useRoute } from 'vue-router'
import router from '~/plugins/router'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Logo from '~/components/common/icon/Logo.vue'

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

// function SetSafeA(whiteDomList) {
//   const aArr = document.getElementsByTagName('a')
//   Array.from(aArr).forEach(item=>{
//     item.onclick = () => {
//       let target = item.getAttribute('href')
//       if(/^\//.test(target)) {
//         // 相对本站链接
//         return true
//       }
//       const isSafe = undefined !== whiteDomList.find(item=>{
//         return target.indexOf(item) !== -1
//       })
//       if(!isSafe) {
//         window.open(`${window.location.host}/direct?target=${target}`, '_blank')
//         // window.open(`${safeLink}${target}`, '_blank')
//       }
//       return false
//     }
//   })
// }

let init = false

onMounted(initial)
onUpdated(initial)

function initial() {
  if( init ) return
  init = true

  const loader = document.getElementById('loader')
  if(loader) loader.style.display = 'none'//loader.parentNode.removeChild(loader) //loader.style.display = 'none'

  document.getElementById('AppMainLayer')?.addEventListener('scroll', scrollUp)

  document.body.addEventListener('click', directListener)

}

function directListener(event) {
  const target = event.target

  if( target.nodeName.toLocaleLowerCase() === 'a' ) {

    if( target.getAttribute("ignoreSafeCheck") === "true" ) return

    // 处理完 a 标签的内容，重新触发跳转，根据原来 a 标签页 target 来判断是否需要新窗口打开
    const url = target.getAttribute("href")

    if( url.startsWith(window.location.origin) || url.startsWith("/") ) return

    event.preventDefault()

    // if(/^\//.test(target)) {
    //   // 相对本站链接
    //   return true
    // }

    // const isSafe = undefined !== whiteDomList.find(item=>{
    //   return target.indexOf(item) !== -1
    // })

    // if(!isSafe) {
    //   window.open(`${window.location.host}/direct?target=${target}`, '_blank')
    // window.open(`${safeLink}${target}`, '_blank')
    // }

    window.open(`${window.location.origin}/direct?target=${url}`, '_blank')

  }
}

onBeforeMount(() => {
  document.body.removeEventListener('click', directListener)
  document.getElementById('AppMainLayer')?.removeEventListener('scroll', scrollUp)
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
    .footer-logo {
      position: relative;
      left: 30px;
      width: 32px;
      display: flex;
      justify-content: center;
    }
    .footer-record a {
      &:visited {
        color: var(--el-text-color-primary);
      }
      &:hover {
        opacity: .85;
      }
      text-decoration: none;
      font-size: 15px;
    }
    .footer-github {
      &:hover {
        opacity: .85;
      }
      user-select: none;
      display: flex;
      align-items: center;
      img {
        width: 24px;
      }
      span {
        text-indent: 10px;
      }

      cursor: pointer;
      padding: 6px 12px;
      background-color: var(--el-fill-color-light);
      border-radius: 10px;
    }
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;

    top: 80%;

    width: 100%;
    height: 72px;

    border-top: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    background-color: var(--el-fill-color-lighter);

    //transform: translateY(100%);
  }
  .App-Main-Main {
    position: absolute;
    //padding: 0 8px;
    flex: 1;

    left: 0;
    top: 50px;

    width: 100%;
    height: calc(100% - 50px);

    --el-main-padding: 0;
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

    --el-header-padding: 0;
  }
}

.AppContainer.height-unlimited {
  .App-Main-Main {
    position: relative !important;
    margin-top: -10px !important;

    top: 0;

    overflow: unset !important;
  }

}
</style>
