<template>
  <div class="ImportedWiki-Container">
    <p class="title force">导入维基</p>

    <div class="wrap">
      <el-tabs :before-leave="handleLeave" v-model="steps" class="flat">
        <el-tab-pane id="importedWiki" label="基本信息" name="bi">
          <el-form :model="form" label-width="120px">
            <el-form-item label="远程节点平台">
              <el-select v-model="form.platform" placeholder="请选择节点平台">
                <el-option label="Github" value="github" />
                <el-option label="Gitee" value="gitee" />
              </el-select>
            </el-form-item>
            <el-form-item label="远程仓库地址">
              <el-input v-model="form.url" show-word-limit maxlength="256" />
            </el-form-item>
            <el-form-item label="远程内容类型">
              <el-select v-model="form.content" placeholder="请选择内容类型">
                <el-option label="标准(json)" value="json" />
                <el-option label="兼容（x-www-form-urlencoded）" value="x-www-form-urlencoded" />
              </el-select>
            </el-form-item>
            <el-form-item label="事件细节分发">
              <el-radio-group v-model="form.details" class="ml-4">
                <el-radio label="spawn" size="large">生成模式</el-radio>
                <el-radio disabled label="async" size="large">
                  同步模式
                  <span class="premium"></span>
                </el-radio>
              </el-radio-group>
              <el-alert :closable="false" v-if="form.details === 'spawn'" title="生成模式仅将远程仓库文件下载到本地并生成维基页面" type="info" />
              <el-alert :closable="false" v-if="form.details === 'async'" title="同步模式在本地实现仓库，便于您的可视化编辑。" type="info" />
            </el-form-item>
            <transition name="el-fade-in">
              <el-form-item v-show="form.platform && form.details === 'async'" label="传递事件类型">
                <el-checkbox-group v-model="form.events">
                  <transition name="el-fade-in">
                    <div v-show="form.platform === 'github'">
                      <el-checkbox v-for="event in githubEvents" :label="event" name="type" />
                    </div>
                  </transition>
                  <transition name="el-fade-in">
                    <div v-show="form.platform === 'gitee'">
                      <el-checkbox label="PUSH" name="type" />
                      <el-checkbox label="TAG PUSH" name="type" />
                      <el-checkbox label="ISSUE" name="type" />
                      <el-checkbox label="PULL REQUEST" name="type" />
                      <el-checkbox label="COMMNENT" name="type" />
                    </div>
                  </transition>
                </el-checkbox-group>
              </el-form-item>
            </transition>
            <el-form-item>
              <el-button @click="cancel">取消</el-button>
              <el-button @click="nextStep" type="primary">下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="完成导入" name="sc">
          <el-alert @click="$router.push('user/wikis')" :closable="false">
            导入已完成, 请确认信息。
          </el-alert>
          <br />
          <el-input v-model="form.desc" type="textarea" />
          <br /><br />
          <el-button @click="doneImport" type="primary">完成</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>

  <TalexCoverDialog activator to="#importedWiki" v-model="connectDialog">
<!--    <el-progress :percentage="Math.round(store.importWiki.progress.indexedDeltas / store.importWiki.progress.totalDeltas)" :indeterminate="connectAnimation" :duration="1" />-->
   <template v-if="store.importWiki.p >= 0">
     <el-progress :percentage="store.importWiki.p" :indeterminate="connectAnimation" />
     <el-progress :percentage="store.importWiki.p1 * 100" :indeterminate="connectAnimation" :duration="connectAnimation ? 1 : 0" />
     <el-progress :percentage="store.importWiki.p2 * 100" :indeterminate="connectAnimation" :duration="connectAnimation ? 1 : 0" />
     <span class="connect-info">{{ store.importWiki.tip }}</span>
   </template>
    <el-alert type="error" v-else :closable="false">
      导入失败!! 请刷新页面重新导入!!
    </el-alert>
  </TalexCoverDialog>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue'
