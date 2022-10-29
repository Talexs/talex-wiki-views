<template>
  <div class="container">
    <div class="title" v-if="!editMemberId">新建成员{{ editMemberId }}</div>
    <div class="title" v-else>
      <span>修改成员</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="wiki" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="对象" prop="title">
              <el-input v-model="wiki.title" placeholder="请填写标题."></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="author">
              <el-radio-group v-model="wiki.permission" class="ml-4">
                <el-radio :label="0">私有</el-radio>
                <el-radio :label="1">公开</el-radio>
              </el-radio-group>
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
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import memberModel from '@/model/wiki-member'

export default {
  props: {
    editMemberId: {
      type: Number,
      default: null,
    },
  },
  setup(props, context) {
    const memberVisible = ref(false)
    const form = ref(null)
    const loading = ref(false)
    const wiki = reactive({ user_id: null, permission: 0 })

    const listAssign = (a, b) => Object.keys(a).forEach(key => {
      a[key] = b[key] || a[key]
    })

    /**
     * 表单规则验证
     */
    const { rules } = getRules()

    onMounted(() => {
      if (props.editMemberId) {
        getMembers()
      }
    })

    const getMembers = async () => {
      loading.value = true
      const res = await memberModel.getMembers(props.editMemberId)
      listAssign(wiki, res)
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
          if (props.editMemberId) {
            res = await memberModel.editWikiMember(props.editMemberId, wiki)
            context.emit('editClose')
          } else {
            res = await memberModel.createWikiMember(wiki)
            resetForm(formName)
          }
          if (res.code < window.MAX_SUCCESS_CODE) {
            ElMessage.success(`${res.message}`)
          }
        } else {
          console.error('error submit!!')
          ElMessage.error('请将信息填写完整')
        }
      })
    }

    const back = () => {
      context.emit('editClose')
    }

    return {
      back,
      wiki,
      form,
      rules,
      resetForm,
      submitForm,
      memberVisible
    }
  },
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
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
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

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
