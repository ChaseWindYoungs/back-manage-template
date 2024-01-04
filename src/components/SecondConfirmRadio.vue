<template>
  <el-radio-group v-model="_value" v-bind="$attrs" :disabled="disabled">
    <el-radio-button :label="item.value" v-for="item in list" :key="item.value">{{
      item.label
    }}</el-radio-button>
  </el-radio-group>
  <!-- <el-switch
    v-model="flag"
    
    :inline-prompt="$attrs.inlinePrompt ?? true"
    :active-text="$attrs.activeText ?? $t('buttons.hsOpen')"
    :inactive-text="$attrs.activeText ?? $t('buttons.hsClose')"
  /> -->
</template>
<script setup lang="ts">
/**
 * SecondConfirmRadio
*/
defineOptions({
  name: 'SecondConfirmRadio'
})

import { ref, watch, computed, useAttrs, getCurrentInstance } from 'vue';

let { proxy } = getCurrentInstance()
const props = defineProps({
  modelValue: {
    type: String,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tipFlag: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'change']);
const _value = ref()
const _oldValue = ref()
const flag = ref(true)
watch(
  () => props.modelValue,
  (newV, oldV) => {
    _value.value = newV
    _oldValue.value = oldV
  },
  { deep: true, immediate: true, }
)
watch(
  () => _value.value,
  (newV, oldV) => {
    if(oldV != _oldValue.value && flag.value) {
      proxy
        .$NoticeDialog({
          title: "请确认",
          content: "切换后，当前选项修改的数据将不会保存，请确认要切换吗？",
          btnWords: {
            submit: '确认',
            cancel: '取消',
          }
        })
        .then(() => {
          emit('update:modelValue', newV);
          emit('change', newV);
          props.tipFlag && (flag.value = false)
        })
        .catch((e: any) => {
          let temp = _value.value
          _value.value = oldV
          _oldValue.value = temp
        })
    } else {
      emit('update:modelValue', newV);
      emit('change', newV);
    }
  },
  {
    deep: true,
    immediate: true,
  }
)

const attrs = useAttrs()
</script>
<style lang="scss" scoped>

</style>