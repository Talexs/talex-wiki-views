<template>
  <div class="container LayoutSub-Frame">
    <p class="title force" v-if="!editWikiId">新建维基</p>
    <p class="title force" v-else>
      <span>修改维基 ({{ editWikiId }})</span> <span class="back" @click="$router.back()"> 返回 </span>
    </p>

    <div class="wrap">
      <el-tabs class="flat header-filter">
        <el-tab-pane label="属性">
          <el-row>
            <el-col :lg="16" :md="20" :sm="24" :xs="24">
              <el-form :model="wiki" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="wiki.title" placeholder="请填写标题."></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="author">
                  <el-radio-group v-model="wiki.permission" class="ml-4">
                    <el-radio :label="1">私有</el-radio>
                    <el-radio :label="0">公开</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="封面" prop="image">
                  <!--              <el-input v-model="book.image" placeholder="请填写封面地址"></el-input>-->
                  <!--              {{ // [ book.image ] }}-->
                  <upload-imgs :value="[ { src: wiki?.cover, display: wiki?.cover } ]" @upload="uploadCover" :maxNum="1" :rules="{ maxSize: 30, minWidth: 32, minHeight: 32 }" :multiple="false" />
                  <!--              <TUploader v-model="wiki.image" :rules="{ maxSize: 64, minWidth: 32, minHeight: 32 }" />-->
                </el-form-item>
                <el-form-item label="简介" prop="summary">
                  <el-input
                          type="textarea"
                          :autosize="{ minRows: 4, maxRows: 8 }"
                          placeholder="请输入简介"
                          v-model="wiki.description"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item class="submit">
                  <el-button type="primary" @click="submitForm">保 存</el-button>
                  <el-button @click="resetForm">重 置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="成员">
          <member-list :members="wiki.members" />
        </el-tab-pane>
        <el-tab-pane label="权限" disabled>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUpdated } from 'vue'
import { ElMessage } from 'element-plus'
import wikiModel from '~/plugins/model/wiki.js'

import UploadImgs from '~/components/base/upload-image/index.vue'
import MemberList from '~/view/book/member/MemberList.vue'
import { MentionTip } from '@plugins/addon/MentionerManager.ts'
import { window.$tipper.mention, TipType } from '@plugins/Common.ts'
import GlobalConfig from '~/config/GlobalConfig.js'
import User from '@plugins/model/base/user.js'
import { useRoute, useRouter } from 'vue-router'

const form = ref(null)
const loading = ref(false)
const wiki = reactive({ title: '', permission: 0, description: '', cover: '' })

const editWikiId = ref()
const router = useRouter()
const route = useRoute()

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
    description: [{ validator: checkInfo, trigger: 'blur', required: true }],
    cover: [{ validator: checkInfo, trigger: 'blur', required: true }],
  }
  return { rules }
}

/**
 * 表单规则验证
 */
const { rules } = getRules()

onMounted(render)
onUpdated(render)

let init = false
function render() {
  if( init ) return
  init = true

  editWikiId.value = route.query.id
  getBook()
}

const getBook = async () => {
  if (!editWikiId.value) return
  loading.value = true
  const model = await wikiModel.getBook(editWikiId.value)

  wiki.title = model.title
  wiki.description = model.desc
  wiki.cover = model.image
  wiki.members = model.members
  wiki.permission = model.permission

  loading.value = false
}

// 重置表单
const resetForm = () => {
  form.value.resetFields()
}

const submitForm = async formName => {
  form.value.validate(async valid => {
    if (valid) {
      let res = {}
      if (editWikiId.value) {
        res = await wikiModel.editBook(editWikiId.value, wiki)
      } else {
        res = await wikiModel.createBook(wiki)
        resetForm(formName)
      }

      console.log(res)

      if( res ) {

        await window.$tipper.mention(new MentionTip(editWikiId.value ? "修改成功!" : "创建成功!", 2600, TipType.SUCCESS))

        router.back()

      }

    } else {
      console.error('error submit!!')
      ElMessage.error('请将信息填写完整')
    }
  })
}

const uploadCover = ref(res => {
  const url = res[0]
  const uuid = url.split("/").at(-1)

  wiki.cover = GlobalConfig.hostName + url.replace(uuid, "") + encodeURIComponent(uuid)
})
</script>

<style lang="scss" scoped>
.container {
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
    top: 30px;

    left: 2%;
    width: 96%;
  }

  .submit {
    float: left;
  }
  transition: all .25s;
}
</style>
