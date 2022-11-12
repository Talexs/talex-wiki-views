<template>
  <div class="PersonalInfo-Container LayoutCenter-Frame">
    <p class="title">个人信息</p>
    <div class="user">
      <p class="title">用户信息</p>
      <div class="content">
        <div class="name-wrapper">
          <div class="label">昵称</div>
          <div class="name">
            <el-input
                    v-if="user.username"
                    placeholder="请输入内容"
                    v-model="user.username"
                    suffix-icon="el-icon-edit"
                    ref="input"
                    disabled
            ></el-input>
          </div>
        </div>
        <div class="avatar" title="点击修改头像">
          <UploadImg :show-control-btn="false" :show-file-size="false" round width="80px" height="80px" :value="[ { src: avatarUrl, display: user?.avatar || defaultAvatar } ]" @upload="uploadCover" :maxNum="1" :rules="{ maxSize: 50, minWidth: 32, minHeight: 32 }" :multiple="false" />
        </div>
        </div>
    </div>
    <div class="password">
      <p class="title">修改密码</p>
      <el-form
              ref="formRef"
              :model="form"
              status-icon
              :rules="formRules"
              @submit.prevent
              label-width="90px"
              label-position="right"
      >
        <el-form-item label="原始密码" prop="old_password">
          <el-input type="password" v-model="form.old_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" v-model="form.new_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password" label-position="top">
          <el-input type="password" v-model="form.confirm_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="formRef.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import UploadImg from '~/components/base/upload-image/index.vue'
import defaultAvatar from '~/assets/static/avatar.png'
import GlobalConfig from '~/config/GlobalConfig.js'

import { useStore } from '~/plugins/store/index'
import { ref, reactive, computed } from 'vue'
import { MentionTip } from '~/plugins/addon/MentionerManager.ts'
import { forMentionTip, forWikiTip, sleep, TipType } from '~/plugins/Common.ts'
import User from '~/plugins/model/base/user.js'
import { useRouter } from 'vue-router'

const store = useStore()
const user = ref(store.local.user)

const formRef = ref()
const form = reactive({
  old_password: '',
  new_password: '',
  confirm_password: '',
})

const formRules = reactive({
  old_password: [{ validator: (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原始密码不能为空'))
      }
      callback()
    }, trigger: 'blur', required: true }],
  new_password: [{ validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位数'))
      } else {
        // if (form.checkPassword !== '') {
        formRef.value.validateField('confirm_password')
        // }
        callback()
      }
    }, trigger: 'blur', required: true }],
  confirm_password: [{ validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }, trigger: 'blur', required: true }],
})
const avatarUrl = computed(() => store.local.user?.avatar || "")

function submitForm() {
  if (form.old_password === '' && form.new_password === '' && form.confirm_password === '') {
    return
  }

  if (this.form.old_password === this.form.new_password) {
    forMentionTip(new MentionTip('新密码不能与原始密码一样', 2600, TipType.ERROR, true))
    return
  }

  formRef.value.validate(async valid => {
    // eslint-disable-line
    if (valid) {
      const res = await User.updatePassword(this.form)
      if (res.code < window.MAX_SUCCESS_CODE) {
        await forMentionTip( new MentionTip( `${ res.message }` ) )
        formRef.value.resetFields()

        await sleep(1200)

        store.local.loggedIn = false
        store.local.user = null
        store.local.permissions = []

        await useRouter().push( '/' )

      }
    } else {
      await forMentionTip(new MentionTip('信息核对失败!', 2600, TipType.ERROR, true))
      return false
    }
  })

}

async function uploadCover(res) {
  const url = res[0]
  const uuid = url.split("/").at(-1)

  store.local.user.avatar = user.value.avatar = avatarUrl.value = GlobalConfig.hostName + url.replace(uuid, "") + encodeURIComponent(uuid)

  const back = await User.updateUserInfo(avatarUrl.value)

  if( back ) {

    await forMentionTip( new MentionTip( '头像修改成功!', 2000, TipType.INFO, true ) )

  }
}

</script>

<script>
export default {
name: 'PersonalInfo'
}
</script>

<style lang="scss" scoped>
.PersonalInfo-Container {
  .user {
    position: relative;
    padding: 0 20px 25px 20px;

    border-bottom: 1px solid var(--el-color-info-light-9);
    .content {
      padding-left: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name-wrapper {
        display: flex;
        align-items: center;
        .label {
          margin-right: 20px;
          color: var(--el-text-color-regular);
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
  .password {
    :deep(.el-input) {
      width: 280px;
    }
    :deep(.el-button) {
      margin-top: 10px;
    }
    padding: 25px 20px 25px 20px;
  }
}
</style>
