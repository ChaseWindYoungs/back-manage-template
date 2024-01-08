<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="srcImg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  
</template>
<script setup lang="ts">
/**
 * Home
*/
defineOptions({
  name: 'Home'
})
import { getAssetsFile } from '@/utils/index.ts'
import { ref } from 'vue';
const srcImg = getAssetsFile('images/vue.svg');

const test = ref('')
</script>
<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>