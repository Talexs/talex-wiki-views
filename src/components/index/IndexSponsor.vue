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
  <div class="Index-Sponsor-Container">
    <h3>赞助商</h3>
    <div class="Index-Sponsor">
      <SponsorBox :gold="true">
        <template #icon>
          <img :src="PVPIN" alt="" />
        </template>
        <template #title>
          PVPIN Studio
        </template>
      </SponsorBox>
      <SponsorBox :gold="true">
        <template #icon>
          <img style="width: 48px" src="https://www.wuyuidc.com/favicon.ico" alt="" />
        </template>
        <template #title>
          物语云计算
        </template>
      </SponsorBox>
    </div>
  </div>
</template>

<script>
import SponsorBox from '../common/addon/SponsorBox.vue'
export default {
  name: "IndexSponsor",
  components: { SponsorBox }
}
</script>

<script setup>
import PVPIN from '../../assets/static/icon/sponsor/PVPINStudio.png'
</script>

<style lang="scss" scoped>
.Index-Sponsor {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Index-Sponsor-Container {
  h3 {
    margin: 0 0 20px auto;
  }
  padding: 2rem 0;
  height: 10rem;

  text-align: center;

  border-top: 1px solid var(--el-border-color);
  border-bottom: 1px solid var(--el-border-color);

  background-color: var(--el-fill-color-lighter);
  //border: 0 solid #e2e8f0;
  position: relative;
}
</style>
