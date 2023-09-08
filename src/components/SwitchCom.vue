<template>
  <el-switch
    v-model="flag"
    v-bind="$attrs"
    :inline-prompt="$attrs.inlinePrompt ?? true"
    :active-text="$attrs.activeText ?? $t('buttons.hsOpen')"
    :inactive-text="$attrs.activeText ?? $t('buttons.hsClose')"
  />
</template>
<script setup lang="ts">
/**
 * SwitchCom
*/
defineOptions({
  name: 'SwitchCom'
})
import { ref, computed, useAttrs } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
});
const emit = defineEmits(['update:modelValue', 'change']);
const flag = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
    emit('change', val);
  }
});
const attrs = useAttrs()
</script>
<style lang="scss" scoped>

</style>