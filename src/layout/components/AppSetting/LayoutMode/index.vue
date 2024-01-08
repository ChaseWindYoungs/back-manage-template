<template>
  <div class="flex flex-wrap flex-justify-around">
    <layout-card
      v-for="item in modeList"
      :key="item.value"
      :mode="item.value"
      :label="item.label"
      :checked="item.value === mode"
      @click="checkItem(item.value)"
      class="mb-10"
    >
      <template v-if="item.value === 'left-menu-mode'">
        <div class="w-18px h-full bg-primary-50 rd-4px"></div>
        <div class="flex flex-1 flex-col gap-6px">
          <div class="h-16px bg-primary rd-4px"></div>
          <div class="flex-1 bg-primary-25 rd-4px"></div>
        </div>
      </template>
      <template v-if="item.value === 'left-menu-mix-mode'">
        <div class="w-8px h-full bg-primary-50 rd-4px"></div>
        <div class="w-16px h-full bg-primary-50 rd-4px"></div>
        <div class="flex-1 flex-col gap-6px">
          <div class="h-16px bg-primary rd-4px"></div>
          <div class="flex-1 bg-primary-25 rd-4px"></div>
        </div>
      </template>
      <template v-if="item.value === 'top-menu-mode'">
        <div class="h-16px bg-primary rd-4px"></div>
        <div class="flex-1 flex gap-6px">
          <div class="flex-1 bg-primary-25 rd-4px"></div>
        </div>
      </template>
      <template v-if="item.value === 'top-menu-mix-mode'">
        <div class="h-16px bg-primary rd-4px"></div>
        <div class="flex-1 flex gap-6px">
          <div class="w-18px bg-primary-50 rd-4px"></div>
          <div class="flex-1 bg-primary-25 rd-4px"></div>
        </div>
      </template>
    </layout-card>
  </div>
</template>

<script setup lang="ts" name="LayoutMode">
import { LayoutCard } from "./components"

const props = defineProps({
  mode: String,
})

const emits = defineEmits(["changeMode"])
const modeList = [
  { value: "left-menu-mode", label: "左侧菜单模式" },
  // { value: "left-menu-mix-mode", label: "左侧菜单混合模式" },
  { value: "top-menu-mode", label: "顶部菜单模式" },
  // { value: "top-menu-mix-mode", label: "顶部菜单混合模式" },
]

function checkItem(value) {
  emits('changeMode', value)
}
</script>

<style scoped>
.layout-card__shadow {
  box-shadow: 0 1px 2.5px rgba(0, 0, 0, 0.18);
}
.bg-primary {
  background-color: rgba(31, 117, 255, 0.75);
}
.bg-primary-50 {
  background-color: rgba(31, 117, 255, 0.50);
}
.bg-primary-25 {
  background-color: rgba(31, 117, 255, 0.25);
}
</style>
