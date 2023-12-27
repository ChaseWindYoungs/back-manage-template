<script setup lang="ts">
/**
 * Layout
 */
defineOptions({
  name: 'Layout'
})
import { storeToRefs } from "pinia";
import { useAppStore } from '@/store/modules/app'
import AppMain from './AppMain.vue'
import Header from './components/Header.vue'
import VerticalNav from './sideBar/verticalNav.vue'
import AppSetting from '@/layout/components/AppSetting.vue'

const appStore = useAppStore();
const { isCollapse, setting } = storeToRefs(appStore);


</script>

<template>
  <div class="app-container" :class="{ 'collapse-sidebar': !isCollapse, 'hide-sidebar': !setting.showVerticalNav, }">
    <VerticalNav  v-if="setting.showVerticalNav"/>
    <div class="main-container">
      <Header v-if="setting.showAppHearder" />
      <AppSetting v-else :class="{'app-setting-fixed': !setting.showAppHearder }" />
      <AppMain />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-container{
  display: flex;
  align-items: flex-start;
  .main-container{
    flex: 1;
    height: 100vh;
    min-height: 100%;
    min-width: 300px;
    margin-left: $menuExpandWidth;
    transition: margin $transDuration;
    position: relative;
    background: #f0f2f5;
    width: calc(100% - $menuExpandWidth);
  }
}
</style>