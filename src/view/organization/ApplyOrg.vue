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
  <div class="ApplyOrg-Container LayoutSub-Frame">
    <p class="title force">{{ editId ? "修改" : "创建" }}组织</p>

    <div style="margin-top: -10px;">
      <el-tabs class="flat header-filter">
        <el-tab-pane label="属性">
          <el-row>
            <el-col :lg="16" :md="20" :sm="24" :xs="24">
              <el-form :model="org" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
                <el-form-item label="名称" prop="title">
                  <el-input v-model="org.name" placeholder="请填写组织名称."></el-input>
                </el-form-item>
<!--                <el-form-item label="权限" prop="author">-->
<!--                  <el-radio-group v-model="wiki.permission" class="ml-4">-->
<!--                    <el-radio :label="1">私有</el-radio>-->
<!--                    <el-radio :label="0">公开</el-radio>-->
<!--                  </el-radio-group>-->
<!--                </el-form-item>-->
                <el-form-item label="封面" prop="image">
                  <!--              <el-input v-model="book.image" placeholder="请填写封面地址"></el-input>-->
                  <!--              {{ // [ book.image ] }}-->
                  <upload-imgs :value="[ { src: org?.cover, display: org?.cover } ]" @upload="uploadCover" :maxNum="1" :rules="{ maxSize: 30, minWidth: 32, minHeight: 32 }" :multiple="false" />
                  <!--              <TUploader v-model="wiki.image" :rules="{ maxSize: 64, minWidth: 32, minHeight: 32 }" />-->
                </el-form-item>
                <el-form-item label="简介" prop="summary">
                  <el-input
                          type="textarea"
                          :autosize="{ minRows: 4, maxRows: 8 }"
                          placeholder="请输入简介"
                          v-model="org.summary"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="submit">
                  <el-button type="primary" @click="submitForm">{{ editId ? "修 改" : "创 建" }}</el-button>
                  <el-button @click="resetForm">重 置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :disabled="!editId" label="成员">
          <member-list @select="handleAddMember" :members="org._members"/>
        </el-tab-pane>
        <el-tab-pane label="权限" disabled>

        </el-tab-pane>
      </el-tabs>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "ApplyOrg"
}
</script>

<script setup>
import { reactive, ref, onMounted, onUpdated, computed, watch, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import { organizationModel } from '~/plugins/model/org/OrganizationModel.ts'

import UploadImgs from '~/components/base/upload-image/index.vue'
import MemberList from './OrgMemberList.vue'
import { MentionTip } from '@plugins/addon/MentionerManager.ts'
import { TipType } from '@plugins/addon/Tipper.ts'
import GlobalConfig from '~/config/GlobalConfig.js'
import { useRoute, useRouter } from 'vue-router'

const form = ref()
const loading = ref( false )
const org = reactive( { name: '', summary: '', cover: '' } )

const editId = ref()
const router = useRouter()
const route = useRoute()

watchEffect( () => {
  if ( !org.members ) return

  org._members = [ { status: 0, user: org.owner }, ...org.members ]

})


async function handleAddMember( item ) {
  if ( ! editId.value ) {
    ElMessage.error( '请先创建组织' )
    return
  }

  const result = await organizationModel.invite( editId.value, item.id )

  console.log( result )
}

/**
 * 表单验证规则
 */
function getRules() {
  /**
   * 验证回调函数
   */
  const checkInfo = ( rule, value, callback ) => {
    if ( ! value ) {
      callback( new Error( '信息不能为空' ) )
    }
    callback()
  }
  const rules = {
    name: [ { validator: checkInfo, trigger: 'blur', required: true } ],
    // permission: [{ validator: checkInfo, trigger: 'blur', required: true }],
    description: [ { validator: checkInfo, trigger: 'blur', required: true } ],
    cover: [ { validator: checkInfo, trigger: 'blur', required: true } ],
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
  if ( init ) return
  init = true

  editId.value = route.params.id
  getOrg()
}

const getOrg = async () => {
  if ( ! editId.value ) return
  loading.value = true
  const model = await organizationModel.info( editId.value )

  // console.log( model )

  org.id = model.id
  org.name = model.name
  org.summary = model.summary
  org.cover = model.avatar
  org._members = org.members = model.members
  org.owner = model.owner
  org.owner_id = model.owner_id

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
      if ( editId.value ) {
        res = await organizationModel.edit( editId.value, org )
      } else {
        res = await organizationModel.create( org )
        // res = await wikiModel.createBook(wiki)
        resetForm( formName )
      }

      console.log( res )

      if ( res ) {

        await window.$tipper.mention( new MentionTip( editId.value ? "修改成功!" : "创建成功!", {
          type: TipType.SUCCESS
        } ) )

        if ( editId.value ) router.back()
        else await router.push( '/org/' + res.id )

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

  org.cover = GlobalConfig.hostName + url.replace(uuid, "") + encodeURIComponent(uuid)
})
</script>

<style lang="scss" scoped>

:deep(.el-tabs__content) {
  top: 20px;

}

</style>
