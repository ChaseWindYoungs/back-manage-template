<template>
  <el-statistic :value="Count" v-bind="$attrs" />
</template>

<script setup name="StatisticNum" lang="ts">
/**
 * StatisticNum
 */
import { ref, watch } from "vue";
import { useTransition } from "@vueuse/core";

interface Props {
  value?: number;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  duration: 1500,
});

const num = ref(0);
const Count = useTransition(num, {
  duration: props.duration,
});

watch(
  () => props.value,
  () => (num.value = props.value),
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
