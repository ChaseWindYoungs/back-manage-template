<template>
  <el-tooltip
    effect="dark"
    :content="content"
    placement="bottom"
  >
    <el-icon @click="click" v-bind="$attrs">
      <component :is="iconName" />
    </el-icon>
  </el-tooltip>
</template>
<script setup lang="ts">
/**
 * ToolTipIcon
*/
const props =defineProps({
  iconName: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['click'])
function click() {
  emit('click')
}

</script>
<style lang="scss" scoped>

</style>