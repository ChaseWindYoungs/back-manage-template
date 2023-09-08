import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function useIcoins (app: { component: (arg0: string, arg1: any) => void }) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
