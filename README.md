# Cesium + Vue 3 + TypeScript + Vite + Element-Plus + pnpm

这是一个将官方网站上提供的实例放在一起的 project

而且也是一个将TS vite 以及element-plus 结合在一起的template项目

可以直接拉取模板，安装依赖，运行查看效果
## 运行
如果本地没有pnpm，运行 `npm i -g pnpm` , 如果有，则忽略

`pnpm install`

`pnpm run dev`

# 所有关键步骤的配置


#### defineOptions,

需要配合setup script 使用，而且不需要安装任何插件，也不需要配置任何参数

#### vue-router

在使用嵌套路由时，最好每一个嵌套路由都是全局唯一的名称，这样在进行匹配渲染时，才不会无法渲染