<template>
  <div class="container">
    <p class="title force" v-if="!editWikiId">新建维基</p>
    <p class="title force" v-else>
      <span>修改维基 ({{ editWikiId }})</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </p>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="wiki" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="标题" prop="title">
              <el-input v-model="wiki.title" placeholder="请填写标题."></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="author">
              <el-radio-group v-model="wiki.permission" class="ml-4">
                <el-radio :label="0">私有</el-radio>
                <el-radio :label="1">公开</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="editWikiId" label="成员">
              <el-button @click="memberVisible = true">编辑成员</el-button>
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
    </div>

    <teleport to="body">
      <el-drawer v-if="editWikiId" :with-header="false" :show-close="false" size="55%" v-model="memberVisible" direction="btt">
        <member-list :members="wiki.members" />
      </el-drawer>
    </teleport>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUpdated } from 'vue'
import { ElMessage } from 'element-plus'
import wikiModel from '~/plugins/model/wiki.js'

import UploadImgs from '~/components/base/upload-image/index.vue'
import MemberList from '~/view/book/member/MemberList.vue'
import { MentionTip } from '../../../plugins/addon/MentionerManager.ts'
import { forMentionTip, TipType } from '../../../plugins/Common.ts'

const emits = defineEmits(['editClose'])
const props = defineProps({
  editWikiId: {
    type: Number,
    default: null,
  }
})

const memberVisible = ref(false)
const form = ref(null)
const loading = ref(false)
const wiki = reactive({ title: '', permission: 0, description: '', cover: '' })

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
  // console.log('render') 
  if( init ) return
  init = true

  if (props.editWikiId)
    getBook()
}

const getBook = async () => {
  loading.value = true
  const model = await wikiModel.getBook(props.editWikiId)

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
      if (props.editWikiId) {
        res = await wikiModel.editBook(props.editWikiId, wiki)
      } else {
        res = await wikiModel.createBook(wiki)
        resetForm(formName)
      }

      if( res ) {

        await forMentionTip(new MentionTip("创建成功!", 2600, TipType.SUCCESS))

        back()

      }

    } else {
      console.error('error submit!!')
      ElMessage.error('请将信息填写完整')
    }
  })
}

const back = () => {
  emits('editClose')
}

const uploadCover = ref(res => {
  // console.log("@Cover", res)
  const url = res[0]
  const uuid = url.split("/").at(-1)
  // console.log(url, uuid, "http://" + url.replace(uuid, "") + encodeURIComponent(uuid))
  wiki.cover = "http://" + url.replace(uuid, "") + encodeURIComponent(uuid)
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

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
  transition: all .25s;
}
</style>
