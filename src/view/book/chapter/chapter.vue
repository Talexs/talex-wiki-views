<template>
  <div class="container">
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="chapter" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="章节名称" prop="title">
              <el-input v-model="chapter.title" placeholder="请填写章节名称"></el-input>
            </el-form-item>
            <el-form-item label="继承章节" prop="parentChapter">
              <el-cascader clearable v-model="chapter.parentChapter" placeholder="请选择继承章节" :options="chapters" :props="{ expandTrigger: 'hover' }"/>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm">保 存</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import chapterModel from '~/plugins/model/chapter'

export default {
  props: {
    bookID: {
      type: Number
    },
    editChapterID: {
      type: Number,
      default: null,
    },
  },
  setup(props, context) {
    const form = ref(null)
    const loading = ref(false)
    const chapter = reactive({ parentChapter: null, book: props.bookID, title: '' })

    watch(() => chapter.parentChapter, () => {
      if (chapter.parentChapter instanceof Array && chapter.parentChapter.length > 0) {
        chapter.parentChapter = chapter.parentChapter[chapter.parentChapter.length - 1]
      }
    })

    const chapters = ref()
    /**
     * 表单规则验证
     */
    const { rules } = getRules()

    onMounted(() => {
      // 获取所有的章节便于设置父项
      getChapters()

      if (props.editChapterID) {

      }
    })

    const getChapters = async () => {
      loading.value = true
      chapters.value = flat2Tree(await chapterModel.getChapters(props.bookID))
      loading.value = false
    }

    // 重置表单
    const resetForm = () => {
      form.value.resetFields()
      getChapters()
    }

    const submitForm = async formName => {
      form.value.validate(async valid => {
        if (valid) {
          let res = {}
          if (props.editChapterID) {
            res = await chapterModel.editChapter(props.editChapterID, chapter)
            context.emit('editClose')
          } else {
            res = await chapterModel.createChapter(chapter)
            resetForm(formName)
          }
          // if (res.code < window.MAX_SUCCESS_CODE) {
            // ElMessage.success(`${res.message}`)
            context.emit('done', res)
          // }
        } else {
          console.error('error submit!!')
          ElMessage.error('请将信息填写完整!')
        }
      })
    }

    const back = () => context.emit('editClose')

    return {
      back,
      chapter,
      chapters,
      form,
      rules,
      resetForm,
      submitForm
    }
  },
}

function flat2Tree(array) {
  const map = new Map()

  map.set('root', { children: [] })

  array.forEach(item => map.set(item.id, { parentChapter: item.parentChapter, value: item.id, label: item.title, children: [] }))

  array.forEach(item => {
    const parent = item.parentChapter || 'root'
    const obj = map.get(parent)

    obj.children.push(map.get(item.id))
  })

  return map.get('root').children
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
  }
  return { rules }
}
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
    border-bottom: 1px solid #dae1ec;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .submit {
    float: left;
  }
}
</style>
