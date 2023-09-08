<template>
  <div>
    <template v-if="menuItem?.children && menuItem?.children.length > 0">
      <el-sub-menu :index="menuItem.path">
        <!-- subMenud 的标题 -->
        <template #title>
          <div class="menuItem-title">
            <SvgIcon
              v-if="menuItem.meta && menuItem.meta.icon" 
              :iconClass="currentRouteName === menuItem.name ? menuItem.meta.activeIcon ?? menuItem.meta.icon : menuItem.meta.icon"
            />
            <span class="menuItem-name">{{ menuItem.meta?.title ?? '' }}</span>
          </div>
        </template>
        <MenuItem 
          :menuItem="item" 
          v-for="item in menuItem?.children" 
          :key="item" 
          :base-path="resolvePath(item.path)"
        />
      </el-sub-menu>
    </template>
    <template v-else>
      <AppLink v-if="menuItem.meta" :to="resolvePath()" :menuItem="menuItem">
        <el-menu-item :index="basePath" >
          <div class="menuItem-title">
            <el-tooltip
              class="box-item"
              effect="dark"
              :offset="30"
              :content="menuItem.meta?.title"
              placement="right"
              :disabled="!(menuItem.meta?.showTooltip && !isCollapse)"
            >
              <SvgIcon
                v-if="menuItem.meta && menuItem.meta.icon" 
                :iconClass="currentRouteName === menuItem.name ? menuItem.meta.activeIcon ?? menuItem.meta.icon : menuItem.meta.icon"
              />
            </el-tooltip>
            <span class="menuItem-name">{{ menuItem.meta?.title ?? '' }}</span>
          </div>
        </el-menu-item>
      </AppLink>
    </template>
  </div>

</template>
<script setup lang="ts">
/**
 * MenuItem
*/
defineOptions({
  name: 'MenuItem'
})
import { ref, watch } from 'vue';
import { isExternal } from '@/utils'
import path from 'path-browserify';
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore();
const { isCollapse } = storeToRefs(appStore);

const props = defineProps({
  menuItem: {
    type: Object,
    default: () => {}
  },
    /**
   * 父层级完整路由路径(eg:/level/level_3/level_3_1)
   */
   basePath: {
    type: String,
    required: true
  }
})

/**
 * 解析路径
 *
 * @param routePath 路由路径
 */
 function resolvePath(routePath: string ='') {
  
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  // 完整路径 = 父级路径(/level/level_3) + 路由路径
  const fullPath = path.resolve(props.basePath, routePath); // 相对路径 → 绝对路径
  return fullPath;
}

const route = useRoute()
const currentRouteName = ref('');
watch(
  () => route,
  (newV) => {
    currentRouteName.value = newV.name ?? ''
  },
  { deep: true,immediate:true }
)

</script>
<style lang="scss" scoped>
.menuItem-title {
  vertical-align: middle;
  .menuItem-name {
    margin-left: 10px;
  }
}
</style>