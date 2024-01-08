<template>
  <div
    class="app-hearder"
    :class="{
      'has-tags-view': showTags,
      'hide-header': !setting.showAppHearder,
      'hide-app-top-bar': !setting.showAppTopBar,
    }"
  >
    <div class="app-top-bar" v-if="setting.showAppTopBar">
      <template v-if="setting.layoutMode === 'top-menu-mode'">
        <Logo />
        <VerticalNav class="flex-1 overflow-hidden px-10px" />
      </template>
      <BreadCrumb v-if="setting.showBreadCrumb && setting.layoutMode === 'left-menu-mode'" />
      <div class="top-right">
        <Search class="tool-item" v-if="setting.showAppSearch" />
        <FullScreen class="tool-item" />
        <ThemeToggler />
        <AppSetting class="tool-item" v-if="setting.showAppSetting" />
      </div>
    </div>
    <TagsView v-if="showTagsView" />
  </div>
</template>
<script setup lang="ts">
/**
 * Header
 */
defineOptions({
  name: "Header",
});
import BreadCrumb from "./BreadCrumb.vue";
import FullScreen from "./FullScreenCom.vue";
import AppSetting from "./AppSetting/index.vue";
import TagsView from "./TagsView/index.vue";
import Search from "../components/Search/Search.vue";
import Logo from "./Logo.vue";
import VerticalNav from "../sideBar/verticalNav.vue";
import ThemeToggler from "./ThemeToggler.vue";
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useTagsStore } from "@/store/modules/tags";
import { storeToRefs } from "pinia";
const appStore = useAppStore();
const { setting } = storeToRefs(appStore);
const tagsStore = useTagsStore();
const { showTags, multiTags } = storeToRefs(tagsStore);
const showTagsView = computed(() => {
  return showTags.value && multiTags.value.length > 0;
});
</script>
<style lang="scss" scoped>
.app-hearder {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 998;
  width: calc(100% - $menuExpandWidth);
  transition: width $transDuration;
  background-color: $white;
  box-shadow: 0 0 6px -2px var(--el-color-primary);
  &.has-tags-view {
    height: $headerWithTags;
    .app-top-bar {
      border-bottom: 1px solid #ececec;
    }
  }
  .app-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $topBarHeight;
  }
  &.hide-app-top-bar {
    height: calc($headerWithTags - $topBarHeight);
  }
}
.top-right {
  padding-right: 20px;
  display: flex;
  align-items: center;
  height: 100%;
  .tool-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #f8f8f8;
    }
    :deep(.el-icon) {
      height: 100%;
      font-size: 20px;
      transition: all 0.3s;
      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
