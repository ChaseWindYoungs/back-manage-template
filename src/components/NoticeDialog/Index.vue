<template>
  <Dialog
    v-model:visible="props.visible"
    :title="title"
    :submitType="props.submitType"
    :btnWords="props.btnWords"
    :showClose="showClose"
    width="500"
    @submit="submit"
    @closeDialog="closeDialog"
  >
    <div class="content">
      <p>{{ content }}</p>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  submitType: {
    type: Number,
    default: 2
  },
  title: {
    type: String,
    default: '删除提醒',
  },
  content: {
    type: String,
    default: '是否删除信息',
  },
  submit: Function,
  closeDialog: Function,
  btnWords: {
    type:Object,
    default: {
      submit: '删除',
      cancel: '取消',
    }
  }
});

const emit = defineEmits(['update:visible']);
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    line-height: 20px;
    font-size: 14px;
  }
}
</style>
