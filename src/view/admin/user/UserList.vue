<template>
  <div class="LayoutSub-Frame container">
    <div class="header">
      <p class="title force">用户列表</p>
      <!-- 分组选择下拉框 -->
      <el-select filterable v-model="groupId" placeholder="请选择分组" @change="handleChange" clearable>
        <el-option v-for="(group, index) in allGroups" :key="index" :label="group.name" :value="group.id"> </el-option>
      </el-select>
    </div>
    <el-empty v-if="!tableData || tableData.length < 1" description="当前分组没有用户" />
    <div v-else>
      <!-- 表格 -->
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="username" label="名称"></el-table-column>
        <el-table-column prop="roleNames" label="所属分组"></el-table-column>
        <el-table-column label="操作" :fixed="`right`" width="275">
          <template v-slot="scope">
<!--            <el-button plain size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>-->
            <el-button plain size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
                :total="totalNum"
                :background="true"
                :page-size="pageCount"
                v-if="refreshPagination"
                :current-page="currentPage"
                :layout="`prev, pager, next, jumper`"
                @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import AdminModel from '~/plugins/model/admin/admin.js'

import { useUserList, useFormData } from './use-user.js'

const info = ref(false)
const refreshPagination = ref(true) // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件

const { allGroups, loading, groupId, totalNum, tableData, pageCount, currentPage, getAdminUsers } = useUserList()
const {
  id,
  // resetForm,
  handleClick,
  handleChange,
  // handleInfoResult,
  handleCurrentChange,
  // handlePasswordResult,
} = useFormData(getAdminUsers, currentPage, loading, info)

const userInfo = reactive({
  email: '',
  username: '',
  password: '',
  groups: [],
  confirm_password: '',
})

/**
 * 删除管理员数据
 */
const handleDelete = id => {
  let res
  ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      loading.value = true
      res = await AdminModel.deleteOneUser(id)
    } catch (e) {
      loading.value = false
      console.error(e)
    }
    if (res.code < window.MAX_SUCCESS_CODE) {
      loading.value = false
      if (totalNum.value % pageCount.value === 1 && currentPage.value !== 1) {
        // 判断删除的是不是每一页的最后一条数据
        currentPage.value--
      }
      await getAdminUsers()
      ElMessage.success(`${res.message}`)
    } else {
      loading.value = false
      ElMessage.error(`${res.message}`)
    }
  })
}

</script>

<style lang="scss" scoped>
.container {

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}

.info {
  margin-left: -55px;
  margin-bottom: -30px;
}

.password {
  margin-top: 20px;
  margin-left: -55px;
  margin-bottom: -20px;
}
</style>
