import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import {useIcoins } from '@/utils/icons.ts'
import { setupStore } from "@/store";
import { useI18n } from "@/plugins/i18n";
import { MotionPlugin } from '@vueuse/motion'

// 样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";

// svgIcon 本地注册
import 'virtual:svg-icons-register'
import '@/assets/icon/iconfont.js';
import SvgIcon from '@/components/SvgIcon.vue'
import ZText from '@namchee/vue-ztext';

import VMdPreview from '@/plugins/markdownView/index.ts'
import "@/plugins/markdownView/index.scss";

import 'virtual:uno.css'

const app = createApp(App);
useIcoins(app)
// 全局注册 状态管理(store)
setupStore(app);
app.component('SvgIcon', SvgIcon);
app.use(router).use(useI18n).mount('#app');
app.use(ZText)
app.use(VMdPreview);
app.use(MotionPlugin)