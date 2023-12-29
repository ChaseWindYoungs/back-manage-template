<template>
  <el-dialog 
    class="search-dialog"
    v-model="visible" 
    :append-to-body="true"
    :show-close='false'
    :draggable="true"
    :before-close="handleClose"
    @opened="inputRef.focus()"
    @closed="inputRef.blur()"
  >
    <div class="input-box">
      <el-input 
        v-model="keyword"
        clearable
        ref="inputRef"
        size="large"
        placeholder="搜索菜单（中文模式下支持拼音搜索）"
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>
    <div class="search-result-container" v-loading="loading">
      <el-scrollbar>
        <el-empty
          v-if="resultOptions.length === 0"
          :description="$t('status.hsSearchEmpty')"
        />
        <SearchResult
          v-else
          ref="resultRef"
          v-model:path="activePath"
          :options="resultOptions"
          @click="handleEnter"
        />
      </el-scrollbar>
    </div>
    <template #footer>
      <div class="search-result-footer" v-if="resultOptions.length !== 0">
        <p>{{$t('status.hsSearchTotal')}} <span> {{ resultOptions.length }} </span> {{$t('status.hsSearchItem')}}</p>
      </div>
    </template>
   
  </el-dialog>
</template>
<script setup lang="ts">
/**
 * SearchModel
*/
defineOptions({
  name: 'SearchModel'
})
import { ref, computed, shallowRef } from 'vue';
import { useDebounceFn, onKeyStroke } from "@vueuse/core";
import { routes } from '@/router/index'
import { cloneDeep } from "lodash-es";
import SearchResult from "./SearchResult.vue";
import { useRouter } from "vue-router";
import { transformI18n } from '@/plugins/i18n';
import { isAllEmpty } from '@/utils/is';
import { useI18n } from "vue-i18n";
import { match } from "pinyin-pro";

const emit = defineEmits(['update:modelValue',]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
});

const visible = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  }
});
const router = useRouter();
const keyword = ref('')
const activePath = ref('')
const inputRef = ref<HTMLInputElement | null>(null);
const resultRef = ref(null);
const resultOptions = shallowRef([]);
const handleSearch = useDebounceFn(search, 300);
const loading = ref(false)
const { locale } = useI18n();

function handleEnter () {
  const { length } = resultOptions.value;
  if (length === 0 || activePath.value === "") return;
  router.push({name: activePath.value});
  handleClose();
}

function handleClose() {
  visible.value = false;
  /** 延时处理防止用户看到某些操作 */
  setTimeout(() => {
    resultOptions.value = [];
    keyword.value = "";
  }, 200);
}

/** 查询 */
function search() {
  loading.value = true
  const flatMenusData = flatTree(menusData.value).filter(i => i?.meta?.showLink !== false);
  let arr = flatMenusData.filter(menu => {
    return keyword.value
      ? transformI18n(menu.meta?.title)
          .toLocaleLowerCase()
          .includes(keyword.value.toLocaleLowerCase().trim()) ||
          (locale.value === "zh" &&
            !isAllEmpty(
              match(
                transformI18n(menu.meta?.title).toLocaleLowerCase(),
                keyword.value.toLocaleLowerCase().trim()
              )
            ))
      : false;
  })
  if (resultOptions.value?.length > 0) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = "";
  }
  
  // 等待的延迟动画
  setTimeout(() => {
    resultOptions.value = arr
    if (resultOptions.value?.length > 0) {
      activePath.value = resultOptions.value[0]?.name ?? '';
    } else {
      activePath.value = "";
    }
    loading.value = false
  }, 400);
 
}

/************* utils **************/
/** 菜单树形结构 */
const menusData = computed(() => cloneDeep(routes));

/** 将菜单树形结构扁平化为一维数组，用于菜单查询 */
function flatTree(arr: []) {
  const res: any[] = [];
  function deep(arr: []) {
    arr.forEach((item: []) => {
      res.push(item);
      item.children && deep(item.children);
    });
  }
  deep(arr);
  return res;
}


</script>

<style lang="scss" scoped>
/**
 * ! search-dialog 本身是挂载在body下面的，样式无法渗透到body，因此必须挂载在全局的样式中，
 * ! 有关的样式都在style/element-plus.scss 文件中
*/
.input-box{
  display: flex;
  align-items: center;
  border-radius:4px;
  
  .el-input {
    font-size: 18px;
  }
  :deep(.el-input__wrapper) {
    padding:5px 10px;
  }
  :deep(.el-input__prefix) {
    color: $primary;
    font-size: 24px;
    margin-left: 5px;
  }
}
.search-result-footer {
  box-shadow: 0 -1px 0 0 #e0e3e8, 0 -3px 6px 0 rgb(69 98 155 / 12%);
  text-align: right;
  font-size: 18px;
  padding: 10px 20px;
  span {
    color: $primary;
  }
}

</style>