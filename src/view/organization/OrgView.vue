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
  <div class="Organization-Container">
    <div class="Organization-Header">
      <div class="Org-Cover-Wrapper">
        <el-image fit="fill" class="Org-Cover" :src="org.avatar" />
      </div>

      <div class="Org-Content">
        <p class="Org-Name">{{ org.name }}</p>
        <p class="Org-Description">{{ org.summary }}</p>
        <p class="Org-Tag">
          <span>优秀组织</span>
          <span style="background-color: var(--el-color-warning-light-5)">精品来源</span>
          <span style="background-color: var(--el-color-danger-light-5)">强烈推荐</span>
        </p>
        <p class="Org-Other">12 成员 中国 / pvpin@studio.com</p>
      </div>

      <div class="Org-Action">
        <FlatButton>
            <span class="Org-Action-Text">跟 随</span>
        </FlatButton>
      </div>
    </div>

    <div class="Organization-Main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="概述" name="overview">
          <el-empty content="暂无概述" />
        </el-tab-pane>
        <el-tab-pane label="项目" name="projects">

        </el-tab-pane>
        <el-tab-pane label="成员" name="members">

        </el-tab-pane>
        <el-tab-pane label="发布" name="releases">

        </el-tab-pane>
        <el-tab-pane label="设置" name="settings">

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrgView"
}
</script>

<script setup>
import { organizationModel } from '~/plugins/model/org/OrganizationModel.ts'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import FlatButton from '~/components/common/btn/FlatButton.vue'

const activeName = ref("overview")

const org = ref({})
const route = useRoute()

onMounted(async () => {
  console.log( route )
  const { id } = route.params

  org.value = await organizationModel.info(+id)

  console.log(org.value)
})
</script>

<style lang="scss" scoped>
.Organization-Container {
  .Organization-Main {
    :deep(.el-tabs) {
      .el-tabs__nav-wrap, .el-tabs__content {
        padding: 0 11.5%;
      }
    }
  }

  .Organization-Header {
    .Org-Cover-Wrapper {
      :deep(.el-image) {
        padding: 2px;
        border: 1px solid var(--el-border-color);
        border-radius: 8px;
      }
      padding: 8px;

      width: 120px;
      height: 100%;

      box-sizing: border-box;
      overflow: hidden;
    }
    .Org-Content {
      .Org-Name {
        font-size: 24px;
        color: var(--el-color-primary);
        font-weight: 600;
      }
      .Org-Description {
        font-size: 15px;

        opacity: .65;
      }
      .Org-Tag {
        position: relative;

        top: 5px;
        font-size: 12px;
        span {
          margin-right: 5px;
          padding: 2px 6px;

          color: var(--el-text-color-regular);
          border-radius: 8px;
          background-color: var(--el-color-success-light-5);
        }
      }
      .Org-Other {
        position: relative;

        top: 5px;
        font-size: 12px;
      }
      p {
        margin: 0 0;
      }
      //display: flex;
      //flex-direction: column;
      //justify-items: center;

      margin: 0 .2%;

      width: 80%;
    }
    position: relative;
    padding: 0 10%;
    display: flex;

    justify-content: center;
    align-items: center;

    height: 120px;
    width: 100%;

    box-sizing: border-box;
    //border-bottom: 1px solid var(--el-border-color);
    //background-color: red;
  }
  position: relative;

  height: 100%;
  width: 100%;

  background-color: var(--el-fill-color-lighter);
}
</style>
