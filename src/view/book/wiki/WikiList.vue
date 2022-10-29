<template>
  <div class="LayoutSub-Frame">
<!--    <transition name="el-zoom-in-top">-->
      <div v-show="!showEdit && !showImport" style="align-items: baseline" class="LayoutSub-Header">
        <p class="title force">维基列表</p>
        <TalexDropdown >
          <template #display>
            <el-button class="rounder-btn primary" text :icon="Plus">
              新建
            </el-button>
          </template>
          <TalexDropItem recommend @click="handleAddWiki">
            <template #label>
              新建维基
            </template>
            <template #icon>
              <el-icon><Plus /></el-icon>
            </template>
          </TalexDropItem>
          <TalexDropItem divider />
          <TalexDropItem beta @click="handleImportWiki">
            <template #label>
              导入维基
            </template>
            <template #icon>
              <el-icon><Right /></el-icon>
            </template>
          </TalexDropItem>
        </TalexDropdown>
      </div>
<!--    </transition>-->
    <transition name="el-zoom-in-bottom">
      <!-- 列表页面 -->
      <el-table v-show="!showEdit && !showImport" :data="wikiList" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="书名"></el-table-column>
        <el-table-column prop="author" label="权限">
          <template #default="scope">
            <el-icon style="position: relative;top: 3px">
              <Select v-if="scope.row.permission === 0" />
              <CloseBold v-else></CloseBold>
            </el-icon>
            <span>&nbsp;{{ scope.row.permission !== 0 ? '公有' : '私有' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button plain size="small" type="warning" @click="handleSetting(scope.row.id)">设置</el-button>
            <el-button
                    plain
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </transition>

    <!-- 编辑页面 -->
    <transition name="el-zoom-in-bottom">
      <wiki-modify v-show="showEdit" @editClose="editClose" :editWikiId="editWikiId"></wiki-modify>
    </transition>

    <!-- 导入页面 -->
    <ImportedWiki v-if="showImport" @editClose="editClose" ></ImportedWiki>
  </div>
</template>

<script setup>
import WikiModify from './WikiModifier.vue'
import ImportedWiki from './import-wiki.vue'
import TalexDropdown from '@components/common/dropdown/talex-dropdown.vue'
import TalexDropItem from '@components/common/dropdown/talex-drop-item.vue'
import { Right, Plus, Select, CloseBold } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import wikiModel from '@plugins/model/wiki.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const wikiList = ref()
const editWikiId = ref()
const loading = ref(false)
const showEdit = ref(false)
const showImport = ref(false)

const router = useRouter()

const getWikiList = async () => {
  loading.value = true
  wikiList.value = (await wikiModel.getBooks())?.rows || null
  loading.value = false
}
const handleEdit = id => router.push(`/wiki/edit/${id}`)

const handleSetting = id => {
  editWikiId.value = id
  showEdit.value = true
}

function handleAddWiki () {
  editWikiId.value = null
  showEdit.value = true
}

function handleImportWiki() {
  showImport.value = true
}

const handleDelete = id => {
  ElMessageBox.confirm('此操作将永久删除该维基, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await wikiModel.deleteBook(id)
    if (res.code < window.MAX_SUCCESS_CODE) {
      await getWikiList()
      ElMessage.success(`${res.message}`)
    }
  })
}

const editClose = () => {
  showEdit.value = false
  showImport.value = false
  getWikiList()
}

const indexMethod = index => index + 1

onMounted(getWikiList)
</script>

<style lang="scss" scoped>
.LayoutSub-Frame {
  width: unset;
}
</style>
