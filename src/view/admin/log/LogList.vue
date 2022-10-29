<template>
  <!-- 列表页面 -->
  <div class="LayoutSub-Frame">
    <div class="LayoutSub-Header">
      <p class="title force">操作日志</p>

<!--      <el-button class="rounder-btn primary" @click="$router.push('/cms/eller/create')" text plain>添加角色</el-button>-->
    </div>

    <el-timeline>
      <el-timeline-item v-for="log in tableData" :timestamp="log.createdAt" placement="top">
        <el-card>
          <div class="LogHeader">
            <div class="User">
              <UserAvatar :id="log.executor.id" /> <span style="position: relative;top: -8px;left: 3px">{{ log.executor.username }}</span>
            </div>
            <span class="log-method" :style="`--method-color: ${log.method === 'GET' ? 'var(--el-color-primary)' : log.method === 'PUT' ? 'var(--el-color-warning)' : 'var(--el-color-info)'}`">
              {{ log.method }}({{ log.status }})
            </span>
          </div>
          <div class="LogMain">
            <p>{{ log.message }}</p>
            <el-tag>{{ log.type }}</el-tag>
          </div>
          <div class="LogFooter">
            <span v-text="log.path" />
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>

<!--    // TODO SCROLL TO LOAD MORE-->

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import LogModel from '~/plugins/model/admin/log.js'
import { forWikiTip, TipType } from '../../../plugins/Common.ts'
import UserAvatar from '../../../components/common/avatar/UserAvatar.vue'

const router = useRouter()
const tableData = ref()

onMounted(fetchRender)
async function fetchRender() {
  tableData.value = (await LogModel.getLogs({})).rows
  console.log(tableData.value)
}
</script>

<style lang="scss" scoped>
.LogFooter {
  position: relative;
  margin-right: 5%;

  bottom: -20px;

  opacity: .5;
  text-align: right;
}

.LogHeader {
  display: flex;
  justify-content: space-between;
  .log-method {
    position: relative;
    padding: 4px 8px;
    margin-right: 5%;

    margin-top: -2.5%;

    height: 20px;

    color: #eee;
    border-radius: 0 0 4px 4px;
    background-color: var(--method-color, var(--el-color-info));
  }
}
</style>
