<script setup lang="ts">
/**
 * Layout
 */
defineOptions({
  name: "Layout",
});
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/modules/app";
import AppMain from "./AppMain.vue";
import Header from "./components/Header.vue";
import VerticalNav from "./sideBar/verticalNav.vue";
import AppSetting from "@/layout/components/AppSetting/index.vue";

const appStore = useAppStore();
const { isCollapse, setting } = storeToRefs(appStore);
</script>

<template>
  <div
    class="app-container"
    :class="{
      'collapse-sidebar': !isCollapse,
      'hide-sidebar': !setting.showVerticalNav,
      [`${setting.layoutMode}`]: setting.layoutMode,
    }"
  >
    <VerticalNav v-if="setting.showVerticalNav && setting.layoutMode === 'left-menu-mode'" />
    <div class="main-container">
      <Header v-if="setting.showAppHearder" />
      <AppSetting v-else :class="{ 'app-setting-fixed': !setting.showAppHearder }" />
      <AppMain />
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
