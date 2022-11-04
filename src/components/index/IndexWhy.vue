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
  <div class="Index-Why-Container">
    <h3>为什么是 TalexWiki</h3>
    <div class="Index-Why">
      <div class="Index-Why-Card">
        <div class="why-card-head">
          <object :data="Distribution" />
          <p class="title">分发型</p>
        </div>
        <span>
          TalexWiki 基于高性能引擎V8打造，采用多端协同架构设计，在众多模块中脱颖而出。
          针对不同设备单独适配，知识不仅仅在于管理，更在于传递。
        </span>
      </div>
      <div class="Index-Why-Card">
        <div class="why-card-head">
          <object :data="Marketing" />
          <p class="title">重用块</p>
        </div>
        <span>
          基于 TalexWiki 携带的强大云端市场，您可以享受到资源的整合，通过下载与分享模板，您可以创造出绚烂的主题。除此之外，还可编写代码自定义一切内容。
        </span>
      </div>
      <div class="Index-Why-Card">
        <div class="why-card-head">
          <object :data="CoOperate" />
          <p class="title">协同写</p>
        </div>
        <span>
          TalexWiki 使用了强大的基于 CRDT协议 多端协同 能力，助您打造世界一流的私人知识管理系统，仅需一道链接，无需多次验证，何处何地均可编辑。
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexWhy"
}
</script>

<script setup>
import Distribution from '../../assets/static/svg/distribution-why.svg'
import Marketing from '../../assets/static/svg/market-why.svg'
import CoOperate from '../../assets/static/svg/cooperate-why.svg'
</script>

<style lang="scss" scoped>
.Index-Why-Card {
  .why-card-head {
    object {

      width: 40%;
      aspect-ratio: 1 /1 ;

      border-radius: 50%;
      background-color: var(--el-fill-color-lighter);
      border: 1px solid var(--el-border-color);

      svg {
        fill: var(--el-color-primary);
      }
    }
    .title {
      margin: .5rem 0;
      padding: 4px 16px;

      left: 50%;
      top: 75%;

      border-radius: 15px;
      display: inline-block;
      background-color: var(--el-color-primary-light-8);
      transform: translateX(-50%);

      position: absolute;
    }
    margin-top: -80px;

    user-select: none;
    position: relative;
  }
  span {
    top: 45%;

    width: 70%;
    left: 15%;

    opacity: .85;
    text-align: center;

    position: absolute;
  }
  margin: 6rem 1rem;
  padding: .1rem 1rem;

  height: 260px;
  width: 400px;

  border-radius: 4px;
  //background-color: var(--el-fill-color-lighter);

  //user-select: none;
  position: relative;
}

.Index-Why {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Index-Why-Container {
  h3 {
    margin: 0 0 20px auto;
  }
  padding: 2rem 0;
  height: 400px;

  text-align: center;

  position: relative;
}
</style>
