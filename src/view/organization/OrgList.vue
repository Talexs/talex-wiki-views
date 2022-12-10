<!--
  - Copyright (c) 2022. TalexDreamSoul
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
  <div class="LayoutSub-Frame">
<!--    <transition name="el-zoom-in-top">-->
      <div style="align-items: baseline" class="LayoutSub-Header">
        <p class="title force">组织列表</p>

        <div class="aggregation">
          <TalexDropdown >
            <template #display>
              <el-button class="rounder-btn primary" text :icon="Plus">
                新建
              </el-button>
            </template>
            <TalexDropItem recommend @click="handleAddWiki">
              <template #label>
                新建组织
              </template>
              <template #icon>
                <el-icon><Plus /></el-icon>
              </template>
            </TalexDropItem>
          </TalexDropdown>
          <LayoutSelect v-model="listLayout" />
        </div>
      </div>
<!--    </transition>-->
<!--    <transition name="el-fade-in">-->
      <!-- 列表页面 -->
      <el-table v-if="listLayout === 0" :data="wikiList" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="书名"></el-table-column>
        <el-table-column prop="author" label="权限">
          <template #default="scope">
            <el-icon style="position: relative;top: 3px">
              <Select v-if="scope.row.permission === 1" />
              <CloseBold v-else></CloseBold>
            </el-icon>
            <span>&nbsp;{{ scope.row.permission === 0 ? '公有' : '私有' }}</span>
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
<!--    </transition>-->

<!--    <transition name="el-fade-in">-->
      <div v-if="listLayout === 1" class="WikiList-BlockLayout">
        <!-- 块状视图 列表页面 -->
        <OrgBlockList @delete="handleDelete" @setting="handleSetting" @edit="handleEdit" :org="org" v-for="org in wikiList" :key="org.id" />
      </div>
<!--    </transition>-->

    <!-- 导入页面 -->
<!--    <ImportedWiki v-if="showImport" @editClose="editClose" ></ImportedWiki>-->
  </div>
</template>

<script setup>
// import ImportedWiki from './import-wiki.vue'
import TalexDropdown from '~/components/common/dropdown/talex-dropdown.vue'
import TalexDropItem from '~/components/common/dropdown/talex-drop-item.vue'
import { Right, Plus, Select, CloseBold } from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import wikiModel from '~/plugins/model/wiki.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '~/plugins/store/index.ts'
import LayoutSelect from '~/components/common/icon/LayoutSelect.vue'
import { organizationModel } from '~/plugins/model/org/OrganizationModel.ts'
import OrgBlockList from '~/components/org/OrgBlockList.vue'

const wikiList = ref()
const loading = ref(false)

const store = useStore()
const router = useRouter()
const route = useRoute()

const listLayout = ref(0)

watch(() => listLayout.value, () => {
  router.push({
    query: {
      layout: listLayout.value
    }
  })
})

const getList = async () => {
  const { layout } = route.query
  listLayout.value = layout ? +layout : 1

  loading.value = true
  wikiList.value = (await organizationModel.list())
  loading.value = false
}
const handleEdit = id => router.push(`/org/edit/${id}`)
const handleSetting = id => router.push(`/org/view/${id}`)

function handleAddWiki() {
  router.push(`/org/create`)
}

const handleDelete = id => {
  ElMessageBox.confirm('此操作将永久删除该组织, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // const res = await wikiModel.deleteBook(id)
    // if (res.code < window.MAX_SUCCESS_CODE) {
    //   await getWikiList()
      ElMessage.success("暂不允许"/*`${res.message}`*/)
    // }
  })
}

const indexMethod = index => index + 1

onMounted(getList)
</script>

<style lang="scss" scoped>
.LayoutSub-Frame {
  width: unset;
}

.WikiList-BlockLayout {
  display: flex;
  justify-content: space-around;
}
</style>
