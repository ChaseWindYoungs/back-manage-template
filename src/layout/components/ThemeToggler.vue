<template>
  <el-switch
    v-model="setting.theme"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @click="changeTheme"
  />
</template>
<script setup name="ThemeToggler" lang="ts">
/**
 * ThemeToggler
 */
import { useAppStore } from "@/store/modules/app"
import { storeToRefs } from "pinia"
import { Sunny, Moon } from "@element-plus/icons-vue"
import { changeThemeValue } from "@/utils/style"

const appStore = useAppStore()
const { setting } = storeToRefs(appStore)

async function changeTheme(event) {
  console.log(setting.value.theme)
  const x = event.clientX
  const y = event.clientY
  if (!document.startViewTransition) {
    changeThemeValue(setting.value.theme)
    return
  }
   // 画圆
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const transition = document.startViewTransition(() => {
    changeThemeValue(setting.value.theme)
  })
  await transition.ready
  const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
  document.documentElement.animate(
    {
      clipPath: !setting.value.theme ? clipPath : [...clipPath].reverse(),
    },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: !setting.value.theme
        ? "::view-transition-new(root)"
        : "::view-transition-old(root)",
    }
  )
}
</script>
<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 进入dark模式和退出dark模式时，两个图像的位置顺序正好相反 */
::view-transition-old(root) {
  z-index: 99999999;
}

::view-transition-new(root) {
  z-index: 1;
}

/* 根据自己选择器修改 */
html.dark::view-transition-old(root) {
  z-index: 1;
}
html.dark::view-transition-new(root) {
  z-index: 99999999;
}
</style>
