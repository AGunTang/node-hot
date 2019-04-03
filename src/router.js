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

//统一错误页
import error from "./components/error.vue";

//定义路由规则
let routes = [
  {
    path: "/login",
    component: login,
    meta:{
      noLogin:true,
    }
  },
  {
    path: "/error",
    component: error,
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


// 设置全局守卫
router.beforeEach((to,from,next)=>{
  // console.log(to);
  //判断用户是否输入有效路径
  if(to.matched.length===0){
    //提示用户
    Vue.prototype.$message.warning('找不到了')
    //跳转到错误页
    // router.push('/error')
    next('/error')
    // console.log(this);
    
    return ;
  }
  
  
  
  if(to.meta.noLogin){//如果去登录页，就往下执行
    next()
  }else if (window.sessionStorage.getItem("key")) {

    next()//如果有token就往下执行
  } else {
    //没有跳到登录页
    next({
      path:'/login'
    })
    Vue.prototype.$message.error("请先登录");
  }
})

export default router;
