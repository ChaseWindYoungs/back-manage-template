// 导入 Element Plus 中英文语言包
import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import AppConfig from '@/constants/AppConfig.ts';
import { store } from "@/store";
const StorageName = 'TAGS_STORE'


// setup
export const useTagsStore = defineStore(
  "tags", 
  () => { 

    // state
    const showTags = ref(AppConfig.showTags);
    const cacheTags = ref(AppConfig.cacheTags);
    const keepAlive = ref(AppConfig.keepAlive);
    const cacheTagsObj = ref({
      401: 1
    });
    const cacheTagsList = ref(JSON.parse(localStorage.getItem(StorageName) ?? '{}').cacheTagsList ?? []);
    
    // getter
    const isShowTags = computed(() => showTags.value); // 是否展示tags
    const isCacheTags = computed(() => cacheTags.value); // 是否开启tag缓存

    // actions
    function setIsShowTags(status: boolean) {
      showTags.value = status
    }
    function setIsCacheTags(status: boolean) {
      cacheTags.value = status
    }
    function setSingleCacheTags(routeItem: { name: any; }) {
      let name = routeItem.name
      if(cacheTagsList.value.length == 0) {
        cacheTagsList.value.push(routeItem)
      } else {
        if(cacheTagsList.value.findIndex((i: { name: any; }) => i.name === routeItem.name) == -1) {
          cacheTagsList.value.push(routeItem)
        } 
      }
      if(cacheTagsList.value.length > 0) {
        let obj = {}
        cacheTagsList.value.forEach(element => {
          cacheTagsObj.value[element.name] = element.name
        });
      }
      console.log(cacheTagsObj.value)
    }
    function handleTags(value: { name: any; }, mode: string, position: string) {
      const index = cacheTagsList.value.findIndex((v: { name: any; }) => v.name === value.name);
      if(!position) {
        if (index === -1) return;
        cacheTagsList.value.splice(index, 1);
      } else if(mode === 'delete'){
        if(position === 'current') {
          cacheTagsList.value.splice(index, 1);
        } else if(position === 'left'){
          cacheTagsList.value.splice(1, index - 1);
        } else if (position === 'right') {
          cacheTagsList.value.splice(index + 1, cacheTagsList.value.length - 1 - index);
        } else if (position === 'other') {
          cacheTagsList.value = cacheTagsList.value.filter((_i: any, _index: number) => _index === 0 || _index === index)
        } else if (position === 'all') {
          cacheTagsList.value.splice(1, cacheTagsList.value.length - 1)
        }
      }
    }
    return {
      showTags,
      cacheTags,
      keepAlive,
      cacheTagsList,
      cacheTagsObj,
      
      isShowTags,
      isCacheTags,

      setIsShowTags,
      setIsCacheTags,
      setSingleCacheTags,
      handleTags
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
