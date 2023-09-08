import AppConfig from '@/constants/AppConfig.ts';

export const getSettingValOrDef = (key: string, storageName:string, storageType: string = 'local') => {
  if(storageType === 'local') {
    let item = JSON.parse(localStorage.getItem(storageName));
    return item && item?.setting ? item.setting[key] : AppConfig[key]
  } else if(storageType === 'session') {
    let item = JSON.parse(sessionStorage.getItem(storageName));
    return item && item?.setting ? item.setting[key] : AppConfig[key]
  } else return AppConfig[key]
}