import iWikiModel from '@plugins/model/imported-wiki.js'
import TalexCoverDialog from '@components/common/dialog/TalexCoverDialog.vue'
import { sleep } from '@plugins/Common.ts'
import { TipType } from '~/plugins/addon/Tipper.ts'
import { useStore } from '@plugins/store/index.ts'
import { MentionTip } from '@plugins/addon/MentionerManager.ts'

const store = useStore()
const emits = defineEmits(['editClose'])
const steps = ref("bi")

const form = reactive({
  platform: 'github',
  content: 'json',
  details: 'spawn'
})
const connectDialog = ref(false)
const connectAnimation = ref(true)
const loading = ref(false)

async function doneImport() {

  const res = await iWikiModel.mergeImports({ ...form })

  console.log("@done", res)

}

async function nextStep() {

  try {

    store.importWiki.p = store.importWiki.p1 = store.importWiki.p2 = 0
    store.importWiki.tip = "正在准备导入..."

    connectAnimation.value = loading.value = connectDialog.value = true

    store.importWiki.now = form.content

    await sleep(1600)

    connectAnimation.value = false

    store.importWiki.doneFunc = async () => {

      store.importWiki.tip = "下载完成!"

      await sleep(2200)

      steps.value = 'sc'
      loading.value = connectDialog.value = false

    }

    const res = await iWikiModel.tryConnect({ ...form })

    if( res.code === 10071 ) {

      return window.$tipper.mention(new MentionTip(res.message + '!', 3300, TipType.WARNING, true))

    }

    form.desc = res.data

  } catch ( e ) {

    console.error(e)

    await sleep(500)

    loading.value = connectDialog.value = false

  }

}

const githubEvents = [
  "Branch or tag creation",
  "Branch or tag deletion",
  "Branch protection rules",
  "Check runs",
  "Check suites",
  "Code scanning alerts",
  "Collaborator add, remove, or changed",
  "Commit comments",
  "Deploy keys",
  "Deployment statuses",
  "Deployments",
  "Discussion comments",
  "Discussions",
  "Forks",
  "Issue comments",
  "Issues",
  "Labels",
  "Meta",
  "Milestones",
  "Packages",
  "Page builds",
  "Project cards",
  "Project columns",
  "Projects",
  "Pull request review comments",
  "Pull request review threads",
  "Pull request reviews",
  "Pull requests",
  "Pushes",
  "Registry packages",
  "Releases",
  "Repositories",
  "Repository imports",
  "Repository vulnerability alerts",
  "Secret scanning alert locations",
  "Secret scanning alerts",
  "Security and analyses",
  "Stars",
  "Statuses",
  "Team adds",
  "Visibility changes",
  "Watches",
  "Wiki",
  "Workflow jobs",
  "Workflow runs"
]

function handleLeave(panel) {
  return steps.value === 'sc';
}

function cancel() {
  emits('editClose')
}

/**
 * 表单规则验证
 */
const { rules } = getRules()

const back = () => {
  emits('editClose')
}

/**
 * 表单验证规则
 */
function getRules() {
  /**
   * 验证回调函数
   */
  const checkInfo = (rule, value, callback) => {
    if (!value) {
      callback(new Error('信息不能为空'))
    }
    callback()
  }
  const rules = {
    title: [{ validator: checkInfo, trigger: 'blur', required: true }],
    permission: [{ validator: checkInfo, trigger: 'blur', required: true }],
    summary: [{ validator: checkInfo, trigger: 'blur', required: true }],
    image: [{ validator: checkInfo, trigger: 'blur', required: true }],
  }
  return { rules }
}
</script>

<style lang="scss" scoped>
.connect-info {
  margin-top: 15px;

  font-size: 12px;
}

:deep(.el-progress) {
  .el-progress__text {
    display: none;
  }
  margin-top: 5px;
  width: 80%;
}

.ImportedWiki-Container {
  .title {
    height: 59px;
    line-height: 59px;
    //color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      font-weight: 400;
      font-size: 16px;
      cursor: pointer;
    }
  }

  :deep(.el-tabs__content) {
    margin-top: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
