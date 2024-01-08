// 导入 Element Plus 中英文语言包
import { ref, computed, Ref } from 'vue';
import { defineStore } from "pinia";
import { store } from "@/store";
import { getSettingValOrDef } from '../utils'
import { toggleClass } from '@/utils'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import AppConfig from '@/constants/AppConfig';
import { SettingDef, SettingKeys } from '../type'
export const StorageName = 'APP_SETTING'


const settingKeys : Array<SettingKeys> = [
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
  'layoutMode',
  'theme'
]

function initSetting() :SettingDef {
  let obj:SettingDef = {};
  settingKeys.forEach((i:SettingKeys) => {
    obj[i] = getSettingValOrDef(i, StorageName, 'local')
  })
  return obj
}
const _setting = initSetting()

// setup
export const useAppStore = defineStore(
  "app", 
  () => {
    const setting:Ref<SettingDef> = ref(_setting)
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

    function setSettingVal(val:any, key: SettingKeys, ) {
      setting.value[key] = val
    }

    /** 灰色模式设置 */
    function greyChange (value?: boolean): void {
      toggleClass(
        value ?? !!(setting.value.showGreyColor), 
        "html-grey", 
        document.querySelector("html") ?? undefined
      );
    }
      
      /** 色弱模式设置 */
    function weakChange (value?: boolean): void {
      toggleClass(
        value ?? !!(setting.value.showWeakColor),
        "html-weakness",
        document.querySelector("html") ?? undefined
      );
    }
    
    function eraseSettingCache() {
      let key: SettingKeys
      for (key in setting.value){
        /**
         * ! 这里的Ts报错不知怎么处理
         */
        setting.value[key] = AppConfig[key]
      }
      try {
        let local = JSON.parse(localStorage.getItem(StorageName) ?? '')
        if(local) {
          local.setting = setting.value
          localStorage.setItem(StorageName, JSON.stringify(local))
        }
      } catch (error) {
        
      }
    }


    return {
      setting,
      language,

      isCollapse,
      isContentFull,

      setLanguage,
      changeSideBarCollapse,
      changeContentFull,
      setSettingVal,
      eraseSettingCache,
      greyChange,
      weakChange,
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
