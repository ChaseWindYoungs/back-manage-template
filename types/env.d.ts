/// <reference types="vite/client" />

/**
 * ! 该处用于解决 TS 提示 ”无法找到 *.vue 声明文件“ 的问题
 */
declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  // const component: DefineComponent<{}, {}, any>;
  const Component: ReturnType<typeof defineComponent>
  export default component;
}
