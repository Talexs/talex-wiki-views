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
  <div class="Index-Container">
    <IndexIntroduction />

    <IndexSponsor />

    <IndexWhy />
  </div>
</template>

<script>
import IndexIntroduction from '../../components/index/IndexIntroduction.vue'
import IndexSponsor from '../../components/index/IndexSponsor.vue'
import IndexWhy from '../../components/index/IndexWhy.vue'
export default {
  name: "Index",
  components: { IndexWhy, IndexSponsor, IndexIntroduction }
}
</script>

<style lang="scss" scoped>
.Index-Container {
  position: relative;

  width: 100%;
  //height: 100%;

  background-color: var(--el-bg-color);
  perspective: 1px;
  //overflow: hidden;
}
</style>
