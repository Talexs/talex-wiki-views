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
  <div class="Index-Introduction">
    <div class="Index-Background"></div>
    <div class="Index-Introduction-Wrapper">
      <div class="Index-Title">
        分发型的
        <h1>知识管理系统</h1>
        <p>
          TalexWiki 助您构建您的下一代 知识系统， 这是一个开源的知识管理系统，让知识管理变得简单而又强大。
        </p>
        <div class="Index-Btn">
          <FlatHrefButton href="/startup" large>
            <el-icon>
              <Position />
            </el-icon>
            开始使用
          </FlatHrefButton>
          <FlatButton plain large>
            登录账号
          </FlatButton>
        </div>
      </div>
      <div class="Index-Illustration" :style="`background-image: url('${BookSvg}')`">
<!--        <object :data="BookSvg" type="image/svg+xml"></object>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexIntroduction"
}
</script>

<script setup>
import BookSvg from '../../assets/static/svg/book-index.svg'
import FlatButton from '../common/btn/FlatButton.vue'
import FlatHrefButton from '../common/btn/FlatHrefButton.vue'
import { Position } from '@element-plus/icons-vue'

</script>

<style lang="scss" scoped>

.Index-Title {
  h1 {
    font-size: 3rem;
    color: var(--el-color-primary)
  }
  p {
    font-size: 1.125rem;
    opacity: .75;
  }
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 50%;

  font-size: 3rem;
  user-select: none;
}

.Index-Illustration {
  width: 35%;
  background-size: 100% 100%;
  background-position: center;
  //object {
  //
  //  width: 100%;
  //  height: 100%;
  //}
}

.Index-Introduction-Wrapper {
  display: flex;
  justify-content: space-between;

  width: 60%;
  height: 100%;

  left: 20%;

  position: absolute;
}

.Index-Background {
  position: absolute;

  top: -50%;
  left: 50%;

  width: 70%;

  aspect-ratio: 1 / 1;
  border: 40px solid var(--el-color-primary-light-9);
  border-radius: 50%;
  transform: translate(-50%, 0);
}

.Index-Introduction {
  overflow: hidden;

  min-width: 1280px;
  height: 580px;

  left: 50%;
  transform: translateX(-50%);

  position: relative;
}

@media only screen and (max-width: 960px) {
  .Index-Introduction {
    max-width: unset;
    max-height: 440px;
  }
  .Index-Background {
    transform:  translate(-50%, 0) scale(.8);
  }
  .Index-Introduction-Wrapper {
    transform: scale(.8);
  }
}

@media only screen and (min-width: 360px) and (max-width: 600px) {
  .Index-Introduction {
    max-width: unset;

    //height: 45%;
    height: 340px;
  }
  .Index-Background {
    transform:  translate(-50%, -15%) scale(.45);
  }
  .Index-Introduction-Wrapper {
    .Index-Illustration {
      display: none;
    }
    .Index-Title {
      text-align: center;
    }
    .Index-Btn {
      display: flex;
      justify-content: space-evenly;
      :deep(.FlatButton-Wrapper) {
        margin: 16px 0 auto;
      }
    }
    justify-content: center;
    transform: scale(.8);
  }
}

@media only screen and (max-width: 360px) {
  .Index-Introduction {
    filter: blur(5px)
  }
}

</style>
