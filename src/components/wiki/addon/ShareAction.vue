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
  <el-container class="ShareAction-Container transition-cubic">
    <el-main class="ShareAction-Main">
<!--      <h2>分享</h2>-->
      <el-tabs v-model="activeTab" class="flat header-filter">
        <el-tab-pane label="二维码" name="code">
          <canvas ref="codeCanvas" />
        </el-tab-pane>
        <el-tab-pane label="文本" name="text">
          <div class="text-viewer">
            {{ text }}
          </div>
          <FlatButton @click="copy">
            复制
          </FlatButton>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-aside class="ShareAction-Aside">
      <CheckList title="浏览权限" v-model="shareOption.visible" :data="perOptions" />
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "ShareAction"
}
</script>

<script setup>
import CheckList from '@components/common/checkbox/CheckList.vue'
import { computed, onMounted, onUpdated, reactive, ref } from 'vue'
import Copy from 'copy-to-clipboard'
import QRCode from 'qrcode'
import { _T_EncodeNumber, forMentionTip, TipType } from '@plugins/Common.ts'
import { useStore } from '@plugins/store/index.ts'
import FlatButton from '@components/common/btn/FlatButton.vue'
import { MentionTip } from '@plugins/addon/MentionerManager.ts'

const props = defineProps(['data'])
const store = useStore()

const activeTab = ref("code")
const codeCanvas = ref()

const text = computed(() => `[TalexWiki] 塔莱克斯 | 全新一代分发型维基系统
  诚邀您查阅维基: ${window.location.origin}/wiki/view/${_T_EncodeNumber(props.data.type === 0 ? props.data.id : props.data.wiki.id, 9)}

  —— 来自 ${store.local.user.username} 的分享!`)

function copy() {
  Copy(text.value)

  forMentionTip(new MentionTip("复制成功，粘贴以分享！", 3200, TipType.SUCCESS, true))
}

function renderQRCode() {

  const data = props.data

  // console.log(props.data)

  QRCode.toCanvas(codeCanvas.value, `${window.location.origin}/wiki/view/${_T_EncodeNumber(data.type === 0 ? data.id : data.wiki.id, 9)}`, {
    // rendererOpts: {
    //   light: '#aa0000',
    //   dark: '#212121'
    // }
  })

}

window.func = renderQRCode

onUpdated(renderQRCode)
onMounted(renderQRCode)

const perOptions = [
  { label: "仅自己可见", disable: true },
  { label: "成员可见", disable: false },
  // { label: "团队可见", disable: false },
  // { label: "邀请可见", disable: true },
  // { label: "密码可见", disable: true },
  { label: "公开可见", disable: false },
]

const shareOption = reactive({
  visible: "成员可见"
})
</script>

<style lang="scss" scoped>
.ShareAction-Container {
  padding: 0 15px;

  width: 700px;
  height: 580px;

  border-radius: 8px;
  box-shadow: 0 0 4px 2px var(--el-fill-color-lighter);
  background-color: var(--el-fill-color-light);
  .el-main {
    canvas {
      width: 90% !important;
      height: 90% !important;

    }
    .text-viewer {
      margin-top: 10px;
      padding: 15px 10px;

      width: calc(100% - 20px);

      box-sizing: border-box;
      border-radius: 8px;
      user-select: text;
      background-color: var(--el-fill-color-dark);
    }
    --el-main-padding: 0;
  }
  .ShareAction-Aside {
    padding: 0 10px;
    height: 100%;

    border-left: 1px solid var(--el-border-color);
  }
}
</style>
