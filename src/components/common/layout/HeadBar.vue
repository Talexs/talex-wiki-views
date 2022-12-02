<template>
  <div class="HeadBar-Container">
    <el-row :gutter="20">
      <el-col :span="2">
        <Logo />
      </el-col>
      <el-col :span="20">
        <MenuIcon class="only-pe-display">
          <div class="HeadBar-Main">
            <TFSelector router-mode>
              <TFSelectorItem plain to="/index" title="主页"></TFSelectorItem>
<!--              <TFSelectorItem plain disabled to='/team' title="团队"></TFSelectorItem>-->
              <TFSelectorItem plain disabled to='/template' title="模板"></TFSelectorItem>
<!--              <TFSelectorItem plain :disabled="!store.local.loggedIn" to='/user/security' title="安全" />-->
              <TFSelectorItem plain to='/about' title="关于" />
            </TFSelector>
          </div>
        </MenuIcon>
        <div class="HeadBar-Main only-pc-display">
          <TFSelector router-mode>
            <TFSelectorItem plain to="/index" title="主页"></TFSelectorItem>
            <TFSelectorItem plain disabled to='/team' title="团队"></TFSelectorItem>
            <TFSelectorItem plain disabled to='/template' title="模板"></TFSelectorItem>
            <TFSelectorItem plain :disabled="!store.local.loggedIn" to='/user/security' title="安全" />
            <TFSelectorItem plain to='/about' title="关于" />
          </TFSelector>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="HeadBar-Personal">
          <div class="UserPersonal" v-if="store.local.loggedIn">
            <TalexDropdown hover-trigger style="margin-right: 10px">
              <TalexDropItem>
                <template #icon>
                  <el-icon><Document /></el-icon>
                </template>
                <template #label>
                  文档
                </template>
              </TalexDropItem>
              <TalexDropItem>
                <template #icon>
                  <el-icon><Odometer /></el-icon>
                </template>
                <template #label>仪表盘</template>
              </TalexDropItem>
              <TalexDropItem>
                <template #icon>
                  <el-icon><PieChart /></el-icon>
                </template>
                <template #label>
                  数据图
                </template>
              </TalexDropItem>
              <TalexDropItem divider></TalexDropItem>
              <TalexDropItem>
                <template #icon>
                  <el-icon><Notebook /></el-icon>
                </template>
                <template #label>
                  维基文档
                </template>
              </TalexDropItem>
              <TalexDropItem divider></TalexDropItem>
              <TalexDropItem>
                <template #icon>
                  <el-icon><Compass /></el-icon>
                </template>
                <template #label>
                  指南文档
                </template>
              </TalexDropItem>
              <TalexDropItem>
                <template #icon>
                  <el-icon><Link /></el-icon>
                </template>
                <template #label>
                  协作组织
                </template>
              </TalexDropItem>
              <TalexDropItem>
                <template #icon>
                  <el-icon><Finished /></el-icon>
                </template>
                <template #label>
                  代办审阅
                </template>
              </TalexDropItem>
            </TalexDropdown>
            <TalexDropdown hover-trigger>
              <template #display>
                <UserAvatar @click="$router.push('/user/dashboard')" :id="store.local.user.id" style="cursor: pointer" />
              </template>
              <div class="HeadBar-UserPopper">
                <UserAvatar :id="store.local.user.id" style="cursor: pointer" />
                <p v-if="store?.local"> {{ store.local.user.username }} </p>
              </div>
              <TalexDropItem divider />
              <TalexDropItem multi="left">
                <template #icon>
                  <span style="position: relative;top: -3px">{{ theme === 'light' ? '明净光亮' : '奇异暗黑' }}</span>
                </template>
                <template #label>外观</template>
                <template #multiple>
                  <TalexDropItem @click="theme.name = 'light';theme.adapt = ThemeAdapt.NONE">
                    <template #icon>
                      <el-icon>
                        <Sunny />
                      </el-icon>
                    </template>
                    <template #label>明净光亮</template>
                  </TalexDropItem>
                  <TalexDropItem @click="theme.name = 'dark';theme.adapt = ThemeAdapt.NONE">
                    <template #icon>
                      <el-icon>
                        <Moon />
                      </el-icon>
                    </template>
                    <template #label>奇异暗黑</template>
                  </TalexDropItem>
                  <TalexDropItem disabled>
                    <template #icon>
                      <el-icon>
                        <Cloudy />
                      </el-icon>
                    </template>
                    <template #label>跟随系统</template>
                  </TalexDropItem>
                  <TalexDropItem disabled divider />
                  <TalexDropItem disabled>
                    <template #icon>
                      <el-icon>
                        <Notebook />
                      </el-icon>
                    </template>
                    <template #label>书香淡色</template>
                  </TalexDropItem>
                  <TalexDropItem disabled>
                    <template #icon>
                      <el-icon>
                        <Coordinate />
                      </el-icon>
                    </template>
                    <template #label>强烈对比</template>
                  </TalexDropItem>
                  <TalexDropItem disabled divider />
                  <TalexDropItem disabled>
                    <template #icon>
                      <el-icon>
                        <Collection />
                      </el-icon>
                    </template>
                    <template #label>柔和暖色</template>
                  </TalexDropItem>
                  <TalexDropItem disabled>
                    <template #icon>
                      <el-icon>
                        <Tickets />
                      </el-icon>
                    </template>
                    <template #label>细致冷色</template>
                  </TalexDropItem>
                  <TalexDropItem disabled>
                    <template #icon>
                      <el-icon>
                        <Watermelon />
                      </el-icon>
                    </template>
                    <template #label>蜜桃花色</template>
                  </TalexDropItem>
                  <TalexDropItem disabled>
                    <template #icon>
                      <el-icon>
                        <MostlyCloudy />
                      </el-icon>
                    </template>
                    <template #label>云镜雾色</template>
                  </TalexDropItem>
                </template>
              </TalexDropItem>
              <TalexDropItem divider />
              <TalexDropItem @click="$router.push('/user/personal')">
                <template #icon>
                  <el-icon><Setting /></el-icon>
                </template>
                <template #label>
                  设置
                </template>
              </TalexDropItem>
              <TalexDropItem @click="$router.push('/about')">
                <template #icon>
                  <el-icon><Help /></el-icon>
                </template>
                <template #label>
                  帮助
                </template>
              </TalexDropItem>
              <TalexDropItem divider />
              <TalexDropItem @click="store.local.loggedIn = false" danger>
                <template #icon>
                  <el-icon><SwitchButton /></el-icon>
                </template>
                <template #label>
                  退出登录
                </template>
              </TalexDropItem>
            </TalexDropdown>
          </div>
          <TalexDialog v-else v-model="headDialogVisible" has-display>
            <template #display>
              <el-button type="primary">登录 / 注册</el-button>
            </template>
            <Login @close="headDialogVisible = false" @success="headDialogVisible = false" />
          </TalexDialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Logo from '~/components/common/icon/Logo.vue'
