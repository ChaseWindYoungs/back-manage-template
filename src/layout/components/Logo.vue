<template>
  <div class="app-logo-content" v-show="setting.showAppName">
    <img :src="srcImg" class="icon" :alt="AppConfig.name" />
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
<style lang="scss" scoped>
.app-logo-content{
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  .icon{
    width: 30px;
    height: 30px;
  }
  .name{
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    color: $white;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

</style>