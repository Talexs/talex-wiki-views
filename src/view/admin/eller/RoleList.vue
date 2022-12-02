<template>
  <!-- 列表页面 -->
  <div class="LayoutSub-Frame">
    <div class="LayoutSub-Header">
      <p class="title force">角色列表</p>

      <el-button class="rounder-btn primary" @click="$router.push('/cms/eller/create')" text plain>添加角色</el-button>
    </div>

    <el-table :data="tableData" v-loading="!tableData" @row-dblclick="rowDoubleClick">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="desc" label="描述">
        <template #default="scope">
          {{ scope.row.desc }}
          <el-popover v-if="scope.row.id !== 1" trigger="click" placement="top" :width="240">
            <el-input v-model="scope.row.desc" />
            <div style="text-align: right; margin-top: 10px">
              <el-button size="small" type="primary" @click="updateRoleInfo(scope.row)">修改</el-button>
            </div>
            <template #reference>
              <el-button class="rounder-btn" size="small" circle text round :icon="Edit" />
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button plain size="small" type="info" @click="goToGroupEditPage(scope.row.id)">权限</el-button>
          <el-popconfirm @confirm="deleteRoleInfo(scope.row.id)" title="确定要删除这个角色吗？">
            <template #reference>
              <el-button :disabled="scope.row.id === 1" plain size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import AdminModel from '~/plugins/model/admin/admin.js'
import { Edit } from '@element-plus/icons-vue'
import { TipType } from '~/plugins/addon/Tipper'
import { sleep } from '~/plugins/Common'

const router = useRouter()
const tableData = ref()

async function updateRoleInfo(row) {

  window.$tipper.tip( '正在更新角色信息...', {
    loading: async (func) => {

      await sleep(500)

      const res = await AdminModel.updateOneGroup(row.id, row.name, row.desc)

      let close

      if( res ) {

        close = func(" 用户信息更新成功!", TipType.SUCCESS)

        await fetchRender()

      } else close = func(" 用户信息更新失败!", TipType.ERROR)

      await sleep(2600)

      close()

    }
  } );

}

async function deleteRoleInfo(id) {

  const res = await AdminModel.deleteOneGroup(id)
  if( res ) {

    window.$tipper.tip( '用户角色删除成功!', {
      type: TipType.SUCCESS
    } );

    await fetchRender()

  }

}

const goToGroupEditPage = groupId => {
  router.push({ path: '/cms/eller/edit', query: { id: groupId } })
}

onMounted(fetchRender)
async function fetchRender() {
  tableData.value = (await AdminModel.getAllGroups()).rows
}
</script>

<style lang="scss" scoped>

</style>