import TalexDialog from '~/components/common/dialog/TalexDialog.vue'
import Login from '~/view/base/Login.vue'
import { provide, ref, toRef } from 'vue'
import { useStore } from '~/plugins/store/index'
import TalexDropdown from '~/components/common/dropdown/talex-dropdown.vue'
import TalexDropItem from '~/components/common/dropdown/talex-drop-item.vue'
import UserAvatar from '~/components/common/avatar/UserAvatar.vue'

import TFSelector from '~/components/common/selector/TFSelector.vue'
import TFSelectorItem from '~/components/common/selector/TFSelectorItem.vue'

import { MostlyCloudy, Watermelon, Document, Notebook, Odometer, PieChart, Compass, Link, Finished, Sunny, Moon, Cloudy, Coordinate, Collection, Tickets, Setting, Help, SwitchButton } from '@element-plus/icons-vue'
import MenuIcon from '~/components/common/icon/MenuIcon.vue'
import { ThemeAdapt } from '~/plugins/addon/enums'

const store = useStore()

const headDialogVisible = toRef(store.system.global.login, 'dialog')
const theme = store.local.theme

// async function changeTheme(themeStr) {
//   store.local.theme = theme.value = themeStr
//   await window.$tipper.mention( new MentionTip( "切换成功!", 1400, TipType.SUCCESS ) )
// }

</script>

<style lang="scss">
.HeadBar-UserPopper {
  .el-avatar {
    width: 64px;
    height: 64px;
  }
  position: relative;
  padding-top: 8px;
  display: flex;

  justify-content: center;
  align-items: center;
  vertical-align: center;
  flex-direction: column;

  width: 200px;
}
</style>

<style lang="scss" scoped>

.HeadBar-Personal {
  float: right;
  height: 100%;

  position: relative;
  .UserPersonal {
    height: 100%;

    right: 30px;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: center;
    :deep(.el-avatar) {
      position: relative;
      top: 3px;
    }
  }
}

.HeadBar-Main {
  .header-label {
    &:first-child:before {
      content: "";
      position: absolute;

      width: 100%;
      height: 2px;

      bottom: 0;

      background-color: var(--el-color-primary);
    }
    position: relative;
    padding: 0 5px;
    display: inline-flex;
    margin: 0 20px;

    height: 50px;

    justify-content: center;
    transition: all .05s;
  }
  position: relative;
  display: flex;

  height: 100%;

  align-items: center;
  justify-content: center;
}

.HeadBar-Content {
  position: relative;
  padding: 0 2%;
  display: flex;

  justify-content: space-between;
  flex: 1;

  line-height: 50px;
}

.HeadBar-Container {
  position: sticky;
  padding: 0 3%;
  //display: flex;
  //justify-content: space-between;

  top: 0;

  width: 94%;
  height: 49px;

  user-select: none;
  border-bottom: 1px solid var(--el-border-color);
  backdrop-filter: saturate(180%) brightness(110%) blur(18px);
}
</style>
