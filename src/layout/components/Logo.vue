<template>
  <div class="app-logo-content" v-show="setting.showAppName">
    <SvgIcon className="icon" iconClass="logo" />
    <span class="name" v-show="isCollapse">{{ AppConfig.name }}</span>
  </div>
</template>
<script setup lang="ts">
/**
 * Logo
*/
defineOptions({
  name: 'AppLogo'
})
// import { computed } from 'vue';
import AppConfig from '@/constants/AppConfig.ts';
import { getAssetsFile } from '@/utils/index.ts'
import { storeToRefs } from "pinia";
import { useAppStore } from '@/store/modules/app'

const srcImg = getAssetsFile('images/vue.svg');
const appStore = useAppStore();
const { isCollapse, setting } = storeToRefs(appStore);

// const showName = computed(() => isCollapse.value);

</script>
