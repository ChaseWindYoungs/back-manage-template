import { App, WritableComputedRef } from "vue";
import { type I18n, createI18n } from "vue-i18n";

// element-plus国际化
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import { isObject } from "@/utils/is";

// 获取所有的翻译文件
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
  zh: { ...getI18n("zh-CN"), ...zhLocale },
  en: { ...getI18n("en"), ...enLocale }
};

/**
 * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
 * @param message message
 * @returns 转化后的message
 */
export function transformI18n(message: any = "") {
  if (!message) return "";
  // 处理存储动态路由的title,格式 {zh:"",en:""}
  if (typeof message === "object") {
    const locale: string | WritableComputedRef<string> | any =
      i18n.global.locale;
    return message[locale?.value];
  }
  const key = message.match(/(\S*)\./)?.input;
  if (key && getObjectKeys(getI18n("zh-CN")).find(item => item === key)) {
    return i18n.global.t.call(i18n.global.locale, message);
  } else if (!key && Object.keys(getI18n("zh-CN")).includes(message)) {
    // 兼容非嵌套形式的国际化写法
    return i18n.global.t.call(i18n.global.locale, message);
  } else {
    return message;
  }
}

/** 获取对象中所有嵌套对象的key键，并将它们用点号分割组成字符串 */
function getObjectKeys(obj) {
  const stack = [], keys = [];
  stack.push({ obj, key: "" });
  while (stack.length > 0) {
    const { obj, key } = stack.pop();
    for (const k in obj) {
      const newKey = key ? `${key}.${k}` : k;
      obj[k] && isObject(obj[k])
        ? stack.push({ obj: obj[k], key: newKey })
        : keys.push(newKey)
    }
  }
  return keys;
}

export const i18n: I18n = createI18n({
  legacy: false,
  locale: 'zh' ?? "zh",
  fallbackLocale: "en",
  messages: localesConfigs
});

export function useI18n(app: App) {
  app.use(i18n);
}