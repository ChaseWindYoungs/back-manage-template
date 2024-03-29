import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router';
import errorRoutes from './error.ts'
import { useTagsStoreHook } from "@/store/modules/tags";
import { useTimeoutFn } from "@vueuse/core";
import NProgress from "@/utils/nprogress";

const Layout = () => import("@/layout/index.vue");
// 静态路由
export const commonRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'Layout', showLink: false },
    children: [
      {
        path: '/dashboard',
        component: () => import("@/pages/dashboard/index.vue"),
        name: 'Dashboard',
        // https://router.vuejs.org/zh/guide/advanced/meta.html
        // vue-router会非递归合并所有 meta 字段（从父字段到子字段）的方法，因此，需要给该路由加上showLink: true，防止被覆盖
        meta: { title: '首页', icon: 'home', activeIcon: 'home-fill', showLink: true }
      },
      // {
      //   path: '/welcome',
      //   component: () => import("@/pages/Home.vue"),
      //   name: 'welcome',
      //   // https://router.vuejs.org/zh/guide/advanced/meta.html
      //   // vue-router会非递归合并所有 meta 字段（从父字段到子字段）的方法，因此，需要给该路由加上showLink: true，防止被覆盖
      //   meta: { title: '首页', icon: 'home', activeIcon: 'home-fill', showLink: true }
      // },
    ]
  },
  {
    path: "/redirect",
    component: Layout,
    meta: { title: '加载中...', showLink: false, hiddenTag: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/components/Redirect.vue"),
        meta: { title: '重定向', showLink: false, hiddenTag: true }
      }
    ]
  },
  {
    path: '/components',
    name: 'Components',
    component: Layout,
    redirect: '/components/md',
    meta: { title: '组件', icon: 'appstore-fill' },
    children: [
      {
        path: "md",
        name: "MD",
        component: () => import("@/pages/tools/markdown/index.vue"),
        meta: { title: 'MD文件预览', icon: 'file-markdown' }
      },
      {
        path: "terminal",
        name: "Terminal",
        component: () => import("@/pages/tools/terminal/index.vue"),
        meta: { title: '终端调用', icon: 'shortcut' }
      },
      {
        path: "icons",
        name: "Icons",
        component: () => import("@/pages/components/icons/index.vue"),
        meta: { title: '图标', icon: "smile" }
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/layout/login/index.vue"),
    meta: { title: '登录', showLink: false, hiddenTag: true }
  },
  {
    path: '/nested',
    name: 'nested',
    component: Layout,
    meta: { title: 'nested', icon: 'apartment' },
    redirect: "/nested/level1",
    children: [
      {
        path: 'level1',
        component: () => import("@/pages/nested/level1/index.vue"),
        name: 'Level1',
        meta: { title: '1级菜单' },
        redirect: "/nested/level1/level2",
        children: [
          {
            path: 'level2',
            component: () => import("@/pages/nested/level1/level2/index.vue"),
            name: 'Level2',
            meta: { title: '2级菜单' },
            redirect: "/nested/level1/level2/level3",
            children: [
              {
                path: 'level3',
                component: () => import("@/pages/nested/level1/level2/level3/index1.vue"),
                name: 'Level3',
                meta: { title: '3级菜单' },
                redirect: "/nested/level1/level2/level3/level4",
                children: [
                  {
                    path: 'level4',
                    component: () => import("@/pages/nested/level1/level2/level3/index1.vue"),
                    name: 'level4',
                    meta: { title: '4级菜单' }
                  },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    path: "/baidu",
    name: "baidu",
    component: () => import("@/layout/login/index.vue"),
    meta: { title: '外链', icon: 'link', hiddenTag: true, href: 'https://chasewindyoungs.github.io/blog/' }
  },
  {
    path: "/charts",
    name: "Charts",
    component: Layout,
    redirect: 'echart',
    meta: { title: '图表', icon: 'barchart' },
    children: [
      {
        path: "echart",
        name: "Echart",
        component: () => import("@/pages/screen/index.vue"),
        meta: { title: 'echart', icon: 'file-markdown' }
      },
    ]
  },
  {
    path: "/documentation",
    name: "Documentation",
    component: Layout,
    redirect: '/documentation/vue',
    meta: { title: '文档', icon: 'book' },
    children: [
      {
        path: "vue",
        name: "Vue",
        component: () => import("@/pages/tools/iframe/index.vue"),
        meta: { title: 'Vue', icon: 'file-markdown', src: 'https://cn.vuejs.org/' }
      },
      {
        path: "vitejs",
        name: "Vitejs",
        component: () => import("@/pages/tools/iframe/index.vue"),
        meta: { title: 'Vitejs', icon: 'file-markdown', src: 'https://cn.vitejs.dev/' }
      },
      {
        path: "vue-router",
        name: "Vue-Router",
        component: () => import("@/pages/tools/iframe/index.vue"),
        meta: { title: 'Vue-Router', icon: 'file-markdown', src: 'https://router.vuejs.org/zh/' }
      },
      {
        path: "pinia",
        name: "Pinia",
        component: () => import("@/pages/tools/iframe/index.vue"),
        meta: { title: 'Pinia', icon: 'file-markdown', src: 'https://pinia.vuejs.org/zh/' }
      },
    ]
  },
];
export const routes = [
  ...commonRoutes,
  errorRoutes,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[]
});
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = localStorage.getItem('TOKEN')
  if (!token) {
    if (to.path === '/login') next();
    else next('/login');
  } else {

    // 外链路由, 从新标签打开，返回上一个路由
    if (to.meta.href) {
      window.open(to.meta.href);
      next({ path: from.fullPath, replace: true, query: from.query });
      return;
    }

    const { name, path, fullPath, query, meta } = to;
    useTagsStoreHook().handleTags(
      'add',
      { name, path, fullPath, query, meta }
    )
    useTagsStoreHook().handleCachePages({ name, path, fullPath, query, meta }, 'add',);
    // 页面整体刷新和点击标签页刷新
    if (from.name === undefined || from.name === "Redirect") {
      useTagsStoreHook().handleCachePages({ name, path, fullPath, query, meta }, 'delete',)
      useTimeoutFn(() => {
        useTagsStoreHook().handleCachePages({ name, path, fullPath, query, meta }, 'add',);
      }, 100);
    }
    next();
  }

});
router.afterEach(() => {
  NProgress.done();
});
export default router;

