import AppConfig from '@/constants/AppConfig.ts';
import { useTagsStoreHook } from "@/store/modules/tags";
import { useTimeoutFn } from "@vueuse/core";

export const getSettingValOrDef = (key: string, storageName: string, storageType: string = 'local') => {
  if (storageType === 'local') {
    let item = JSON.parse(localStorage.getItem(storageName));
    return item && item?.setting ? item.setting[key] : AppConfig[key]
  } else if (storageType === 'session') {
    let item = JSON.parse(sessionStorage.getItem(storageName));
    return item && item?.setting ? item.setting[key] : AppConfig[key]
  } else return AppConfig[key]
}

/** 处理缓存路由（添加、删除、刷新） */
export function handleAliveRoute({ name }, mode?: string) {
  switch (mode) {
    case "add":
      useTagsStoreHook().handleCachePages({ mode: "add", name });
      break;
    case "delete":
      useTagsStoreHook().handleCachePages({ mode: "delete", name });
      break;
    case "refresh":
      useTagsStoreHook().handleCachePages({ mode: "refresh", name });
      break;
    default:
      useTagsStoreHook().handleCachePages({ mode: "delete", name });
      useTimeoutFn(() => {
        useTagsStoreHook().handleCachePages({ mode: "add", name });
      }, 100);
  }
}
