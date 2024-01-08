<template>
  <div @click="toggle">
    <el-tooltip effect="dark" :content="$t('tooltip.AppSetting')" placement="bottom">
      <SvgIcon v-bind="$attrs" iconClass="setting" />
    </el-tooltip>
    <AppSettingDrawer v-model="show"/>
  </div>
</template>
<script setup lang="ts">
/**
 * AppSettingCom
*/
defineOptions({
  name: 'AppSettingCom'
})
import { ref } from 'vue';
import { useBoolean } from '@/hooks/useBoolean'
import AppSettingDrawer from './AppSettingDrawer.vue';
const { bool: show, toggle } = useBoolean();

</script>
<style lang="scss" scoped>
.app-setting-fixed {
  position: fixed;
  right: 0;
  width: 40px;
  top: 30%;
  height: 40px;
  background: $primary;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  z-index: 1;
  cursor: pointer;
  
  :deep(.el-icon) {
    color: #fff;
    font-size: 20px;
  }
}
</style>