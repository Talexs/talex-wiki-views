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
    <div class="Index-Background"></div>
    <div class="Index-Title">
      <h5>Let's introduce</h5>
      <br />
      <h1>TalexWiki</h1>
      <div class="Index-ArrowUp">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style lang="scss" scoped>
@keyframes arrowUping {
  0%, 55%, 100% {
    clip-path: polygon(0% 46%, 50% 0, 100% 46%, 98% 54%, 50% 10%, 2% 54%);

    opacity: .8;
    transform: translate(-50%, 200%) translateY(5px);
  }
  60% {
    opacity: 0;
    transform: translate(-50%, 200%) translateY(-10px);
    clip-path: polygon(0% 50%, 50% 0, 100% 50%, 90% 60%, 50% 10%, 10% 60%);
  }

  90% {
    opacity: 0;
    transform: translate(-50%, 200%) translateY(10px);
    //clip-path: polygon(0% 50%, 50% 0, 100% 50%, 90% 60%, 50% 10%, 10% 60%);
  }
}

@keyframes bgShader {
  from {
    background-position: 200%;
  }
  to {
    background-position: -200%;
  }
}

.Index-Title {
  .Index-ArrowUp {
    left: 50%;

    background-color: var(--el-text-color-primary);

    width: 42px;
    height: 48px;

    opacity: .8;
    position: relative;
    transform: translate(-50%, 200%) translateY(5px);
    animation: arrowUping 3.5s infinite;
  }
  h5 {
    display: inline-block;
    opacity: .7;
    //background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
    //-webkit-background-clip: text;
  }
  h1 {
    background-image: -webkit-linear-gradient(right, transparent 1%, var(--el-color-primary));
    background-size: 200%;

    display: flex;
    justify-content: center;
    align-items: center;
    background-clip: text;
    height: 100px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: bgShader linear 5s infinite;
  }
  position: relative;
  top: 20%;

  left: 25%;
  width: 50%;

  font-size: 60px;
  text-align: center;
  user-select: none;
}

.Index-Background {
  position: absolute;

  top: -20%;
  left: 50%;

  height: 150%;

  aspect-ratio: 1 / 1;
  border: 40px solid var(--el-fill-color-light);
  border-radius: 50%;
  transform: translate(-50%, 0);
}

.Index-Container {
  position: relative;

  width: 100%;
  height: 100%;

  perspective: 10px;
  overflow: hidden;
}
</style>
