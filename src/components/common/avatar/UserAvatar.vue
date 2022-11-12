<template>
  <el-avatar class="UserAvatar-Container" size="small"
             :src="avatar"
  >
    <img
          alt=""  :src="defaultAvatar"
    />
  </el-avatar>
<!--  :src="avatar || defaultAvatar"-->
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import GlobalConfig from '~/config/GlobalConfig.js'
import defaultAvatar from '~/assets/static/avatar.png'
import { useStore } from '~/plugins/store/index.ts'

const store = useStore()
const props = defineProps(['id'])
const avatar = ref()

onMounted(async () => {
  avatar.value = `${GlobalConfig.hostName}/user/avatar/${props.id}`
  // console.log(store.local.user)
  if( store.local.loggedIn && props.id === store.local.user.id) {

    watch(() => store.local?.user?.avatar, () => {

      avatar.value = store.local.user?.avatar

    })

  }
  // const uav = await UserModel.getUserAvatar(props.id)
  //
  // console.log("avatar", uav)
  //
  // if( JSON.stringify(uav).length > 2 ) {
  //   avatar.value = uav
  // }
})
</script>

<script>
export default {
  name: "UserAvatar"
}
</script>

<style scoped>
.UserAvatar-Container {
  /*align-items: center;*/
}
</style>
