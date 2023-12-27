<script setup lang="ts">

import { computed, onBeforeMount } from 'vue';
import { useAppStore } from '@/store/modules/app'
import { useAppStoreHook } from '@/store/modules/app'

const { greyChange, weakChange, setting } = useAppStoreHook();
onBeforeMount(() => {
  greyChange(setting.showGreyColor)
  weakChange(setting.showWeakColor)
})
const appStore = useAppStore();
const lang = computed(() => appStore.language);
</script>

<template>
  <el-config-provider :locale="lang">
    <router-view />
  </el-config-provider>
</template>

<style scoped>
.left-menu {
  width: 200px;
  background: #e4e4e44f;
  height: 100vh;
}

.right-info {
  flex: 1;
}
</style>
