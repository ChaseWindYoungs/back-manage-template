export interface allMediasType {
  [key: string]: Array<MediaItemType>
}

export interface MediaItemType {
  url: string
  index: number
}

export interface GroupType {
  name: string
  size: number
  pid: string
}

export interface MenuItem {
  name: string
  key: string
  icon?: string
  value?: string | boolean | number
  children?: Array<MenuItem>
}