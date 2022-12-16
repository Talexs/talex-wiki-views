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
  <div class="Notification-Container">
    <el-tabs tabPosition="right" v-model="activeName">
      <el-tab-pane label="系统消息" name="system">
        <template #label>
        <span>
          <span>系统消息</span>
          <span v-if="msgs.system?.length > 0" class="badge">
            +{{ msgs.system.length }}
          </span>
        </span>
        </template>
        <div class="Shadow-Shader">
          <el-scrollbar>
            <transition-group>
              <div v-for="(msg, index) in msgs.system" :style="`--index: ${index < 10 ? (index * 0.05 + .15) : .7}s`"
                   :key="msg.id" class="msg-card transition-cubic">
                <div slot="header">
                  <span>{{ msg.title }}</span>
                  <span class="msg-time">{{ formatTime( msg.createdAt ) }}</span>
                </div>
                <div class="msg-content">
                  {{ msg.value }}
                </div>
              </div>
            </transition-group>
          </el-scrollbar>
        </div>
      </el-tab-pane>

      <el-tab-pane label="站内私信" name="msg">

      </el-tab-pane>

      <el-tab-pane label="申请通知" name="apply">
        <template #label>
        <span>
          <span>申请通知</span>
          <span v-if="msgs.application?.length > 0" class="badge">
            +{{ msgs.application.length }}
          </span>
        </span>
        </template>
        <div class="Shadow-Shader">
          <el-scrollbar>
            <transition-group>
              <div v-for="(msg, index) in msgs.application"
                   :style="`--index: ${index < 10 ? (index * 0.05 + .15) : .7}s`"
                   :key="msg.id" class="msg-card org-apply transition-cubic">
                <UserAvatar :id="msg.sender_id"/>
                <div slot="header">
                  <span>{{ msg.title }}</span>
                  <span class="msg-time">{{ formatTime( msg.createdAt ) }}</span>
                </div>
                <div class="msg-content" v-if="msg.extra.type === 'organization'">
                  诚邀您加入 组织
                  <el-popover
                          :width="300"
                          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
                  >
                    <template #reference>
                      <span class="org-name">
                        {{ msg.extra.org.name }}
                      </span>
                    </template>
                    <template #default>
                      <div
                              class="demo-rich-conent"
                              style="display: flex; gap: 16px; flex-direction: column"
                      >
                        <el-avatar
                                :size="60"
                                :src="msg.extra.org.avatar"
                                style="margin-bottom: 8px"
                        />
                        <div>
                          <p
                                  class="demo-rich-content__name"
                                  style="margin: 0; font-weight: 500"
                          >
                            {{ msg.extra.org.name }} ({{ msg.extra.org.members.length + 1 }}/15 成员)
                          </p>
                          <p
                                  class="demo-rich-content__mention"
                                  style="margin: 0; font-size: 14px; color: var(--el-color-info)"
                          >
                            @{{ msg.extra.org.owner.username }} | creator
                          </p>
                        </div>

                        <p class="demo-rich-content__desc" style="margin: 0">
                          {{ msg.extra.org.summary }}
                        </p>

                        <div style="display: flex">
                          <el-button plain type="success">同 意</el-button>
                          <el-button plain type="warning">拒 绝</el-button>
                          <el-button plain type="info">忽 略</el-button>
                        </div>
                      </div>
                    </template>
                  </el-popover>
                </div>
                <div v-else class="msg-content">
                  {{ msg.value }}
                </div>
              </div>
            </transition-group>
          </el-scrollbar>
        </div>
      </el-tab-pane>

      <el-tab-pane label="互动相关" name="interactive">

      </el-tab-pane>

      <el-tab-pane label="反馈建议" name="feedback">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Notification"
}
</script>

<script setup>
import { useStore } from '~/plugins/store/index.ts'
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { formatDateDistance } from '~/plugins/addon/utils'
import UserAvatar from '~/components/common/avatar/UserAvatar.vue'

const props = defineProps( [ 'notification' ] )
const store = useStore()

const msgs = reactive( {
  system: [],
  application: []
} )

function formatTime( time ) {
  return formatDateDistance( new Date( time ) )
}

watchEffect( () => {
  processData( props.notification )
} )

// watch( () => store.system.user.notifications, () => {
//   processData( store.system.user.notifications )
// } )

function processData( val ) {
  if ( ! val?.rows ) return
  const rows = val.rows

  console.log( rows )

  ;[ ...rows ].forEach( ( row ) => {

    row.extra = JSON.parse( row.extra_msg || "{}" )

    if ( row.type === 0 ) {

      if ( row.extra?.type === 'system' ) {

        msgs.system.push( row )

      }

    } else if ( row.type === 1 ) {

    } else if ( row.type === 2 ) {

    } else if ( row.type === 3 ) {

      msgs.application.push( row )

    } else if ( row.type === 4 ) {

    }

  } )

}

const activeName = ref( 'system' )
</script>

<style lang="scss" scoped>
.Shadow-Shader {
  &:before, &:after {
    z-index: 1;
    content: "";
    position: absolute;

    width: 100%;
    height: 3%;

    //background-color: blue;
    border-radius: 0 0 8px 8px;
    background-image: linear-gradient(var(--el-bg-color), transparent);
    //box-shadow: 0 0 10px 10px var(--el-fill-color-lighter);
  }

  &:after {
    bottom: 0;
    border-radius: 8px 8px 0 0;
    background-image: linear-gradient(transparent, var(--el-bg-color));
  }

  position: relative;

  height: 100%;
}

:deep(.el-tabs) {
  position: relative;
  display: flex;
  flex-direction: row-reverse;

  height: calc(100% - 0px);

  .el-tab-pane, .el-tabs__content {
    position: relative;
    margin-top: -1px;

    height: calc(100% - 0px);

    overflow: unset;
  }

  .el-scrollbar {
    overflow: unset;
  }

  .el-scrollbar__wrap {
    position: relative;

    height: calc(100% + 0px);
  }

  .el-scrollbar__view {
    position: relative;

    transform: translateY(5px);
  }

  .el-scrollbar__bar.is-vertical {

    transform: translate(10px, 3px);
  }
}

.msg-card {
  position: relative;

  margin: 10px 5px;

  width: calc(100% - 10px);

  min-height: 80px;

  border: 1px solid var(--el-border-color);
  background-color: var(--el-fill-color-light);
  border-radius: 8px;

  animation: leftLoadIn .25s var(--index) backwards;

  .msg-time {
    position: absolute;
    padding: 1px 4px;

    right: 10px;
    top: 50%;

    color: var(--el-text-color-secondary);

    font-size: 12px;
    border-radius: 8px;
    background-color: var(--el-fill-color-darker);
    transform: translate(10px, -50%);
    opacity: 0;
    transition: .25s;
  }

  &.org-apply {
    padding: 0 8px;
    display: flex;
    align-items: center;

    min-height: 60px;

    box-sizing: border-box;

    &:hover {
      .msg-time {
        transform: translate(0, -50%);
        opacity: 1;
      }

      .msg-content {
        transform: translate(-30px, 0);
        color: transparent;
      }

      .org-name {
        left: -50px;
        //transform: translate(-30px, 0);
      }
    }
  }

  .msg-content {
    .org-name {
      position: relative;
      color: var(--el-color-primary);
      left: 0;
      font-weight: 500;
      transition: .25s;
    }

    :deep(.el-avatar) {
      position: relative;

    }

    padding: 10px;
    transition: .25s;
  }
}

.Notification-Container {
  height: 100%;

  overflow: hidden;
}
</style>
