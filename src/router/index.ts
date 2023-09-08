import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';

import errorRoutes from './error.ts'
import { useTagsStoreHook } from "@/store/modules/tags";
import { findRouteByName } from './utils.ts'
import NProgress from "@/utils/nprogress";

import { StorageName, useAppStoreHook } from '@/store/modules/app.ts';
const { setLocalSettingVal } = useAppStoreHook()
 
const Layout = () => import("@/layout/index.vue");
// 静态路由
export const commonRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/welcome',
    meta: { title: 'Layout', showLink: false },
    children: [
      {
        path: '/welcome',
        component: () => import("@/pages/Home.vue"),
        name: 'welcome',
        meta: { title: '首页', icon: 'home', activeIcon: 'home-fill' }
      },
    ]
  },
  {
    path: "/redirect",
    component: Layout,
    meta: { title: '加载中...', showLink: false, },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/components/Redirect.vue"),
        meta: { title: '重定向', showLink: false, }
      }
    ]
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Layout,
    
  //   meta: { title: 'Layout', showLink: false },
  // },
  // {
  //   path: '/welcome',
  //   component: () => import("@/pages/Home.vue"),
  //   name: 'welcome',
  //   meta: { title: '首页' }
  // },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/index.vue"),
    meta: { title: '登录', showLink: false }
  },
  {
    path: '/nested',
    name: 'nested',
    component: Layout,
    meta: { title: 'nested', icon: 'apartment', },
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
  const { name } = to;
  const settings = JSON.parse(localStorage.getItem(StorageName))
  if(settings) {
    setLocalSettingVal()
  }
  const route = findRouteByName(
    name,
    router.options.routes
  );
  if(to.meta.showLink !== false) {
    useTagsStoreHook().setSingleCacheTags(route)
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;

