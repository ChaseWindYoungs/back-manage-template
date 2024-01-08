<template>
  <div
    class="border-2px rounded-6px cursor-pointer hover:border-primary"
    :class="[checked ? 'border-primary' : 'border-transparent']"
  >
    <el-tooltip :placement="activeConfig.placement" trigger="hover">
      <template #default>
        <div
          class="layout-card__shadow gap-6px w-96px h-64px p-6px rd-4px flex"
          :class="[mode.includes('left') ? 'flex' : 'flex-col']"
        >
          <slot></slot>
        </div>
      </template>
      <template #content>
        <span>{{ label }}</span>
      </template>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts" name="LayoutCard">
import { computed } from "vue"

// interface Props {
//   /** 布局模式 */
//   mode: ThemeLayoutMode;
//   /** 布局模式文本 */
//   label: string;
//   /** 选中状态 */
//   checked: boolean;
// }

const props = defineProps({
  mode: String,
  label: String,
  checked: Boolean,
})

// type LayoutConfig = Record<
//   UnionKey.ThemeLayoutMode,
//   {
//     placement: PopoverPlacement;
//     headerClass: string;
//     menuClass: string;
//     mainClass: string;
//   }
// >;

const layoutConfig = {
  "left-menu-mode": {
    placement: "bottom-start",
    headerClass: "",
    menuClass: "w-1/3 h-full",
    mainClass: "w-2/3 h-3/4",
  },
  "left-menu-mix-mode": {
    placement: "bottom",
    headerClass: "",
    menuClass: "w-1/4 h-full",
    mainClass: "w-2/3 h-3/4",
  },
  "top-menu-mode": {
    placement: "bottom",
    headerClass: "",
    menuClass: "w-full h-1/4",
    mainClass: "w-full h-3/4",
  },
  "top-menu-mix-mode": {
    placement: "bottom-end",
    headerClass: "",
    menuClass: "w-full h-1/4",
    mainClass: "w-2/3 h-3/4",
  },
}

const activeConfig = computed(() => layoutConfig[props.mode])
</script>

<style scoped>
.layout-card__shadow {
  box-shadow: 0 1px 2.5px rgba(0, 0, 0, 0.18);
}
</style>
