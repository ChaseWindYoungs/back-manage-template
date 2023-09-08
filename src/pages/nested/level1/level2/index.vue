<template>
  <div>
    level2----index1
    <div class="ml-20">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * index
*/
import { ref } from 'vue';

</script>
<style lang="scss" scoped>
.ml-20{
  margin-left: 20px;
}
</style>