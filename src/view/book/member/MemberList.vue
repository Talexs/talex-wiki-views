<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="title">
          成员列表
        </div>
        <div style="float: right">
          <talex-drop-down>
            <template #display>
              <el-button type="primary">添加成员</el-button>
            </template>
            123123
            <el-button type="primary">添加成员</el-button>
          </talex-drop-down>
<!--          <el-popover-->
<!--            placement="bottom"-->
<!--            :width="380"-->
<!--            trigger="click"-->
<!--          >-->
<!--            <template #reference>-->
<!--              <el-button type="primary">添加成员</el-button>-->
<!--            </template>-->
<!--            <h2>添加成员</h2>-->
<!--            <div class="add-member-wrapper">-->
<!--              <el-input-->
<!--                v-model="input3"-->
<!--                placeholder="Please input"-->
<!--                class="input-with-select"-->
<!--              >-->
<!--                <template #prepend>-->
<!--                  <el-select v-model="select" placeholder="Select" style="width: 115px">-->
<!--                    <el-option label="超级管理员" value="3" />-->
<!--                    <el-option label="管理员" value="2" />-->
<!--                    <el-option label="普通成员" value="1" />-->
<!--                    <el-option label="游客" value="0" />-->
<!--                    <el-option label="黑名单" value="-1" />-->
<!--                  </el-select>-->
<!--                </template>-->
<!--                <template #append>-->
<!--                  <el-button :icon="Search" />-->
<!--                </template>-->
<!--              </el-input>-->
<!--              <el-button type="primary">邀请对方</el-button>-->
<!--            </div>-->
<!--          </el-popover>-->
        </div>
      </div>

      <el-table :data="props.members" stripe row-class-name="MemberList-list">
        <el-table-column prop="avatar" label="用户">
          <template #default="scope">
           <div class="user">
             <img v-if="scope.row.avatar" :src="item.avatar" alt="" />
             <img v-else :src="Avatar" class="corner"  alt=""/>
             <p class="username">
              {{ scope.row.username }}
            </p>
           </div>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="成员权限">
          <template #default="scope">
<!--            <span v-if="scope.row.permission === 3">超级管理员</span>-->
            <span v-if="scope.row.permission === 2">成员</span>
            <span v-if="scope.row.permission === 1">管理员</span>
            <span v-if="scope.row.permission === 0">超级管理员</span>
<!--            <span v-if="scope.row.permission < 0">黑名单</span>-->
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="加入时间">
          <template #default="scope">
            {{ getTimePeriod(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
<!--            <el-button plain size="small" type="primary" @click="handleSetting(scope.row.id)">编辑</el-button>-->
<!--            @click="handleDelete(scope.row.id)"-->
<!--            v-permission="{ permission: '删除成员', type: 'disabled' }"-->
            <el-button
              plain
              size="small"
              type="danger"


            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      <div class="MemberList-Wrapper">-->
<!--        <div class="MemberList-list" :key="item.id" v-for="item in members">-->
<!--          <img v-if="item.avatar" :src="item.avatar" alt="" />-->
<!--          <img v-else src="@/assets/image/user/user.png" class="corner" />-->
<!--          {{ item }}-->
<!--        </div>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import memberModel from '~/plugins/model/wiki-member.js'
import moment from 'moment'
import TalexDropDown from '~/components/common/dropdown/talex-dropdown.vue'

import Avatar from '~/assets/static/avatar.png'

const props = defineProps({
  members: {
    type: Array
  }
})

const loading = ref(false)
const showEdit = ref(false)

function getTimePeriod(time) {
  return moment(time, null, 'zh-cn').fromNow()
}
</script>

<style lang="scss" scoped>
.MemberList-list {
  .user {
    position: relative;
    display: flex;

  }
  img {
    margin-bottom: 5px;
    width: 48px;
    height: 48px;
  }
  .username {
    position: relative;
    padding: 2px 8px;
    display: flex;

    top: 50%;
    left: 5px;

    height: 30px;
    line-height: 30px;
    width: max-content;

    font-size: 17px;
    text-align: center;
    transform: translateY(-50%);
  }
}

.MemberList-Wrapper {
  position: relative;
  padding: 1% 2%;

  background-color: red;
}

.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      //color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
