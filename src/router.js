/* 路由块 */

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入组件
import login from "./components/login.vue";
import index from "./components/index.vue";
import users from "./components/users.vue";
import rights from "./components/rights.vue";
import roles from "./components/roles.vue";
import goods from "./components/goods.vue";
import params from "./components/params.vue";
import categories from "./components/categories.vue";
import orders from "./components/orders.vue";
import reports from "./components/reports.vue";

//定义路由规则
let routes = [
  {
    path: "/login",
    component: login
  },
  {
    path: "/",
    component: index,
    redirect: "/users",

    children: [
      {
        path: "users",
        component: users,
      },
      {
        path: "rights",
        component: rights
      },
      {
        path: "roles",
        component: roles
      },
      {
        path: "goods",
        component: goods
      },
      {
        path: "params",
        component: params
      },
      {
        path: "categories",
        component: categories
      },
      {
        path: "orders",
        component: orders
      },
      {
        path: "reports",
        component: reports
      }
    ]
  }
];

//实例路由

let router = new VueRouter({
  routes
});

export default router;
