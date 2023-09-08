<template>
  <div @click="toggle">
    <el-tooltip
      effect="dark"
      :content='$t("tooltip.search")'
      placement="bottom"
    >
    <SvgIcon iconClass="search" />
    </el-tooltip>
    <SearchModel v-model="show" />
  </div>
</template>
<script setup lang="ts">
/**
 * Search
*/
import SearchModel from './SearchModel.vue'
import { useBoolean } from '@/hooks/useBoolean'

const { bool: show, toggle } = useBoolean();

</script>
<style lang="scss" scoped>

</style>