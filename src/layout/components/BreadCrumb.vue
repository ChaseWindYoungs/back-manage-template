<template>
  <el-breadcrumb separator="/" class="app-bread-crumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item  
        v-for="(item, index) in breadcrumbList"
        :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === breadcrumbList.length - 1" class="no-redirect">
          {{ item.meta?.title ?? '' }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta?.title ?? '' }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup lang="ts">
/**
 * BreadCrumb
*/
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";
import { compile } from "path-to-regexp"
// import { findRouteByPath, getParentPaths } from "@/router/utils.ts";
// import { RouteRecordRaw,} from "vue-router";
// import { transformI18n } from "@/plugins/i18n";

const route = useRoute();
const router = useRouter();
const routes: any = router.options.routes;

onMounted(() => {
  handleBreadcrumbList()
});
/** 定义响应式数据 breadcrumbs，用于存储面包屑导航信息 */
const breadcrumbList = ref<RouteLocationMatched[]>([])

/** 获取面包屑导航信息 */
function handleBreadcrumbList() {
  breadcrumbList.value = route.matched.filter((item) => item.meta?.title && item.meta?.breadcrumb !== false)
} 

/** 处理面包屑导航点击事件 */
function handleLink(item: RouteLocationMatched) {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(pathCompile(path))
}

/** 编译路由路径 */
const pathCompile = (path: string) => {
  const toPath = compile(path)
  return toPath(route.params)
}

watch(
  () => route.path,
  () => {
    handleBreadcrumbList()
  },
  {
    deep: true
  }
);

</script>
<style lang="scss" scoped>
.app-bread-crumb{
  font-size: 14px;
  margin-left: 10px;
  line-height: $topBarHeight;
}
</style>