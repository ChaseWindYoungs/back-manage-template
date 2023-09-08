
<template>
  <svg class="svg-icon" aria-hidden="true">
    <title>{{ title }}</title>
    <use :xlink:href="`#icon-${iconClass}`" />
  </svg>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SvgIcon'
})
const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  title: String,
});

</script>

<style lang="scss" scoped>
.svg-icon{
  cursor: pointer;
  fill: currentColor;
  width: 20px;
  height: 20px;
}

</style>
