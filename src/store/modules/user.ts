import { ref } from 'vue';
import { defineStore } from "pinia";
import { store } from "@/store";

export const StorageName = "USER_STORE"

// setup
export const useUserStore = defineStore(
  "user",
  () => {

    // state
    const userInfo = ref();
    const hasBtnList = ref([])
    const authMenuTree = ref([]) // 用户的初始权限树
    const sideAuthMenu = ref([])

    // getter

    // actions
    function setUserInfo(info: void | PromiseLike<void>) {
      return new Promise<void>((resolve, reject) => {
        userInfo.value = info
        resolve(info)
      })
    }

    return {
      userInfo,
      authMenuTree,
      hasBtnList,
      sideAuthMenu,
      setUserInfo,
    }
  },
  {
    persist: {
      key: StorageName,
      storage: localStorage,
    },
  },
)

export function useUserStoreHook() {
  return useUserStore(store);
}
