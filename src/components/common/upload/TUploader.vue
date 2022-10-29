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
  <div class="TUploader-Container">

  </div>
</template>

<script>
export default {
  name: "TUploader"
}
</script>

<script setup>
import { useModelWrapper } from '../../../plugins/Common.ts'

const props = defineProps(['modelValue', 'rules'])
const emits = defineEmits(['update:modelValue'])

const model = useModelWrapper(props, emits)

</script>

<style lang="scss" scoped>
.TUploader-Container {
  position: relative;

  display: flex;
  flex-wrap: wrap;

  //flex: 1;
  left: 0;
  top: 0;


  width: var(--width, 100%);
  height: var(--height, 100%);

  aspect-ratio: 1 / 1;
  user-select: none;
  //overflow: hidden;

  background-color: blue;
}
</style>
