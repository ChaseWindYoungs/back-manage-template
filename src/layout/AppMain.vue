<template>
  <div class="app-main" :class="{ 'has-tags-view': showTags }">
    <el-scrollbar>
      <router-view v-slot="{ Component, route }">
        <Transition name="fade-transform" mode="out-in">
          <div class="main-content">
            <keep-alive v-if="keepAlive" :include="includes">
            <component :is="Component" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
          </div>
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
  name: "AppMain",
});
import { computed } from "vue";
import { useTagsStore } from "@/store/modules/tags";
import { storeToRefs } from "pinia";
const tagsStore = useTagsStore();
const { keepAlive, showTags, cachePageList } = storeToRefs(tagsStore);
const includes = computed(() => cachePageList.value.map((i) => i.name));
</script>