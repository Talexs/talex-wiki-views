<template>
  <div class="Security-Container LayoutSub-Frame transition-cubic">
    <p class="title force">登录历史</p>
    <span class="title-info force">登录历史仅显示最近15条</span>
    <el-table v-loading="historyList?.length > 0" :data="historyList" stripe row-class-name="LoginHistory-Row">
      <el-table-column type="index" label="-" />
      <el-table-column prop="device" label="登录方式">
        <template #default="scope">
          {{ getLoginType(scope.row.identity_type) }}
        </template>
      </el-table-column>
      <el-table-column prop="device" label="登录设备">
        <template #default="scope">
          {{ getDevice(scope.row.device) }}
        </template>
      </el-table-column>
      <el-table-column prop="device" label="登录位置">
        <template #default="scope">
          {{ getPos(scope.row.locale) }}
        </template>
      </el-table-column>
      <el-table-column prop="device" label="登录IP">
        <template #default="scope">
          <span class="ip-copy-security">
            <span class="ip-security">{{ scope.row.ip }}</span>
<!--            <el-icon><CopyDocument /></el-icon>-->
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="登录时间">
        <template #default="scope">
          {{ formatDateDistance(scope.row.createdAt) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import UserModel from '~/plugins/model/base/user.js'
import { formatDateDistance } from '../../plugins/addon/utils.ts'
// import { CopyDocument } from '@element-plus/icons-vue'
import UAParser from 'ua-parser-js'

const historyList = ref()

onMounted(async () => {
  const res = await UserModel.getUserLoginHistories()

  historyList.value = res.rows
})

function getPos(str) {
  if( str === "Local" || str.indexOf('内网IP') !== -1 ) return "本地登录"
  const locales = str.split("|")

  return locales.length > 1 ? locales[0] + "-" + locales[1] : locales[0]
}

function getDevice(str) {
  const parser = new UAParser(str);
  return parser.getBrowser().name ? parser.getOS().name + "-" + parser.getBrowser().name : str
}

function getLoginType(str) {
  return str === "0" ? "账号密码" : "未知"
}
</script>

<script>
export default {
  name: "Security"
}
</script>

<style lang="scss" scoped>
.LoginHistory-Row {
  .ip-copy-security {
    &:hover .ip-security::before {
      opacity: 0;
    }
    .ip-security {
      &:before {
        content: "";
        position: absolute;

        top: 50%;
        left: 15%;

        height: 15px;
        width: 70%;

        //background-color: red;
        border-radius: 5px;
        transition: .25s;
        transform: translateY(-50%);
        backdrop-filter: blur(10px);
      }
      position: relative;
    }
    position: relative;

    width: max-content;
    //.ip-security {
    //  //position: absolute;
    //
    //  left: 10%;
    //
    //  height: 100%;
    //  width: 80%;
    //
    //  background-color: red;
    //}
    .el-icon {
      position: relative;
      margin-left: 2px;
      top: 2px;
    }
    opacity: 1;
    cursor: pointer;
  }
}
</style>
