// 导入 Element Plus 中英文语言包
import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { store } from "@/store";
import { getSettingValOrDef } from '../utils'
import { toggleClass } from '@/utils'
import AppConfig from '@/constants/AppConfig';
export const StorageName = 'APP_SETTING'

const settingKeys = [
  'collapse',
  'showAppName',
  'showVerticalNav',
  'showAppTopBar', 
  'showAppSearch', 
  'showAppSetting',
  'showBreadCrumb', 
  'showAppHearder', 
  'showNavCollapse', 
  'showGreyColor', 
  'showWeakColor', 
  'uniqueOpened', 
]

// setup
export const useAppStore = defineStore(
  "app", 
  () => {
    // state
    let initConfig = initSetting()
    // const setting = ref(initSetting())
    const setting = ref({
      // showAppName: localStorage.getItem(StorageName) ? localStorage.getItem(StorageName).setting ? localStorage.getItem(StorageName).setting.showAppName : AppConfig.showAppName : AppConfig.showAppName
      showAppName: AppConfig.showAppName
    })
    const curCase = ref(0)
    const language = ref(zhCn);

    // getter
    const isCollapse = computed(() => setting.value.collapse === 'Expand'); // 是否是展开
    const isContentFull = computed(() => !setting.value.showVerticalNav && !setting.value.showAppTopBar); // 是否是内容区域全屏

    // actions
    function setLanguage(lan: string) {
      if(lan == 'zh-cn') {
        language.value = zhCn
      } else if(lan == 'en') {
        language.value = en
      }
    }

    function changeSideBarCollapse () {
      setting.value.collapse = setting.value.collapse === 'Fold' ? 'Expand' : 'Fold'
    }

    function changeContentFull () {
      setting.value.showVerticalNav = !setting.value.showVerticalNav
      setting.value.showAppTopBar = !setting.value.showAppTopBar
    }

    function setLocalSettingVal() {
      for (let i in setting.value){
        setting.value[i] = getSettingValOrDef(i, StorageName, 'local') 
      }
    }

    function setSettingVal(val:any, key: string, ) {
      setting.value[key] = val
      // let local = JSON.parse(localStorage.getItem(StorageName))
      // if(!local) {
      //   localStorage.setItem(StorageName, JSON.stringify({setting: setting.value}))
      // } else {
      //   local.setting = setting.value
      //   localStorage.setItem(StorageName, JSON.stringify(local))
      // }
      // curCaseSet()
    }

    /** 灰色模式设置 */
    function greyChange (value?: boolean): void {
      toggleClass(
        value ?? setting.value.showGreyColor, 
        "html-grey", 
        document.querySelector("html") ?? undefined
      );
    }
      
      /** 色弱模式设置 */
    function weakChange (value?: boolean): void {
      toggleClass(
        value ?? setting.value.showWeakColor,
        "html-weakness",
        document.querySelector("html") ?? undefined
      );
    }
    function initSetting() {
      let obj = {}
      settingKeys.forEach(i => {
        obj[i] = getSettingValOrDef(i, StorageName, 'local')
      })
      return obj
    }

    function eraseSettingCache() {
      for (let i in setting.value){
        setting.value[i] = AppConfig[i]
      }
      let local = JSON.parse(localStorage.getItem(StorageName))
      if(local) {
        local.setting = setting.value
        localStorage.setItem(StorageName, JSON.stringify(local))
      }
    }

    function curCaseSet () {
      
        // curCase.value = {
        //   a: 1,
        //   b: 2,
        //   c: ['11', '22', '33']
        // }
      curCase.value = curCase.value + 1
    }

    return {
      setting,
      language,
      curCase,

      isCollapse,
      isContentFull,

      setLanguage,
      changeSideBarCollapse,
      changeContentFull,
      setSettingVal,
      eraseSettingCache,
      setLocalSettingVal,
      greyChange,
      weakChange,
      curCaseSet
    } 
  },
  {
    persist: {
      key: StorageName,
      storage: localStorage,
    },
  },
)

export function useAppStoreHook() {
  return useAppStore(store);
}
