<template>
  <div @click="toggle" >
    <el-tooltip
      effect="dark"
      :content="!isFullscreen ? $t('buttons.hsfullscreen') : $t('buttons.hsexitfullscreen')"
      placement="bottom"
    >
      <SvgIcon :iconClass="!isFullscreen ? 'expend' : 'compress'" />
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
/**
 * FullScreenCom
*/
defineOptions({
  name: 'FullScreenCom'
})
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()

</script>
<style lang="scss" scoped>

</style>