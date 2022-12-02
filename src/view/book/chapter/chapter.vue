<template>
  <div class="container">
    <h1 class="title">添加维基</h1>

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

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import chapterModel from '~/plugins/model/chapter'
import { forWikiTip, TipType } from '~/plugins/addon/Tipper.ts'

const props = defineProps({
  bookId: {
    type: Number
  },
  editChapterID: {
    type: Number,
    default: null,
  },
})

const emits = defineEmits(['created', 'editClose'])

const form = ref(null)
const loading = ref(false)
const chapter = reactive({ parentChapter: -1, wiki: props.bookId, title: '' })

watch(() => chapter.parentChapter, () => {
  if (chapter.parentChapter instanceof Array && chapter.parentChapter.length > 0) {
    chapter.parentChapter = chapter.parentChapter[chapter.parentChapter.length - 1]
  }
})

const chapters = ref([])
/**
 * 表单规则验证
 */
const { rules } = getRules()

async function getChapters() {
  loading.value = true
  chapters.value = flat2Tree(await chapterModel.getChapters(props.bookId))
  loading.value = false
}

getChapters()

function resetForm () {
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
      await forWikiTip( "添加成功!", 2600, TipType.SUCCESS )
      context.emit('done', res)
      // }
    } else {
      console.error('error submit!!')
      ElMessage.error('请将信息填写完整!')
    }
  })
}

const back = () => emits('editClose')

function flat2Tree(array) {
  const map = new Map()

  map.set(-1, { children: [] })

  array.forEach(item => map.set(item.id, { parentChapter: item.parent, value: item.id, label: item.title, children: [] }))

  array.forEach(item => {
    const parent = item.parentChapter || -1
    const obj = map.get(parent)

    obj.children.push(map.get(item.id))
  })

  return map.get(-1).children
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
    &:after {
      content: "";
      position: absolute;

      width: 80%;
      left: 10%;

      height: 1px;
      top: 100%;

      background-color: var(--el-border-color);

    }
    position: relative;
    padding: 0 10px;

    height: 59px;
    font-size: 20px;
    font-weight: 600;
    text-indent: 40px;

    box-sizing: border-box;
    width: 100%;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }
  .wrap {
    position: relative;

    width: 120%;
    height: 100%;
  }
  padding: 20px 0;
  //position: relative;

  width: 50%;
  //height: 40%;

  background-color: var(--el-fill-color-lighter);

  .submit {
    float: left;
  }
}
</style>
