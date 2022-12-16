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
  <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="输入名称 / 邮箱来查找"
          @select="handleSelect"
  >
    <template #default="{ item }">
      <div class="UserSearcher-Row">
        <user-avatar :id="item.id" />
        <span class="username">{{ item.username }}</span>
        <span v-if="item.email" class="email">({{ item.email }})</span>
      </div>
    </template>
  </el-autocomplete>
</template>

<script>
export default {
  name: "UserSearcher"
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { userModel } from '~/plugins/model/base/user'
import UserAvatar from '~/components/common/avatar/UserAvatar.vue'

const emits = defineEmits(['select'])
const state = ref('')

function handleSelect(item) {
  emits('select', item)
}

async function querySearchAsync(query, cb) {
  if ( !query ) return cb([])
  const results = await userModel.search(query)

  cb(results)
}
</script>

<style lang="scss" scoped>
.UserSearcher-Row {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  .username {
    margin-left: 10px;
    font-size: 14px;
    color: var(--el-color-primary);
  }
  .email {
    margin-left: 10px;
    font-size: 12px;
    color: var(--el-color-secondary);
    opacity: .65;
  }
}
</style>
