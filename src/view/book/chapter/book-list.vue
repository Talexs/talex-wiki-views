<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; 列表页面 &ndash;&gt;-->
<!--    <div class="container" v-if="!showEdit">-->
<!--      <div class="header">-->
<!--        <div class="title">维基列表</div>-->
<!--      </div>-->
<!--      &lt;!&ndash; 表格 &ndash;&gt;-->
<!--      <el-table :data="members" v-loading="loading">-->
<!--        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>-->
<!--        <el-table-column prop="title" label="书名"></el-table-column>-->
<!--        <el-table-column prop="author" label="作者"></el-table-column>-->
<!--        <el-table-column label="操作" fixed="right" width="275">-->
<!--          <template #default="scope">-->
<!--            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>-->
<!--            <el-button-->
<!--              plain-->
<!--              size="small"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.row.id)"-->
<!--              v-permission="{ permission: '删除维基', type: 'disabled' }"-->
<!--              >删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->

<!--    &lt;!&ndash; 编辑页面 &ndash;&gt;-->
<!--    <book-modify v-else @editClose="editClose" :editChapterID="editMemberId"></book-modify>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { onMounted, ref } from 'vue'-->
<!--import { ElMessageBox, ElMessage } from 'element-plus'-->
<!--import wikiModel from '@/model/book'-->
<!--import WikiModify from './chapter'-->

<!--export default {-->
<!--  components: {-->
<!--    WikiModify,-->
<!--  },-->
<!--  setup() {-->
<!--    const members = ref([])-->
<!--    const editChapterID = ref(1)-->
<!--    const loading = ref(false)-->
<!--    const showEdit = ref(false)-->

<!--    onMounted(() => {-->
<!--      getWikiList()-->
<!--    })-->

<!--    const getWikiList = async () => {-->
<!--      try {-->
<!--        loading.value = true-->
<!--        members.value = await wikiModel.getWikiList()-->
<!--        loading.value = false-->
<!--      } catch (error) {-->
<!--        loading.value = false-->
<!--        if (error.code === 10020) {-->
<!--          members.value = []-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    const handleEdit = id => {-->
<!--      showEdit.value = true-->
<!--      editMemberId.value = id-->
<!--    }-->

<!--    const handleDelete = id => {-->
<!--      ElMessageBox.confirm('此操作将永久删除该维基, 是否继续?', '提示', {-->
<!--        confirmButtonText: '确定',-->
<!--        cancelButtonText: '取消',-->
<!--        type: 'warning',-->
<!--      }).then(async () => {-->
<!--        const res = await wikiModel.deleteBook(id)-->
<!--        if (res.code < window.MAX_SUCCESS_CODE) {-->
<!--          getWikiList()-->
<!--          ElMessage.success(`${res.message}`)-->
<!--        }-->
<!--      })-->
<!--    }-->

<!--    const editClose = () => {-->
<!--      showEdit.value = false-->
<!--      getWikiList()-->
<!--    }-->

<!--    const indexMethod = index => index + 1-->

<!--    return {-->
<!--      members,-->
<!--      loading,-->
<!--      showEdit,-->
<!--      editClose,-->
<!--      handleEdit,-->
<!--      editMemberId,-->
<!--      indexMethod,-->
<!--      handleDelete,-->
<!--    }-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.container {-->
<!--  padding: 0 30px;-->

<!--  .header {-->
<!--    display: flex;-->
<!--    justify-content: space-between;-->
<!--    align-items: center;-->

<!--    .title {-->
<!--      height: 59px;-->
<!--      line-height: 59px;-->
<!--      color: $parent-title-color;-->
<!--      font-size: 16px;-->
<!--      font-weight: 500;-->
<!--    }-->
<!--  }-->

<!--  .pagination {-->
<!--    display: flex;-->
<!--    justify-content: flex-end;-->
<!--    margin: 20px;-->
<!--  }-->
<!--}-->
<!--</style>-->
