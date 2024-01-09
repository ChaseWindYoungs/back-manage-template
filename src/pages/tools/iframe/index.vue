<template>
  <div class="full-content">
    <iframe class="w-full h-full" :src="src"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const src = ref(route.meta.src)

</script>

<style scoped></style>
