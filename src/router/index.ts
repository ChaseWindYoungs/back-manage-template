import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';
import errorRoutes from './error.ts'
import { useTagsStoreHook } from "@/store/modules/tags";
import { findRouteByName } from './utils.ts'
import NProgress from "@/utils/nprogress";

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
        // https://router.vuejs.org/zh/guide/advanced/meta.html
        // vue-router会非递归合并所有 meta 字段（从父字段到子字段）的方法，因此，需要给该路由加上showLink: true，防止被覆盖
        meta: { title: '首页', icon: 'home', activeIcon: 'home-fill', showLink: true }
      },
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
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/index.vue"),
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
  const { name, path, fullPath, query, meta } = to;
  useTagsStoreHook().handleTags(
    'push',
    { name, path, fullPath, query, meta }
  )
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;

