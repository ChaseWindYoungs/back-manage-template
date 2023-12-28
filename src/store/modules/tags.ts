// 导入 Element Plus 中英文语言包
import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import AppConfig from '@/constants/AppConfig.ts'
import { store } from "@/store";
import { isBoolean, isEmpty, isEqual, isUrl } from '@/utils/is';
import { multiType } from '../type'
import { debounce, getKeyList } from "@/utils"

const StorageName = 'TAGS_STORE'

// setup
export const useTagsStore = defineStore(
  "tags",
  () => {

    // state
    const showTags = ref(AppConfig.showTags); // 是否展示tag
    const keepAlive = ref(AppConfig.keepAlive); // 是否需要开启缓存
    const multiTags = ref([]); //保存的页面tag
    const cachePageList = ref([]);

    // getter
    const isShowTags = computed(() => showTags.value); // 是否展示tags

    // actions
    function setIsShowTags(status: boolean) {
      showTags.value = status
    }
    function setIsKeepAlive(status: boolean) {
      keepAlive.value = status
    }
    function setMutilTags(routeItem: string | undefined) {
      let { name, path, fullPath, query, meta } = routeItem
      if (multiTags.value.length == 0) {
        multiTags.value.push(routeItem)
      } else {
        let item = multiTags.value.find((i: { name: any; }) => i.name === routeItem.name)
        if (!item) {
          multiTags.value.push(routeItem)
        } else {
          // 路由相同
          if (item?.query === query) {
            handleTags(routeItem, 'refresh')
          } else {
            item = routeItem
          }
        }
      }
    }

    function handleTags<T>(mode: string, value?: T | multiType, position?: any) {
      if (mode === 'add') {
        const tagVal = value as multiType;
        // 不添加到标签页
        if (tagVal?.meta?.hiddenTag) return;
        // 如果是外链无需添加信息到标签页
        if (isUrl(tagVal?.name)) return;
        // 如果title为空拒绝添加空信息到标签页
        if (tagVal?.meta?.title.length === 0) return;
        // showLink:false 不添加到标签页
        if (isBoolean(tagVal?.meta?.showLink) && !tagVal?.meta?.showLink) return;
        const tagPath = tagVal.path;
        // 判断tag是否已存在
        const tagHasExits = multiTags.value.some(tag => {
          return tag.path === tagPath;
        });
        // 判断tag中的query键值是否相等
        const tagQueryHasExits = multiTags.value.some(tag => {
          return isEqual(tag?.query, tagVal?.query);
        });
        if (tagHasExits && tagQueryHasExits) return;
        // 动态路由可打开的最大数量
        const dynamicLevel = tagVal?.meta?.dynamicLevel ?? -1;
        if (dynamicLevel > 0) {
          if (
            multiTags.value.filter(e => e?.path === tagPath).length >=
            dynamicLevel
          ) {
            // 如果当前已打开的动态路由数大于dynamicLevel，替换第一个动态路由标签
            const index = multiTags.value.findIndex(
              item => item?.path === tagPath
            );
            index !== -1 && multiTags.value.splice(index, 1);
          }
        }
        multiTags.value.push(value);
      }
      const index = multiTags.value.findIndex((v: { name: any; }) => v.name === value.name);
      if (mode === 'delete') {
        if (position === 'current') {
          multiTags.value.splice(index, 1);
        } else if (position === 'left') {
          multiTags.value.splice(1, index - 1);
        } else if (position === 'right') {
          multiTags.value.splice(index + 1, multiTags.value.length - 1 - index);
        } else if (position === 'other') {
          multiTags.value = multiTags.value.filter((_i: any, _index: number) => _index === 0 || _index === index)
        } else if (position === 'all') {
          multiTags.value.splice(1, multiTags.value.length - 1)
        }
      }
      handleCachePages(value, mode)
    }
    function handleCachePages<T>(value: T | multiType, mode: string, position?: string) {
      if(!keepAlive.value) return
      if(value.meta.hiddenTag) return
      const delIndex = cachePageList.value.findIndex((v: any) => v.name === value.name);
      switch (mode) {
        case "refresh":
          cachePageList.value = cachePageList.value.filter((v: any) => v.name !== value.name);
          break;
        case "add":
          cachePageList.value.push(value);
          break;
        case "delete":
          delIndex !== -1 && cachePageList.value.splice(delIndex, 1);
          break;
      }
      
      cachePageList.value = cachePageList.value.filter((item, index, self) => {
        // 只保留第一次出现的元素
        return self.findIndex(obj => obj.name === item.name) === index;
      });
      /** 监听缓存页面是否存在于标签页，不存在则删除 */
      debounce(() => {
        let cacheLength = cachePageList.value.length;
        const nameList = getKeyList(multiTags.value, "name");
        while (cacheLength > 0) {
          nameList.findIndex(v => v === cachePageList.value[cacheLength - 1].name) ===
            -1 &&
            cachePageList.value.splice(
              cachePageList.value.indexOf(cachePageList.value[cacheLength - 1]),
              1
            );
          cacheLength--;
        }
      })();
    }
    return {
      showTags,
      multiTags,
      keepAlive,
      cachePageList,
      isShowTags,
      setIsShowTags,
      setIsKeepAlive,
      setMutilTags,
      handleTags,
      handleCachePages
    }
  },
  {
    persist: {
      key: StorageName,
      storage: localStorage,
    },
  },
)

export function useTagsStoreHook() {
  return useTagsStore(store);
}
