import Vue from "vue";
import App from "./App.vue";

//导入路由
import router from "./router";

// 饿了吗组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//导入全局通用样式
import "./assets/css/base.scss";

/* 面包屑组件 */
import breads from './components/breads.vue';
Vue.component('bread',breads)

//导入axios
import axios from "axios";
//设置给vue原型
Vue.prototype.$axios = axios;

/* 设置axios拦截器 */
//请求拦截
axios.interceptors.request.use(
  function(config) {
    //设置基地址
    config.baseURL = "http://localhost:8888/api/private/v1/";
    // 设置token
    config.headers.Authorization = window.sessionStorage.getItem("key");
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  function(response) {
    //弹框提示
    
    if([200,201,204].indexOf(response.data.meta.status)!=-1){
      Vue.prototype.$message.success(response.data.meta.msg);
    } else {
      Vue.prototype.$message.warning(response.data.meta.msg);
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

Vue.config.productionTip = true;

new Vue({
  render: h => h(App),
  //挂载路由
  router
}).$mount("#app");
