<template>
  <div class="app-sub-menu app-vertical-nav">
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :unique-opened="setting.uniqueOpened"
        mode="vertical"
        class="menu-box" 
        :collapse="!isCollapse"
        :default-active="route.path"
      >
        <MenuItem 
          v-for="item in routeArr" 
          :key="item.path" 
          :menuItem="item" 
          :basePath="item.path"
        />
      </el-menu>
    </el-scrollbar>
    <Collapse v-if="setting.showNavCollapse" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'VerticalNav'
})
// import { computed } from 'vue';
import { storeToRefs } from "pinia";
import { routes } from '@/router/index'
import { useRoute } from 'vue-router';
import { useAppStore } from '@/store/modules/app'
import Logo from '../components/Logo.vue';
import Collapse from '../components/Collapse.vue';
import { computed } from "vue";
import { onMounted } from "vue";
const appStore = useAppStore();
const { isCollapse, setting } = storeToRefs(appStore);

// function goto(item: { path: RouteLocationRaw; }) {
//   router.push(item.path);
// }

const routeArr = computed(() => {
  let Layout = routes.find(i => i.name === 'Layout')
  let layoutChilds = Layout.children ?? []
  let arr = routes.filter(i => i.meta.showLink !== false)
  layoutChilds.forEach(i => {
    arr.unshift(i)
  })
  arr.forEach(i => {
    if(!(i.children?.length >0)) {
      i.meta.showTooltip = true
    }
  })
  return arr
})
const route = useRoute()
onMounted(() => {
  console.log(route)
})
</script>

<style lang="scss" scoped>
.app-vertical-nav {
  display: flex;
  flex-direction: column;
  background-color: $menuBg;
  height: 100vh;
  width: $menuExpandWidth;
  transition: width $transDuration; // 折叠时带有动画效果
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
}

// .hide-sidebar {
//   width: $menuFoldWidth;
// }

.menu-box {
  transition: width $transDuration; // 折叠时带有动画效果
  flex: 1;
}
</style>
