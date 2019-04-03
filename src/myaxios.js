/* 导入axios */
import axios from "axios";
//导入路由
import router from './router.js';
export default {
  install(Vue) {
    //设置axios拦截器
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
        //判断token是否伪造
        if(response.data.meta.msg==='无效token'){
          //清除伪造token
          window.sessionStorage.removeItem('key')
          //弹框提示
          Vue.prototype.$message.warning('伪造token');
          //跳转到登录页
          router.push('/login');
          return ;
        }
        
        
        
        //弹框提示
        if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
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


    //设置给vue原型
    Vue.prototype.$axios = axios;
  }
};
