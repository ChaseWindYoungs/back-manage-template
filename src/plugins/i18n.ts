import { App, WritableComputedRef } from "vue";
import { type I18n, createI18n } from "vue-i18n";

// element-plus国际化
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

function getI18n(prefix = "zh-CN") {
  return Object.fromEntries(
    Object.entries(
      import.meta.glob("../../langs/*.json", { eager: true })
    ).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  )[prefix];
}

export const localesConfigs = {
  zh: {
    ...getI18n("zh-CN"),
    ...zhLocale
  },
  en: {
    ...getI18n("en"),
    ...enLocale
  }
};


export const i18n: I18n = createI18n({
  legacy: false,
  locale: 'zh' ?? "zh",
  fallbackLocale: "en",
  messages: localesConfigs
});

export function useI18n(app: App) {
  app.use(i18n);
}