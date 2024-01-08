import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve } from "path";
import UnoCSS from 'unocss/vite'

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  css: {
    // CSS 预处理器
    preprocessorOptions: {
      //define global scss variable
      scss: {
        javascriptEnabled: true,
        additionalData: `
          @use "@/styles/variables.scss" as *;
        `,
      },
    },
  },
  plugins: [
    
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components'], // 自动按需导入组件访问的相对路径
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(pathSrc, 'assets/images/icons')], 
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    VueI18nPlugin({ 
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve("langs/**")]
     }),
     UnoCSS(),
    
  ],
  server: {
    host: true,
    https: false, //是否启用 http 2
    cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
    open: false, //服务启动时自动在浏览器中打开应用
    // port: Number(env.VITE_APP_PORT),
    strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
    // force: true, //是否强制依赖预构建
    hmr: true, //禁用或配置 HMR 连接
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.100.25:58011", // 开发环境
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
})
