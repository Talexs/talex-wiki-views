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
  <p ref="" class="AutoZoomText-Container">
    <slot />
  </p>
</template>

<script>
export default {
  name: "AutoZoomText"
}
</script>

<script setup>
// TODO AUTO ZOOMER
</script>

<style lang="scss" scoped>
.AutoZoomText-Container {
  position: relative;
  margin: 0;

  white-space: nowrap;
  text-indent: 12px;
  font-size: 20px;
  font-weight: 600;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
