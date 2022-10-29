<template>
  <div class="LayoutSub-Frame">
    <div class="LayoutSub-Header">
      <p class="title force">编辑分组权限</p>
      <el-button @click="back">返回</el-button>
    </div>
    <el-row>
      <el-col :lg="16" :md="20" :sm="24" :xs="24">
        <group-permissions
                :id="$route.query.id"
                ref="groupPermissions"
                @updatePermissions="updatePermissions"
                @getCacheAuthIds="getCacheAuthIds"
                @updateAllPermissions="updateAllPermissions"
        >
        </group-permissions>
        <div style="padding-left:5px;margin-top: 10px;">
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import AdminModel from '~/plugins/model/admin/admin.js'
import GroupPermissions from './RolePermission.vue'

export default {
  components: {
    GroupPermissions,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    // originally data properties
    const permissions = ref([])
    const allPermissions = ref([])
    const cachePermissions = ref([])

    /**
     * 编辑后的最终权限
     */
    const updatePermissions = picked => {
      permissions.value = picked
    }

    /**
     * 全部权限
     */
    const updateAllPermissions = all => {
      allPermissions.value = all
    }

    /**
     * 页面打开时候，记录当前分组所拥有的全部权限
     */
    const getCacheAuthIds = ids => {
      cachePermissions.value = ids
    }

    /**
     * 确认修改
     */
    const confirmEdit = async () => {
      let addRes = 0
      let delRes = 0
      const groupId = parseInt(route.query.id, 10)
      // 判断是否更改了分组权限
      if (permissions.value.sort().toString() !== cachePermissions.value.sort().toString()) {
        const deletePermissions = cachePermissions.value
          .concat(permissions.value)
          .filter(v => !permissions.value.includes(v))
        const addPermissions = cachePermissions.value
          .concat(permissions.value)
          .filter(v => !cachePermissions.value.includes(v))

        if (addPermissions.length > 0) {
          addRes = await AdminModel.dispatchPermissions(groupId, addPermissions)
        }
        if (deletePermissions.length > 0) {
          delRes = await AdminModel.removePermissions(groupId, deletePermissions)
        }
        if (addRes.code < window.MAX_SUCCESS_CODE || delRes.code < window.MAX_SUCCESS_CODE) {
          ElMessage.success('权限修改成功')
        }
      }
    }

    /**
     * 返回
     */
    const back = () => {
      router.go(-1)
    }

    return {
      back,
      permissions,
      confirmEdit,
      allPermissions,
      getCacheAuthIds,
      cachePermissions,
      updatePermissions,
      updateAllPermissions,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
