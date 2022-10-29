<template>
  <el-avatar size="small"
          :src="avatar || defaultAvatar"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import UserModel from '~/plugins/model/base/user.js'
import defaultAvatar from '~/assets/static/avatar.png'

const props = defineProps(['id'])
const avatar = ref()

onMounted(async () => {
  // const uav = await UserModel.getUserAvatar(props.id)
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

</style>
