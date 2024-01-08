
export interface SettingDef {
  collapse?: string;
  showAppName?: Boolean;
  showVerticalNav?: Boolean;
  showAppTopBar?: Boolean;
  showAppSearch?: Boolean;
  showAppSetting?: Boolean;
  showBreadCrumb?: Boolean;
  showAppHearder?: Boolean;
  showNavCollapse?: Boolean;
  showGreyColor?: Boolean;
  showWeakColor?: Boolean;
  uniqueOpened?: Boolean;
  layoutMode?: string;
  theme?: Boolean;
}
export type SettingKeys = keyof SettingDef

export type multiType = {
  path: string;
  name: string;
  fullpath: string;
  meta: any;
  query?: object;
};