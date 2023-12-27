<template>
  <el-dialog
    v-model="dialogVisible"
    :width="width"
    :title="title"
    :append-to-body="appendToBody"
    :before-close="cancel"
    :close-on-click-modal="closeOnClickModal"
    :class="{ vc, 'full-box': full }"
    :destroy-on-close="destroyOnClose">
    <slot :loading="loading" />
    <template #footer>
      <!-- normal type -->
      <div class="dialog-footer" v-if="showFooter && !btnWords.reject">
        <el-button @click="cancel" plain>
          {{ btnWords.cancel }}
        </el-button>
        <el-button v-if="btnWords.download"  @click="downloadFile" :type="submitBtnType">
          {{ btnWords.download }}
        </el-button>
        <el-button
          :disabled="cantSubmit"
          :type="submitBtnType"
          @click="submit"
          :loading="loading">
          {{ btnWords.submit }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue';
import { throttle } from '@/utils'

const emit = defineEmits(['submit', 'update:visible', 'closeDialog', 'download']);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '560px'
  },
  cantSubmit: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  btnWords: {
    type: Object,
    default() {
      return {
        submit: '确定',
        cancel: '取消'
      };
    }
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  submitType: {
    type: Number,
    default: 0
  },
  vc: {
    type: Boolean,
    default: false
  },
  full: {
    type: Boolean,
    default: false
  },
  destroyOnClose:{
    type: Boolean,
    default: true
  },
  appendToBody: {
    type: Boolean,
    default: true
  }
});

const submitBtnType = computed(() => {
  const types = ['primary', 'warning', 'danger'];
  return types[props.submitType];
});

const dialogVisible = computed({
  get: () => props.visible,
  set: value => {
    emit('update:visible', value);
  }
});
// ------methods------
const emitSubmit = e => {
  emit('submit', e);
};

const submit = throttle(emitSubmit);

const cancel = () => {
  !props.showFooter && emit('update:visible', false);
  emit('closeDialog');
};
const downloadFile = () => {
  emit('download');
}
</script>
<style lang="scss" scoped>
.dialog-footer{
  text-align: center;
}
</style>
