<template>
  <div class="app-collapse-btn" @click="handleCollapse">
    <el-tooltip
      class="box-item"
      effect="light"
      :content="isCollapse ? $t('status.hsCollapseIn') : $t('status.hsCollapseOut')"
      placement="right"
    >
      <SvgIcon class="icon" :iconClass="isCollapse ? 'outdent' : 'indent' " />
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
/**
 * Collapse
*/
defineOptions({
  name: 'Collapse'
})
import { storeToRefs } from "pinia";
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore();
const { changeSideBarCollapse } = appStore
const { isCollapse } = storeToRefs(appStore);

function handleCollapse() {
  changeSideBarCollapse()
}
</script>
<style lang="scss" scoped>
.app-collapse-btn {
  box-shadow: 0 0 6px -2px var(--el-color-primary);
  color: $white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  .icon {
    color:$primary;
    font-size: 20px;
  }
  .text{
    margin-left: 10px;
  }

}
</style>