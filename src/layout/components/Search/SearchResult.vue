<template>
  <div ref="resultRef" class="search-result">
    <div
      v-for="(item, index) in options"
      :key="item.path"
      :ref="'resultItemRef' + index"
      :class="{'active': path === item.name}"
      class="result-item"
      @click="handleTo"
      @mouseenter="handleMouse(item)"
    >
      <SvgIcon
        v-if="item.meta && item.meta.icon" 
        :iconClass="item.meta.icon"
        :title="item.meta?.title ?? ''"
      />
      <span class="result-item-title">
        {{ item.meta?.title }}
      </span>
      <el-icon><TopRight /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * SearchResult
*/
import { ref, computed} from 'vue';

interface optionsItem {
  path: string;
  meta?: {
    icon?: string;
    title?: string;
  };
}
interface Emits {
  (e: "update:path", val: string): void;
  (e: "enter"): void;
}

const props = defineProps({
  path: {
    type: String,
    default: ''
  },
  options: {
    type: Array<optionsItem>,
    default: () => []
  },
})
const emit = defineEmits<Emits>();
const resultRef = ref(null)
const active = computed({
  get: () => props.path,
  set: (val: string) => emit("update:path", val)
});
function handleTo() {
  emit("enter");
}
/** 鼠标移入 */
async function handleMouse(item: { path: string; }) {
  active.value = item.name;
}
</script>
<style lang="scss" scoped>
.result-item {
  border: 1px solid #ececec;
  border-radius: 4px;
  padding: 10px 20px ;
  color: #333;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all .3s;
  height: 50px;
  line-height: 50px;
  &.active{
    color: white;
    background: $primary;
    border-color: $primary;
    font-size: 18px;
  }
  .result-item-title{
    flex: 1;
    margin-left: 10px;
  }
  
  
}

</style>