import Vue from "vue";
import App from "./App.vue";

//导入时间插件
import moment from 'moment';

//省市级联插件
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)

//注册全局过滤器
Vue.filter('formate',function(time,Tmp){
  return moment(time).format(Tmp)
})



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


//导入我的axios
import myaxios from './myaxios.js';
Vue.use(myaxios);



Vue.config.productionTip = true;

new Vue({
  render: h => h(App),
  //挂载路由
  router
}).$mount("#app");
