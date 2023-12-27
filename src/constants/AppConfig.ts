import { SettingDef } from '@/store/type'

export interface AppConfigType extends SettingDef  {
  name?: string;
  language?: string;
  uniqueOpened?: Boolean;
  showTags?: Boolean;
  keepAlive?: Boolean;
}

const AppConfig: AppConfigType = {
  name: 'Tobe-Vue-Admin', // 项目名称
  language: 'zhCn', // 语言
  uniqueOpened: true, // 是否只保持一个子菜单的展开
  showTags: true, // 展示标签页列表
  keepAlive: false, // 启用缓存页面
  
  collapse: 'Expand', // 侧栏菜单折叠 （Expand ， Fold）
  showAppName: true, // 展示项目名称
  showVerticalNav: true, // 展示左侧菜单
  showAppTopBar: true, // 展示顶部任务栏
  showAppSearch: true, // 展示搜索组件
  showAppSetting: true, // 展示设置按钮
  showBreadCrumb: true, // 展示面包屑
  showAppHearder: true, // 展示顶栏
  showNavCollapse: true, // 展示菜单折叠按钮
  showGreyColor: false, // 展示灰色模式
  showWeakColor: false, // 展示色弱模式
}
export default AppConfig