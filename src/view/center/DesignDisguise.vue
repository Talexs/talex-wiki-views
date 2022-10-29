<template>
  <div class="DesignDisguise-Container LayoutSub-Frame">
    <p class="title force">外观设置</p>
    <div class="DesignDisguise-Form">
      <CheckBox disabled v-model="colorBlindness" title="&nbsp;我是色盲用户，为我呈现更合理的页面。"></CheckBox>
      <CheckBox disabled v-model="colorBlindness" title="&nbsp;提交我的页面颜色数据，为我做颜色自适变化。"></CheckBox>
      <CheckBox disabled v-model="colorBlindness" title="&nbsp;允许广告数据跟随主题。"></CheckBox>
<!--      <CheckBox v-model="colorBlindness" title="&nbsp;允许语言数据跟随主题。"></CheckBox>-->
<!--      <CheckBox v-model="colorBlindness" title="&nbsp;在不同设备之间同步我的外观主题。"></CheckBox>-->
    </div>
    <p class="title force">主题偏好</p>
    <blockquote>
      选择 TalexWiki 对您呈现的页面主题，或与您的系统同步并在白天和夜间主题之间自动切换。
    </blockquote>
    <div style="display: flex">
      <CheckBox disabled style="position: relative;left: 15px" v-model="colorBlindness" title="&nbsp;颜色主题跟随系统"></CheckBox>
      <br />
      <CheckBox disabled style="position: relative;left: 15px" v-model="colorBlindness" title="&nbsp;颜色主题跟随时间"></CheckBox>
      <br />
    </div>
    <div class="DesignDisguise-Main">
      <DesignMode @click="changeTheme('light')" :select="theme === 'light'" theme="#EEEEEE" title="明净光亮" />
      <DesignMode @click="changeTheme('dark')" :select="theme === 'dark'" theme="#212121" title="奇异暗黑" />
      <DesignMode @click='none' style="--danger: #400700;--success: #014003" theme="#282C34" title="云镜雾色" vip />
      <DesignMode @click='none' style="--danger: red;--success: green" theme="#000000" title="强烈对比" vip />
      <DesignMode @click='none' style="--danger: #de3116;--success: #76de1b" theme="#DECf6D" title="柔和暖色" vip />
      <DesignMode @click='none' style="--danger: #ba2913;--success: #2eba46" theme="#6E5BBA" title="细致冷色" vip />
      <DesignMode @click='none' style="--danger: #c74216;--success: #52c732" theme="#C761A0" title="蜜桃花色" vip />
      <DesignMode @click='none' style="--danger: #d34313;--success: #92d32a" theme="#D3A237" title="书香淡色" vip />
      <span style="left: 10px" class="tip">注意，主题预览图仅供参考，因不同设备、不同应用不同所造成观感有所差别，请以实际呈现为准。</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DesignMode from '@components/common/addon/DesignMode.vue'
import CheckBox from '@components/common/checkbox/CheckBox.vue'
import { useStore } from '~/plugins/store/index.ts'
import { forMentionTip, sleep, TipType } from '~/plugins/Common.ts'
import { MentionTip } from '~/plugins/addon/MentionerManager.ts'

const store = useStore()

const theme = ref(store.local.theme)
const colorBlindness = ref(false)

async function changeTheme(themeStr) {
  store.local.theme = theme.value = themeStr
  await forMentionTip(new MentionTip("切换成功!", 1400, TipType.SUCCESS))
}

async function none() {


}

</script>

<script>
export default {
  name: "DesignDisguise"
}
</script>

<style lang="scss" scoped>
.DesignDisguise-Container {
  .DesignDisguise-Form {
    display: flex;
  }

}

.DesignDisguise-Main {
  position: relative;
  display: flex;
  margin-top: 20px;
  padding: 5px;
  flex-wrap: wrap;

  width: 100%;

}
</style>
