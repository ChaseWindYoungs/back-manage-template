const Layout = () => import("@/layout/index.vue");
export default {
  path: "/error",
  name: 'Error',
  component: Layout,
  redirect: "/error/401",
  meta: {
    icon: 'bug',
    title: '异常页面',
  },
  children: [
    {
      path: "401",
      name: "401",
      component: () => import("@/pages/error/401.vue"),
      meta: { title: '401'},
    },
    {
      path: "404",
      name: "404",
      component: () => import("@/pages/error/404.vue"),
      meta: { title: '404' }
    },
    {
      path: "500",
      name: "500",
      component: () => import("@/pages/error/500.vue"),
      meta: { title: '500' }
    }
  ]
}
