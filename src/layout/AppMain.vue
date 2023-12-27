<template>
  <div class="app-main" :class="{ 'has-tags-view': showTags }">
    <el-scrollbar>
      <router-view v-slot="{ Component, route }">
        <Transition name="fade-transform" mode="out-in">
          <keep-alive v-if="keepAlive">
            <component :is="Component" />
          </keep-alive>
          <component
            v-else
            :is="Component"
            :key="route.fullPath"
          />
        </Transition>
      </router-view>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
/**
 * AppMain
*/
defineOptions({
  name: 'AppMain'
})
import {useTagsStore} from '@/store/modules/tags'
import { storeToRefs } from "pinia";
const tagsStore = useTagsStore();
const { keepAlive, showTags } = storeToRefs(tagsStore);
</script>
<style lang="scss" scoped>
.app-main {
  width: 100%;
  padding-top: $topBarHeight;
  box-sizing: border-box;
  height: 100vh;
  overflow-x: hidden;
  position: relative;

  &.has-tags-view {
    padding-top: $headerWithTags;
  }
}
</style>